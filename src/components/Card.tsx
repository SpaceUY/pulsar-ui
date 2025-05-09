import { useMemo, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import useTheme from '../hooks/useTheme';

export default function Card({ children }: PropsWithChildren) {
  const { theme, colors } = useTheme();

  const themeStyle = useMemo(() => {
    return {
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      borderColor: colors.border,
      boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.05)',
    };
  }, [colors, theme]);

  return <View style={[styles.card, themeStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1 },
});
