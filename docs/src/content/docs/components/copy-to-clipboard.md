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
