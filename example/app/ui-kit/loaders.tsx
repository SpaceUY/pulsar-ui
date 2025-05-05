import { View } from 'react-native';
import { LoadingIndicator } from 'rn-spacedev-uikit';

export default function LoadersScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 24 }}>
      <View style={{ alignItems: 'center' }}>
        <LoadingIndicator size={16} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <LoadingIndicator />
      </View>
      <View style={{ alignItems: 'center' }}>
        <LoadingIndicator size={32} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <LoadingIndicator style={{ opacity: 0.3 }} />
      </View>
    </View>
  );
}
