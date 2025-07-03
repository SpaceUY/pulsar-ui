import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Select, Text, type SelectOption } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Spain', value: 'es' },
  { label: 'Italy', value: 'it' },
];

const largeCountryOptions = [
  { label: 'Afghanistan', value: 'af' },
  { label: 'Albania', value: 'al' },
  { label: 'Algeria', value: 'dz' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Australia', value: 'au' },
  { label: 'Austria', value: 'at' },
  { label: 'Belgium', value: 'be' },
  { label: 'Brazil', value: 'br' },
  { label: 'Canada', value: 'ca' },
  { label: 'Chile', value: 'cl' },
  { label: 'China', value: 'cn' },
  { label: 'Colombia', value: 'co' },
  { label: 'Denmark', value: 'dk' },
  { label: 'Ecuador', value: 'ec' },
  { label: 'Egypt', value: 'eg' },
  { label: 'Finland', value: 'fi' },
  { label: 'France', value: 'fr' },
  { label: 'Germany', value: 'de' },
  { label: 'Greece', value: 'gr' },
  { label: 'India', value: 'in' },
  { label: 'Indonesia', value: 'id' },
  { label: 'Ireland', value: 'ie' },
  { label: 'Israel', value: 'il' },
  { label: 'Italy', value: 'it' },
  { label: 'Japan', value: 'jp' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Netherlands', value: 'nl' },
  { label: 'New Zealand', value: 'nz' },
  { label: 'Norway', value: 'no' },
  { label: 'Peru', value: 'pe' },
  { label: 'Poland', value: 'pl' },
  { label: 'Portugal', value: 'pt' },
  { label: 'Russia', value: 'ru' },
  { label: 'South Africa', value: 'za' },
  { label: 'South Korea', value: 'kr' },
  { label: 'Spain', value: 'es' },
  { label: 'Sweden', value: 'se' },
  { label: 'Switzerland', value: 'ch' },
  { label: 'Turkey', value: 'tr' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'United States', value: 'us' },
  { label: 'Uruguay', value: 'uy' },
  { label: 'Venezuela', value: 've' },
];

export default function SelectExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const [selected1, setSelected1] = useState<SelectOption | undefined>(
    undefined
  );
  const [selected2, setSelected2] = useState<SelectOption | undefined>(
    undefined
  );
  const [selected3, setSelected3] = useState<SelectOption | undefined>(
    undefined
  );
  const [selected4, setSelected4] = useState<SelectOption | undefined>(
    undefined
  );

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Select
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Dropdown selection components for choosing from multiple options
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Select
        </Text>
        <Select
          options={options}
          value={selected1}
          onChange={setSelected1}
          placeholder="Select an option"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Select with Label
        </Text>
        <Select
          options={countryOptions}
          value={selected2}
          onChange={setSelected2}
          label="Country of residence"
          placeholder="Choose your country"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Select with Error
        </Text>
        <Select
          options={options}
          value={selected3}
          onChange={setSelected3}
          label="Required Field"
          placeholder="Must select"
          error
          hint="You must select an option"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Select States
        </Text>
        <View style={styles.selectContainer}>
          <Select options={options} placeholder="Normal" onChange={() => {}} />
          <Select
            options={options}
            placeholder="Disabled"
            disabled
            onChange={() => {}}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Full Screen Select (20+ options)
        </Text>
        <Text variant="ps" style={styles.exampleDescription}>
          When there are more than 20 options, the select automatically opens in
          full screen mode
        </Text>
        <Select
          options={largeCountryOptions}
          value={selected4}
          onChange={setSelected4}
          title="Select Country"
          label="Country"
          placeholder="Choose from all countries"
        />
      </Card>

      <View style={styles.spacer} />
    </ResponsiveScroll>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginTop: 16 },
  firstExample: { marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
  selectContainer: { gap: 16 },
  spacer: { height: 40 },
  exampleDescription: {
    opacity: 0.7,
    marginBottom: 12,
  },
});
