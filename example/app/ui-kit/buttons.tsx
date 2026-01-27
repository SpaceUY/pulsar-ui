import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function ButtonsExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handlePress = (buttonId: string) => {
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
    }, 2000); // Loading for 2 seconds
  };

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Buttons
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Interactive buttons with multiple variants and states
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Button Sizes
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Small"
            size="small"
            loading={loadingStates.small}
            onPress={() => handlePress('small')}
          />
          <Button
            text="Medium"
            size="medium"
            loading={loadingStates.medium}
            onPress={() => handlePress('medium')}
          />
          <Button
            text="Large"
            size="large"
            loading={loadingStates.large}
            onPress={() => handlePress('large')}
          />
          <Button
            text="XLarge"
            size="xlarge"
            loading={loadingStates.xlarge}
            onPress={() => handlePress('xlarge')}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Button Variants
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Flat"
            variant="flat"
            loading={loadingStates.flat}
            onPress={() => handlePress('flat')}
          />
          <Button
            text="Outline"
            variant="outline"
            loading={loadingStates.outline}
            onPress={() => handlePress('outline')}
          />
          <Button
            text="Transparent"
            variant="transparent"
            loading={loadingStates.transparent}
            onPress={() => handlePress('transparent')}
          />
          <Button
            text="Destructive"
            variant="destructive"
            loading={loadingStates.destructive}
            onPress={() => handlePress('destructive')}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Button with Icon
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Small"
            iconName="Download"
            size="small"
            loading={loadingStates['icon-small']}
            onPress={() => handlePress('icon-small')}
          />
          <Button
            text="Medium"
            iconName="Download"
            size="medium"
            loading={loadingStates['icon-medium']}
            onPress={() => handlePress('icon-medium')}
          />
          <Button
            text="Large"
            iconName="Download"
            size="large"
            loading={loadingStates['icon-large']}
            onPress={() => handlePress('icon-large')}
          />
          <Button
            text="XLarge"
            iconName="Download"
            size="xlarge"
            loading={loadingStates['icon-xlarge']}
            onPress={() => handlePress('icon-xlarge')}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Loading States
        </Text>
        <View style={styles.buttonContainer}>
          <Button text="Small" size="small" loading />
          <Button text="Medium" size="medium" loading />
          <Button text="Large" size="large" loading />
          <Button text="XLarge" size="xlarge" loading />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Disabled States
        </Text>
        <View style={styles.buttonContainer}>
          <Button text="Small" size="small" disabled />
          <Button text="Medium" size="medium" disabled />
          <Button text="Large" size="large" disabled />
          <Button text="XLarge" size="xlarge" disabled />
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
  buttonContainer: { gap: 12 },
  spacer: { height: 40 },
});
