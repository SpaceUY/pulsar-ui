import type { StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon, LucideProps } from 'lucide-react-native';
import * as icons from 'lucide-react-native';

import useTheme from '../hooks/useTheme';

type IconsModule = typeof icons;
type IconKeys = {
  [K in keyof IconsModule]: IconsModule[K] extends LucideIcon ? K : never;
}[keyof IconsModule];

export type IconName = IconKeys;

type Props = Omit<LucideProps, 'style'> & {
  name: IconName;
  style?: StyleProp<ViewStyle>;
};

export default function Icon({
  name,
  size = 24,
  color,
  style,
  ...props
}: Props) {
  const { colors } = useTheme();

  const IconComponent = icons[name] as LucideIcon;

  return (
    <IconComponent
      size={size}
      color={color ?? colors.foreground}
      style={style}
      {...props}
    />
  );
}
