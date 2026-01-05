import { useMemo } from 'react';
import { StyleSheet, Text as RNText, type TextProps } from 'react-native';

import useTheme from '../hooks/useTheme';

type Props = TextProps & {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'pl' | 'pm' | 'ps' | 'caption';
};

export default function Text({ variant, style, children, ...props }: Props) {
  const { theme, colors } = useTheme();

  const color = useMemo(
    () => StyleSheet.flatten(style)?.color ?? colors.foreground,
    [colors.foreground, style]
  );

  const textStyle = useMemo(() => {
    return {
      h1: {
        fontSize: 24,
        fontFamily: theme.fonts.bold,
      },
      h2: {
        fontSize: 18,
        fontFamily: theme.fonts.medium,
      },
      h3: {
        fontSize: 16,
        fontFamily: theme.fonts.medium,
      },
      h4: {
        fontSize: 14,
        fontFamily: theme.fonts.medium,
      },
      h5: {
        fontSize: 12,
        fontFamily: theme.fonts.medium,
      },
      pl: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
      },
      pm: {
        fontSize: 14,
        fontFamily: theme.fonts.regular,
      },
      ps: {
        fontSize: 12,
        fontFamily: theme.fonts.regular,
      },
      caption: {
        fontSize: 10,
        fontFamily: theme.fonts.regular,
      },
    }[variant];
  }, [variant, theme.fonts.bold, theme.fonts.medium, theme.fonts.regular]);

  return (
    <RNText {...props} style={[textStyle, { color }, style]}>
      {children}
    </RNText>
  );
}
