import type { StyleProp, ViewStyle } from 'react-native';
import { icons } from 'lucide-react-native';

import useTheme from '../hooks/useTheme';

export type IconName = keyof typeof icons;

type Props = {
  style?: StyleProp<ViewStyle>;
  name: IconName;
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color, style }: Props) {
  const { colors } = useTheme();

  const IconComponent = icons[name];

  return (
    <IconComponent
      size={size}
      color={color ?? colors.foreground}
      style={style}
    />
  );
}
