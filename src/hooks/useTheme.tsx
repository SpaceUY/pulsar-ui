import { useMemo } from 'react';
import themeStore from '../store/themeStore';

const useUIKitTheme = () => {
  const theme = themeStore((state) => state.theme);
  const setTheme = themeStore((state) => state.setTheme);
  const colorScheme = themeStore((state) => state.colorScheme);
  const setColorScheme = themeStore((state) => state.setColorScheme);
  const colors = themeStore((state) => state.colors);

  return useMemo(
    () => ({
      theme,
      setTheme,
      colorScheme,
      setColorScheme,
      colors,
    }),
    [theme, setTheme, colorScheme, setColorScheme, colors]
  );
};

export default useUIKitTheme;
