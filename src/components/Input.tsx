import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  Pressable,
  type TextInputProps,
  type TextInputFocusEventData,
  type NativeSyntheticEvent,
  Platform,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import InputContainer from './InputContainer';
import Icon, { type IconName } from './Icon';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

type Props = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  label?: string;
  hint?: string;
  iconName?: IconName;
  variant?: 'text' | 'password';
  clearable?: boolean;
};

export type InputRef = { focus: () => void; blur: () => void };

export const Input = forwardRef<InputRef, Props>(
  (
    {
      style,
      onChangeText,
      value,
      editable = true,
      error,
      label,
      hint,
      variant = 'text',
      onBlur,
      onFocus,
      iconName,
      clearable = false,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { colors, theme } = useTheme();
    const inputRef = useRef<TextInput>(null);
    const isFocused = useSharedValue(value ? 0 : 1);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const iconAnimStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(isFocused.value, [0, 1], [1, 0]),
        width: interpolate(isFocused.value, [0, 1], [26, 0]),
      };
    });

    useEffect(() => {
      isFocused.value = withTiming(focused ? 1 : 0, { duration: 300 });
    }, [focused, isFocused]);

    return (
      <InputContainer
        style={style}
        label={label}
        hint={hint}
        error={error}
        onPress={() => inputRef.current?.focus()}
        contentContainerStyle={styles.container}
        focused={focused}
        disabled={!editable}
      >
        {iconName && (
          // TODO: Maybe we should move this to the InputContainer
          <Animated.View style={iconAnimStyle}>
            <Icon
              style={styles.icon}
              name={iconName}
              size={18}
              color={convertHexToRgba(colors.foreground, 0.5)}
            />
          </Animated.View>
        )}
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          ref={inputRef}
          style={[
            styles.input,
            { fontFamily: theme.fonts.regular, color: colors.foreground },
            Platform.OS === 'web' && styles.webInput,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={convertHexToRgba(colors.foreground, 0.5)}
          editable={editable}
          secureTextEntry={variant === 'password' && !showPassword}
        />
        {clearable && value && variant !== 'password' && (
          <Pressable
            style={{
              backgroundColor: colors.border,
              height: 16,
              width: 16,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginStart: 8,
            }}
            onPress={() => onChangeText?.('')}
            disabled={!editable}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              style={{ opacity: 0.8 }}
              name="X"
              size={10}
              color={colors.foreground}
            />
          </Pressable>
        )}
        {variant === 'password' && (
          <Pressable
            style={styles.button}
            onPress={() => setShowPassword(!showPassword)}
            disabled={!editable}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name={showPassword ? 'EyeClosed' : 'Eye'}
              size={18}
              color={colors.foreground}
            />
          </Pressable>
        )}
      </InputContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 14 },
  button: { marginStart: 8 },
  icon: { marginEnd: 8 },
  webInput: { outlineWidth: 0 } as ViewStyle, // To remove native focus outline on web
});

export default Input;
