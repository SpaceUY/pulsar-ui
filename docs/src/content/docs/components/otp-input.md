---
title: OTP Input
description: Single-digit input field for OTP (One-Time Password) codes
---

## Description

The `OtpInput` component is a specialized input field designed for capturing single digits in OTP (One-Time Password) verification flows. It automatically validates numeric input, handles backspace navigation, and provides a consistent visual design for verification codes.

## Import

```typescript
import { OtpInput } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
<OtpInput placeholder="*" onChangeText={(digit) => console.log(digit)} />
```

## Properties

| Property       | Type                                                                | Required | Default value | Description                               |
| -------------- | ------------------------------------------------------------------- | -------- | ------------- | ----------------------------------------- |
| `placeholder`  | `string`                                                            | ❌       | `'*'`         | Placeholder character when input is empty |
| `onChangeText` | `(text: string) => void`                                            | ❌       | -             | Callback when input text changes          |
| `onKeyPress`   | `(event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void` | ❌       | -             | Callback for key press events             |
| `editable`     | `boolean`                                                           | ❌       | `true`        | Whether the input is editable             |
| `style`        | `StyleProp<ViewStyle>`                                              | ❌       | -             | Custom styles for the input               |
| `...rest`      | `TextInputProps`                                                    | ❌       | -             | Additional TextInput props                |

## Basic examples

### Single OTP input

```tsx
const [digit, setDigit] = useState('');

<OtpInput placeholder="0" onChangeText={setDigit} value={digit} />;
```

### Complete OTP form

```tsx
const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
const inputRefs = useRef<Array<TextInput | null>>([]);

const handleOtpChange = (value: string, index: number) => {
  const newOtpCode = [...otpCode];
  newOtpCode[index] = value;
  setOtpCode(newOtpCode);

  // Auto-focus next input
  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};

const handleKeyPress = (event: any, index: number) => {
  if (event.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

<View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center' }}>
  {otpCode.map((digit, index) => (
    <OtpInput
      key={index}
      ref={(ref) => (inputRefs.current[index] = ref)}
      placeholder="0"
      value={digit}
      onChangeText={(value) => handleOtpChange(value, index)}
      onKeyPress={(event) => handleKeyPress(event, index)}
    />
  ))}
</View>;
```

## Advanced examples

### Verification flow with validation

```tsx
const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
const [isValid, setIsValid] = useState(true);
const [isLoading, setIsLoading] = useState(false);
const inputRefs = useRef<Array<TextInput | null>>([]);

const handleOtpChange = (value: string, index: number) => {
  const newOtpCode = [...otpCode];
  newOtpCode[index] = value;
  setOtpCode(newOtpCode);
  setIsValid(true); // Reset validation state

  // Auto-focus next input
  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }

  // Auto-submit when complete
  if (index === 5 && value) {
    handleVerification(newOtpCode);
  }
};

const handleVerification = async (code: string[]) => {
  const codeString = code.join('');
  if (codeString.length === 6) {
    setIsLoading(true);
    try {
      await verifyOtpCode(codeString);
      // Handle success
    } catch (error) {
      setIsValid(false);
      setOtpCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  }
};

<View style={{ alignItems: 'center', gap: 20 }}>
  <Text variant="h4">Enter verification code</Text>
  <Text variant="pm" style={{ textAlign: 'center', opacity: 0.7 }}>
    We sent a 6-digit code to {maskedPhone}
  </Text>

  <View style={{ flexDirection: 'row', gap: 12 }}>
    {otpCode.map((digit, index) => (
      <OtpInput
        key={index}
        ref={(ref) => (inputRefs.current[index] = ref)}
        placeholder="0"
        value={digit}
        onChangeText={(value) => handleOtpChange(value, index)}
        onKeyPress={(event) => handleKeyPress(event, index)}
        editable={!isLoading}
        style={{
          borderColor: !isValid ? colors.destructive : colors.border,
          backgroundColor: isLoading ? colors.altBackground : colors.background,
        }}
      />
    ))}
  </View>

  {!isValid && (
    <Text variant="caption" style={{ color: colors.destructive }}>
      Invalid code. Please try again.
    </Text>
  )}

  {isLoading && (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <LoadingIndicator size={16} />
      <Text variant="pm">Verifying...</Text>
    </View>
  )}
</View>;
```

### Resend code functionality

```tsx
const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
const [countdown, setCountdown] = useState(60);
const [canResend, setCanResend] = useState(false);

useEffect(() => {
  let timer: NodeJS.Timeout;
  if (countdown > 0) {
    timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  } else {
    setCanResend(true);
  }
  return () => clearTimeout(timer);
}, [countdown]);

const handleResendCode = async () => {
  if (!canResend) return;

  try {
    await resendOtpCode();
    setCountdown(60);
    setCanResend(false);
    setOtpCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  } catch (error) {
    // Handle error
  }
};

<View style={{ alignItems: 'center', gap: 20 }}>
  <View style={{ flexDirection: 'row', gap: 12 }}>
    {otpCode.map((digit, index) => (
      <OtpInput
        key={index}
        ref={(ref) => (inputRefs.current[index] = ref)}
        placeholder="0"
        value={digit}
        onChangeText={(value) => handleOtpChange(value, index)}
      />
    ))}
  </View>

  <View style={{ alignItems: 'center', gap: 8 }}>
    <Text variant="pm">Didn't receive the code?</Text>
    <Button
      text={canResend ? 'Resend code' : `Resend in ${countdown}s`}
      variant="transparent"
      onPress={handleResendCode}
      disabled={!canResend}
    />
  </View>
</View>;
```

### Custom styled OTP inputs

```tsx
const [otpCode, setOtpCode] = useState(['', '', '', '']);

<View style={{ alignItems: 'center', gap: 16 }}>
  <Text variant="h4">Security Code</Text>

  <View style={{ flexDirection: 'row', gap: 16 }}>
    {otpCode.map((digit, index) => (
      <OtpInput
        key={index}
        placeholder="•"
        value={digit}
        onChangeText={(value) => handleOtpChange(value, index)}
        style={{
          width: 60,
          height: 60,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: digit ? colors.primary : colors.border,
          backgroundColor: digit ? colors.primary + '10' : colors.background,
          fontSize: 24,
          fontWeight: 'bold',
        }}
      />
    ))}
  </View>

  <Text variant="caption" style={{ textAlign: 'center', opacity: 0.7 }}>
    Enter the 4-digit code from your authenticator app
  </Text>
</View>;
```

## Implementation notes

- **Numeric validation**: Only accepts numeric digits (0-9)
- **Single character**: Automatically limited to one character per input
- **Auto-focus**: Can be combined with refs for automatic focus management
- **Backspace handling**: Special handling for backspace key to clear current input
- **Placeholder management**: Dynamically shows/hides placeholder on focus/blur
- **Accessibility**: Includes proper keyboard type and text alignment

## Accessibility

- Uses `keyboardType="number-pad"` for optimal mobile experience
- Supports screen readers through standard TextInput accessibility
- Proper text alignment for better readability
- Clear visual feedback for focused state

## Performance considerations

- Lightweight component with minimal re-renders
- Efficient validation using regex
- Proper cleanup of event handlers
- Uses `useCallback` for optimized event handling
