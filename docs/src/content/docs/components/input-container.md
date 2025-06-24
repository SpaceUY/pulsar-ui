---
title: Input Container
description: Base container component for building custom input interfaces
---

## Description

The `InputContainer` component provides a foundational container for building custom input interfaces. It handles common input behaviors like focus states, error states, labels, hints, and animations. This component is used internally by other input components but can also be used directly to create custom input experiences.

## Import

```typescript
import { InputContainer, type InputRef } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
<InputContainer label="Custom Input" onPress={() => console.log('Pressed')}>
  <Text>Custom content here</Text>
</InputContainer>
```

## Properties

| Property                | Type                   | Required | Default value | Description                                   |
| ----------------------- | ---------------------- | -------- | ------------- | --------------------------------------------- |
| `onPress`               | `() => void`           | ✅       | -             | Function called when container is pressed     |
| `label`                 | `string`               | ❌       | -             | Label text displayed above the container      |
| `hint`                  | `string`               | ❌       | -             | Hint text displayed below the container       |
| `error`                 | `boolean`              | ❌       | `false`       | Whether the container is in error state       |
| `focused`               | `boolean`              | ❌       | `false`       | Whether the container appears focused         |
| `disabled`              | `boolean`              | ❌       | `false`       | Whether the container is disabled             |
| `size`                  | `'small' \| 'default'` | ❌       | `'default'`   | Size variant of the container                 |
| `height`                | `number`               | ❌       | -             | Custom height override                        |
| `iconName`              | `IconName`             | ❌       | -             | Icon displayed on the left side               |
| `style`                 | `StyleProp<ViewStyle>` | ❌       | -             | Custom styles for the outer container         |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | ❌       | -             | Custom styles for the inner content container |
| `children`              | `React.ReactNode`      | ❌       | -             | Content to display inside the container       |

## InputRef Type

When using a ref, the following methods are available:

| Method  | Type         | Description                         |
| ------- | ------------ | ----------------------------------- |
| `focus` | `() => void` | Focus the container (if applicable) |

## Basic examples

### Simple custom input

```tsx
const [value, setValue] = useState('');
const [focused, setFocused] = useState(false);

<InputContainer
  label="Custom Text Input"
  focused={focused}
  onPress={() => setFocused(true)}
  hint="Enter your custom text"
>
  <TextInput
    value={value}
    onChangeText={setValue}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    style={{ flex: 1, paddingVertical: 8 }}
    placeholder="Type here..."
  />
</InputContainer>;
```

### Picker-style input

```tsx
const [selectedValue, setSelectedValue] = useState<string | null>(null);
const [showPicker, setShowPicker] = useState(false);

<InputContainer
  label="Select Option"
  onPress={() => setShowPicker(true)}
  iconName="ChevronDown"
>
  <Text style={{ flex: 1, paddingVertical: 8 }}>
    {selectedValue || 'Choose an option'}
  </Text>
</InputContainer>;
```

### With validation state

```tsx
const [input, setInput] = useState('');
const [hasError, setHasError] = useState(false);

const validateInput = (text: string) => {
  const isValid = text.length >= 3;
  setHasError(!isValid && text.length > 0);
  return isValid;
};

<InputContainer
  label="Validated Input"
  error={hasError}
  hint={
    hasError ? 'Minimum 3 characters required' : 'Enter at least 3 characters'
  }
  onPress={() => {
    /* handle press */
  }}
>
  <TextInput
    value={input}
    onChangeText={(text) => {
      setInput(text);
      validateInput(text);
    }}
    style={{ flex: 1, paddingVertical: 8 }}
    placeholder="Validated input..."
  />
</InputContainer>;
```

## Advanced examples

### Custom date picker

```tsx
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [showDatePicker, setShowDatePicker] = useState(false);

<InputContainer
  label="Birth Date"
  onPress={() => setShowDatePicker(true)}
  iconName="Calendar"
  hint="Select your birth date"
>
  <Text
    style={{
      flex: 1,
      paddingVertical: 8,
      color: selectedDate ? colors.foreground : colors.foreground + '80',
    }}
  >
    {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select date'}
  </Text>
  <Icon name="ChevronDown" size={16} color={colors.foreground} />
</InputContainer>;
```

### Multi-select input

```tsx
const [selectedItems, setSelectedItems] = useState<string[]>([]);
const [showSelector, setShowSelector] = useState(false);

const displayText =
  selectedItems.length > 0
    ? `${selectedItems.length} items selected`
    : 'Select items';

<InputContainer
  label="Categories"
  onPress={() => setShowSelector(true)}
  iconName="Tag"
  focused={showSelector}
>
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 4,
    }}
  >
    {selectedItems.slice(0, 2).map((item) => (
      <Chip key={item} text={item} size="small" />
    ))}
    {selectedItems.length > 2 && (
      <Text variant="ps" style={{ opacity: 0.7 }}>
        +{selectedItems.length - 2} more
      </Text>
    )}
    {selectedItems.length === 0 && (
      <Text style={{ color: colors.foreground + '80', paddingVertical: 4 }}>
        Select categories
      </Text>
    )}
  </View>
  <Icon name="ChevronDown" size={16} color={colors.foreground} />
</InputContainer>;
```

### File upload input

```tsx
const [selectedFile, setSelectedFile] = useState<string | null>(null);
const [uploading, setUploading] = useState(false);

const handleFileSelect = async () => {
  try {
    setUploading(true);
    // File selection logic here
    const file = await selectFile();
    setSelectedFile(file.name);
  } catch (error) {
    // Handle error
  } finally {
    setUploading(false);
  }
};

<InputContainer
  label="Upload Document"
  onPress={handleFileSelect}
  iconName="Upload"
  disabled={uploading}
  hint={selectedFile ? `Selected: ${selectedFile}` : 'Choose a file to upload'}
>
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 8,
    }}
  >
    {uploading ? (
      <>
        <LoadingIndicator size={16} />
        <Text>Uploading...</Text>
      </>
    ) : selectedFile ? (
      <>
        <Icon name="File" size={16} color={colors.primary} />
        <Text style={{ flex: 1 }} numberOfLines={1}>
          {selectedFile}
        </Text>
        <IconButton
          iconName="X"
          size="small"
          variant="transparent"
          onPress={() => setSelectedFile(null)}
        />
      </>
    ) : (
      <Text style={{ color: colors.foreground + '80' }}>No file selected</Text>
    )}
  </View>
</InputContainer>;
```

### Search input with suggestions

```tsx
const [query, setQuery] = useState('');
const [suggestions, setSuggestions] = useState<string[]>([]);
const [focused, setFocused] = useState(false);

useEffect(() => {
  if (query.length > 2) {
    // Fetch suggestions based on query
    fetchSuggestions(query).then(setSuggestions);
  } else {
    setSuggestions([]);
  }
}, [query]);

<View>
  <InputContainer
    label="Search"
    focused={focused}
    onPress={() => {
      /* Focus handled by TextInput */
    }}
    iconName="Search"
    size="small"
  >
    <TextInput
      value={query}
      onChangeText={setQuery}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Search for items..."
      style={{ flex: 1, paddingVertical: 6 }}
    />
    {query.length > 0 && (
      <IconButton
        iconName="X"
        size="small"
        variant="transparent"
        onPress={() => {
          setQuery('');
          setSuggestions([]);
        }}
      />
    )}
  </InputContainer>

  {suggestions.length > 0 && focused && (
    <Card style={{ marginTop: 4, maxHeight: 200 }}>
      <ScrollView>
        {suggestions.map((suggestion, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setQuery(suggestion);
              setSuggestions([]);
              setFocused(false);
            }}
            style={{
              padding: 12,
              borderBottomWidth: index < suggestions.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}
          >
            <Text>{suggestion}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Card>
  )}
</View>;
```

### Custom numeric stepper

```tsx
const [value, setValue] = useState(0);
const [focused, setFocused] = useState(false);

const increment = () => setValue((prev) => prev + 1);
const decrement = () => setValue((prev) => Math.max(0, prev - 1));

<InputContainer
  label="Quantity"
  focused={focused}
  onPress={() => setFocused(true)}
  hint="Use buttons to adjust quantity"
>
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 4,
    }}
  >
    <IconButton
      iconName="Minus"
      size="small"
      variant="outline"
      onPress={decrement}
      disabled={value <= 0}
    />
    <Text variant="h5" style={{ minWidth: 40, textAlign: 'center' }}>
      {value}
    </Text>
    <IconButton
      iconName="Plus"
      size="small"
      variant="outline"
      onPress={increment}
    />
  </View>
</InputContainer>;
```

## Implementation notes

- **Focus management**: Handles visual focus states with smooth animations
- **Error states**: Provides visual feedback for validation errors
- **Flexible content**: Can contain any React components as children
- **Icon support**: Optional left-side icon with fade animation on focus
- **Size variants**: Supports different height configurations
- **Accessibility**: Proper labeling and hint text for screen readers

## Accessibility

- Supports screen readers with proper labeling
- Hint text is associated with the input for accessibility
- Focus states are clearly indicated visually
- Disabled state is properly communicated
- Pressable area follows accessibility guidelines

## Performance considerations

- Efficient animations using React Native Reanimated
- Minimal re-renders with proper state management
- Lightweight component with optimized styling
- Smooth transitions for focus and error states
