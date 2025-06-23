import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import Text from './Text';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

type Props = PressableProps & {
  text: string;
  size?: 'normal' | 'small';
  disabled?: boolean;
};

export default function Chip({
  text,
  size = 'normal',
  disabled = false,
  ...rest
}: Props) {
  const { theme, colors } = useTheme();

  const height = size === 'small' ? 24 : 32;
  const textVariant = size === 'small' ? 'ps' : 'pm';

  return (
    <Pressable disabled={disabled} {...rest}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: convertHexToRgba(colors.foreground, 0.08),
            borderRadius: theme.roundness,
            height,
          },
          disabled && styles.disabled,
        ]}
      >
        <Text
          variant={textVariant}
          style={{ color: colors.foreground }}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  disabled: { opacity: 0.3 },
});
