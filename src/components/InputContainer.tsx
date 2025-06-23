import { type PropsWithChildren, useEffect, useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from './Text';
import Icon, { type IconName } from './Icon';
import useTheme from '../hooks/useTheme';
import { convertHexToRgba } from '../utils/uiUtils';

type Props = PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
  hint?: string;
  label?: string;
  onPress: () => void;
  focused?: boolean;
  disabled?: boolean;
  size?: 'small' | 'default';
  height?: number;
  iconName?: IconName;
};

export type InputRef = { focus: () => void };

const INACTIVE = -1;
const ACTIVE = 0;
const ERROR = 1;

export default function InputContainer({
  style,
  contentContainerStyle,
  error,
  hint,
  label,
  onPress,
  focused,
  children,
  size = 'default',
  disabled,
  height,
  iconName,
}: Props) {
  const status = useSharedValue(INACTIVE);
  const isFocused = useSharedValue(0);
  const { colors, theme } = useTheme();

  const animStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      status.value,
      [INACTIVE, ACTIVE, ERROR],
      [colors.border, colors.primary, colors.destructive]
    ),
  }));

  const iconAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(isFocused.value, [0, 1], [1, 0]),
      width: interpolate(isFocused.value, [0, 1], [24, 0]),
    };
  });

  useEffect(() => {
    const _status = focused ? ACTIVE : INACTIVE;
    status.value = withTiming(error ? ERROR : _status, { duration: 300 });
    isFocused.value = withTiming(focused ? 1 : 0, { duration: 300 });
  }, [error, status, focused, isFocused]);

  const containerHeight = useMemo(
    () => height ?? (size === 'small' ? 32 : 40),
    [size, height]
  );

  return (
    <View style={[style, disabled && styles.disabled]}>
      {!!label && (
        <Text style={[{ color: colors.foreground }, styles.label]} variant="h5">
          {label}
        </Text>
      )}
      <Pressable onPress={onPress} disabled={disabled}>
        <Animated.View
          style={[
            contentContainerStyle,
            animStyle,
            styles.container,
            { height: containerHeight, borderRadius: theme.roundness },
          ]}
        >
          {iconName && (
            <Animated.View style={iconAnimStyle}>
              <Icon
                // style={styles.icon}
                name={iconName}
                size={16}
                color={convertHexToRgba(colors.foreground, 0.5)}
              />
            </Animated.View>
          )}
          {children}
        </Animated.View>
      </Pressable>
      {((hint && !error) || (error && hint)) && (
        <Text style={styles.hint} variant="caption">
          {hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hint: { marginHorizontal: 8, marginTop: 4 },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  disabled: { opacity: 0.5 },
  label: { marginBottom: 4 },
});
