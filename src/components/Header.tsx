import { type PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

import Text from './Text';
import IconButton from './IconButton';
import { type IconName } from './Icon';

import useTheme from '../hooks/useTheme';

import meassures from '../theme/meassures';

type HeaderButtonProps = {
  iconName: IconName;
  onPress?: () => void;
  disabled?: boolean;
};

type Props = PropsWithChildren & {
  title: string;
  leftButton?: HeaderButtonProps;
  rightButton?: HeaderButtonProps;
  style?: StyleProp<ViewStyle>;
  useInsets?: boolean;
};

const HEADER_BASE_HEIGHT = 52;

export default function Header({
  title,
  leftButton,
  rightButton,
  style,
  useInsets = true,
  children,
}: Props) {
  const { colors, theme } = useTheme();
  const topInset = useInsets ? theme.insets?.top || 0 : 0;

  const renderButton = (button: HeaderButtonProps) => {
    return (
      <IconButton
        iconName={button.iconName}
        variant="transparent"
        size="medium"
        onPress={button.onPress}
        disabled={button.disabled}
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
        !!children && styles.paddingBottom,
        style,
      ]}
    >
      <View style={styles.headerContent}>
        <View style={[styles.slot, styles.leftSlot]}>
          {leftButton && renderButton(leftButton)}
        </View>
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
        <View style={[styles.slot, styles.rightSlot]}>
          {rightButton && renderButton(rightButton)}
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { borderBottomWidth: 1, paddingHorizontal: 16 },
  headerContent: {
    height: HEADER_BASE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slot: { width: meassures.button.medium, justifyContent: 'center' },
  leftSlot: { alignItems: 'flex-start' },
  titleContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center', marginHorizontal: 8 },
  rightSlot: { alignItems: 'flex-end' },
  paddingBottom: { paddingBottom: 16 },
});
