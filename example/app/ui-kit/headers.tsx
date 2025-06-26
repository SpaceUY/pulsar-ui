import { useState, useLayoutEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Card,
  convertHexToRgba,
  Header,
  Text,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogAction,
  useUIKitTheme,
} from '@space-uy/rn-spacedev-uikit';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function HeadersExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader === 'true';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const showDialog = (message: string) => {
    setDialogMessage(message);
    setDialogVisible(true);
  };

  const { colors, theme } = useUIKitTheme();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Headers
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Headers with iOS-inspired design for consistent navigation
          </Text>
        </View>
      )}

      {/* Basic header with title only */}
      <Card
        variant="tinted"
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Header
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header useInsets={false} title="Main Title" />
        </View>
      </Card>

      {/* Header with left button */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          With Left Button
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            useInsets={false}
            title="My Profile"
            leftButton={{
              iconName: 'ChevronLeft',
              onPress: () => showDialog('Left button pressed'),
            }}
          />
        </View>
      </Card>

      {/* Header with right button */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          With Right Button
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            useInsets={false}
            title="Settings"
            rightButton={{
              iconName: 'Settings',
              onPress: () => showDialog('Settings pressed'),
            }}
          />
        </View>
      </Card>

      {/* Header with both icon buttons */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          With Both Buttons
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            useInsets={false}
            title="Messages"
            leftButton={{
              iconName: 'ChevronLeft',
              onPress: () => showDialog('Back'),
            }}
            rightButton={{
              iconName: 'Plus',
              onPress: () => showDialog('New message'),
            }}
          />
        </View>
      </Card>

      {/* Header with disabled button */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          With Disabled Button
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            useInsets={false}
            title="Form"
            leftButton={{
              iconName: 'ChevronLeft',
              onPress: () => showDialog('Back'),
              disabled: true,
            }}
            rightButton={{
              iconName: 'Settings',
              disabled: true,
              onPress: () => showDialog('Should not execute'),
            }}
          />
        </View>
      </Card>

      {/* Header with long title */}
      <Card
        variant="tinted"
        style={[
          styles.exampleContainer,
          { backgroundColor: convertHexToRgba(colors.border, 0.5) },
        ]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          With Long Title
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            useInsets={false}
            title="This is a very long title that should be truncated"
            leftButton={{
              iconName: 'ChevronLeft',
              onPress: () => showDialog('Back'),
            }}
            rightButton={{
              iconName: 'Menu',
              onPress: () => showDialog('More options'),
            }}
          />
        </View>
      </Card>

      {/* Header with insets (for main screens) */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          With Insets (Main Screen)
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            title="Header with Safe Area"
            leftButton={{
              iconName: 'ChevronLeft',
              onPress: () => showDialog('Back'),
            }}
            rightButton={{
              iconName: 'Settings',
              onPress: () => showDialog('Settings'),
            }}
          />
        </View>
      </Card>

      {/* Dialog to show actions */}
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <DialogHeader>
          <DialogTitle>Header Action</DialogTitle>
          <DialogDescription>{dialogMessage}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogAction onPress={() => setDialogVisible(false)}>
            Accept
          </DialogAction>
        </DialogFooter>
      </Dialog>

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
  headerWrapper: { overflow: 'hidden' },
  spacer: { height: 40 },
});
