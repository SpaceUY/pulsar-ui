import { View, ScrollView } from 'react-native';
import { Input } from '@space-uy/rn-spacedev-uikit';
import { useState } from 'react';

export default function InputsScreen() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 16 }}>
        {/* Basic Input */}
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Basic input"
        />

        {/* Input with Label */}
        <Input
          value={value2}
          onChangeText={setValue2}
          placeholder="Input with label"
          label="Username"
        />

        {/* Input with Hint */}
        <Input
          value={value3}
          onChangeText={setValue3}
          placeholder="Input with hint"
          hint="This is a helpful hint"
        />

        {/* Input with Error */}
        <Input
          value={value4}
          onChangeText={setValue4}
          placeholder="Input with error"
          hint="This is an error message"
          error
        />

        {/* Disabled Input */}
        <Input
          value={value5}
          onChangeText={setValue5}
          placeholder="Disabled input"
          label="Disabled input"
          editable={false}
        />

        {/* Input with Label and Hint */}
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Input with label and hint"
          label="Email"
          hint="Enter your email address"
        />

        {/* Input with Label and Error */}
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Input with label and error"
          label="Password"
          hint="Password must be at least 8 characters"
          error
        />

        {/* Password Input */}
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          label="Password"
          variant="password"
          hint="Must be at least 8 characters"
        />
      </View>
    </ScrollView>
  );
}
