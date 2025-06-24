---
title: Theming
description: Learn how to configure and customize the UI Kit theme system, including support for dark and light mode.
---

The **SpaceDev UI Kit** includes a complete theming system that allows you to customize the appearance of all components, with native support for dark and light modes.

## Initial Setup

To use the theming system, you need to configure the `useUIKitTheme` hook in your application's root component:

```tsx
import { useUIKitTheme } from '@space-uy/rn-spacedev-uikit';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { setTheme, setColorScheme } = useUIKitTheme();
  const systemColorScheme = useColorScheme();

  // Configure custom theme on component mount
  useEffect(() => {
    setTheme({
      colors: {
        light: {
          primary: '#09090B',
          foregroundOnPrimary: '#FFFFFF',
          background: '#FFFFFF',
          altBackground: '#FFFFFF',
          foreground: '#09090B',
          altForeground: '#FAFAFA',
          border: '#E4E4E7',
          destructive: '#DC2626',
          foregroundOnDestructive: '#FFFFFF',
        },
        dark: {
          primary: '#FAFAFA',
          foregroundOnPrimary: '#09090B',
          background: '#09090B',
          altBackground: '#09090B',
          foreground: '#FAFAFA',
          altForeground: '#18181B',
          border: '#27272A',
          destructive: '#DC2626',
          foregroundOnDestructive: '#FFFFFF',
        },
      },
      fonts: {
        light: 'Inter_300Light',
        regular: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        bold: 'Inter_700Bold',
      },
      roundness: 6,
      insets,
    });
  }, [insets, setTheme]);

  // Sync with system color scheme
  useEffect(() => {
    setColorScheme(systemColorScheme);
  }, [systemColorScheme, setColorScheme]);

  return (
    // Your app here
  );
}
```

## Dark/Light Mode Management

### Automatic System Sync

The UI Kit can automatically sync with system preferences:

```tsx
import { useColorScheme } from 'react-native';
import { useUIKitTheme } from '@space-uy/rn-spacedev-uikit';

function App() {
  const systemColorScheme = useColorScheme();
  const { setColorScheme } = useUIKitTheme();

  useEffect(() => {
    // Automatically sync with system
    setColorScheme(systemColorScheme);
  }, [systemColorScheme, setColorScheme]);
}
```

### Manual Theme Toggle

To allow users to manually switch between dark and light modes:

```tsx
import { useUIKitTheme } from '@space-uy/rn-spacedev-uikit';
import { Switch, View, Text } from 'react-native';

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useUIKitTheme();
  const isDarkMode = colorScheme === 'dark';

  const handleToggle = () => {
    setColorScheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={handleToggle} />
    </View>
  );
}
```

## Accessing Theme Colors

Once the theme is configured, you can access current colors from any component:

```tsx
import { useUIKitTheme } from '@space-uy/rn-spacedev-uikit';
import { View, Text } from 'react-native';

function MyComponent() {
  const { colors, colorScheme } = useUIKitTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>
        Current theme: {colorScheme}
      </Text>
    </View>
  );
}
```

## Advanced Customization

### Custom Colors

You can customize any theme color:

```tsx
const customTheme = {
  colors: {
    light: {
      primary: '#3B82F6', // Custom blue
      foregroundOnPrimary: '#FFFFFF',
      background: '#F8FAFC', // Slightly gray background
      altBackground: '#FFFFFF',
      foreground: '#1E293B',
      altForeground: '#64748B',
      border: '#CBD5E1',
      destructive: '#EF4444',
      foregroundOnDestructive: '#FFFFFF',
    },
    dark: {
      primary: '#60A5FA', // Lighter blue for dark mode
      foregroundOnPrimary: '#1E293B',
      background: '#0F172A',
      altBackground: '#1E293B',
      foreground: '#F1F5F9',
      altForeground: '#64748B',
      border: '#334155',
      destructive: '#F87171',
      foregroundOnDestructive: '#FFFFFF',
    },
  },
  fonts: {
    light: 'System-Light',
    regular: 'System-Regular',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
  roundness: 8,
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
```

### Custom Fonts

To use custom fonts, first load them in your application and then configure them in the theme:

```tsx
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const { setTheme } = useUIKitTheme();

  useEffect(() => {
    if (fontsLoaded) {
      setTheme({
        // ... other theme values
        fonts: {
          light: 'Poppins_400Regular',
          regular: 'Poppins_400Regular',
          medium: 'Poppins_600SemiBold',
          bold: 'Poppins_600SemiBold',
        },
      });
    }
  }, [fontsLoaded, setTheme]);
}
```

### Global Border Radius

You can adjust the border radius for all components:

```tsx
const { setTheme, theme } = useUIKitTheme();

const updateBorderRadius = (newRadius: number) => {
  setTheme({
    ...theme,
    roundness: newRadius,
  });
};

// Usage: updateBorderRadius(12) for more rounded borders
```

## Best Practices

### 1. Single Configuration

Configure the theme once in your application's root component to ensure consistency.

### 2. Theme Persistence

Consider saving user preferences to persist theme between sessions:

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@user_theme_preference';

// Save preference
const saveThemePreference = async (colorScheme: 'light' | 'dark') => {
  await AsyncStorage.setItem(THEME_KEY, colorScheme);
};

// Load preference
const loadThemePreference = async () => {
  const saved = await AsyncStorage.getItem(THEME_KEY);
  return saved as 'light' | 'dark' | null;
};
```

### 3. Smooth Transitions

UI Kit components automatically handle theme transitions, but you can add additional animations if needed.

## TypeScript Types

The theming system includes complete TypeScript types:

```tsx
import type { Theme, ColorPalette } from '@space-uy/rn-spacedev-uikit';

// Type for a complete theme
const myTheme: Theme = {
  colors: {
    /* ... */
  },
  fonts: {
    /* ... */
  },
  roundness: 6,
  insets: {
    /* ... */
  },
};

// Type for color palette
const myColors: ColorPalette = {
  primary: '#000000',
  foregroundOnPrimary: '#FFFFFF',
  // ... rest of colors
};
```

## Color Palette Reference

The default color palette includes the following tokens:

| Token                     | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| `primary`                 | Main brand color for buttons, links, and active states |
| `foregroundOnPrimary`     | Text color to use on primary background                |
| `background`              | Main background color                                  |
| `altBackground`           | Alternative background color for cards, modals         |
| `foreground`              | Primary text color                                     |
| `altForeground`           | Secondary text color, disabled states                  |
| `border`                  | Border color for inputs, dividers                      |
| `destructive`             | Error states, delete actions                           |
| `foregroundOnDestructive` | Text color to use on destructive background            |

With this configuration, all UI Kit components will automatically adapt to your custom theme and respond to dark/light mode changes.
