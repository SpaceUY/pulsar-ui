import { View, StyleSheet } from 'react-native';
import { Select, type SelectOption } from '@space-uy/rn-spacedev-uikit';
import { useState } from 'react';

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'mango', label: 'Mango' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'peach', label: 'Peach' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'plum', label: 'Plum' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'coconut', label: 'Coconut' },
  { value: 'fig', label: 'Fig' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'lime', label: 'Lime' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'dragonfruit', label: 'Dragon Fruit' },
  { value: 'guava', label: 'Guava' },
  { value: 'passionfruit', label: 'Passion Fruit' },
];

export default function SelectScreen() {
  const [selectedFruit, setSelectedFruit] = useState<SelectOption>();
  const [bottomFruit, setBottomFruit] = useState<SelectOption>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Basic Select */}
        <Select
          options={fruits}
          value={selectedFruit}
          title="Pick a fruit"
          onChange={setSelectedFruit}
          placeholder="Select a fruit"
          style={styles.select}
        />

        {/* Select with Label */}
        <Select
          label="Favorite Fruit"
          options={fruits}
          value={selectedFruit}
          onChange={setSelectedFruit}
          placeholder="Choose your favorite fruit"
          style={styles.select}
        />

        {/* Disabled Select */}
        <Select
          label="Disabled"
          options={fruits}
          value={undefined}
          onChange={() => {}}
          placeholder="This select is disabled"
          disabled
          style={styles.select}
        />
      </View>

      {/* Bottom Select to test dropdown position */}
      <View style={styles.bottomContainer}>
        <Select
          label="Select at bottom"
          options={fruits}
          value={bottomFruit}
          onChange={setBottomFruit}
          placeholder="Open to see dropdown position"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  select: {
    marginBottom: 16,
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});
