import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {
  Button,
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
  type IconName,
} from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

function CollapsibleHeaderDemo({
  backIcon,
  showDialog,
  themeRoundness,
  colors,
}: {
  backIcon: IconName;
  showDialog: (msg: string) => void;
  themeRoundness: number;
  colors: Record<string, string>;
}) {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <Card variant="tinted" style={styles.exampleContainer}>
      <Text variant="h4" style={styles.exampleTitle}>
        Collapsible on scroll (iOS-style)
      </Text>
      <Text variant="ps" style={styles.sectionDescription}>
        Secondary header animates to compact as you scroll
      </Text>
      <View
        style={[
          styles.headerWrapper,
          styles.collapsibleDemo,
          { borderRadius: themeRoundness, backgroundColor: colors.background },
        ]}
      >
        <Header
          variant="secondary"
          useInsets={false}
          title="My Account"
          scrollY={scrollY}
          collapseThreshold={80}
          leftButton={{
            iconName: backIcon,
            onPress: () => showDialog('Back'),
          }}
          rightButton={{
            iconName: 'Settings',
            onPress: () => showDialog('Settings'),
          }}
        />
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.collapsibleScrollView}
          contentContainerStyle={styles.collapsibleScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <View
              key={i}
              style={[
                styles.collapsibleRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text variant="pm">Row {i + 1}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </Card>
  );
}

export default function HeadersExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
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
  const backIcon = I18nManager.isRTL ? 'ChevronRight' : 'ChevronLeft';

  return (
    <ResponsiveScroll>
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
              iconName: backIcon,
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
              iconName: backIcon,
              onPress: () => showDialog('Back'),
            }}
            rightButton={{
              iconName: 'Plus',
              onPress: () => showDialog('New message'),
            }}
          />
        </View>
      </Card>

      {/* Secondary variant: bigger title on its own row */}
      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Secondary Variant
        </Text>
        <Text variant="ps" style={styles.sectionDescription}>
          Bigger title on its own row below the buttons
        </Text>
        <View style={[styles.headerWrapper, { borderRadius: theme.roundness }]}>
          <Header
            variant="secondary"
            useInsets={false}
            title="Account Settings"
            leftButton={{
              iconName: backIcon,
              onPress: () => showDialog('Back'),
            }}
            rightButton={{
              iconName: 'Settings',
              onPress: () => showDialog('Settings'),
            }}
          />
        </View>
      </Card>

      {/* Collapsible secondary header (iOS-style on scroll) */}
      <CollapsibleHeaderDemo
        backIcon={backIcon}
        showDialog={showDialog}
        themeRoundness={theme.roundness}
        colors={colors}
      />
      <Card variant="tinted" style={styles.exampleContainer}>
        <Button
          variant="secondary"
          text="Open full screen animated header demo"
          onPress={() => router.push('/ui-kit/animated-header')}
        />
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
              iconName: backIcon,
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
              iconName: backIcon,
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
              iconName: backIcon,
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
  headerWrapper: { overflow: 'hidden' },
  collapsibleDemo: { maxHeight: 320 },
  collapsibleScrollView: { flex: 1 },
  collapsibleScrollContent: { padding: 16, paddingTop: 8 },
  collapsibleRow: { paddingVertical: 12, borderBottomWidth: 1 },
  spacer: { height: 40 },
});
