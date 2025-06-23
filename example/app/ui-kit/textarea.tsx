import { ScrollView, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Card, TextArea, Text } from '@space-uy/rn-spacedev-uikit';

export default function TextAreaExample() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('Sample text for textarea');
  const [value3, setValue3] = useState('');
  const [value4, _setValue4] = useState('This text cannot be edited.');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          TextArea
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Multiline text fields for extensive text input
        </Text>
      </View>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Basic TextArea
        </Text>
        <TextArea
          value={value1}
          onChangeText={setValue1}
          placeholder="Enter your message here..."
          style={{ minHeight: 80 }}
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          TextArea with Label
        </Text>
        <TextArea
          value={value2}
          onChangeText={setValue2}
          label="Description"
          placeholder="Enter description..."
          style={{ minHeight: 100 }}
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          TextArea with Error
        </Text>
        <TextArea
          value={value3}
          onChangeText={setValue3}
          label="Comments"
          placeholder="Required field"
          error
          hint="This field is required"
          style={{ minHeight: 80 }}
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          TextArea States
        </Text>
        <View style={styles.textareaContainer}>
          <TextArea placeholder="Normal" style={{ minHeight: 60 }} />
          <TextArea
            placeholder="Disabled"
            editable={false}
            style={{ minHeight: 60 }}
          />
          <TextArea
            value={value4}
            editable={false}
            label="Read-only information"
            style={{ minHeight: 60 }}
          />
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
  textareaContainer: { gap: 16 },
  spacer: { height: 40 },
});
