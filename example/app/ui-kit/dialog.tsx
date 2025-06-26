import { useState, useLayoutEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogAction,
  DialogCancel,
  Text,
} from '@space-uy/rn-spacedev-uikit';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function DialogExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader === 'true';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const [basicDialogVisible, setBasicDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [destructiveDialogVisible, setDestructiveDialogVisible] =
    useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Dialog
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Modal dialogs that interrupt the user with important content
          </Text>
        </View>
      )}

      <Card
        variant="tinted"
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Dialog
        </Text>
        <Button
          text="Open Basic Dialog"
          onPress={() => setBasicDialogVisible(true)}
        />
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Confirmation Dialog
        </Text>
        <Button
          text="Open Confirmation Dialog"
          onPress={() => setConfirmDialogVisible(true)}
        />
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Destructive Dialog
        </Text>
        <Button
          text="Open Destructive Dialog"
          variant="destructive"
          onPress={() => setDestructiveDialogVisible(true)}
        />
      </Card>

      {/* Basic Dialog */}
      <Dialog
        visible={basicDialogVisible}
        onDismiss={() => setBasicDialogVisible(false)}
      >
        <DialogHeader>
          <DialogTitle>Information</DialogTitle>
          <DialogDescription>
            This is a basic dialog with important information for the user. It
            can contain text, images, or other content.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogAction onPress={() => setBasicDialogVisible(false)}>
            OK
          </DialogAction>
        </DialogFooter>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        visible={confirmDialogVisible}
        onDismiss={() => setConfirmDialogVisible(false)}
      >
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            This action will save the changes made. Do you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel onPress={() => setConfirmDialogVisible(false)}>
            Cancel
          </DialogCancel>
          <DialogAction onPress={() => setConfirmDialogVisible(false)}>
            Save
          </DialogAction>
        </DialogFooter>
      </Dialog>

      {/* Destructive Dialog */}
      <Dialog
        visible={destructiveDialogVisible}
        onDismiss={() => setDestructiveDialogVisible(false)}
      >
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel onPress={() => setDestructiveDialogVisible(false)}>
            Cancel
          </DialogCancel>
          <DialogAction
            onPress={() => setDestructiveDialogVisible(false)}
            destructive
          >
            Delete
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
  spacer: { height: 40 },
});
