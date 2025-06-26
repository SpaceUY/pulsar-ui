import { useState, useLayoutEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, Text } from '@space-uy/rn-spacedev-uikit';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function ButtonsExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader === 'true';
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          Button Configuration
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
            text="Download"
            iconName="Download"
            loading={loadingStates.download}
            onPress={() => handlePress('download')}
          />
          <Button
            text="Share"
            iconName="Share"
            variant="outline"
            loading={loadingStates.share}
            onPress={() => handlePress('share')}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Button States
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Normal"
            loading={loadingStates.normal}
            onPress={() => handlePress('normal')}
          />
          <Button text="Disabled" disabled />
          <Button text="Loading" loading />
        </View>
      </Card>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginHorizontal: 16, marginTop: 16 },
  firstExample: { marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginHorizontal: 16, marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
  buttonContainer: { gap: 12 },
  spacer: { height: 40 },
});
