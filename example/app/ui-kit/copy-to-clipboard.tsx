import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, CopyToClipboard, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function CopyToClipboardExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Copy to Clipboard
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Component for copying text to clipboard with visual feedback
          </Text>
        </View>
      )}

      {/* Basic example */}
      <Card
        variant="tinted"
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
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
    </ResponsiveScroll>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginTop: 16 },
  firstExample: { marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7, marginBottom: 16 },
  exampleContainer: { marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
});
