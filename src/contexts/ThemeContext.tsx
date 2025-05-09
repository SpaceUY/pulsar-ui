import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { darkColors, lightColors, type ColorPalette } from '../theme/colors';
import type { ColorSchemeName } from 'react-native';

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

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorScheme: ColorSchemeName;
  setColorScheme: (colorScheme: ColorSchemeName) => void;
  colors: ColorPalette;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  colorScheme: 'light',
  setColorScheme: () => {},
  colors: lightColors,
});

const ThemeContextProvider = ({
  initialTheme,
  children,
}: PropsWithChildren & { initialTheme?: Theme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme);
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>('light');
  const [colors, setColors] = useState<ColorPalette>(lightColors);

  useEffect(() => {
    setColors(colorScheme === 'dark' ? theme.colors.dark : theme.colors.light);
  }, [colorScheme, theme.colors.dark, theme.colors.light]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, colorScheme, setColorScheme, colors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };
export default ThemeContext;
