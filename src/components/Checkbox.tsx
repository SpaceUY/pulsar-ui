import { useEffect } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Check } from 'lucide-react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from './Text';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

export type CheckboxProps = {
  style?: StyleProp<ViewStyle>;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  description?: string;
};

export default function Checkbox({
  style,
  checked,
  onCheckedChange,
  label,
  disabled = false,
  description,
}: CheckboxProps) {
  const { colors, theme } = useTheme();
  const checkedValue = useSharedValue(checked ? 1 : 0);
  const pressedValue = useSharedValue(0);

  useEffect(() => {
    checkedValue.value = withTiming(checked ? 1 : 0, {
      duration: 200,
    });
  }, [checked, checkedValue]);

  const checkboxAnimStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        checkedValue.value,
        [0, 1],
        [colors.border, colors.foreground]
      ),
      backgroundColor: interpolateColor(
        checkedValue.value,
        [0, 1],
        [colors.background, colors.foreground]
      ),
    };
  });

  const checkIconAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: checkedValue.value,
    };
  });

  const pressedColor = convertHexToRgba(colors.foreground, 0.05);

  const pressableAnimStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        pressedValue.value,
        [0, 1],
        ['transparent', pressedColor]
      ),
    };
  });

  const updatePressAnimation = (value: number) => {
    pressedValue.value = withTiming(value, { duration: 200 });
  };

  const handlePressIn = () => Platform.OS !== 'web' && updatePressAnimation(1);

  const handlePressOut = () => Platform.OS !== 'web' && updatePressAnimation(0);

  const handlePress = () => onCheckedChange(!checked);

  return (
    <Pressable
      style={[style, disabled && styles.disabled]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={() => updatePressAnimation(1)}
      onHoverOut={() => updatePressAnimation(0)}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.container,
          !description && styles.centered,
          { borderRadius: theme.roundness },
          pressableAnimStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.box,
            { borderRadius: theme.roundness },
            checkboxAnimStyle,
          ]}
        >
          <Animated.View style={checkIconAnimStyle}>
            <Check
              size={14}
              color={checked ? colors.background : colors.foreground}
              strokeWidth={3}
            />
          </Animated.View>
        </Animated.View>
        {(label || description) && (
          <View style={styles.textContainer}>
            <Text variant="h5">{label}</Text>
            {description && (
              <Text variant="ps" style={styles.description}>
                {description}
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  centered: { alignItems: 'center' },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    margin: -8,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: { marginStart: 8, flex: 1 },
  description: { marginTop: 2, opacity: 0.5 },
});
