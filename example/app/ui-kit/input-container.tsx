import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Input, TextArea } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function InputContainerExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  const [values, setValues] = useState<Record<string, string>>({});
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const handleChangeText = (inputId: string, text: string) => {
    setValues((prev) => ({ ...prev, [inputId]: text }));
    if (inputId === 'email' && text.length > 0) {
      setHasError(!text.includes('@'));
    }
  };

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Input Containers
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Advanced input customizations using InputContainer as base
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Text Inputs
        </Text>
        <View style={styles.inputContainer}>
          <Input
            label="Basic Input"
            placeholder="Type something..."
            value={values.basic || ''}
            onChangeText={(text) => handleChangeText('basic', text)}
          />

          <Input
            label="With Icon"
            placeholder="Enter username..."
            iconName="User"
            value={values.withIcon || ''}
            onChangeText={(text) => handleChangeText('withIcon', text)}
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          TextArea & Validation
        </Text>
        <View style={styles.inputContainer}>
          <TextArea
            label="Message"
            placeholder="Write your message here..."
            value={values.message || ''}
            onChangeText={(text) => handleChangeText('message', text)}
            numberOfLines={4}
          />

          <Input
            label="Email Input"
            placeholder="Enter your email..."
            iconName="Mail"
            value={values.email || ''}
            onChangeText={(text) => handleChangeText('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={hasError}
            hint={
              hasError
                ? 'Please enter a valid email address'
                : "We'll never share your email"
            }
          />
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Smart TextArea with Counter
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.textAreaContainer}>
            <TextArea
              label="Tweet Composer"
              placeholder="What's happening?"
              value={values.tweet || ''}
              onChangeText={(text) =>
                handleChangeText('tweet', text.slice(0, 280))
              }
              numberOfLines={4}
            />
            <View style={styles.tweetMeta}>
              <Text
                variant="caption"
                style={[
                  styles.charCounter,
                  (values.tweet?.length || 0) > 240
                    ? styles.charCounterError
                    : styles.charCounterNormal,
                ]}
              >
                {280 - (values.tweet?.length || 0)} characters remaining
              </Text>
            </View>
          </View>

          <Input
            label="Amount with Currency"
            placeholder="0.00"
            iconName="DollarSign"
            value={values.amount || ''}
            onChangeText={(text) => {
              // Format as currency
              const numericValue = text.replace(/[^0-9.]/g, '');
              const formatted = numericValue.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
              );
              handleChangeText('amount', formatted);
            }}
            keyboardType="numeric"
            hint="Enter amount in USD"
          />
        </View>
      </Card>

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
  inputContainer: { gap: 16 },
  tagsContainer: {
    marginTop: 8,
  },
  tagsLabel: {
    marginBottom: 8,
    color: '#6B7280',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#374151',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textAreaContainer: {
    position: 'relative',
  },
  tweetMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  charCounter: {
    fontSize: 12,
  },
  charCounterError: { color: '#EF4444' },
  charCounterNormal: { color: '#6B7280' },
  spacer: { height: 40 },
});
