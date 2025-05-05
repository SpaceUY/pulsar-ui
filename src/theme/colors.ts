export type ColorPalette = {
  primary: string;
  foregroundOnPrimary: string;
  background: string;
  altBackground: string;
  foreground: string;
  altForeground: string;
  destructive: string;
  border: string;
  foregroundOnDestructive: string;
};

export const darkColors: ColorPalette = {
  primary: '#FAFAFA',
  foregroundOnPrimary: '#09090B',
  background: '#09090B',
  altBackground: '#09090B',
  foreground: '#FAFAFA',
  altForeground: '#18181B',
  border: '#27272A',
  destructive: '#DC2626',
  foregroundOnDestructive: '#FFFFFF',
};

export const lightColors: ColorPalette = {
  primary: '#09090B',
  foregroundOnPrimary: '#FFFFFF',
  background: '#FFFFFF',
  altBackground: '#FFFFFF',
  foreground: '#09090B',
  altForeground: '#FAFAFA',
  border: '#E4E4E7',
  destructive: '#DC2626',
  foregroundOnDestructive: '#FFFFFF',
};
