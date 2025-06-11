import React, { useCallback } from 'react';
import {
  View,
  // Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import { convertHexToRgba } from '../utils/uiUtils';
import Text from './Text';

export type Tab = { value: string; label: string };

type Props = {
  style?: StyleProp<ViewStyle>;
  options: Tab[];
  selected: Tab;
  onChange: (value: Tab) => void;
};

export default function Tabs({ options, selected, onChange, style }: Props) {
  const { theme, colors } = useTheme();

  const getTabStyle = useCallback(
    (tab: Tab) => {
      return {
        backgroundColor:
          selected.value === tab.value ? colors.background : 'transparent',
        boxShadow:
          selected.value === tab.value
            ? '0px 0px 1px 1px rgba(0, 0, 0, 0.05)'
            : 'none',
        borderRadius: theme.roundness >= 2 ? theme.roundness - 2 : 0,
      };
    },
    [selected.value, theme.roundness, colors.background]
  );

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.tabsList,
          {
            backgroundColor: convertHexToRgba(colors.foreground, 0.08),
            borderRadius: theme.roundness,
          },
        ]}
      >
        {options.map((tab) => (
          <Pressable
            key={tab.value}
            style={[styles.tabTrigger, getTabStyle(tab)]}
            onPress={() => onChange(tab)}
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
  container: {
    width: '100%',
  },
  tabsList: {
    flexDirection: 'row',
    padding: 4,
    marginBottom: 16,
    height: 40,
  },
  tabTrigger: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
});
