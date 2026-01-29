import { useMemo } from 'react';
import { StyleSheet, type ViewStyle, type StyleProp } from 'react-native';

import ButtonContainer, {
  type ButtonVariant,
  type ButtonSize,
  type ButtonColors,
} from './ButtonContainer';
import LoadingIndicator from './LoadingIndicator';
import Text from './Text';
import Icon, { type IconName } from './Icon';

type Props = {
  style?: StyleProp<ViewStyle>;
  text: string;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  iconName?: IconName;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  rounded?: boolean;
};

export default function Button({
  text,
  style,
  variant = 'flat',
  size = 'large',
  loading = false,
  disabled = false,
  onPress,
  iconName,
  backgroundColor,
  textColor,
  borderColor,
  rounded = false,
}: Props) {
  const iconSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 18;
      case 'large':
        return 20;
      case 'xlarge':
        return 22;
      default:
        return 16;
    }
  }, [size]);

  const renderIconOrLoader = (colors: ButtonColors) => {
    if (loading) {
      return (
        <LoadingIndicator
          style={styles.icon}
          color={colors.textColor}
          size={iconSize}
        />
      );
    }
    return iconName ? (
      <Icon
        style={styles.icon}
        name={iconName}
        size={16}
        color={colors.textColor}
      />
    ) : null;
  };

  return (
    <ButtonContainer
      style={style}
      contentContainerStyle={styles.content}
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderColor={borderColor}
      rounded={rounded}
      renderContent={(colors: ButtonColors) => (
        <>
          {renderIconOrLoader(colors)}
          <Text
            style={{ color: colors.textColor }}
            variant={size === 'small' ? 'h5' : 'h4'}
          >
            {text}
          </Text>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { marginEnd: 8 },
});
