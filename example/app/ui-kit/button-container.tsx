import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Icon,
  ButtonContainer,
  ButtonVariant,
  ButtonSize,
} from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function ButtonContainerExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const startDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Button Container
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Create complex button layouts with progress bars, badges, and custom
            content
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Progress & Download Button
        </Text>
        <Text variant="ps" style={styles.exampleDescription}>
          Integrated progress bar with dynamic content updates
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonContainer
            variant={ButtonVariant.flat}
            size={ButtonSize.large}
            onPress={startDownload}
            renderContent={(colors) => (
              <View style={styles.progressButtonContent}>
                <View style={styles.progressButtonTop}>
                  <Icon name="Download" size={16} color={colors.textColor} />
                  <Text
                    variant="pm"
                    style={[styles.downloadText, { color: colors.textColor }]}
                  >
                    Download ({downloadProgress}%)
                  </Text>
                </View>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: colors.textColor + '20' },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: colors.textColor,
                        width: `${downloadProgress}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Payment Button with Pricing
        </Text>
        <Text variant="ps" style={styles.exampleDescription}>
          Complex layout with multiple text elements and custom positioning
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonContainer
            variant={ButtonVariant.flat}
            size={ButtonSize.large}
            onPress={() => console.log('Payment pressed')}
            renderContent={(colors) => (
              <View style={styles.currencyButtonContent}>
                <View style={styles.currencyLeft}>
                  <Text
                    variant="caption"
                    style={[styles.totalLabel, { color: colors.textColor }]}
                  >
                    Total
                  </Text>
                  <Text variant="h4" style={{ color: colors.textColor }}>
                    $1,234.56
                  </Text>
                </View>
                <View style={styles.currencyRight}>
                  <Icon name="CreditCard" size={20} color={colors.textColor} />
                  <Text
                    variant="caption"
                    style={[styles.payNowText, { color: colors.textColor }]}
                  >
                    Pay Now
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Notification Badge & Counter
        </Text>
        <Text variant="ps" style={styles.exampleDescription}>
          Absolute positioned badges and dynamic counters impossible with
          default Button
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonContainer
            variant={ButtonVariant.outline}
            size={ButtonSize.medium}
            onPress={() => setNotificationCount(0)}
            renderContent={(colors) => (
              <View style={styles.buttonContent}>
                <Icon name="Bell" size={16} color={colors.textColor} />
                <Text
                  variant="pm"
                  style={[styles.buttonText, { color: colors.textColor }]}
                >
                  Notifications
                </Text>
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text variant="caption" style={styles.badgeText}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />

          <ButtonContainer
            variant={ButtonVariant.transparent}
            size={ButtonSize.medium}
            onPress={() => setNotificationCount((prev) => prev + 1)}
            renderContent={(colors) => (
              <View style={styles.buttonContent}>
                <Icon name="Plus" size={16} color={colors.textColor} />
                <Text
                  variant="pm"
                  style={[styles.buttonText, { color: colors.textColor }]}
                >
                  Add Item
                </Text>
                <View style={styles.counter}>
                  <Text variant="caption" style={styles.counterText}>
                    {notificationCount}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </Card>

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
  exampleTitle: { marginBottom: 8 },
  exampleDescription: { opacity: 0.7, marginBottom: 16 },
  buttonContainer: { gap: 12 },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  downloadText: { marginLeft: 8 },
  totalLabel: { opacity: 0.7 },
  payNowText: { marginTop: 2 },
  buttonText: { marginLeft: 8 },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: '#FFFFFF', fontSize: 10 },
  progressButtonContent: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressButtonTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  currencyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
  },
  currencyLeft: { alignItems: 'flex-start' },
  currencyRight: { alignItems: 'center' },
  counter: {
    marginLeft: 8,
    backgroundColor: '#000000',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  counterText: { color: '#FFFFFF', fontSize: 10 },
});
