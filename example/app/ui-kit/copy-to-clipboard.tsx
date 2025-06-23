import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, CopyToClipboard, Text } from '@space-uy/rn-spacedev-uikit';

export default function CopyToClipboardExample() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Copy to Clipboard
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Component for copying text to clipboard with visual feedback
        </Text>
      </View>

      {/* Basic example */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Copy
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Simple copy with default text and icon
        </Text>
        <CopyToClipboard text="Hello World!" />
      </Card>

      {/* Example with long text */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Multiline Text
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Text can now expand to multiple lines automatically
        </Text>
        <CopyToClipboard text="This is a very long text that can now be displayed on multiple lines without being truncated, allowing better readability of the complete content" />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 20, paddingBottom: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7, marginBottom: 16 },
  exampleContainer: { marginHorizontal: 16, marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
});
