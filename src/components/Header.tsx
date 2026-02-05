import { type PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

import Text from './Text';
import IconButton from './IconButton';
import { type IconName } from './Icon';

import useTheme from '../hooks/useTheme';

import meassures from '../theme/meassures';
import type { ButtonVariant } from './ButtonContainer';

export type HeaderVariant = 'default' | 'secondary';

type HeaderButtonProps = {
  iconName: IconName;
  onPress?: () => void;
  disabled?: boolean;
  variant?: keyof typeof ButtonVariant;
  rounded?: boolean;
};

type Props = PropsWithChildren & {
  title: string;
  variant?: HeaderVariant;
  leftButton?: HeaderButtonProps;
  rightButton?: HeaderButtonProps;
  style?: StyleProp<ViewStyle>;
  useInsets?: boolean;
};

const HEADER_BASE_HEIGHT = 52;

export default function Header({
  title,
  variant = 'default',
  leftButton,
  rightButton,
  style,
  useInsets = true,
  children,
}: Props) {
  const { colors, theme } = useTheme();
  const topInset = useInsets ? theme.insets?.top || 0 : 0;
  const isSecondary = variant === 'secondary';

  const renderButton = (button: HeaderButtonProps) => {
    return (
      <IconButton
        iconName={button.iconName}
        variant={button.variant ?? 'transparent'}
        size="medium"
        onPress={button.onPress}
        disabled={button.disabled}
        rounded={button.rounded}
      />
    );
  };

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          paddingTop: topInset,
        },
        isSecondary && styles.headerSecondary,
        !!children && styles.paddingBottom,
        style,
      ]}
    >
      <View
        style={[
          styles.headerContent,
          isSecondary && styles.headerContentSecondary,
        ]}
      >
        <View style={[styles.slot, styles.leftSlot]}>
          {leftButton && renderButton(leftButton)}
        </View>
        {!isSecondary && (
          <View style={styles.titleContainer}>
            <Text
              variant="h3"
              style={[styles.title, { color: colors.foreground }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>
        )}
        <View style={[styles.slot, styles.rightSlot]}>
          {rightButton && renderButton(rightButton)}
        </View>
      </View>
      {isSecondary && (
        <View style={styles.titleRow}>
          <Text
            variant="h2"
            style={[styles.titleSecondary, { color: colors.foreground }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { borderBottomWidth: 1, paddingHorizontal: 16 },
  headerSecondary: { paddingBottom: 12 },
  headerContent: {
    height: HEADER_BASE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContentSecondary: { justifyContent: 'space-between' },
  slot: { width: meassures.button.medium, justifyContent: 'center' },
  leftSlot: { alignItems: 'flex-start' },
  titleContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center', marginHorizontal: 8 },
  titleRow: { paddingHorizontal: 0, paddingTop: 4 },
  titleSecondary: { textAlign: 'left' },
  rightSlot: { alignItems: 'flex-end' },
  paddingBottom: { paddingBottom: 16 },
});
