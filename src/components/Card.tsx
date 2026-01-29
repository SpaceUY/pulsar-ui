import { useMemo, type PropsWithChildren } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import useTheme from '../hooks/useTheme';
import { convertHexToRgba } from '../utils/uiUtils';

export default function Card({
  children,
  style,
  variant = 'default',
  noShadow = false,
  noBorder = false,
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'alternative' | 'tinted';
  noShadow?: boolean;
  noBorder?: boolean;
}>) {
  const { theme, colors } = useTheme();

  const themeStyle = useMemo(() => {
    const showShadow = variant === 'default' && !noShadow;
    const showBorder = variant === 'default' && !noBorder;

    return {
      backgroundColor:
        variant === 'default'
          ? colors.background
          : convertHexToRgba(colors.border, 0.5),
      borderRadius: theme.roundness,
      borderColor: showBorder ? colors.border : 'transparent',
      boxShadow: showShadow ? '0px 0px 1px 1px rgba(0, 0, 0, 0.05)' : 'none',
    };
  }, [colors, theme, variant, noShadow, noBorder]);

  return (
    <View
      style={[
        styles.card,
        themeStyle,
        variant === 'default' && !noBorder && styles.withBorder,
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
