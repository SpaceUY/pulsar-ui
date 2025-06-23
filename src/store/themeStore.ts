import { create } from 'zustand';
import type { ColorSchemeName } from 'react-native';

import { darkColors, lightColors, type ColorPalette } from '../theme/colors';

type Theme = {
  colors: { dark: ColorPalette; light: ColorPalette };
  fonts: { light: string; regular: string; medium: string; bold: string };
  roundness: number;
  insets: { top: number; left: number; right: number; bottom: number };
};

const defaultTheme: Theme = {
  colors: { dark: darkColors, light: lightColors },
  fonts: {
    light: 'Inter_300Light',
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    bold: 'Inter_700Bold',
  },
  roundness: 6,
  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

type ThemeStore = {
  theme: Theme;
  colorScheme: ColorSchemeName;
  colors: ColorPalette;
  setTheme: (theme: Theme) => void;
  setColorScheme: (colorScheme: ColorSchemeName) => void;
};

const themeStore = create<ThemeStore>((set, get) => ({
  theme: defaultTheme,
  colorScheme: 'light',
  colors: lightColors,
  setTheme: (theme: Theme) => {
    const { colorScheme } = get();
    const colors =
      colorScheme === 'dark' ? theme.colors.dark : theme.colors.light;
    set({ theme, colors });
  },
  setColorScheme: (colorScheme: ColorSchemeName) => {
    const { theme } = get();
    const colors =
      colorScheme === 'dark' ? theme.colors.dark : theme.colors.light;
    set({ colorScheme, colors });
  },
}));

export type { Theme, ThemeStore };
export default themeStore;
