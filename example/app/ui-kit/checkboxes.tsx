import { View } from 'react-native';
import { useState } from 'react';
import Text from '../../../src/components/Text';
import Checkbox from '../../../src/components/Checkbox';

export default function CheckboxesScreen() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16, gap: 24 }}>
      <Text variant="h4">Checkboxes</Text>

      <View style={{ gap: 16 }}>
        {/* Default Checkbox */}
        <Checkbox
          checked={checked1}
          onCheckedChange={setChecked1}
          label="Accept terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
        />

        {/* Checked Checkbox */}
        <Checkbox
          checked={checked2}
          onCheckedChange={setChecked2}
          label="Accept terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
        />

        {/* Disabled Checkbox */}
        <Checkbox
          checked={checked3}
          onCheckedChange={setChecked3}
          label="Accept terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
          disabled
        />
      </View>
    </View>
  );
}
