import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, type Tab } from '@space-uy/rn-spacedev-uikit';

const tabs: Tab[] = [
  { value: 'one', label: 'Tab one' },
  { value: 'two', label: 'Tab two' },
  { value: 'three', label: 'Tab three' },
];

export default function TabsScreen() {
  const [selected, setSelected] = useState<Tab>(tabs[0]!);
  return (
    <View style={styles.container}>
      <Tabs options={tabs} selected={selected} onChange={setSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
