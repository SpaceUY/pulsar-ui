import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text } from '@space-uy/rn-spacedev-uikit';

const textVariants = [
  { variant: 'h1', label: 'Heading 1' },
  { variant: 'h2', label: 'Heading 2' },
  { variant: 'h3', label: 'Heading 3' },
  { variant: 'h4', label: 'Heading 4' },
  { variant: 'xl', label: 'Extra Large' },
  { variant: 'lg', label: 'Large' },
  { variant: 'md', label: 'Medium' },
  { variant: 'sm', label: 'Small' },
  { variant: 'xs', label: 'Extra Small' },
  { variant: 'pm', label: 'Paragraph Medium' },
  { variant: 'ps', label: 'Paragraph Small' },
];

export default function TextsExample() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Typography
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Typography system with different variants and hierarchies
        </Text>
      </View>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Text Hierarchy
        </Text>
        <View style={styles.textContainer}>
          {textVariants.map(({ variant, label }) => (
            <View key={variant} style={styles.textRow}>
              <Text variant={variant as any} style={styles.text}>
                {label} - This is a sample {variant} text
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Paragraph Example
        </Text>
        <Text variant="pm" style={styles.paragraph}>
          This is a paragraph example that demonstrates how text flows naturally
          across multiple lines. It shows proper line height, spacing, and
          readability. Typography is crucial for creating great user experiences
          and maintaining visual hierarchy throughout the application.
        </Text>
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
  textContainer: { gap: 16 },
  textRow: {},
  text: {},
  paragraph: { lineHeight: 24 },
  spacer: { height: 40 },
});
