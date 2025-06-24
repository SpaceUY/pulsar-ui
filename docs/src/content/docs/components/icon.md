---
title: Icon
description: Simple icon component using Lucide React Native icons with theming support.
---

The `Icon` component provides a simple way to display icons using the Lucide React Native icon library with automatic theming support.

## Import

```typescript
import { Icon, type IconName } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
<Icon name="Heart" />
```

## Properties

| Property | Type                   | Required | Default value       | Description                   |
| -------- | ---------------------- | -------- | ------------------- | ----------------------------- |
| `name`   | `IconName`             | ✅       | -                   | Lucide React Native icon name |
| `size`   | `number`               | ❌       | `24`                | Size of the icon in pixels    |
| `color`  | `string`               | ❌       | `colors.foreground` | Color of the icon             |
| `style`  | `StyleProp<ViewStyle>` | ❌       | -                   | Custom styles for the icon    |

## IconName Type

The `IconName` type includes all available Lucide React Native icons. Common examples include:

- `Heart`, `Star`, `User`, `Home`, `Settings`
- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`
- `Check`, `X`, `Plus`, `Minus`, `Search`
- `Mail`, `Phone`, `Calendar`, `Camera`, `Edit`
- `Download`, `Upload`, `Share`, `Save`, `Delete`

## Basic examples

### Simple icons

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Icon name="Heart" />
  <Icon name="Star" />
  <Icon name="User" />
  <Icon name="Settings" />
</View>
```

### Different sizes

```tsx
<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
  <Icon name="Heart" size={16} />
  <Icon name="Heart" size={24} />
  <Icon name="Heart" size={32} />
  <Icon name="Heart" size={48} />
</View>
```

### Custom colors

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Icon name="Heart" color="red" />
  <Icon name="Star" color="gold" />
  <Icon name="Check" color="green" />
  <Icon name="X" color="red" />
</View>
```

## Advanced examples

### Navigation icons

```tsx
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Icon name="ArrowLeft" size={20} />
  <Icon name="Home" size={20} />
  <Icon name="Search" size={20} />
  <Icon name="User" size={20} />
  <Icon name="Settings" size={20} />
</View>
```

### Status indicators

```tsx
const getStatusIcon = (status: 'success' | 'warning' | 'error' | 'info') => {
  const statusConfig = {
    success: { name: 'CheckCircle', color: 'green' },
    warning: { name: 'AlertTriangle', color: 'orange' },
    error: { name: 'XCircle', color: 'red' },
    info: { name: 'Info', color: 'blue' },
  };

  const config = statusConfig[status];

  return <Icon name={config.name as IconName} color={config.color} size={20} />;
};

// Usage
<View style={{ gap: 8 }}>
  {getStatusIcon('success')}
  {getStatusIcon('warning')}
  {getStatusIcon('error')}
  {getStatusIcon('info')}
</View>;
```

### Interactive icon list

```tsx
const actions = [
  { name: 'Edit', icon: 'Edit', onPress: handleEdit },
  { name: 'Share', icon: 'Share', onPress: handleShare },
  { name: 'Delete', icon: 'Trash', onPress: handleDelete },
];

<View style={{ gap: 16 }}>
  {actions.map((action) => (
    <Pressable
      key={action.name}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
      onPress={action.onPress}
    >
      <Icon name={action.icon as IconName} size={20} />
      <Text variant="pm">{action.name}</Text>
    </Pressable>
  ))}
</View>;
```

### Icon with badge

```tsx
<View style={{ position: 'relative' }}>
  <Icon name="Bell" size={24} />
  <View
    style={{
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: 'red',
      borderRadius: 8,
      width: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text variant="caption" style={{ color: 'white', fontSize: 10 }}>
      3
    </Text>
  </View>
</View>
```

### Weather icons

```tsx
const weatherIcons = {
  sunny: 'Sun',
  cloudy: 'Cloud',
  rainy: 'CloudRain',
  snowy: 'Snowflake',
  stormy: 'Zap',
};

const currentWeather = 'sunny';

<View style={{ alignItems: 'center', gap: 8 }}>
  <Icon
    name={weatherIcons[currentWeather] as IconName}
    size={48}
    color={colors.primary}
  />
  <Text variant="h4">Sunny</Text>
  <Text variant="pm">25°C</Text>
</View>;
```

### File type icons

```tsx
const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  const iconMap: Record<string, IconName> = {
    pdf: 'FileText',
    doc: 'FileText',
    docx: 'FileText',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    mp4: 'Video',
    mp3: 'Music',
    zip: 'Archive',
  };

  return iconMap[extension || ''] || 'File';
};

const files = ['document.pdf', 'photo.jpg', 'video.mp4', 'archive.zip'];

<View style={{ gap: 12 }}>
  {files.map((file) => (
    <View
      key={file}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
    >
      <Icon name={getFileIcon(file)} size={20} color={colors.foreground} />
      <Text variant="pm">{file}</Text>
    </View>
  ))}
</View>;
```

### Social media icons

```tsx
const socialIcons = [
  { name: 'Github', platform: 'GitHub' },
  { name: 'Twitter', platform: 'Twitter' },
  { name: 'Linkedin', platform: 'LinkedIn' },
  { name: 'Instagram', platform: 'Instagram' },
];

<View style={{ flexDirection: 'row', gap: 16 }}>
  {socialIcons.map((social) => (
    <Pressable
      key={social.platform}
      onPress={() => openSocial(social.platform)}
    >
      <Icon
        name={social.name as IconName}
        size={24}
        color={colors.foreground}
      />
    </Pressable>
  ))}
</View>;
```

## Popular Icons

Here are some commonly used icons in the library:

### Navigation

- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`
- `ChevronLeft`, `ChevronRight`, `ChevronUp`, `ChevronDown`
- `Home`, `Search`, `Menu`, `X`

### Actions

- `Plus`, `Minus`, `Edit`, `Delete`, `Save`
- `Check`, `X`, `Copy`, `Share`, `Download`

### Communication

- `Mail`, `Phone`, `MessageCircle`, `Send`
- `Bell`, `Notification`, `Volume`, `Mic`

### Files & Media

- `File`, `Folder`, `Image`, `Video`, `Music`
- `Camera`, `Upload`, `Download`, `Archive`

### User & Account

- `User`, `Users`, `Settings`, `Lock`, `Eye`
- `Heart`, `Star`, `Bookmark`, `Flag`

## Implementation notes

- The component uses Lucide React Native icons exclusively
- Icons automatically inherit theme foreground color when no color is specified
- All icons are vector-based and scale cleanly at any size
- The component is a thin wrapper around the Lucide React Native icon components
- TypeScript provides full autocomplete support for icon names

## Accessibility

- Icons are properly announced by screen readers when used in interactive contexts
- Color contrast is maintained when using theme colors
- Icon sizing follows accessibility guidelines for touch targets when interactive
- Semantic meaning is preserved through proper icon selection
