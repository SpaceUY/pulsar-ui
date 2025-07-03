import { View, StyleSheet } from 'react-native';
import { useState, useLayoutEffect } from 'react';
import { Card, TextArea, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function TextAreaExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('Sample text for textarea');
  const [value3, setValue3] = useState('');
  const [value4, _setValue4] = useState('This text cannot be edited.');

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            TextArea
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Multiline text fields for extensive text input
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic TextArea
        </Text>
        <TextArea
          value={value1}
          onChangeText={setValue1}
          placeholder="Enter your message here..."
          style={styles.textAreaBasic}
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
          style={styles.textAreaWithLabel}
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
          style={styles.textAreaBasic}
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          TextArea States
        </Text>
        <View style={styles.textareaContainer}>
          <TextArea placeholder="Normal" style={styles.textAreaSmall} />
          <TextArea
            placeholder="Disabled"
            editable={false}
            style={styles.textAreaSmall}
          />
          <TextArea
            value={value4}
            editable={false}
            label="Read-only information"
            style={styles.textAreaSmall}
          />
        </View>
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
  textareaContainer: { gap: 16 },
  spacer: { height: 40 },
  textAreaBasic: { minHeight: 80 },
  textAreaWithLabel: { minHeight: 100 },
  textAreaSmall: { minHeight: 60 },
});
