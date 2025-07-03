import { View, StyleSheet } from 'react-native';
import { useState, useLayoutEffect } from 'react';
import { CalendarPicker, Card, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function CalendarPickerExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const [selectedDateRange1, setSelectedDateRange1] = useState<{
    fromDate?: string;
    toDate?: string;
  }>({});

  const [selectedDateRange2, setSelectedDateRange2] = useState<{
    fromDate?: string;
    toDate?: string;
  }>({});

  const [selectedDateRange3, setSelectedDateRange3] = useState<{
    fromDate?: string;
    toDate?: string;
  }>({});

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Calendar Picker
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Date range selection component with calendar interface
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Calendar Range Picker
        </Text>
        <CalendarPicker
          value={selectedDateRange1}
          onChange={setSelectedDateRange1}
          label="Choose Date Range"
          placeholder="Select date range"
        />
        {(selectedDateRange1.fromDate || selectedDateRange1.toDate) && (
          <Text variant="pm" style={styles.selectedDate}>
            {selectedDateRange1.fromDate &&
              !selectedDateRange1.toDate &&
              `Start Date: ${new Date(selectedDateRange1.fromDate).toLocaleDateString()}`}
            {selectedDateRange1.fromDate &&
              selectedDateRange1.toDate &&
              `Range: ${new Date(selectedDateRange1.fromDate).toLocaleDateString()} - ${new Date(selectedDateRange1.toDate).toLocaleDateString()}`}
          </Text>
        )}
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Calendar with Custom Label
        </Text>
        <CalendarPicker
          value={selectedDateRange2}
          onChange={setSelectedDateRange2}
          label="Trip Dates"
          placeholder="Select departure and return dates"
        />
        {(selectedDateRange2.fromDate || selectedDateRange2.toDate) && (
          <Text variant="pm" style={styles.selectedDate}>
            {selectedDateRange2.fromDate &&
              !selectedDateRange2.toDate &&
              `Departure: ${new Date(selectedDateRange2.fromDate).toLocaleDateString()}`}
            {selectedDateRange2.fromDate &&
              selectedDateRange2.toDate &&
              `Trip: ${new Date(selectedDateRange2.fromDate).toLocaleDateString()} - ${new Date(selectedDateRange2.toDate).toLocaleDateString()}`}
          </Text>
        )}
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Calendar with Hint Text
        </Text>
        <CalendarPicker
          value={selectedDateRange3}
          onChange={setSelectedDateRange3}
          label="Event Duration"
          placeholder="Select start and end dates"
          hint="Choose dates for your event duration"
        />
        {(selectedDateRange3.fromDate || selectedDateRange3.toDate) && (
          <Text variant="pm" style={styles.selectedDate}>
            {selectedDateRange3.fromDate &&
              !selectedDateRange3.toDate &&
              `Start: ${new Date(selectedDateRange3.fromDate).toLocaleDateString()}`}
            {selectedDateRange3.fromDate &&
              selectedDateRange3.toDate &&
              `Duration: ${new Date(selectedDateRange3.fromDate).toLocaleDateString()} - ${new Date(selectedDateRange3.toDate).toLocaleDateString()}`}
          </Text>
        )}
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
  selectedDate: {
    marginTop: 12,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
  spacer: { height: 40 },
});
