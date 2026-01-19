import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
  Platform,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';
import Text from './Text';
import Icon from './Icon';
import { convertHexToRgba } from '../utils/uiUtils';

export type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
};

export type AccordionProps = {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AccordionItem({
  title,
  children,
  isExpanded = false,
  onToggle,
  style,
}: AccordionItemProps) {
  const { colors } = useTheme();
  const pressed = useSharedValue(0);
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  const itemStyle = useMemo(
    () => ({
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
    }),
    [colors]
  );

  const pressedColor = convertHexToRgba(colors.border, 0.5);

  const animatedTriggerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        pressed.value,
        [0, 1],
        [colors.background, pressedColor]
      ),
    };
  });

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg`,
        },
      ],
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
    };
  });

  const updatePressAnimation = (value: number) => {
    pressed.value = withTiming(value, { duration: 200 });
  };

  const handlePressIn = () => {
    Platform.OS !== 'web' && updatePressAnimation(1);
  };

  const handlePressOut = () => {
    Platform.OS !== 'web' && updatePressAnimation(0);
  };

  useEffect(() => {
    rotation.value = withTiming(isExpanded ? 1 : 0, { duration: 200 });
  }, [isExpanded, rotation]);

  useEffect(() => {
    if (contentHeight > 0) {
      height.value = withTiming(isExpanded ? contentHeight : 0, {
        duration: 250,
      });
      opacity.value = withTiming(isExpanded ? 1 : 0, { duration: 200 });
    }
  }, [isExpanded, contentHeight, height, opacity]);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout;
    if (layoutHeight > 0 && contentHeight !== layoutHeight) {
      setContentHeight(layoutHeight);
      if (isExpanded) {
        height.value = layoutHeight;
        opacity.value = 1;
      } else {
        height.value = 0;
        opacity.value = 0;
      }
    }
  };

  return (
    <View style={[itemStyle, style]}>
      <Pressable
        style={styles.trigger}
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={() => updatePressAnimation(1)}
        onHoverOut={() => updatePressAnimation(0)}
      >
        <Animated.View style={[styles.triggerContent, animatedTriggerStyle]}>
          <Text
            variant="h4"
            style={[styles.title, { color: colors.foreground }]}
          >
            {title}
          </Text>
          <Animated.View style={[styles.chevron, animatedChevronStyle]}>
            <Icon name="ChevronDown" size={20} color={colors.foreground} />
          </Animated.View>
        </Animated.View>
      </Pressable>

      <View>
        <View style={styles.hiddenContent} onLayout={handleContentLayout}>
          <View style={styles.content}>{children}</View>
        </View>

        {contentHeight > 0 && (
          <Animated.View
            style={[styles.contentContainer, animatedContentStyle]}
          >
            <View style={styles.content}>{children}</View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

export default function Accordion({
  type = 'single',
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  style,
}: AccordionProps) {
  const { colors, theme } = useTheme();

  const getInitialExpandedItems = (): Set<string> => {
    if (controlledValue !== undefined) {
      return new Set(
        Array.isArray(controlledValue) ? controlledValue : [controlledValue]
      );
    }
    if (defaultValue !== undefined) {
      return new Set(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      );
    }
    return new Set();
  };

  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    getInitialExpandedItems
  );

  useEffect(() => {
    if (controlledValue !== undefined) {
      setExpandedItems(
        new Set(
          Array.isArray(controlledValue) ? controlledValue : [controlledValue]
        )
      );
    }
  }, [controlledValue]);

  const toggleItem = (value: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);

      if (type === 'single') {
        if (newSet.has(value)) {
          if (collapsible) {
            newSet.clear();
          }
        } else {
          newSet.clear();
          newSet.add(value);
        }
      } else if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }

      const newValue =
        type === 'single' ? Array.from(newSet)[0] || '' : Array.from(newSet);

      onValueChange?.(newValue);
      return newSet;
    });
  };

  const accordionStyle = useMemo(
    () => ({
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden' as const,
    }),
    [colors, theme]
  );

  const accordionItems = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const value = child.props.value || `item-${index}`;
      return React.cloneElement(
        child as React.ReactElement<AccordionItemProps>,
        {
          isExpanded: expandedItems.has(value),
          onToggle: () => toggleItem(value),
          key: value,
        }
      );
    }
    return child;
  });

  return <View style={[accordionStyle, style]}>{accordionItems}</View>;
}

const styles = StyleSheet.create({
  trigger: { overflow: 'hidden' },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  chevron: { marginStart: 8, justifyContent: 'center', alignItems: 'center' },
  content: { paddingHorizontal: 16, paddingBottom: 16, overflow: 'hidden' },
  contentContainer: { overflow: 'hidden' },
  hiddenContent: { position: 'absolute', opacity: 0, zIndex: -1 },
  title: { flex: 1 },
});
