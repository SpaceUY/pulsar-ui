import { type PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import Text from './Text';
import IconButton from './IconButton';
import { type IconName } from './Icon';

import useTheme from '../hooks/useTheme';

import meassures from '../theme/meassures';
import type { ButtonSize, ButtonVariant } from './ButtonContainer';

export type HeaderVariant = 'default' | 'secondary';

const DEFAULT_COLLAPSE_THRESHOLD = 80;

type HeaderButtonProps = {
  iconName: IconName;
  iconSize?: keyof typeof ButtonSize;
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
  /** When set with variant="secondary", header animates from large title to compact as user scrolls (iOS-style). Pass the scroll view's contentOffset.y (e.g. from useAnimatedScrollHandler). */
  scrollY?: SharedValue<number>;
  /** Scroll offset at which the header is fully collapsed. Ignored when scrollY is not provided. */
  collapseThreshold?: number;
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
  scrollY,
  collapseThreshold = DEFAULT_COLLAPSE_THRESHOLD,
}: Props) {
  const { colors, theme } = useTheme();
  const topInset = useInsets ? theme.insets?.top || 0 : 0;
  const isSecondary = variant === 'secondary';
  const isCollapsible = isSecondary && scrollY != null;

  const animatedHeaderStyle = useAnimatedStyle(() => {
    if (!isCollapsible || scrollY == null) return {};
    const progress = interpolate(
      scrollY.value,
      [0, collapseThreshold],
      [0, 1],
      'clamp'
    );
    return {
      paddingBottom: interpolate(progress, [0, 1], [12, 0]),
    };
  }, [isCollapsible, collapseThreshold]);

  const animatedTitleRowStyle = useAnimatedStyle(() => {
    if (!isCollapsible || scrollY == null) return {};
    const progress = interpolate(
      scrollY.value,
      [0, collapseThreshold],
      [0, 1],
      'clamp'
    );
    // Estimate: h1 fontSize 24 + line height ~16 + paddingTop 4 = ~44px
    const titleRowHeight = 44;
    return {
      opacity: interpolate(progress, [0, 1], [1, 0]),
      height: interpolate(progress, [0, 1], [titleRowHeight, 0]),
      overflow: 'hidden' as const,
      transform: [{ translateY: interpolate(progress, [0, 1], [0, -16]) }],
    };
  }, [isCollapsible, collapseThreshold]);

  const animatedSmallTitleStyle = useAnimatedStyle(() => {
    if (!isCollapsible || scrollY == null) return {};
    const progress = interpolate(
      scrollY.value,
      [0, collapseThreshold],
      [0, 1],
      'clamp'
    );
    return {
      opacity: interpolate(progress, [0, 1], [0, 1]),
    };
  }, [isCollapsible, collapseThreshold]);

  const renderButton = (button: HeaderButtonProps) => {
    return (
      <IconButton
        iconName={button.iconName}
        variant={button.variant ?? 'transparent'}
        size={button.iconSize ?? 'medium'}
        onPress={button.onPress}
        disabled={button.disabled}
        rounded={button.rounded}
      />
    );
  };

  const showSmallTitleInBar = !isSecondary || isCollapsible;
  const showBigTitleRow = isSecondary;

  const headerContent = (
    <>
      <View
        style={[
          styles.headerContent,
          isSecondary && !isCollapsible && styles.headerContentSecondary,
          isCollapsible && styles.headerContentSecondary,
        ]}
      >
        <View style={[styles.slot, styles.leftSlot]}>
          {leftButton && renderButton(leftButton)}
        </View>
        {showSmallTitleInBar && (
          <View style={styles.titleContainer} pointerEvents="none">
            {isCollapsible ? (
              <Animated.View
                style={[styles.titleContainer, animatedSmallTitleStyle]}
              >
                <Text
                  variant="h3"
                  style={[styles.title, { color: colors.foreground }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
              </Animated.View>
            ) : (
              <Text
                variant="h3"
                style={[styles.title, { color: colors.foreground }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            )}
          </View>
        )}
        <View style={[styles.slot, styles.rightSlot]}>
          {rightButton && renderButton(rightButton)}
        </View>
      </View>
      {showBigTitleRow &&
        (isCollapsible ? (
          <Animated.View style={[styles.titleRow, animatedTitleRowStyle]}>
            <Text
              variant="h1"
              style={[styles.titleSecondary, { color: colors.foreground }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.titleRow}>
            <Text
              variant="h1"
              style={[styles.titleSecondary, { color: colors.foreground }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>
        ))}
    </>
  );

  const staticHeaderStyle = [
    styles.header,
    {
      backgroundColor: colors.background,
      borderBottomColor: colors.border,
      paddingTop: topInset,
    },
    isSecondary && !isCollapsible && styles.headerSecondary,
    isCollapsible && styles.headerSecondary,
    !!children && styles.paddingBottom,
    style,
  ];

  if (isCollapsible) {
    return (
      <Animated.View style={[staticHeaderStyle, animatedHeaderStyle]}>
        {headerContent}
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={staticHeaderStyle}>
      {headerContent}
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
