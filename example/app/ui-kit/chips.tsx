import { View } from 'react-native';
import { Chip } from '@space-uy/rn-spacedev-uikit';

export default function ChipsScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip text="Normal" />
        <Chip text="Small" size="small" />
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip text="Disabled" disabled />
        <Chip text="Disabled Small" size="small" disabled />
      </View>
    </View>
  );
}
