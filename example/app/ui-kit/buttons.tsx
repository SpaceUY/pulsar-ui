import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  ButtonSize,
  Tabs,
  type Tab,
} from '@space-uy/rn-spacedev-uikit';

const tabs1: Tab[] = [
  { value: ButtonSize.large, label: 'Large' },
  { value: ButtonSize.medium, label: 'Medium' },
  { value: ButtonSize.small, label: 'Small' },
];

const tabs2: Tab[] = [
  { value: 'active', label: 'Active' },
  { value: 'disabled', label: 'Disabled' },
];

const buttonConfigs = [
  { variant: 'flat', text: 'Flat Button' },
  { variant: 'outline', text: 'Outline Button' },
  { variant: 'transparent', text: 'Transparent Button' },
  { variant: 'destructive', text: 'Destructive Button' },
] as const;

export default function ButtonsScreen() {
  const [selectedTab1, setSelectedTab1] = useState<Tab>(tabs1[0]!);
  const [selectedTab2, setSelectedTab2] = useState<Tab>(tabs2[0]!);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handlePress = (variant: string) => {
    setLoadingStates((prev) => ({ ...prev, [variant]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [variant]: false }));
    }, 2000);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Tabs
        options={tabs1}
        selected={selectedTab1}
        onChange={setSelectedTab1}
      />
      <Tabs
        options={tabs2}
        selected={selectedTab2}
        onChange={setSelectedTab2}
      />
      {buttonConfigs.map(({ variant, text }) => (
        <Button
          key={variant}
          text={text}
          variant={variant}
          size={selectedTab1.value as ButtonSize}
          onPress={() => handlePress(variant)}
          loading={loadingStates[variant]}
          style={{ marginBottom: 16, alignSelf: 'flex-start' }}
          disabled={selectedTab2.value === 'disabled'}
        />
      ))}
      <Button
        text="Save Changes"
        iconName="Save"
        variant="flat"
        size={selectedTab1.value as ButtonSize}
        onPress={() => handlePress('save')}
        loading={loadingStates['save']}
        style={{ marginBottom: 16, alignSelf: 'flex-start' }}
        disabled={selectedTab2.value === 'disabled'}
      />
    </View>
  );
}
