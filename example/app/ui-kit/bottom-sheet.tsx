import { useRef, useLayoutEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Button,
  BottomSheet,
  Icon,
  Switch,
  Checkbox,
} from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

type BottomSheetRef = {
  show: () => void;
  hide: () => void;
  isActive: boolean;
};

export default function BottomSheetExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const basicSheetRef = useRef<BottomSheetRef>(null);
  const formSheetRef = useRef<BottomSheetRef>(null);
  const fullScreenSheetRef = useRef<BottomSheetRef>(null);

  const [switchValue, setSwitchValue] = useState(false);
  const [darkModeValue, setDarkModeValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  return (
    <>
      <ResponsiveScroll>
        {headerVisible && (
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              Bottom Sheet
            </Text>
            <Text variant="pm" style={styles.sectionDescription}>
              Modal panel that slides up from the bottom of the screen
            </Text>
          </View>
        )}

        <Card
          style={[
            styles.exampleContainer,
            headerVisible && styles.firstExample,
          ]}
        >
          <Text variant="h4" style={styles.exampleTitle}>
            Basic Bottom Sheet
          </Text>
          <Button
            text="Show Basic Sheet"
            onPress={() => basicSheetRef.current?.show()}
          />
        </Card>

        <Card style={styles.exampleContainer}>
          <Text variant="h4" style={styles.exampleTitle}>
            Form Example
          </Text>
          <Button
            text="Show Form Sheet"
            variant="outline"
            onPress={() => formSheetRef.current?.show()}
          />
        </Card>

        <Card style={styles.exampleContainer}>
          <Text variant="h4" style={styles.exampleTitle}>
            Full Screen Mode
          </Text>
          <Button
            text="Show Full Screen"
            variant="transparent"
            onPress={() => fullScreenSheetRef.current?.show()}
          />
        </Card>

        <View style={styles.spacer} />
      </ResponsiveScroll>

      {/* Basic Bottom Sheet */}
      <BottomSheet ref={basicSheetRef}>
        <View style={styles.sheetContent}>
          <Text variant="h3" style={styles.sheetTitle}>
            Basic Bottom Sheet
          </Text>
          <Text variant="pm" style={styles.sheetDescription}>
            This is a simple bottom sheet with basic content. You can drag it
            down or tap outside to close.
          </Text>
          <View style={styles.sheetActions}>
            <Button
              text="Action"
              size="medium"
              onPress={() => basicSheetRef.current?.hide()}
            />
            <Button
              text="Cancel"
              variant="outline"
              size="medium"
              onPress={() => basicSheetRef.current?.hide()}
            />
          </View>
        </View>
      </BottomSheet>

      {/* Form Bottom Sheet */}
      <BottomSheet
        ref={formSheetRef}
        onBackdropPress={() => formSheetRef.current?.hide()}
      >
        <View style={styles.sheetContent}>
          <Text variant="h3" style={styles.sheetTitle}>
            Settings
          </Text>

          <View style={styles.formItem}>
            <View style={styles.formItemHeader}>
              <Icon name="Bell" size={20} />
              <Text variant="h5" style={styles.formItemTitle}>
                Notifications
              </Text>
            </View>
            <Switch value={switchValue} onValueChange={setSwitchValue} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formItemHeader}>
              <Icon name="Moon" size={20} />
              <Text variant="h5" style={styles.formItemTitle}>
                Dark Mode
              </Text>
            </View>
            <Switch value={darkModeValue} onValueChange={setDarkModeValue} />
          </View>

          <View style={styles.formItem}>
            <Checkbox
              checked={checkboxValue}
              onCheckedChange={setCheckboxValue}
              label="Send me marketing emails"
            />
          </View>

          <View style={styles.sheetActions}>
            <Button
              text="Save Changes"
              onPress={() => formSheetRef.current?.hide()}
            />
          </View>
        </View>
      </BottomSheet>

      {/* Full Screen Bottom Sheet */}
      <BottomSheet ref={fullScreenSheetRef} fullScreen>
        <View style={styles.fullScreenContent}>
          <View style={styles.fullScreenHeader}>
            <Text variant="h2">Full Screen Sheet</Text>
            <Button
              text="Close"
              variant="transparent"
              size="small"
              onPress={() => fullScreenSheetRef.current?.hide()}
            />
          </View>

          <ScrollView style={styles.fullScreenScroll}>
            <Text variant="pm" style={styles.fullScreenText}>
              This is a full-screen bottom sheet that covers the entire screen.
              It's useful for more complex content or when you need maximum
              space.
            </Text>

            {Array.from({ length: 10 }, (_, i) => (
              <Card key={i} style={styles.fullScreenCard}>
                <Text variant="h5">Item {i + 1}</Text>
                <Text variant="pm">
                  This is some example content for item {i + 1}
                </Text>
              </Card>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </>
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
  spacer: { height: 40 },

  // Sheet Content Styles
  sheetContent: {
    padding: 24,
    paddingTop: 8,
  },
  sheetTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  sheetDescription: {
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.7,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },

  // Form Styles
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  formItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  formItemTitle: {
    marginLeft: 4,
  },

  // Full Screen Styles
  fullScreenContent: {
    flex: 1,
    padding: 24,
    paddingTop: 8,
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  fullScreenScroll: {
    flex: 1,
  },
  fullScreenText: {
    marginBottom: 24,
    opacity: 0.7,
  },
  fullScreenCard: {
    marginBottom: 16,
  },
});
