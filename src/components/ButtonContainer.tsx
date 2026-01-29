import React, { useEffect, useMemo } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type AnimatedStyle,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';
import meassures from '../theme/meassures';

export enum ButtonVariant {
  flat = 'flat',
  outline = 'outline',
  transparent = 'transparent',
  destructive = 'destructive',
}

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
}

export type ButtonColors = {
  backgroundColor: string;
  borderColor?: string;
  textColor: string;
  pressedBackgroundColor: string;
};

type Props = Omit<PressableProps, 'children'> & {
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  loading?: boolean;
  renderContent: (colors: ButtonColors) => React.ReactNode;
  contentContainerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  rounded?: boolean;
};

export default function ButtonContainer({
  disabled,
  variant = 'flat',
  size = 'large',
  loading = false,
  renderContent,
  onPressIn,
  onPressOut,
  contentContainerStyle,
  backgroundColor,
  textColor,
  borderColor,
  rounded = false,
  ...rest
}: Props) {
  const { theme, colors } = useTheme();
  const pressed = useSharedValue(0);
  const enabled = useSharedValue(disabled ? 0 : 1);

  const height = useMemo(() => meassures.button[size], [size]);

  const buttonColors: ButtonColors = useMemo(() => {
    const variantColors = {
      outline: {
        backgroundColor: 'transparent',
        borderColor: colors.border,
        textColor: colors.foreground,
        pressedBackgroundColor: convertHexToRgba(colors.foreground, 0.1),
      },
      transparent: {
        backgroundColor: 'transparent',
        textColor: colors.foreground,
        pressedBackgroundColor: convertHexToRgba(colors.foreground, 0.1),
      },
      destructive: {
        backgroundColor: colors.destructive,
        textColor: colors.foregroundOnDestructive,
        pressedBackgroundColor: convertHexToRgba(colors.destructive, 0.8),
      },
      flat: {
        backgroundColor: colors.primary,
        textColor: colors.altForeground,
        pressedBackgroundColor: convertHexToRgba(colors.foreground, 0.8),
      },
    }[variant];

    return {
      ...variantColors,
      ...(backgroundColor && {
        backgroundColor,
        pressedBackgroundColor: convertHexToRgba(backgroundColor, 0.8),
      }),
      ...(textColor && { textColor }),
      ...(borderColor && { borderColor }),
    };
  }, [variant, colors, backgroundColor, textColor, borderColor]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        pressed.value,
        [0, 1],
        [buttonColors.backgroundColor, buttonColors.pressedBackgroundColor]
      ),
      opacity: interpolate(enabled.value, [0, 1], [0.3, 1]),
    };
  });

  const borderWidth = useMemo(() => (variant === 'outline' ? 1 : 0), [variant]);

  const updatePressAnimation = (value: number) => {
    pressed.value = withTiming(value, { duration: 300 });
  };

  useEffect(() => {
    enabled.value = withTiming(disabled ? 0 : 1, { duration: 300 });
  }, [disabled, enabled]);

  const handlePressIn = (e: GestureResponderEvent) => {
    if (!loading && !disabled) {
      onPressIn?.(e);
      Platform.OS !== 'web' && updatePressAnimation(1);
    }
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    if (!loading && !disabled) {
      onPressOut?.(e);
      Platform.OS !== 'web' && updatePressAnimation(0);
    }
  };

  return (
    <Pressable
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={() => updatePressAnimation(1)}
      onHoverOut={() => updatePressAnimation(0)}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          styles.contentContainer,
          {
            height,
            borderRadius: rounded ? height / 2 : theme.roundness,
            borderWidth,
            borderColor: buttonColors.borderColor,
          },
          animatedStyle,
          contentContainerStyle,
        ]}
      >
        {renderContent(buttonColors)}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentContainer: { justifyContent: 'center' },
});
