import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Dialog,
  DialogAction,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Text,
  Input,
} from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function DialogExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const [basicDialogVisible, setBasicDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [formDialogVisible, setFormDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
            Dialogs
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Modal dialogs for user interaction and confirmation
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Dialog
        </Text>
        <Button
          text="Show Basic Dialog"
          onPress={() => setBasicDialogVisible(true)}
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Confirmation Dialog
        </Text>
        <Button
          text="Show Confirmation"
          variant="outline"
          onPress={() => setConfirmDialogVisible(true)}
        />
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Form Dialog
        </Text>
        <Button
          text="Show Form Dialog"
          variant="transparent"
          onPress={() => setFormDialogVisible(true)}
        />
      </Card>

      {/* Basic Dialog */}
      <Dialog
        visible={basicDialogVisible}
        onDismiss={() => setBasicDialogVisible(false)}
      >
        <DialogHeader>
          <DialogTitle>Basic Dialog</DialogTitle>
          <DialogDescription>
            This is a simple dialog with basic content and actions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogAction onPress={() => setBasicDialogVisible(false)}>
            Cancel
          </DialogAction>
          <DialogAction onPress={() => setBasicDialogVisible(false)}>
            Accept
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
            Are you sure you want to proceed with this action? This cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogAction onPress={() => setConfirmDialogVisible(false)}>
            Cancel
          </DialogAction>
          <DialogAction
            destructive
            onPress={() => setConfirmDialogVisible(false)}
          >
            Delete
          </DialogAction>
        </DialogFooter>
      </Dialog>

      {/* Form Dialog */}
      <Dialog
        visible={formDialogVisible}
        onDismiss={() => setFormDialogVisible(false)}
      >
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Enter the details for the new item you want to add.
          </DialogDescription>
        </DialogHeader>
        <View style={styles.formContent}>
          <Input
            label="Item Name"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter item name"
          />
        </View>
        <DialogFooter>
          <DialogAction onPress={() => setFormDialogVisible(false)}>
            Cancel
          </DialogAction>
          <DialogAction
            onPress={() => {
              setInputValue('');
              setFormDialogVisible(false);
            }}
          >
            Add Item
          </DialogAction>
        </DialogFooter>
      </Dialog>

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
  formContent: { paddingVertical: 16 },
});
