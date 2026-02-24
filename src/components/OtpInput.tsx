import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  type NativeSyntheticEvent,
  StyleSheet,
  TextInput as RNTextInput,
  type TextInputKeyPressEventData,
  View,
} from 'react-native';

import InputContainer from './InputContainer';
import Text from './Text';
import useTheme from '../hooks/useTheme';

type OtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  secure?: boolean;
  variant?: 'default' | 'alternative';
};

export function OtpInput({
  length = 4,
  value,
  onChange,
  secure = false,
  variant = 'default',
}: OtpInputProps) {
  const { colors } = useTheme();
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const [values, setValues] = useState<string[]>(() =>
    new Array(length).fill('')
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const safeLength = useMemo(() => Math.max(1, length), [length]);

  // Sync internal state when `value` or `length` changes from outside.
  useEffect(() => {
    const nextValues = new Array(safeLength).fill('');
    if (value) {
      const digits = value.replace(/\D/g, '').slice(0, safeLength).split('');
      for (let i = 0; i < digits.length; i += 1) {
        nextValues[i] = digits[i];
      }
    }
    setValues(nextValues);
  }, [safeLength, value]);

  const emitChange = useCallback(
    (nextValues: string[]) => {
      onChange?.(nextValues.join(''));
    },
    [onChange]
  );

  const focusCell = useCallback(
    (index: number | null) => {
      if (index == null) return;
      const clampedIndex = Math.min(Math.max(index, 0), safeLength - 1);
      inputRefs.current[clampedIndex]?.focus();
      setFocusedIndex(clampedIndex);
    },
    [safeLength]
  );

  const focusFirstEmpty = useCallback(
    (nextValues: string[]) => {
      const emptyIndex = nextValues.findIndex((v) => v === '');
      if (emptyIndex !== -1) {
        focusCell(emptyIndex);
      } else {
        // Si todas las celdas están llenas, focuseamos la última
        focusCell(safeLength - 1);
      }
    },
    [focusCell, safeLength]
  );

  const handleChangeText = useCallback(
    (text: string, index: number) => {
      const digits = text.replace(/\D/g, '');

      // If nothing meaningful, just clear this cell.
      if (!digits.length) {
        const nextValues = [...values];
        nextValues[index] = '';
        setValues(nextValues);
        emitChange(nextValues);
        focusFirstEmpty(nextValues);
        return;
      }

      // Más de un dígito a la vez (paste o autofill).
      if (digits.length > 1) {
        const hasEmpty = values.some((v) => v === '');

        // Si todas las celdas ya están completas, solo sobreescribimos la última.
        if (!hasEmpty) {
          const lastIndex = safeLength - 1;
          const nextValues = [...values];
          nextValues[lastIndex] = digits[digits.length - 1] ?? '';
          setValues(nextValues);
          emitChange(nextValues);
          focusCell(lastIndex);
          return;
        }

        // Paste “normal”: distribuimos los dígitos desde el principio.
        inputRefs.current[index]?.setNativeProps({ text: '' });
        const nextValues = new Array(safeLength).fill('');
        const toFill = digits.slice(0, safeLength).split('');
        for (let i = 0; i < toFill.length; i += 1) {
          nextValues[i] = toFill[i];
        }
        setValues(nextValues);
        emitChange(nextValues);
        focusFirstEmpty(nextValues);
        return;
      }

      // Single digit typed.
      const nextValues = [...values];
      nextValues[index] = digits[0] ?? '';
      setValues(nextValues);
      emitChange(nextValues);

      // Move focus to the first empty cell (typically the next one).
      focusFirstEmpty(nextValues);
    },
    [emitChange, focusCell, focusFirstEmpty, safeLength, values]
  );

  const handleKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (event.nativeEvent.key !== 'Backspace') return;

      const lastFilledIndex = [...values]
        .map((v, i) => ({ v, i }))
        .filter((item) => item.v !== '')
        .map((item) => item.i)
        .pop();

      if (lastFilledIndex == null) return;

      const nextValues = [...values];
      nextValues[lastFilledIndex] = '';
      setValues(nextValues);
      emitChange(nextValues);
      focusCell(lastFilledIndex);
    },
    [emitChange, focusCell, values]
  );

  const cells = useMemo(
    () => new Array(safeLength).fill(0).map((_, i) => i),
    [safeLength]
  );

  return (
    <View style={styles.root}>
      {cells.map((cellIndex) => (
        <InputContainer
          key={cellIndex}
          onPress={() => focusCell(cellIndex)}
          focused={focusedIndex === cellIndex}
          style={styles.cellWrapper}
          contentContainerStyle={styles.inputContainer}
          variant={variant}
          size="default"
        >
          <View style={styles.inputWrapper}>
            <RNTextInput
              ref={(ref) => {
                inputRefs.current[cellIndex] = ref;
              }}
              value={values[cellIndex]}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              secureTextEntry={secure}
              onFocus={() => {
                // Siempre focuseamos la primera celda vacía (o la última si están todas llenas)
                focusFirstEmpty(values);
              }}
              onBlur={() => {
                if (focusedIndex === cellIndex) {
                  setFocusedIndex(null);
                }
              }}
              onChangeText={(text) => handleChangeText(text, cellIndex)}
              onKeyPress={handleKeyPress}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="oneTimeCode"
            />
            <Text
              style={[styles.displayText, { color: colors.foreground }]}
              variant="h3"
            >
              {secure && values[cellIndex] ? '●' : values[cellIndex] || ' '}
            </Text>
          </View>
        </InputContainer>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellWrapper: {
    flexShrink: 0,
    width: 40,
    marginHorizontal: 6,
  },
  inputContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  displayText: {
    textAlign: 'center',
    fontSize: 18,
  },
});
