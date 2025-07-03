import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, LoadingIndicator, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function LoadersExample() {
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
            Loaders
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Loading indicators to show loading states
          </Text>
        </View>
      )}

      <Card
        variant="tinted"
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Loading Sizes
        </Text>
        <View style={styles.loaderRow}>
          <LoadingIndicator size={16} />
          <LoadingIndicator size={24} />
          <LoadingIndicator size={32} />
          <LoadingIndicator size={48} />
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Loading Colors
        </Text>
        <View style={styles.loaderRow}>
          <LoadingIndicator size={32} />
          <LoadingIndicator size={32} color="#ff6b6b" />
          <LoadingIndicator size={32} color="#4ecdc4" />
          <LoadingIndicator size={32} color="#45b7d1" />
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
  loaderRow: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { height: 40 },
});
