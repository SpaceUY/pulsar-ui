import { View, StyleSheet } from 'react-native';
import { Card, Input, Button, Text } from 'rn-spacedev-uikit';
import { useState } from 'react';

export default function CardsScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Card>
        <Text variant="h1" style={styles.title}>
          Login
        </Text>
        <Text variant="pm" style={styles.description}>
          Please enter your credentials to access your account
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
  },
});
