import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, OtpInput, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function OtpInputExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const [basicCode, setBasicCode] = useState('');
  const [secureCode, setSecureCode] = useState('');

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
            OTP Input
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            One-time password input fields for verification codes
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic OTP Input
        </Text>
        <Text variant="pm" style={styles.description}>
          Enter the 4-digit code
        </Text>
        <OtpInput length={4} value={basicCode} onChange={setBasicCode} />
        <Text variant="caption" style={styles.helper}>
          Current code: {basicCode || '____'}
        </Text>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Secure OTP Input
        </Text>
        <Text variant="pm" style={styles.description}>
          Digits are masked as you type
        </Text>
        <OtpInput
          length={4}
          secure
          value={secureCode}
          onChange={setSecureCode}
        />
        <Text variant="caption" style={styles.helper}>
          Current code (plain): {secureCode || '____'}
        </Text>
      </Card>
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
  description: { marginBottom: 16, opacity: 0.8 },
  helper: { marginTop: 8, opacity: 0.7 },
});
