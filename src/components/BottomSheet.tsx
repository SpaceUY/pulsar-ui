import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

type Props = PropsWithChildren & {
  onBackdropPress?: () => void;
  fullScreen?: boolean;
};

export type BottomSheetProps = {
  show: () => void;
  hide: () => void;
  isActive: boolean;
};

const BottomSheet = forwardRef<BottomSheetProps, Props>(
  (
    { onBackdropPress = () => {}, children, fullScreen = false }: Props,
    ref
  ) => {
    const [height, setHeight] = useState(0);
    const [visible, setVisible] = useState(false);
    const contentRef = useRef<View>(null);
    const { colors, theme } = useTheme();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const offset = useSharedValue(screenHeight);
    const opacity = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => runAnimation(false),
      isActive: visible,
    }));

    const transformAnimationStyle = useAnimatedStyle(() => {
      return {
        borderTopRightRadius: interpolate(
          offset.value,
          [0, screenHeight * 0.2],
          [0, 20],
          Extrapolation.CLAMP
        ),
        borderTopLeftRadius: interpolate(
          offset.value,
          [0, theme.insets.top + 150],
          [0, 20],
          Extrapolation.CLAMP
        ),
        transform: [{ translateY: offset.value }],
      };
    });

    const handleContainerAnimStyle = useAnimatedStyle(() => {
      return {
        paddingTop: interpolate(
          offset.value,
          [0, 100],
          [theme.insets.top + 16, 8],
          Extrapolation.CLAMP
        ),
      };
    });

    const handleAnimStyle = useAnimatedStyle(() => {
      return {
        width: interpolate(
          offset.value,
          [0, 100],
          [80, 40],
          Extrapolation.CLAMP
        ),
      };
    });

    const opacityAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

    const handleLayout = (e: LayoutChangeEvent) => {
      setHeight(e.nativeEvent.layout.height);
    };

    const getAnimationValue = (
      value: number,
      easing: (value: number) => number,
      closeOnFinish = false
    ) => {
      const config = { duration: 300, easing };
      // If we don't do it like this, the app throw an error regarding de value returned
      if (closeOnFinish) {
        return withTiming(value, config, () => {
          runOnJS(setVisible)(false);
        });
      }
      return withTiming(value, config);
    };

    const runAnimation = useCallback(
      (isOpenAnim: boolean) => {
        const coordY = isOpenAnim ? screenHeight - height : screenHeight;
        const easing = isOpenAnim
          ? Easing.out(Easing.exp)
          : Easing.in(Easing.exp);
        offset.value = getAnimationValue(coordY, easing);
        opacity.value = getAnimationValue(
          isOpenAnim ? 1 : 0,
          easing,
          !isOpenAnim
        );
      },
      [height, offset, opacity, screenHeight]
    );

    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        if (event.translationY > 0) {
          offset.value = screenHeight - height + event.translationY;
        }
      })
      .onEnd((event) => {
        if (event.translationY > height * 0.3) {
          offset.value = withTiming(screenHeight, { duration: 300 }, () => {
            runOnJS(setVisible)(false);
            runOnJS(onBackdropPress)();
          });
          opacity.value = withTiming(0, { duration: 300 });
        } else {
          offset.value = withTiming(screenHeight - height, { duration: 300 });
        }
      });

    const handleBackdropPress = () => {
      onBackdropPress?.();
      runAnimation(false);
    };

    useEffect(() => {
      if (visible && height > 0) {
        runAnimation(true);
      }
    }, [height, runAnimation, visible]);

    return (
      /*
        Need to wrap the modal with a View because there's a strange behavior in Android currently
        which is not registering onPress events on components inside the modal. It seems to be something
        related to the new architecture implementation on Andoid, change it once the issue is fixed.
        See related issues: 
          - https://github.com/react-native-modal/react-native-modal/issues/737
          - https://github.com/facebook/react-native/issues/36710
          - https://github.com/facebook/react-native/issues/44643
      */
      <View>
        <Modal
          transparent
          statusBarTranslucent
          visible={visible}
          onShow={() => runAnimation(true)}
        >
          {/* 
            Need to wrap with GestureHandlerRootView to make gesture handling work on Android.
            This is required because React Native Gesture Handler needs a root view to properly
            handle gestures on Android devices.
            https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation#android
          */}
          <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  opacityAnimatedStyle,
                  { backgroundColor: convertHexToRgba(colors.foreground, 0.1) },
                ]}
              />
            </TouchableWithoutFeedback>
            <GestureDetector gesture={panGesture}>
              <Animated.View
                ref={contentRef}
                onLayout={handleLayout}
                style={[
                  styles.contentContainer,
                  { backgroundColor: colors.background, width: screenWidth },
                  transformAnimationStyle,
                  fullScreen
                    ? { height: screenHeight }
                    : { maxHeight: screenHeight * 0.8 },
                ]}
              >
                <Animated.View
                  style={[
                    handleContainerAnimStyle,
                    { width: screenWidth },
                    styles.handleContainer,
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.handle,
                      { backgroundColor: colors.border },
                      handleAnimStyle,
                    ]}
                  />
                </Animated.View>
                {children}
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </Modal>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { overflow: 'hidden' },
  handle: { height: 8, borderRadius: 8, alignSelf: 'center' },
  handleContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
});

export default BottomSheet;
