import { View } from 'react-native';
import { Button } from '@space-uy/rn-spacedev-uikit';

export default function ModalScreen() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button text="Theme" variant="flat" onPress={() => {}} />
    </View>
  );
}
