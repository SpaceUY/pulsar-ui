import { useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  I18nManager,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import { convertHexToRgba } from '../utils/uiUtils';
import Text from './Text';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export type Tab = { value: string; label: string };

type Props = {
  style?: StyleProp<ViewStyle>;
  options: Tab[];
  selected: Tab;
  onChange: (value: Tab) => void;
};

export default function Tabs({ options, selected, onChange, style }: Props) {
  const { theme, colors } = useTheme();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const index = useSharedValue<number>(0);
  const tabWidth = (width - 8) / options.length;
  const tabHeight = height - 8;

  const tabAnimStyle = useAnimatedStyle(() => {
    const translateX = I18nManager.isRTL
      ? -index.value * tabWidth
      : index.value * tabWidth;
    return {
      transform: [{ translateX }],
    };
  }, [tabWidth, index]);

  return (
    <View style={[styles.container, style]}>
      <View
        onLayout={(event) => {
          const { width: w, height: h } = event.nativeEvent.layout;
          setWidth(w);
          setHeight(h);
        }}
        style={[
          styles.tabsList,
          {
            backgroundColor: convertHexToRgba(colors.border, 0.5),
            borderRadius: theme.roundness,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.tab,
            {
              height: tabHeight,
              width: tabWidth,
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
            theme.roundness >= 2 && { borderRadius: theme.roundness - 2 },
            tabAnimStyle,
          ]}
        />
        {options.map((tab, _index) => (
          <Pressable
            key={tab.value}
            style={styles.tabTrigger}
            onPress={() => {
              index.value = withTiming(_index, {
                duration: 250,
                easing: Easing.ease,
              });
              onChange(tab);
            }}
          >
            <Text
              variant="h4"
              numberOfLines={1}
              style={{
                color:
                  selected.value === tab.value
                    ? colors.foreground
                    : convertHexToRgba(colors.foreground, 0.6),
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  tabsList: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  tabTrigger: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  tab: { position: 'absolute', top: 4, start: 4, borderWidth: 1 },
});
