import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Accordion, AccordionItem, Card, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function AccordionExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

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
            Accordion
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Collapsible content sections to organize information efficiently
          </Text>
        </View>
      )}
      <Card
        variant="tinted"
        style={[styles.exampleContainer, styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Basic Accordion
        </Text>

        <Accordion collapsible={true}>
          <AccordionItem title="What is React Native?" value="react-native">
            <Text variant="pm">
              React Native is a framework for building mobile applications using
              React and native platform capabilities. It allows you to create
              truly native apps and doesn't compromise on your users'
              experience.
            </Text>
          </AccordionItem>

          <AccordionItem title="How does it work?" value="how-it-works">
            <Text variant="pm">
              React Native combines the best parts of native development with
              React, a best-in-class JavaScript library for building user
              interfaces. You can use React Native today in your existing
              Android and iOS projects.
            </Text>
          </AccordionItem>

          <AccordionItem title="What are the benefits?" value="benefits">
            <Text variant="pm">
              With React Native, you can write mobile applications in JavaScript
              that look and feel truly native. The framework uses native
              components instead of web components as building blocks.
            </Text>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          FAQ Section
        </Text>

        <Accordion type="multiple">
          <AccordionItem title="How do I get started?" value="get-started">
            <Text variant="pm">
              You can get started by installing the React Native CLI or using
              Expo CLI. Both provide excellent development experiences with hot
              reloading and debugging tools.
            </Text>
          </AccordionItem>

          <AccordionItem title="Is it free to use?" value="free">
            <Text variant="pm">
              Yes, React Native is completely free and open source. It's
              maintained by Meta (formerly Facebook) and the community.
            </Text>
          </AccordionItem>

          <AccordionItem title="Can I use native code?" value="native-code">
            <Text variant="pm">
              Absolutely! React Native allows you to write native modules in
              Java/Kotlin for Android or Objective-C/Swift for iOS when you need
              platform-specific functionality.
            </Text>
          </AccordionItem>
        </Accordion>
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
  spacer: { height: 40 },
});
