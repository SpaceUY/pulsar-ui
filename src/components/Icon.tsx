import type { StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import * as icons from 'lucide-react-native';

import useTheme from '../hooks/useTheme';

// Filtrar solo los iconos (excluyendo utilidades como createLucideIcon, etc.)
type IconsModule = typeof icons;
type IconKeys = {
  [K in keyof IconsModule]: IconsModule[K] extends LucideIcon ? K : never;
}[keyof IconsModule];

export type IconName = IconKeys;

type Props = {
  style?: StyleProp<ViewStyle>;
  name: IconName;
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color, style }: Props) {
  const { colors } = useTheme();

  const IconComponent = icons[name] as LucideIcon;

  return (
    <IconComponent
      size={size}
      color={color ?? colors.foreground}
      style={style}
    />
  );
}
