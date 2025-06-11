import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

import InputContainer from './InputContainer';
import BottomSheet, { type BottomSheetProps } from './BottomSheet';
import Text from './Text';
import Icon from './Icon';

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
  title?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
};

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
      onHoverIn={() => (pressed.value = 1)}
      onHoverOut={() => (pressed.value = 0)}
    >
      <Animated.View
        style={[
          styles.optionContent,
          { borderRadius: theme.roundness - 2 },
          animatedPress,
        ]}
      >
        <Text
          style={[styles.optionText, { color: colors.foreground }]}
          variant="pm"
          numberOfLines={1}
        >
          {option.label}
        </Text>
        {selected && <Icon name="Check" size={16} color={colors.foreground} />}
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
  title,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);
  const { theme, colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheetProps>(null);

  const handlePress = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    rotation.value = withTiming(1, { duration: 200 });
    bottomSheetRef.current?.show();
  }, [disabled, rotation]);

  const handleClose = useCallback(() => {
    rotation.value = withTiming(0, { duration: 200 });
    setIsOpen(false);
    bottomSheetRef.current?.hide();
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const getInputTextColor = useCallback(() => {
    if (disabled) return convertHexToRgba(colors.foreground, 0.5);
    return colors.foreground;
  }, [colors.foreground, disabled]);

  return (
    <>
      <View style={style}>
        <InputContainer
          onPress={handlePress}
          disabled={disabled}
          focused={isOpen}
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
            {value?.label ?? placeholder}
          </Text>
          <Animated.View style={animatedStyle}>
            <Icon name="ChevronDown" size={16} color={colors.foreground} />
          </Animated.View>
        </InputContainer>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        fullScreen={options.length > 20}
        onBackdropPress={handleClose}
      >
        {title && (
          <Text style={styles.title} variant="h3">
            {title}
          </Text>
        )}
        <FlatList
          data={options}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <OptionItem
              style={[
                styles.option,
                { borderRadius: theme.roundness - 2 },
                index === options.length - 1 && {
                  marginBottom: theme.insets.bottom + 8,
                },
              ]}
              option={item}
              selected={value?.value === item.value}
              onChange={(selectedOption) => {
                onChange(selectedOption);
                handleClose();
              }}
            />
          )}
        />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  selectText: { fontSize: 14, flex: 1 },
  optionContent: {
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
  list: { paddingHorizontal: 8 },
  title: { marginBottom: 8, marginHorizontal: 16 },
});
