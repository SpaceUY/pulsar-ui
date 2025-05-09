import { useState } from 'react';
import { View } from 'react-native';
import { ButtonSize, IconButton, Tabs, type Tab } from 'rn-spacedev-uikit';

const tabs1: Tab[] = [
  { value: ButtonSize.large, label: 'Large' },
  { value: ButtonSize.medium, label: 'Medium' },
  { value: ButtonSize.small, label: 'Small' },
];

const tabs2: Tab[] = [
  { value: 'active', label: 'Active' },
  { value: 'disabled', label: 'Disabled' },
];

export default function IconButtonsScreen() {
  const [selectedTab1, setSelectedTab1] = useState<Tab>(tabs1[0]!);
  const [selectedTab2, setSelectedTab2] = useState<Tab>(tabs2[0]!);
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const buttonConfigs = [
    { variant: 'flat', iconName: 'Heart' },
    { variant: 'outline', iconName: 'House' },
    { variant: 'transparent', iconName: 'Save' },
    { variant: 'destructive', iconName: 'Trash' },
  ] as const;

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
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
      <View style={{ flex: 1, gap: 16 }}>
        {buttonConfigs.map(({ variant, iconName }) => (
          <IconButton
            key={variant}
            iconName={iconName}
            variant={variant}
            size={selectedTab1.value as ButtonSize}
            onPress={handlePress}
            loading={loading}
            disabled={selectedTab2.value === 'disabled'}
          />
        ))}
      </View>
    </View>
  );
}
