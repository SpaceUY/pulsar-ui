import { useState } from 'react';
import { View } from 'react-native';
import { Switch, Text } from 'rn-spacedev-uikit';

export default function SwitchesScreen() {
  const [enabled, setEnabled] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 24 }}>
        <Text variant="h3" style={{ marginBottom: 8 }}>
          Enabled Switch
        </Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      <View>
        <Text variant="h3" style={{ marginBottom: 8 }}>
          Disabled Switch
        </Text>
        <Switch value={false} disabled onValueChange={() => {}} />
      </View>
    </View>
  );
}
