---
title: Input
description: Text input component with labels, hints, icons, and various input types including password fields.
---

The `Input` component provides a flexible text input with support for labels, hints, icons, password fields, and various input types. It includes built-in validation states and accessibility features.

## Import

```typescript
import { Input, type InputRef } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
const [value, setValue] = useState('');

<Input
  label="Email"
  placeholder="Enter your email"
  value={value}
  onChangeText={setValue}
/>;
```

## Properties

| Property       | Type                     | Required | Default value | Description                                   |
| -------------- | ------------------------ | -------- | ------------- | --------------------------------------------- |
| `label`        | `string`                 | ❌       | -             | Label text displayed above the input          |
| `placeholder`  | `string`                 | ❌       | -             | Placeholder text when input is empty          |
| `value`        | `string`                 | ❌       | -             | Current input value                           |
| `onChangeText` | `(text: string) => void` | ❌       | -             | Callback when input text changes              |
| `error`        | `boolean`                | ❌       | `false`       | Whether the input is in error state           |
| `hint`         | `string`                 | ❌       | -             | Hint text displayed below the input           |
| `iconName`     | `IconName`               | ❌       | -             | Icon displayed on the left side               |
| `variant`      | `'text' \| 'password'`   | ❌       | `'text'`      | Input variant (text or password)              |
| `clearable`    | `boolean`                | ❌       | `false`       | Whether to show clear button when has content |
| `editable`     | `boolean`                | ❌       | `true`        | Whether the input is editable                 |
| `style`        | `StyleProp<ViewStyle>`   | ❌       | -             | Custom styles for the input container         |
| `...rest`      | `TextInputProps`         | ❌       | -             | Additional TextInput props                    |

## InputRef Methods

When using a ref, the following methods are available:

| Method  | Type         | Description             |
| ------- | ------------ | ----------------------- |
| `focus` | `() => void` | Focus the input         |
| `blur`  | `() => void` | Remove focus from input |

## Basic examples

### Simple text input

```tsx
const [email, setEmail] = useState('');

<Input
  label="Email"
  placeholder="Enter your email address"
  value={email}
  onChangeText={setEmail}
/>;
```

### Password input

```tsx
const [password, setPassword] = useState('');

<Input
  label="Password"
  placeholder="Enter your password"
  variant="password"
  value={password}
  onChangeText={setPassword}
/>;
```

### Input with icon

```tsx
<Input
  label="Search"
  placeholder="Search for items..."
  iconName="Search"
  value={searchQuery}
  onChangeText={setSearchQuery}
/>
```

### Clearable input

```tsx
<Input
  label="Username"
  placeholder="Choose a username"
  clearable={true}
  value={username}
  onChangeText={setUsername}
/>
```

## Advanced examples

### Form with validation

```tsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
  confirmPassword: '',
});
const [errors, setErrors] = useState<Record<string, boolean>>({});

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleEmailChange = (email: string) => {
  setFormData((prev) => ({ ...prev, email }));
  setErrors((prev) => ({ ...prev, email: !validateEmail(email) }));
};

<View style={{ gap: 16 }}>
  <Input
    label="Email"
    placeholder="Enter your email"
    value={formData.email}
    onChangeText={handleEmailChange}
    error={errors.email}
    hint={
      errors.email
        ? 'Please enter a valid email address'
        : "We'll never share your email"
    }
    iconName="Mail"
    keyboardType="email-address"
    autoCapitalize="none"
  />

  <Input
    label="Password"
    placeholder="Create a password"
    variant="password"
    value={formData.password}
    onChangeText={(password) => setFormData((prev) => ({ ...prev, password }))}
    error={formData.password.length > 0 && formData.password.length < 8}
    hint="Password must be at least 8 characters"
  />

  <Input
    label="Confirm Password"
    placeholder="Confirm your password"
    variant="password"
    value={formData.confirmPassword}
    onChangeText={(confirmPassword) =>
      setFormData((prev) => ({ ...prev, confirmPassword }))
    }
    error={
      formData.confirmPassword !== formData.password &&
      formData.confirmPassword.length > 0
    }
    hint={
      formData.confirmPassword !== formData.password
        ? 'Passwords do not match'
        : ''
    }
  />
</View>;
```

### Different input types

```tsx
<View style={{ gap: 16 }}>
  <Input
    label="Phone Number"
    placeholder="+1 (555) 123-4567"
    iconName="Phone"
    keyboardType="phone-pad"
    value={phone}
    onChangeText={setPhone}
  />

  <Input
    label="Age"
    placeholder="Enter your age"
    iconName="User"
    keyboardType="numeric"
    value={age}
    onChangeText={setAge}
  />

  <Input
    label="Website"
    placeholder="https://example.com"
    iconName="Globe"
    keyboardType="url"
    autoCapitalize="none"
    value={website}
    onChangeText={setWebsite}
  />
</View>
```

### Controlled input with ref

```tsx
const inputRef = useRef<InputRef>(null);

const handleFocusInput = () => {
  inputRef.current?.focus();
};

<View style={{ gap: 16 }}>
  <Button text="Focus Input" onPress={handleFocusInput} />
  <Input
    ref={inputRef}
    label="Focused Input"
    placeholder="This input can be focused programmatically"
    value={value}
    onChangeText={setValue}
  />
</View>;
```

### Search input with actions

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [isSearching, setIsSearching] = useState(false);

const handleSearch = async () => {
  setIsSearching(true);
  try {
    await performSearch(searchQuery);
  } finally {
    setIsSearching(false);
  }
};

<View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-end' }}>
  <Input
    style={{ flex: 1 }}
    label="Search"
    placeholder="Search products..."
    iconName="Search"
    clearable
    value={searchQuery}
    onChangeText={setSearchQuery}
    onSubmitEditing={handleSearch}
    returnKeyType="search"
  />
  <IconButton
    iconName="Search"
    loading={isSearching}
    onPress={handleSearch}
    disabled={!searchQuery.trim()}
  />
</View>;
```

### Disabled input

```tsx
<Input
  label="Read Only Field"
  value="This field cannot be edited"
  editable={false}
  hint="This field is read-only"
/>
```

### Input with custom styling

```tsx
<Input
  label="Custom Styled Input"
  placeholder="Custom appearance"
  value={value}
  onChangeText={setValue}
  style={{
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
    borderWidth: 2,
  }}
/>
```

### Multi-step form input

```tsx
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
});

const steps = [
  {
    title: 'Personal Information',
    fields: [
      { key: 'firstName', label: 'First Name', icon: 'User' },
      { key: 'lastName', label: 'Last Name', icon: 'User' },
    ],
  },
  {
    title: 'Contact Information',
    fields: [
      {
        key: 'email',
        label: 'Email',
        icon: 'Mail',
        keyboardType: 'email-address',
      },
      {
        key: 'phone',
        label: 'Phone',
        icon: 'Phone',
        keyboardType: 'phone-pad',
      },
    ],
  },
];

const currentStepData = steps[currentStep];

<Card>
  <Text variant="h4">{currentStepData.title}</Text>
  <View style={{ gap: 16, marginTop: 16 }}>
    {currentStepData.fields.map((field) => (
      <Input
        key={field.key}
        label={field.label}
        iconName={field.icon as IconName}
        keyboardType={field.keyboardType}
        value={formData[field.key as keyof typeof formData]}
        onChangeText={(value) =>
          setFormData((prev) => ({ ...prev, [field.key]: value }))
        }
        placeholder={`Enter your ${field.label.toLowerCase()}`}
      />
    ))}
  </View>
</Card>;
```

## Implementation notes

- Built on top of InputContainer for consistent styling and behavior
- Password variant automatically shows/hides password with eye icon
- Clearable inputs show an X button when they contain text
- Focus and blur states are automatically managed with visual feedback
- The component handles platform-specific cursor and selection colors
- Icons are positioned on the left side with proper spacing
- Error states change border color and display hint text in error color

## Keyboard types

The input supports various keyboard types for better user experience:

- `default`: Standard keyboard
- `email-address`: Email-optimized keyboard
- `numeric`: Number pad
- `phone-pad`: Phone number pad
- `url`: URL-optimized keyboard

## Styling

### Theme integration

The Input automatically applies theme styling:

- **Background**: Uses theme background colors
- **Border**: Uses theme border colors with focus state changes
- **Text**: Uses theme typography and foreground colors
- **Icons**: Use theme foreground color with opacity variations

### Error states

Error styling is automatically applied when `error={true}`:

- **Border color**: Changes to destructive color
- **Hint text**: Displays in destructive color
- **Focus state**: Maintains error styling even when focused

## Accessibility

- Input fields are fully keyboard accessible
- Labels are properly associated with input fields
- Hint text provides additional context for screen readers
- Error states are communicated to assistive technologies
- Focus management works correctly with keyboard navigation
- Proper contrast ratios are maintained in all states
