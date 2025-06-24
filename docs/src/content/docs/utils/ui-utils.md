---
title: UI Utils
description: Utility functions for color manipulation, accessibility, and UI-related calculations.
---

The UI utils provide essential functions for color manipulation, accessibility calculations, and UI-related utilities to enhance the visual experience of your React Native applications.

## Import

```typescript
import {
  convertHexToRgba,
  getColorContrastRatio,
  getAccessibleTextColor,
} from '@space-uy/rn-spacedev-uikit';
```

## Available Functions

### convertHexToRgba

Converts a hex color code to an rgba color string with the specified opacity.

#### Parameters

| Parameter | Type     | Required | Description                         |
| --------- | -------- | -------- | ----------------------------------- |
| `hex`     | `string` | ✅       | The hex color code (e.g. '#FF0000') |
| `opacity` | `number` | ✅       | The opacity value between 0 and 1   |

#### Returns

| Type     | Description                                     |
| -------- | ----------------------------------------------- |
| `string` | An rgba color string (e.g. 'rgba(255,0,0,0.5)') |

#### Basic usage

```typescript
import { convertHexToRgba } from '@space-uy/rn-spacedev-uikit';

// Convert hex to rgba with 50% opacity
const redWithOpacity = convertHexToRgba('#FF0000', 0.5);
console.log(redWithOpacity); // "rgba(255,0,0,0.5)"

// Convert hex to rgba with 20% opacity
const blueWithOpacity = convertHexToRgba('#0066CC', 0.2);
console.log(blueWithOpacity); // "rgba(0,102,204,0.2)"
```

### getColorContrastRatio

Calculates the contrast ratio between two colors according to WCAG guidelines.

#### Parameters

| Parameter | Type     | Required | Description                    |
| --------- | -------- | -------- | ------------------------------ |
| `color1`  | `string` | ✅       | The first color in hex format  |
| `color2`  | `string` | ✅       | The second color in hex format |

#### Returns

| Type     | Description                                                 |
| -------- | ----------------------------------------------------------- |
| `number` | The contrast ratio (higher values indicate better contrast) |

#### Basic usage

```typescript
import { getColorContrastRatio } from '@space-uy/rn-spacedev-uikit';

// Calculate contrast between black text on white background
const contrast = getColorContrastRatio('#000000', '#FFFFFF');
console.log(contrast); // 21 (perfect contrast)

// Calculate contrast between blue text on white background
const blueContrast = getColorContrastRatio('#0066CC', '#FFFFFF');
console.log(blueContrast); // ~7.2 (good contrast)
```

### getAccessibleTextColor

Determines whether black or white text would be more readable on a given background color.

#### Parameters

| Parameter         | Type     | Required | Description                        |
| ----------------- | -------- | -------- | ---------------------------------- |
| `backgroundColor` | `string` | ✅       | The background color in hex format |

#### Returns

| Type                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| `'black' \| 'white'` | The recommended text color for best readability |

#### Basic usage

```typescript
import { getAccessibleTextColor } from '@space-uy/rn-spacedev-uikit';

// Determine text color for dark background
const textColor1 = getAccessibleTextColor('#2C3E50');
console.log(textColor1); // "white"

// Determine text color for light background
const textColor2 = getAccessibleTextColor('#ECF0F1');
console.log(textColor2); // "black"
```

## Advanced examples

### Creating accessible overlay components

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import {
  convertHexToRgba,
  getAccessibleTextColor
} from '@space-uy/rn-spacedev-uikit';

interface OverlayCardProps {
  backgroundColor: string;
  title: string;
  description: string;
  opacity?: number;
}

function OverlayCard({
  backgroundColor,
  title,
  description,
  opacity = 0.9
}: OverlayCardProps) {
  const overlayColor = convertHexToRgba(backgroundColor, opacity);
  const textColor = getAccessibleTextColor(backgroundColor);

  return (
    <View
      style={{
        backgroundColor: overlayColor,
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: textColor, fontSize: 18, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text style={{ color: textColor, fontSize: 14 }}>
        {description}
      </Text>
    </View>
  );
}
```

### Dynamic theme validation

```typescript
import {
  getColorContrastRatio,
  getAccessibleTextColor,
} from '@space-uy/rn-spacedev-uikit';

interface ThemeColors {
  primary: string;
  background: string;
  text: string;
}

const validateThemeAccessibility = (theme: ThemeColors): boolean => {
  const contrast = getColorContrastRatio(theme.text, theme.background);
  const recommendedTextColor = getAccessibleTextColor(theme.background);

  // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
  const meetsContrast = contrast >= 4.5;
  const correctTextColor =
    (recommendedTextColor === 'black' && theme.text === '#000000') ||
    (recommendedTextColor === 'white' && theme.text === '#FFFFFF');

  return meetsContrast && correctTextColor;
};

// Usage
const lightTheme: ThemeColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
};

const darkTheme: ThemeColors = {
  primary: '#0A84FF',
  background: '#1C1C1E',
  text: '#FFFFFF',
};

console.log(validateThemeAccessibility(lightTheme)); // true
console.log(validateThemeAccessibility(darkTheme)); // true
```

### Creating gradient overlays with opacity

```typescript
import React from 'react';
import { View, Text, LinearGradient } from 'react-native';
import { convertHexToRgba } from '@space-uy/rn-spacedev-uikit';

interface GradientOverlayProps {
  startColor: string;
  endColor: string;
  children: React.ReactNode;
}

function GradientOverlay({ startColor, endColor, children }: GradientOverlayProps) {
  const startColorRgba = convertHexToRgba(startColor, 0.8);
  const endColorRgba = convertHexToRgba(endColor, 0.4);

  return (
    <LinearGradient
      colors={[startColorRgba, endColorRgba]}
      style={{ flex: 1, padding: 20 }}
    >
      {children}
    </LinearGradient>
  );
}
```

### Accessibility-first button component

```typescript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  getAccessibleTextColor,
  getColorContrastRatio
} from '@space-uy/rn-spacedev-uikit';

interface AccessibleButtonProps {
  text: string;
  backgroundColor: string;
  onPress: () => void;
}

function AccessibleButton({ text, backgroundColor, onPress }: AccessibleButtonProps) {
  const textColor = getAccessibleTextColor(backgroundColor);
  const contrast = getColorContrastRatio(
    textColor === 'black' ? '#000000' : '#FFFFFF',
    backgroundColor
  );

  // Warn if contrast is insufficient
  if (contrast < 4.5) {
    console.warn(`Button contrast ratio (${contrast.toFixed(2)}) doesn't meet WCAG AA standards`);
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
      }}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={text}
    >
      <Text
        style={{
          color: textColor === 'black' ? '#000000' : '#FFFFFF',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
```

## Implementation notes

### convertHexToRgba

- Supports both 3-digit and 6-digit hex codes
- Automatically strips the '#' character if present
- Opacity values should be between 0 (fully transparent) and 1 (fully opaque)

### getColorContrastRatio

- Follows WCAG 2.1 contrast calculation guidelines
- Returns values from 1 (no contrast) to 21 (maximum contrast)
- WCAG AA standard requires 4.5:1 for normal text, 3:1 for large text
- WCAG AAA standard requires 7:1 for normal text, 4.5:1 for large text

### getAccessibleTextColor

- Uses contrast ratio calculations internally
- Returns the text color that provides better readability
- Considers both black (#000000) and white (#FFFFFF) text options

## Accessibility guidelines

These utilities help ensure your app meets accessibility standards:

- **WCAG AA**: Minimum contrast ratio of 4.5:1 for normal text
- **WCAG AAA**: Enhanced contrast ratio of 7:1 for normal text
- Use these functions to validate color combinations before implementing them
- Test your color schemes with actual users who have visual impairments

## Browser compatibility

These utilities work across all React Native platforms:

- ✅ iOS
- ✅ Android
- ✅ Web
- ✅ All React Native environments
