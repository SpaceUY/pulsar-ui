import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Tabs } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

const tabs1 = [
  { label: 'Home', value: 'home' },
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
];

const tabs2 = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Archived', value: 'archived' },
];

const tabs3 = [
  { label: 'Overview', value: 'overview' },
  { label: 'Analytics', value: 'analytics' },
];

export default function TabsExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const [selectedTab1, setSelectedTab1] = useState(tabs1[0]!);
  const [selectedTab2, setSelectedTab2] = useState(tabs2[0]!);
  const [selectedTab3, setSelectedTab3] = useState(tabs3[0]!);

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
            Tabs
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Navigation tabs for organizing content into sections
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Tabs
        </Text>
        <Tabs
          options={tabs1}
          selected={selectedTab1}
          onChange={setSelectedTab1}
        />
        <View style={styles.tabContent}>
          <Text variant="pm">Current selection: {selectedTab1?.label}</Text>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Multiple Tabs
        </Text>
        <Tabs
          options={tabs2}
          selected={selectedTab2}
          onChange={setSelectedTab2}
        />
        <View style={styles.tabContent}>
          <Text variant="pm">Selected filter: {selectedTab2?.label}</Text>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Two Item Tabs
        </Text>
        <Tabs
          options={tabs3}
          selected={selectedTab3}
          onChange={setSelectedTab3}
        />
        <View style={styles.tabContent}>
          <Text variant="pm">Current view: {selectedTab3?.label}</Text>
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
  tabContent: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
});
