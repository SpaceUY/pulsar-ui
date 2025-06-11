import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';

type Props = {
  style?: StyleProp<ViewStyle>;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

const SWITCH_WIDTH = 44;
const SWITCH_HEIGHT = 24;
const PADDING = 2;
const THUMB_SIZE = SWITCH_HEIGHT - PADDING * 2;

export default function Switch({
  value,
  onValueChange,
  disabled,
  style,
}: Props) {
  const { colors } = useTheme();
  const active = useSharedValue(value ? 1 : 0);
  const enabled = useSharedValue(disabled ? 0 : 1);

  useEffect(() => {
    active.value = withTiming(value ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [value, active]);

  useEffect(() => {
    enabled.value = withTiming(disabled ? 0 : 1, { duration: 300 });
  }, [disabled, enabled]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        active.value,
        [0, 1],
        [colors.border, colors.primary]
      ),
      opacity: interpolate(enabled.value, [0, 1], [0.5, 1]),
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            active.value,
            [0, 1],
            [PADDING, SWITCH_WIDTH - (THUMB_SIZE + PADDING)]
          ),
        },
      ],
    };
  });

  return (
    <Pressable
      style={style}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
    >
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: colors.background },
            thumbAnimatedStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT,
    justifyContent: 'center',
  },
  thumb: { width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: THUMB_SIZE },
});
