import { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/elements';
import { Check, ChevronDown } from 'lucide-react-native';

import InputContainer from './InputContainer';
import Text from './Text';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  style?: StyleProp<ViewStyle>;
  value?: SelectOption;
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
};

const { height: screenHeight } = Dimensions.get('screen');

const OptionItem = ({
  style,
  option,
  selected,
  onChange,
}: {
  style?: StyleProp<ViewStyle>;
  option: SelectOption;
  selected: boolean;
  onChange: (option: SelectOption) => void;
}) => {
  const { theme, colors } = useTheme();
  const pressed = useSharedValue(0);

  const pressedColor = convertHexToRgba(colors.foreground, 0.1);

  const animatedPress = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 1],
      [selected ? pressedColor : 'transparent', pressedColor]
    ),
  }));

  return (
    <Pressable
      key={option.value}
      style={style}
      onPress={() => onChange(option)}
      onPressIn={() => (pressed.value = 1)}
      onPressOut={() => (pressed.value = 0)}
    >
      <Animated.View
        style={[
          styles.optionContent,
          { borderRadius: theme.roundness - 2 },
          animatedPress,
        ]}
      >
        <Text style={styles.optionText} variant="pm" numberOfLines={1}>
          {option.label}
        </Text>
        {selected && <Check size={16} color={colors.foreground} />}
      </Animated.View>
    </Pressable>
  );
};

export default function Select({
  style,
  value,
  options,
  onChange,
  placeholder = 'Select',
  label,
  disabled = false,
  error,
  hint,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(0);
  const rotation = useSharedValue(0);
  const headerHeight = useHeaderHeight();
  const { theme, colors } = useTheme();
  const selectRef = useRef<View>(null);

  const handlePress = useCallback(() => {
    if (disabled) return;
    rotation.value = withTiming(1, { duration: 200 });
    setVisible(true);
  }, [disabled, rotation]);

  const handleClose = useCallback(() => {
    rotation.value = withTiming(0, { duration: 200 });
    setVisible(false);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const getInputTextColor = useCallback(() => {
    if (disabled) return convertHexToRgba(colors.foreground, 0.5);
    return colors.foreground;
  }, [colors.foreground, disabled]);

  const top = useMemo(() => {
    let header = Platform.OS === 'web' ? 0 : headerHeight;
    if (Platform.OS === 'android') {
      header = headerHeight - (StatusBar.currentHeight ?? 0);
    }
    let y = height + coordY + header + 4;
    if (y + optionsContainerHeight > screenHeight) {
      y = coordY - optionsContainerHeight - 8;
    }
    return y;
  }, [coordY, headerHeight, height, optionsContainerHeight]);

  return (
    <>
      <View
        style={style}
        onLayout={() => {
          selectRef.current?.measure(
            (_, __, componentWidth, componentHeight, pageX, pageY) => {
              setCoordX(pageX);
              setCoordY(pageY);
              setWidth(componentWidth);
              setHeight(componentHeight);
            }
          );
        }}
        ref={selectRef}
      >
        <InputContainer
          onPress={handlePress}
          disabled={disabled}
          focused={visible}
          error={error}
          hint={hint}
          label={label}
        >
          <Text
            variant="pm"
            style={[
              styles.selectText,
              {
                color: value
                  ? getInputTextColor()
                  : convertHexToRgba(colors.foreground, 0.5),
                fontFamily: theme.fonts.regular,
              },
            ]}
            numberOfLines={1}
          >
            {value?.label || placeholder}
          </Text>
          <Animated.View style={animatedStyle}>
            <ChevronDown size={16} color={colors.foreground} />
          </Animated.View>
        </InputContainer>
      </View>
      {/* TODO: 
        Need to wrap the modal with a View because there's a strange behavior in Android currently
        which is not registering onPress events on components inside the modal. It seems to be something
        related to the new architecture implementation on Andoid, change it once the issue is fixed.
        See related issues: 
          - https://github.com/react-native-modal/react-native-modal/issues/737
          - https://github.com/facebook/react-native/issues/36710
          - https://github.com/facebook/react-native/issues/44643
      */}
      <View>
        <Modal
          visible={visible}
          transparent
          onRequestClose={handleClose}
          animationType="fade"
        >
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: convertHexToRgba(colors.foreground, 0.05) },
            ]}
            onPress={handleClose}
          >
            <ScrollView
              onLayout={(event) =>
                setOptionsContainerHeight(event.nativeEvent.layout.height)
              }
              style={[
                styles.optionsContainer,
                {
                  top,
                  width,
                  left: coordX,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderRadius: theme.roundness,
                },
              ]}
            >
              {options.map((option, index) => (
                <OptionItem
                  style={[
                    styles.option,
                    index === 0 && styles.firstOption,
                    index === options.length - 1 && styles.lastOption,
                  ]}
                  key={option.value}
                  option={option}
                  selected={option.value === value?.value}
                  onChange={(selectedOption) => {
                    onChange(selectedOption);
                    handleClose();
                  }}
                />
              ))}
            </ScrollView>
          </Pressable>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  selectText: { fontSize: 14, flex: 1 },
  optionsContainer: {
    borderWidth: 1,
    maxHeight: 300,
    position: 'absolute',
    boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 4,
  },
  optionContent: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  optionText: { flex: 1, marginEnd: 16 },
  firstOption: { paddingTop: 4 },
  lastOption: { paddingBottom: 6 },
  option: { paddingBottom: 2 },
});
