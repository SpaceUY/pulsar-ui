import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Checkbox, Text } from '@space-uy/rn-spacedev-uikit';

export default function CheckboxesExample() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Checkboxes
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Multiple selection controls with different states
        </Text>
      </View>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Checkboxes
        </Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={checked1}
            onCheckedChange={setChecked1}
            label="I accept the terms and conditions"
            description="You agree to our Terms of Service and Privacy Policy."
          />
          <Checkbox
            checked={checked2}
            onCheckedChange={setChecked2}
            label="Receive notifications"
            description="Get updates about new features and important announcements."
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Checkbox Deshabilitado
        </Text>
        <View style={styles.checkboxGroup}>
          <Checkbox
            checked={checked3}
            onCheckedChange={setChecked3}
            label="Opción deshabilitada (no seleccionado)"
            description="Esta opción no está disponible en este momento."
            disabled
          />
          <Checkbox
            checked={checked5}
            onCheckedChange={setChecked5}
            label="Opción deshabilitada (seleccionado)"
            description="Esta opción está permanentemente habilitada."
            disabled
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Checkbox Simple
        </Text>
        <Checkbox
          checked={checked4}
          onCheckedChange={setChecked4}
          label="Suscribirse al newsletter"
        />
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
  checkboxContainer: { gap: 16 },
  checkboxGroup: { gap: 16 },
  spacer: { height: 40 },
});
