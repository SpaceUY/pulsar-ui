import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextInputProps,
  type TextInputFocusEventData,
  type NativeSyntheticEvent,
  Platform,
} from 'react-native';

import InputContainer from './InputContainer';
import IconButton from './IconButton';
import { type IconName } from './Icon';

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

    const renderRightButton = (name: IconName, onPress: () => void) => (
      <IconButton
        style={styles.button}
        iconName={name}
        size="small"
        variant="transparent"
        onPress={onPress}
        disabled={!editable}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      />
    );

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
        iconName={iconName}
      >
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          ref={inputRef}
          style={[
            styles.input,
            {
              fontFamily: theme.fonts.regular,
              color: colors.foreground,
              // @ts-ignore
              caretColor: colors.primary, // This to make the cursor color match the primary color on web
            },
            Platform.OS === 'web' && styles.webInput,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={convertHexToRgba(colors.foreground, 0.5)}
          editable={editable}
          secureTextEntry={variant === 'password' && !showPassword}
          cursorColor={colors.primary}
          selectionColor={convertHexToRgba(
            colors.primary,
            Platform.OS === 'android' ? 0.15 : 1
          )}
          selectionHandleColor={colors.primary}
        />
        {clearable &&
          value &&
          variant !== 'password' &&
          renderRightButton('CircleX', () => onChangeText?.(''))}
        {variant === 'password' &&
          renderRightButton(showPassword ? 'EyeClosed' : 'Eye', () =>
            setShowPassword(!showPassword)
          )}
      </InputContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 14 },
  button: { marginStart: 8, opacity: 0.8 },
  icon: { marginEnd: 8 },
  webInput: { outlineWidth: 0 } as ViewStyle, // To remove native focus outline on web
});

export default Input;
