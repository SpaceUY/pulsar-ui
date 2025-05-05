import { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import LoadingIndicator from './LoadingIndicator';
import Text from './Text';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

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
}

type Props = PressableProps & {
  text: string;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  loading?: boolean;
};

export default function Button({
  disabled,
  text,
  variant = 'flat',
  size = 'large',
  loading = false,
  ...rest
}: Props) {
  const { theme, colors } = useTheme();
  const pressed = useSharedValue(0);
  const enabled = useSharedValue(disabled ? 0 : 1);

  const height = useMemo(
    () => ({ small: 24, medium: 32, large: 40 })[size],
    [size]
  );

  const buttonColors: {
    backgroundColor: string;
    borderColor?: string;
    textColor: string;
    pressedBackgroundColor: string;
  } = useMemo(() => {
    return {
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
  }, [variant, colors]);

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

  const handlePressInOut = (value: number) => {
    pressed.value = withTiming(value, { duration: 300 });
  };

  useEffect(() => {
    enabled.value = withTiming(disabled ? 0 : 1, { duration: 300 });
  }, [disabled, enabled]);

  return (
    <Pressable
      {...rest}
      onPressIn={() => !loading && !disabled && handlePressInOut(1)}
      onPressOut={() => !loading && !disabled && handlePressInOut(0)}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          styles.button,
          animatedStyle,
          {
            borderRadius: theme.roundness,
            borderWidth,
            height,
            borderColor: buttonColors.borderColor,
          },
        ]}
      >
        <View style={styles.content}>
          {loading && (
            <LoadingIndicator
              style={styles.loadingIndicator}
              color={buttonColors.textColor}
              size={size === 'small' ? 14 : 16}
            />
          )}
          <Text
            style={{ color: buttonColors.textColor }}
            variant={size === 'small' ? 'h5' : 'h4'}
          >
            {text}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: { marginRight: 8 },
});
