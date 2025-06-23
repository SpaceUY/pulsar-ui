import { ScrollView, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Card, Switch, Text } from '@space-uy/rn-spacedev-uikit';

export default function SwitchesExample() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Switches
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Toggle controls to activate or deactivate features
        </Text>
      </View>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Interactive Switches
        </Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Push Notifications</Text>
              <Text variant="ps" style={styles.switchDescription}>
                Receive notifications directly on your device
              </Text>
            </View>
            <Switch value={switch1} onValueChange={setSwitch1} />
          </View>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Premium Features</Text>
              <Text variant="ps" style={styles.switchDescription}>
                This feature requires a premium subscription
              </Text>
            </View>
            <Switch value={switch2} onValueChange={setSwitch2} />
          </View>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Switch States
        </Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <Text variant="pm" style={styles.switchInfo}>
              Off
            </Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.switchRow}>
            <Text variant="pm" style={styles.switchInfo}>
              On
            </Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
          <View style={styles.switchRow}>
            <Text variant="pm" style={styles.switchInfo}>
              Disabled Off
            </Text>
            <Switch value={false} onValueChange={() => {}} disabled />
          </View>
          <View style={styles.switchRow}>
            <Text variant="pm" style={styles.switchInfo}>
              Disabled On
            </Text>
            <Switch value={true} onValueChange={() => {}} disabled />
          </View>
        </View>
      </Card>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 20, paddingBottom: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginHorizontal: 16, marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
  switchContainer: { gap: 16 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchInfo: { flex: 1, marginRight: 16 },
  switchDescription: { opacity: 0.7, marginTop: 4 },
  spacer: { height: 40 },
});
