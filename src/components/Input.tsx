import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  Pressable,
  type TextInputProps,
  type TextInputFocusEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import { Eye, EyeClosed } from 'lucide-react-native';

import InputContainer from './InputContainer';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';

type Props = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  label?: string;
  hint?: string;
  variant?: 'text' | 'password';
};

export type InputRef = { focus: () => void; blur: () => void };

export const Input = forwardRef<InputRef, Props>(
  (
    {
      style,
      editable = true,
      error,
      label,
      hint,
      variant = 'text',
      onBlur,
      onFocus,
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
        <TextInput
          {...rest}
          ref={inputRef}
          style={[
            styles.input,
            { fontFamily: theme.fonts.regular, color: colors.foreground },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={convertHexToRgba(colors.foreground, 0.5)}
          editable={editable}
          secureTextEntry={variant === 'password' && !showPassword}
        />
        {variant === 'password' && (
          <Pressable
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
            disabled={!editable}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {showPassword ? (
              <EyeClosed size={18} color={colors.foreground} />
            ) : (
              <Eye size={18} color={colors.foreground} />
            )}
          </Pressable>
        )}
      </InputContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 14 },
  icon: { marginStart: 8 },
});

export default Input;
