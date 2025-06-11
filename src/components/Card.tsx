import React, { useMemo, type PropsWithChildren } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import useTheme from '../hooks/useTheme';

export default function Card({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const { theme, colors } = useTheme();

  const themeStyle = useMemo(() => {
    return {
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      borderColor: colors.border,
      boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.05)',
    };
  }, [colors, theme]);

  return <View style={[styles.card, themeStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1 },
});
