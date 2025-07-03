import { useRef, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Card,
  OtpInputContainer,
  Text,
  type OtpInputContainerRef,
} from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function OtpInputExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const otpInputRef = useRef<OtpInputContainerRef>(null);

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
        <OtpInputContainer
          ref={otpInputRef}
          length={4}
          inputStyle={styles.otpInput}
        />
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
  otpInput: {
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    width: 48,
  },
});
