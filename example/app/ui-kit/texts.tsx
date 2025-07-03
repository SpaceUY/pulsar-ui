import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function TextsExample() {
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
            Text
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Text components with different variants and typography styles
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Headings
        </Text>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text variant="h1" style={styles.text}>
              Heading 1
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="h2" style={styles.text}>
              Heading 2
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="h3" style={styles.text}>
              Heading 3
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="h4" style={styles.text}>
              Heading 4
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="h5" style={styles.text}>
              Heading 5
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Body Text
        </Text>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text variant="pl" style={styles.text}>
              Large Body Text
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="pm" style={styles.text}>
              Medium Body Text
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="ps" style={styles.text}>
              Small Body Text
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text variant="caption" style={styles.text}>
              Caption Text
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Paragraph Example
        </Text>
        <Text variant="pm" style={styles.paragraph}>
          This is a longer paragraph text example that demonstrates how text
          flows naturally within a container. It shows proper line spacing,
          readability, and how the text component handles multiple lines of
          content. The paragraph maintains good typography principles with
          appropriate line height and spacing between words and letters.
        </Text>
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
  textContainer: { gap: 16 },
  textRow: {},
  text: {},
  paragraph: { lineHeight: 24 },
});
