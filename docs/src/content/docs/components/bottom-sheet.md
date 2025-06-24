---
title: Bottom Sheet
description: Modal bottom sheet component with smooth animations and gesture controls for enhanced user interactions.
---

The `BottomSheet` component provides a modal bottom sheet that slides up from the bottom of the screen. It supports gesture controls for dragging, smooth animations, and customizable backdrop interactions.

## Import

```typescript
import { BottomSheet } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
import { useRef } from 'react';

function MyComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.show();
  };

  const hideBottomSheet = () => {
    bottomSheetRef.current?.hide();
  };

  return (
    <>
      <Button text="Show Bottom Sheet" onPress={showBottomSheet} />

      <BottomSheet ref={bottomSheetRef}>
        <View style={{ padding: 20 }}>
          <Text variant="h3">Bottom Sheet Content</Text>
          <Text variant="pm">This is the content inside the bottom sheet.</Text>
          <Button text="Close" onPress={hideBottomSheet} />
        </View>
      </BottomSheet>
    </>
  );
}
```

## Properties

| Property    | Type                   | Required | Default value | Description                                  |
| ----------- | ---------------------- | -------- | ------------- | -------------------------------------------- |
| `children`  | `React.ReactNode`      | ✅       | -             | Content to display inside the bottom sheet   |
| `onDismiss` | `() => void`           | ❌       | -             | Callback when bottom sheet is dismissed      |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -             | Custom styles for the bottom sheet container |

## Methods

When using a ref, the following methods are available:

| Method | Type         | Description           |
| ------ | ------------ | --------------------- |
| `show` | `() => void` | Show the bottom sheet |
| `hide` | `() => void` | Hide the bottom sheet |

## Basic examples

### Simple bottom sheet

```tsx
const bottomSheetRef = useRef<BottomSheet>(null);

<>
  <Button text="Open Menu" onPress={() => bottomSheetRef.current?.show()} />

  <BottomSheet ref={bottomSheetRef}>
    <View style={{ padding: 20, gap: 16 }}>
      <Text variant="h3">Menu Options</Text>
      <Button text="Option 1" variant="outline" />
      <Button text="Option 2" variant="outline" />
      <Button text="Option 3" variant="outline" />
    </View>
  </BottomSheet>
</>;
```

### Action sheet

```tsx
const actionSheetRef = useRef<BottomSheet>(null);

const handleAction = (action: string) => {
  console.log('Action:', action);
  actionSheetRef.current?.hide();
};

<>
  <Button text="Show Actions" onPress={() => actionSheetRef.current?.show()} />

  <BottomSheet ref={actionSheetRef}>
    <View style={{ padding: 20 }}>
      <Text variant="h4" style={{ marginBottom: 16, textAlign: 'center' }}>
        Choose an action
      </Text>
      <View style={{ gap: 12 }}>
        <Button
          text="Edit"
          variant="outline"
          onPress={() => handleAction('edit')}
        />
        <Button
          text="Share"
          variant="outline"
          onPress={() => handleAction('share')}
        />
        <Button
          text="Delete"
          variant="destructive"
          onPress={() => handleAction('delete')}
        />
        <Button
          text="Cancel"
          variant="outline"
          onPress={() => actionSheetRef.current?.hide()}
        />
      </View>
    </View>
  </BottomSheet>
</>;
```

## Advanced examples

### Settings bottom sheet

```tsx
const settingsSheetRef = useRef<BottomSheet>(null);
const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoBackup: true,
});

<>
  <Button text="Settings" onPress={() => settingsSheetRef.current?.show()} />

  <BottomSheet ref={settingsSheetRef}>
    <View style={{ padding: 20 }}>
      <Text variant="h3" style={{ marginBottom: 20 }}>
        Settings
      </Text>

      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant="pm">Notifications</Text>
          <Switch
            value={settings.notifications}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, notifications: value }))
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant="pm">Dark Mode</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, darkMode: value }))
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant="pm">Auto Backup</Text>
          <Switch
            value={settings.autoBackup}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, autoBackup: value }))
            }
          />
        </View>
      </View>

      <Button
        text="Done"
        onPress={() => settingsSheetRef.current?.hide()}
        style={{ marginTop: 20 }}
      />
    </View>
  </BottomSheet>
</>;
```

### Form bottom sheet

```tsx
const formSheetRef = useRef<BottomSheet>(null);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
});

const handleSubmit = () => {
  console.log('Form submitted:', formData);
  setFormData({ name: '', email: '', message: '' });
  formSheetRef.current?.hide();
};

<>
  <Button text="Contact Us" onPress={() => formSheetRef.current?.show()} />

  <BottomSheet ref={formSheetRef}>
    <View style={{ padding: 20 }}>
      <Text variant="h3" style={{ marginBottom: 20 }}>
        Contact Form
      </Text>

      <View style={{ gap: 16 }}>
        <Input
          label="Name"
          value={formData.name}
          onChangeText={(name) => setFormData((prev) => ({ ...prev, name }))}
          placeholder="Your name"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(email) => setFormData((prev) => ({ ...prev, email }))}
          placeholder="your@email.com"
          keyboardType="email-address"
        />

        <TextArea
          label="Message"
          value={formData.message}
          onChangeText={(message) =>
            setFormData((prev) => ({ ...prev, message }))
          }
          placeholder="Your message..."
          numberOfLines={4}
        />

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button
            text="Cancel"
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => formSheetRef.current?.hide()}
          />
          <Button text="Submit" style={{ flex: 1 }} onPress={handleSubmit} />
        </View>
      </View>
    </View>
  </BottomSheet>
</>;
```

### Selection bottom sheet

```tsx
const selectionSheetRef = useRef<BottomSheet>(null);
const [selectedOption, setSelectedOption] = useState<string | null>(null);

const options = [
  { id: 'option1', title: 'Option 1', description: 'First option description' },
  {
    id: 'option2',
    title: 'Option 2',
    description: 'Second option description',
  },
  { id: 'option3', title: 'Option 3', description: 'Third option description' },
];

const handleSelect = (optionId: string) => {
  setSelectedOption(optionId);
  selectionSheetRef.current?.hide();
};

<>
  <Button
    text={
      selectedOption
        ? options.find((o) => o.id === selectedOption)?.title
        : 'Select Option'
    }
    onPress={() => selectionSheetRef.current?.show()}
  />

  <BottomSheet ref={selectionSheetRef}>
    <View style={{ padding: 20 }}>
      <Text variant="h3" style={{ marginBottom: 20 }}>
        Choose Option
      </Text>

      <View style={{ gap: 12 }}>
        {options.map((option) => (
          <Pressable
            key={option.id}
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor:
                selectedOption === option.id
                  ? colors.primary + '10'
                  : colors.altBackground,
              borderWidth: selectedOption === option.id ? 1 : 0,
              borderColor: colors.primary,
            }}
            onPress={() => handleSelect(option.id)}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text variant="pm">{option.title}</Text>
                <Text variant="ps" style={{ opacity: 0.7, marginTop: 4 }}>
                  {option.description}
                </Text>
              </View>
              {selectedOption === option.id && (
                <Icon name="Check" size={20} color={colors.primary} />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  </BottomSheet>
</>;
```

## Implementation notes

- Uses React Native Reanimated for smooth animations and gesture handling
- Supports swipe down gesture to dismiss the bottom sheet
- Backdrop can be tapped to dismiss the sheet
- Automatically handles safe area insets for devices with notches
- The bottom sheet slides up from the bottom with a smooth animation
- Content is scrollable if it exceeds the available space
- Keyboard automatically adjusts the bottom sheet height when inputs are focused

## Animation details

- **Slide up animation**: 300ms duration with smooth easing curve
- **Gesture handling**: Real-time dragging with spring animation on release
- **Backdrop fade**: Synchronized with slide animation for smooth effect
- **Keyboard avoidance**: Automatic adjustment when virtual keyboard appears

## Accessibility

- Bottom sheet properly traps focus when shown
- Screen readers announce when the bottom sheet appears and disappears
- Gesture controls are accessible via assistive technologies
- Backdrop dismissal is properly announced to screen readers
- All interactive elements within maintain proper accessibility labels

## Performance

- Animations run on the UI thread for 60 FPS performance
- Content is only rendered when the bottom sheet is visible
- Efficient gesture handling without blocking the main thread
- Memory efficient implementation with proper cleanup
