import React from 'react';
import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import useTheme from '../hooks/useTheme';
import Text from './Text';

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  description?: string;
}

export default function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  description,
}: CheckboxProps) {
  const { colors, theme } = useTheme();

  return (
    <Pressable
      onPress={() => !disabled && onCheckedChange?.(!checked)}
      style={{
        flexDirection: 'row',
        alignItems: description ? 'flex-start' : 'center',
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: theme.roundness,
          borderWidth: 1.5,
          borderColor: checked ? colors.primary : colors.border,
          backgroundColor: checked ? colors.primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: description ? 4 : 0,
        }}
      >
        {checked && (
          <Check size={14} color={colors.foregroundOnPrimary} strokeWidth={3} />
        )}
      </View>
      {(label || description) && (
        <View style={{ marginLeft: 8, flex: 1 }}>
          {label && <Text variant="ps">{label}</Text>}
          {description && (
            <Text
              variant="ps"
              style={{
                marginTop: label ? 2 : 0,
                opacity: 0.5,
              }}
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
