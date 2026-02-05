import { I18nManager, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Header, Text, useUIKitTheme } from '@space-uy/pulsar-ui';
import { router } from 'expo-router';

export default function AnimatedHeaderScreen() {
  const { colors } = useUIKitTheme();
  const scrollY = useSharedValue(0);
  const backIcon = I18nManager.isRTL ? 'ChevronRight' : 'ChevronLeft';

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        variant="secondary"
        title="Account Settings"
        scrollY={scrollY}
        collapseThreshold={80}
        leftButton={{
          iconName: backIcon,
          onPress: () => router.back(),
        }}
        rightButton={{
          iconName: 'Settings',
          onPress: () => {},
        }}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text variant="ps" style={[styles.hint, { color: colors.foreground }]}>
          Scroll down to see the header collapse from large title to compact
          (iOS-style).
        </Text>
        {Array.from({ length: 40 }, (_, i) => (
          <View
            key={i}
            style={[styles.row, { borderBottomColor: colors.border }]}
          >
            <Text variant="pm" style={{ color: colors.foreground }}>
              List item {i + 1}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  hint: { marginBottom: 16, opacity: 0.8 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});
