import { useMemo } from 'react';
import {
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import ButtonContainer, {
  type ButtonVariant,
  type ButtonSize,
  type ButtonColors,
} from './ButtonContainer';
import Icon, { type IconName } from './Icon';
import LoadingIndicator from './LoadingIndicator';

import meassures from '../theme/meassures';

type Props = PressableProps & {
  iconName: IconName;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PADDING = 8;

export default function IconButton({
  iconName,
  onPress,
  size = 'medium',
  disabled = false,
  variant = 'flat',
  loading = false,
  style,
  ...rest
}: Props) {
  const iconSize = useMemo(
    () => meassures.button[size] - (size === 'small' ? PADDING : PADDING * 2),
    [size]
  );

  return (
    <ButtonContainer
      {...rest}
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      hitSlop={{ top: PADDING, left: PADDING, right: PADDING, bottom: PADDING }}
      style={[style, { width: meassures.button[size] }]}
      contentContainerStyle={[
        styles.container,
        { padding: size === 'small' ? PADDING / 2 : PADDING },
      ]}
      renderContent={(colors: ButtonColors) =>
        loading ? (
          <LoadingIndicator size={iconSize} color={colors.textColor} />
        ) : (
          <Icon name={iconName} size={iconSize} color={colors.textColor} />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
