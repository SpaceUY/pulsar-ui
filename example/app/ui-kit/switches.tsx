import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Switch, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function SwitchesExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [location, setLocation] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Switches
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Toggle switches for boolean settings and preferences
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Switches
        </Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Push Notifications</Text>
              <Text variant="ps" style={styles.switchDescription}>
                Receive alerts and updates
              </Text>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Dark Mode</Text>
              <Text variant="ps" style={styles.switchDescription}>
                Use dark theme interface
              </Text>
            </View>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Auto Sync</Text>
              <Text variant="ps" style={styles.switchDescription}>
                Automatically sync data
              </Text>
            </View>
            <Switch value={autoSync} onValueChange={setAutoSync} />
          </View>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Privacy Settings
        </Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Location Services</Text>
              <Text variant="ps" style={styles.switchDescription}>
                Allow app to access your location
              </Text>
            </View>
            <Switch value={location} onValueChange={setLocation} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Analytics</Text>
              <Text variant="ps" style={styles.switchDescription}>
                Share usage data to improve app
              </Text>
            </View>
            <Switch value={analytics} onValueChange={setAnalytics} />
          </View>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Switch States
        </Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Enabled Switch</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text variant="pm">Disabled Switch</Text>
            </View>
            <Switch value={false} onValueChange={() => {}} disabled />
          </View>
        </View>
      </Card>

      <View style={styles.spacer} />
    </ResponsiveScroll>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 16 },
  spacer: { height: 40 },
  firstExample: { marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
  switchContainer: { gap: 16 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchInfo: { flex: 1, marginRight: 16 },
  switchDescription: { opacity: 0.7, marginTop: 4 },
});
