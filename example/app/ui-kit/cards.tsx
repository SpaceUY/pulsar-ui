import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, Input, Text } from '@space-uy/rn-spacedev-uikit';

export default function CardsExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Cards
        </Text>
        <Text variant="pm" style={styles.sectionDescription}>
          Container components to organize and group related content
        </Text>
      </View>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Card Variants
        </Text>
        <View style={styles.cardsContainer}>
          <Card style={styles.card}>
            <Text style={styles.cardTitle} variant="h4">
              Default Card
            </Text>
            <Text variant="pm">
              This is the default card style with basic styling and background.
            </Text>
          </Card>
          <Card variant="tinted" style={styles.card}>
            <Text style={styles.cardTitle} variant="h4">
              Tinted Card
            </Text>
            <Text variant="pm">
              This card has a subtle tinted background for better contrast.
            </Text>
          </Card>
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Nested Cards
        </Text>
        <Card style={styles.card}>
          <Text style={styles.cardTitle} variant="h4">
            Main Card
          </Text>
          <Text variant="pm" style={styles.cardDescription}>
            This is a main card that contains nested cards within it.
          </Text>
          <View style={styles.nestedCards}>
            <Card variant="tinted">
              <Text variant="pm">Nested Card 1</Text>
            </Card>
            <Card variant="tinted">
              <Text variant="pm">Nested Card 2</Text>
            </Card>
          </View>
        </Card>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Card with Form
        </Text>
        <Card>
          <Text variant="h4" style={styles.cardTitle}>
            Login
          </Text>
          <Text variant="pm" style={styles.cardDescription}>
            Enter your credentials to access your account
          </Text>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            style={styles.input}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            variant="password"
            placeholder="Enter your password"
            style={styles.input}
          />
          <Button
            text="Login"
            variant="flat"
            onPress={() => {}}
            style={styles.button}
          />
        </Card>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Information Card
        </Text>
        <Card>
          <Text style={styles.cardTitle} variant="h5">
            Did you know...?
          </Text>
          <Text variant="pm" style={styles.cardDescription}>
            Cards are a great way to organize related content and create clear
            visual hierarchies in your interface.
          </Text>
          <Button
            text="Learn More"
            variant="outline"
            onPress={() => {}}
            style={styles.button}
          />
        </Card>
      </Card>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 20, paddingBottom: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginHorizontal: 16, marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
  cardsContainer: { gap: 16 },
  card: { padding: 16 },
  cardTitle: { marginBottom: 8 },
  cardDescription: { marginBottom: 16 },
  input: { marginBottom: 16 },
  button: { alignSelf: 'flex-start' },
  spacer: { height: 40 },
  nestedCards: { gap: 16 },
});
