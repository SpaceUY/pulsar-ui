import {
  useEffect,
  useState,
  useCallback,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';
import { convertHexToRgba } from '../utils/uiUtils';
import Text from './Text';
import Button from './Button';

// Componente principal Dialog
interface DialogProps extends PropsWithChildren {
  visible: boolean;
  onDismiss: () => void;
}

const Dialog = ({ children, visible, onDismiss }: DialogProps) => {
  const { colors, theme } = useTheme();
  const [internalVisible, setInternalVisible] = useState(false);

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const runCloseAnimation = useCallback(() => {
    scale.value = withTiming(0.7, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setInternalVisible)(false);
    });
  }, [scale, opacity]);

  // Sync external visible prop with internal state
  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
    } else if (internalVisible) {
      // Only start close animation if dialog is currently visible
      runCloseAnimation();
    }
  }, [visible, internalVisible, runCloseAnimation]);

  // Start open animation when internal state becomes true
  useEffect(() => {
    if (internalVisible && visible) {
      scale.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [internalVisible, visible, scale, opacity]);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleBackdropPress = () => {
    onDismiss();
  };

  return (
    <Modal transparent visible={internalVisible} statusBarTranslucent>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.content,
                {
                  backgroundColor: colors.background,
                  borderRadius: theme.roundness,
                  borderColor: colors.border,
                },
                animatedContentStyle,
              ]}
            >
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Dialog Header
interface DialogHeaderProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const DialogHeader = ({ children, style }: DialogHeaderProps) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

// Dialog Title
interface DialogTitleProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DialogTitle = ({ children, style }: DialogTitleProps) => {
  return (
    <Text variant="h3" style={[styles.title, style]}>
      {children}
    </Text>
  );
};

// Dialog Description
interface DialogDescriptionProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DialogDescription = ({ children, style }: DialogDescriptionProps) => {
  const { colors } = useTheme();

  return (
    <Text
      variant="pm"
      style={[
        styles.description,
        { color: convertHexToRgba(colors.foreground, 0.7) },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

// Dialog Footer
interface DialogFooterProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const DialogFooter = ({ children, style }: DialogFooterProps) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

// Dialog Action (botón de acción)
interface DialogActionProps {
  onPress: () => void;
  children: ReactNode;
  variant?: 'flat' | 'outline';
  destructive?: boolean;
}

const DialogAction = ({
  onPress,
  children,
  variant = 'flat',
  destructive = false,
}: DialogActionProps) => {
  const { colors } = useTheme();

  return (
    <Button
      text={children as string}
      variant={destructive ? 'destructive' : variant}
      size="large"
      onPress={onPress}
      style={[
        styles.actionButton,
        destructive && { borderColor: colors.destructive },
      ]}
    />
  );
};

// Dialog Cancel (botón de cancelar)
interface DialogCancelProps {
  onPress: () => void;
  children: ReactNode;
}

const DialogCancel = ({ onPress, children }: DialogCancelProps) => {
  return (
    <Button
      text={children as string}
      variant="outline"
      size="large"
      onPress={onPress}
      style={styles.cancelButton}
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 80,
  },
  cancelButton: {
    flex: 1,
    minWidth: 80,
  },
});

export default Dialog;
export {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogAction,
  DialogCancel,
};
