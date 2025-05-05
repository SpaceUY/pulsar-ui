/**
 * Converts a hex color code to an rgba color string with the specified opacity
 * @param hex - The hex color code (e.g. '#FF0000')
 * @param opacity - The opacity value between 0 and 1
 * @returns An rgba color string (e.g. 'rgba(255,0,0,0.5)')
 */
export const convertHexToRgba = (hex: string, opacity: number): string => {
  const tempHex = hex.replace('#', '');
  const red = parseInt(tempHex.substring(0, 2), 16);
  const green = parseInt(tempHex.substring(2, 4), 16);
  const blue = parseInt(tempHex.substring(4, 6), 16);

  return `rgba(${red},${green},${blue},${opacity})`;
};

/**
 * Calculates the contrast ratio between two colors according to WCAG guidelines
 * @param color1 - The first color in hex format (e.g. '#FF0000')
 * @param color2 - The second color in hex format (e.g. '#FFFFFF')
 * @returns The contrast ratio as a number (higher values indicate better contrast)
 */
export const getColorContrastRatio = (
  color1: string,
  color2: string
): number => {
  // Convert hex colors to RGB
  const getRGB = (color: string): [number, number, number] => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  };

  // Calculate relative luminance
  const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const mappedValues = [r, g, b].map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    const [rs, gs, bs] = mappedValues as [number, number, number];
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const [r1, g1, b1] = getRGB(color1);
  const [r2, g2, b2] = getRGB(color2);

  const l1 = getRelativeLuminance(r1, g1, b1);
  const l2 = getRelativeLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Determines whether black or white text would be more readable on a given background color
 * @param backgroundColor - The background color in hex format (e.g. '#FF0000')
 * @returns Either 'black' or 'white' depending on which provides better contrast
 */
export const getAccessibleTextColor = (
  backgroundColor: string
): 'black' | 'white' => {
  const blackContrast = getColorContrastRatio(backgroundColor, '#000000');
  const whiteContrast = getColorContrastRatio(backgroundColor, '#FFFFFF');

  // Return the color with higher contrast ratio
  return blackContrast > whiteContrast ? 'black' : 'white';
};
