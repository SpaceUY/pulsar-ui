import { useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  Easing,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';

type Props = {
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: number;
};

export default function LoadingIndicator({ style, color, size = 24 }: Props) {
  const rotation = useSharedValue(0);
  const { colors } = useTheme();
  const borderColor = color ?? colors.foreground;

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ rotate: `${rotation.value}deg` }] };
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Workaround for Android because of this issue: https://github.com/facebook/react-native/issues/38335 */}
      {Platform.OS === 'android' ? (
        <ActivityIndicator size={size} color={borderColor} />
      ) : (
        <Animated.View
          style={[
            styles.circle,
            {
              borderTopColor: borderColor,
              borderLeftColor: borderColor,
              borderBottomColor: borderColor,
            },
            animatedStyle,
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRightColor: 'transparent',
  },
});
