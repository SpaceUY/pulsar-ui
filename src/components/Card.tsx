import { useMemo, type PropsWithChildren } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import useTheme from '../hooks/useTheme';
import { convertHexToRgba } from '../utils/uiUtils';

export default function Card({
  children,
  style,
  variant = 'default',
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'alternative' | 'tinted';
}>) {
  const { theme, colors } = useTheme();

  const themeStyle = useMemo(() => {
    return {
      backgroundColor:
        variant === 'default'
          ? colors.background
          : convertHexToRgba(colors.border, 0.5),
      borderRadius: theme.roundness,
      borderColor: variant === 'default' ? colors.border : 'transparent',
      boxShadow:
        variant === 'default' ? '0px 0px 1px 1px rgba(0, 0, 0, 0.05)' : 'none',
    };
  }, [colors, theme, variant]);

  return (
    <View
      style={[
        styles.card,
        themeStyle,
        variant === 'default' && styles.withBorder,
        style,
      ]}
    >
      {variant === 'tinted' && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: convertHexToRgba(colors.primary, 0.1) },
          ]}
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, overflow: 'hidden' },
  withBorder: { borderWidth: 1 },
});
