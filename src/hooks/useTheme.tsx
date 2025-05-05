import { useContext } from 'react';

import ThemeContext from '../contexts/ThemeContext';

const useTheme = () => {
  const { theme, setTheme, colorScheme, setColorScheme, colors } =
    useContext(ThemeContext);
  return { theme, setTheme, colorScheme, setColorScheme, colors };
};

export default useTheme;
