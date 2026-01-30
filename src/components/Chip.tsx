import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import Text from './Text';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';
import type { IconName } from './Icon';
import Icon from './Icon';

type Props = PressableProps & {
  text: string;
  size?: 'normal' | 'small';
  disabled?: boolean;
  iconName?: IconName;
  textColor?: string;
  backgroundColor?: string;
};

export default function Chip({
  text,
  size = 'normal',
  disabled = false,
  backgroundColor,
  textColor,
  iconName,
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
            backgroundColor:
              backgroundColor || convertHexToRgba(colors.foreground, 0.08),
            borderRadius: theme.roundness,
            height,
          },
          disabled && styles.disabled,
        ]}
      >
        {iconName && (
          <Icon
            style={styles.icon}
            name={iconName}
            size={size === 'small' ? 12 : 14}
            color={textColor || colors.foreground}
          />
        )}
        <Text
          variant={textVariant}
          style={{ color: textColor || colors.foreground }}
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
    flexDirection: 'row',
  },
  icon: { marginEnd: 8 },
  disabled: { opacity: 0.3 },
});
