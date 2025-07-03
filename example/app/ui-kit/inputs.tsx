import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function InputsExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('Sample text');
  const [value3, setValue3] = useState('');

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Inputs
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Text input fields with different states and configurations
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Input
        </Text>
        <Input
          value={value1}
          onChangeText={setValue1}
          placeholder="Basic text"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Input with Icon
        </Text>
        <Input
          value={value2}
          onChangeText={setValue2}
          iconName="User"
          placeholder="With icon"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Input with Label
        </Text>
        <Input
          value={value3}
          onChangeText={setValue3}
          label="Full Name"
          placeholder="Enter your full name"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Input with Error
        </Text>
        <Input
          value=""
          label="Email"
          placeholder="Enter your email"
          error
          hint="This field is required"
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Input States
        </Text>
        <View style={styles.inputContainer}>
          <Input placeholder="Normal" />
          <Input placeholder="Disabled" editable={false} />
          <Input
            placeholder="Read Only"
            readOnly
            value="This text cannot be edited"
          />
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
  inputContainer: { gap: 16 },
});
