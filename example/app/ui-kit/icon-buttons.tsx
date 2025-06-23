import { ScrollView, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Card, IconButton, Text } from '@space-uy/rn-spacedev-uikit';

export default function IconButtonsExample() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handlePress = (buttonId: string, action: string) => {
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));
    console.log(action);

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
    }, 2000); // Loading for 2 seconds
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Icon Buttons
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Icon buttons for quick actions and navigation
        </Text>
      </View>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Icon Button Sizes
        </Text>
        <View style={styles.buttonRow}>
          <IconButton
            iconName="Heart"
            size="small"
            loading={loadingStates['heart-small']}
            onPress={() => handlePress('heart-small', 'Small heart pressed')}
          />
          <IconButton
            iconName="Heart"
            size="medium"
            loading={loadingStates['heart-medium']}
            onPress={() => handlePress('heart-medium', 'Medium heart pressed')}
          />
          <IconButton
            iconName="Heart"
            size="large"
            loading={loadingStates['heart-large']}
            onPress={() => handlePress('heart-large', 'Large heart pressed')}
          />
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Icon Button Variants
        </Text>
        <View style={styles.buttonRow}>
          <IconButton
            iconName="Settings"
            variant="flat"
            loading={loadingStates['settings-flat']}
            onPress={() =>
              handlePress('settings-flat', 'Flat settings pressed')
            }
          />
          <IconButton
            iconName="Settings"
            variant="outline"
            loading={loadingStates['settings-outline']}
            onPress={() =>
              handlePress('settings-outline', 'Outline settings pressed')
            }
          />
          <IconButton
            iconName="Settings"
            variant="transparent"
            loading={loadingStates['settings-transparent']}
            onPress={() =>
              handlePress(
                'settings-transparent',
                'Transparent settings pressed'
              )
            }
          />
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Icon Button States
        </Text>
        <View style={styles.buttonRow}>
          <IconButton
            iconName="Star"
            loading={loadingStates['star-active']}
            onPress={() => handlePress('star-active', 'Active star pressed')}
          />
          <IconButton
            iconName="Star"
            disabled
            onPress={() => console.log('Should not execute')}
          />
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Common Icons
        </Text>
        <View style={styles.iconGrid}>
          <IconButton
            iconName="House"
            loading={loadingStates.house}
            onPress={() => handlePress('house', 'Home pressed')}
          />
          <IconButton
            iconName="Search"
            loading={loadingStates.search}
            onPress={() => handlePress('search', 'Search pressed')}
          />
          <IconButton
            iconName="Bell"
            loading={loadingStates.bell}
            onPress={() => handlePress('bell', 'Notifications pressed')}
          />
          <IconButton
            iconName="User"
            loading={loadingStates.user}
            onPress={() => handlePress('user', 'Profile pressed')}
          />
          <IconButton
            iconName="Plus"
            loading={loadingStates.plus}
            onPress={() => handlePress('plus', 'Add pressed')}
          />
          <IconButton
            iconName="Menu"
            loading={loadingStates.menu}
            onPress={() => handlePress('menu', 'Menu pressed')}
          />
        </View>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  },
  spacer: { height: 40 },
});
