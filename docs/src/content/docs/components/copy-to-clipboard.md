---
title: Copy to Clipboard
description: Component for copying text to clipboard with visual feedback and customizable appearance.
---

The `CopyToClipboard` component provides an easy way to copy text to the clipboard with visual feedback. It shows a copy icon that changes to a check mark when content is copied.

## Import

```typescript
import { CopyToClipboard } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
<CopyToClipboard text="Hello, World!">
  <Text variant="pm">Click to copy this text</Text>
</CopyToClipboard>
```

## Properties

| Property   | Type                   | Required | Default value | Description                                    |
| ---------- | ---------------------- | -------- | ------------- | ---------------------------------------------- |
| `text`     | `string`               | ✅       | -             | Text to copy to clipboard                      |
| `children` | `React.ReactNode`      | ✅       | -             | Content to display (usually text to be copied) |
| `onCopy`   | `() => void`           | ❌       | -             | Callback executed when text is copied          |
| `showIcon` | `boolean`              | ❌       | `true`        | Whether to show the copy/check icon            |
| `style`    | `StyleProp<ViewStyle>` | ❌       | -             | Custom styles for the container                |

## Basic examples

### Simple text copy

```tsx
<CopyToClipboard text="user@example.com">
  <Text variant="pm">user@example.com</Text>
</CopyToClipboard>
```

### Code snippet copy

```tsx
<CopyToClipboard text="npm install @space-uy/rn-spacedev-uikit">
  <View
    style={{
      backgroundColor: colors.altBackground,
      padding: 12,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Text variant="pm" style={{ fontFamily: 'monospace' }}>
      npm install @space-uy/rn-spacedev-uikit
    </Text>
  </View>
</CopyToClipboard>
```

### Copy without icon

```tsx
<CopyToClipboard
  text="This text will be copied"
  showIcon={false}
  onCopy={() => console.log('Text copied!')}
>
  <Text variant="pm">Tap to copy (no icon)</Text>
</CopyToClipboard>
```

## Advanced examples

### API key display

```tsx
const apiKey = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc';

<Card>
  <Text variant="h4">API Key</Text>
  <Text variant="ps" style={{ opacity: 0.7, marginTop: 4 }}>
    Use this key to authenticate your requests
  </Text>

  <CopyToClipboard text={apiKey} onCopy={() => console.log('API key copied')}>
    <View
      style={{
        backgroundColor: colors.altBackground,
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text variant="pm" style={{ fontFamily: 'monospace', flex: 1 }}>
        {apiKey}
      </Text>
    </View>
  </CopyToClipboard>

  <Text variant="caption" style={{ marginTop: 8, opacity: 0.6 }}>
    Keep your API key secure and don't share it publicly
  </Text>
</Card>;
```

### Contact information

```tsx
const contactInfo = {
  email: 'contact@company.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, City, State 12345',
};

<Card>
  <Text variant="h4">Contact Information</Text>

  <View style={{ gap: 12, marginTop: 16 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon name="Mail" size={20} color={colors.foreground} />
      <CopyToClipboard text={contactInfo.email}>
        <Text variant="pm" style={{ flex: 1 }}>
          {contactInfo.email}
        </Text>
      </CopyToClipboard>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon name="Phone" size={20} color={colors.foreground} />
      <CopyToClipboard text={contactInfo.phone}>
        <Text variant="pm" style={{ flex: 1 }}>
          {contactInfo.phone}
        </Text>
      </CopyToClipboard>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon name="MapPin" size={20} color={colors.foreground} />
      <CopyToClipboard text={contactInfo.address}>
        <Text variant="pm" style={{ flex: 1 }}>
          {contactInfo.address}
        </Text>
      </CopyToClipboard>
    </View>
  </View>
</Card>;
```

### Share content

```tsx
const shareUrl = 'https://myapp.com/share/abc123';
const shareMessage = 'Check out this amazing app!';

<Card>
  <Text variant="h4">Share Content</Text>

  <View style={{ gap: 16, marginTop: 16 }}>
    <View>
      <Text variant="h5">Share URL</Text>
      <CopyToClipboard text={shareUrl} onCopy={() => console.log('URL copied')}>
        <View
          style={{
            backgroundColor: colors.altBackground,
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text variant="pm" style={{ flex: 1 }} numberOfLines={1}>
            {shareUrl}
          </Text>
        </View>
      </CopyToClipboard>
    </View>

    <View>
      <Text variant="h5">Share Message</Text>
      <CopyToClipboard
        text={shareMessage}
        onCopy={() => console.log('Message copied')}
      >
        <View
          style={{
            backgroundColor: colors.altBackground,
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text variant="pm" style={{ flex: 1 }}>
            {shareMessage}
          </Text>
        </View>
      </CopyToClipboard>
    </View>
  </View>
</Card>;
```

### Copy with feedback

```tsx
const [copied, setCopied] = useState(false);

const handleCopy = () => {
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<CopyToClipboard text="This text has custom feedback" onCopy={handleCopy}>
  <View
    style={{
      backgroundColor: copied ? colors.primary + '10' : colors.altBackground,
      padding: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: copied ? 1 : 0,
      borderColor: colors.primary,
    }}
  >
    <Text variant="pm" style={{ flex: 1 }}>
      This text has custom feedback
    </Text>
    {copied && (
      <Text variant="ps" style={{ color: colors.primary, marginLeft: 8 }}>
        Copied!
      </Text>
    )}
  </View>
</CopyToClipboard>;
```

### Installation commands

```tsx
const commands = [
  { label: 'npm', command: 'npm install @space-uy/rn-spacedev-uikit' },
  { label: 'yarn', command: 'yarn add @space-uy/rn-spacedev-uikit' },
  { label: 'pnpm', command: 'pnpm add @space-uy/rn-spacedev-uikit' },
];

const [selectedCommand, setSelectedCommand] = useState(0);

<Card>
  <Text variant="h4">Installation</Text>

  <Tabs
    options={commands.map((cmd, index) => ({
      value: index.toString(),
      label: cmd.label,
    }))}
    selected={{
      value: selectedCommand.toString(),
      label: commands[selectedCommand].label,
    }}
    onChange={(tab) => setSelectedCommand(parseInt(tab.value))}
    style={{ marginTop: 16 }}
  />

  <CopyToClipboard
    text={commands[selectedCommand].command}
    onCopy={() =>
      console.log(`${commands[selectedCommand].label} command copied`)
    }
  >
    <View
      style={{
        backgroundColor: colors.altBackground,
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text variant="pm" style={{ fontFamily: 'monospace', flex: 1 }}>
        {commands[selectedCommand].command}
      </Text>
    </View>
  </CopyToClipboard>
</Card>;
```

### Copy multiple items

```tsx
const codeSnippets = [
  {
    title: 'Import',
    code: "import { Button } from '@space-uy/rn-spacedev-uikit';",
  },
  {
    title: 'Basic Usage',
    code: '<Button text="Click me" onPress={() => console.log("Pressed!")} />',
  },
  {
    title: 'With Variant',
    code: '<Button text="Outline Button" variant="outline" onPress={handlePress} />',
  },
];

<Card>
  <Text variant="h4">Code Examples</Text>

  <View style={{ gap: 12, marginTop: 16 }}>
    {codeSnippets.map((snippet, index) => (
      <View key={index}>
        <Text variant="h5">{snippet.title}</Text>
        <CopyToClipboard
          text={snippet.code}
          onCopy={() => console.log(`${snippet.title} copied`)}
        >
          <View
            style={{
              backgroundColor: colors.altBackground,
              padding: 12,
              borderRadius: 8,
              marginTop: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text variant="ps" style={{ fontFamily: 'monospace', flex: 1 }}>
              {snippet.code}
            </Text>
          </View>
        </CopyToClipboard>
      </View>
    ))}
  </View>
</Card>;
```

### Copy with confirmation

```tsx
const [copyStates, setCopyStates] = useState<Record<string, boolean>>({});

const handleCopyWithConfirmation = (id: string, text: string) => {
  setCopyStates((prev) => ({ ...prev, [id]: true }));
  setTimeout(() => {
    setCopyStates((prev) => ({ ...prev, [id]: false }));
  }, 1500);
};

const items = [
  {
    id: 'item1',
    label: 'Database URL',
    value: 'postgresql://user:pass@localhost/db',
  },
  { id: 'item2', label: 'Redis URL', value: 'redis://localhost:6379' },
  { id: 'item3', label: 'API Endpoint', value: 'https://api.example.com/v1' },
];

<Card>
  <Text variant="h4">Configuration</Text>

  <View style={{ gap: 12, marginTop: 16 }}>
    {items.map((item) => (
      <View key={item.id}>
        <Text variant="h5">{item.label}</Text>
        <CopyToClipboard
          text={item.value}
          onCopy={() => handleCopyWithConfirmation(item.id, item.value)}
        >
          <View
            style={{
              backgroundColor: copyStates[item.id]
                ? colors.primary + '10'
                : colors.altBackground,
              padding: 12,
              borderRadius: 8,
              marginTop: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: copyStates[item.id] ? 1 : 0,
              borderColor: colors.primary,
            }}
          >
            <Text variant="pm" style={{ fontFamily: 'monospace', flex: 1 }}>
              {item.value}
            </Text>
            {copyStates[item.id] && (
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <Icon name="Check" size={16} color={colors.primary} />
                <Text variant="ps" style={{ color: colors.primary }}>
                  Copied
                </Text>
              </View>
            )}
          </View>
        </CopyToClipboard>
      </View>
    ))}
  </View>
</Card>;
```

## Implementation notes

- Uses the device's native clipboard API for reliable copy functionality
- The copy icon animates to a check mark for 1.5 seconds after copying
- Works on all platforms (iOS, Android, Web)
- Automatically handles clipboard permissions on supported platforms
- The component is fully accessible with proper screen reader support
- Supports both text content and complex child components

## Visual feedback

- **Icon transition**: Copy icon smoothly transitions to check mark
- **Duration**: Check mark displays for 1.5 seconds before reverting
- **Animation**: Smooth scale and fade transitions for visual feedback
- **Color**: Check mark uses primary theme color for consistency

## Accessibility

- Properly announces copy action to screen readers
- Maintains focus states for keyboard navigation
- Copy feedback is communicated to assistive technologies
- All interactive elements meet touch target size requirements
- Supports voice control and switch navigation

```

```
