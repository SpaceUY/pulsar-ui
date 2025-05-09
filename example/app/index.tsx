import { View } from 'react-native';
import { Button } from 'rn-spacedev-uikit';
import { router } from 'expo-router';

export default function UIKitScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        text="Icons"
        variant="flat"
        onPress={() => router.push('ui-kit/icons')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Buttons"
        variant="flat"
        onPress={() => router.push('ui-kit/buttons')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Tabs"
        variant="flat"
        onPress={() => router.push('ui-kit/tabs')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Inputs"
        variant="flat"
        onPress={() => router.push('ui-kit/inputs')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Texts"
        variant="flat"
        onPress={() => router.push('ui-kit/texts')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Cards"
        variant="flat"
        onPress={() => router.push('ui-kit/cards')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Select"
        variant="flat"
        onPress={() => router.push('ui-kit/select')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Checkboxes"
        variant="flat"
        onPress={() => router.push('ui-kit/checkboxes')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Loaders"
        variant="flat"
        onPress={() => router.push('ui-kit/loaders')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Chips"
        variant="flat"
        onPress={() => router.push('ui-kit/chips')}
        style={{ marginBottom: 16 }}
      />
      <Button
        text="Icon Buttons"
        variant="flat"
        onPress={() => router.push('ui-kit/icon-buttons')}
        style={{ marginBottom: 16 }}
      />
    </View>
  );
}
