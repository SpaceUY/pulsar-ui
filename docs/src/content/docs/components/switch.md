---
title: Switch
description: Interactive toggle switch component with smooth animations for boolean state management.
---

The `Switch` component provides an interactive toggle switch for boolean state management. It features smooth animations, disabled states, and automatic theming support.

## Import

```typescript
import { Switch } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
const [enabled, setEnabled] = useState(false);

<Switch value={enabled} onValueChange={setEnabled} />;
```

## Properties

| Property        | Type                       | Required | Default value | Description                            |
| --------------- | -------------------------- | -------- | ------------- | -------------------------------------- |
| `value`         | `boolean`                  | ✅       | -             | Current switch state (on/off)          |
| `onValueChange` | `(value: boolean) => void` | ✅       | -             | Callback when switch state changes     |
| `disabled`      | `boolean`                  | ❌       | `false`       | Whether the switch is disabled         |
| `style`         | `StyleProp<ViewStyle>`     | ❌       | -             | Custom styles for the switch container |

## Basic examples

### Simple switch

```tsx
const [notifications, setNotifications] = useState(true);

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Switch value={notifications} onValueChange={setNotifications} />
  <Text variant="pm">Enable notifications</Text>
</View>;
```

### Disabled switch

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Switch value={true} onValueChange={() => {}} disabled={true} />
  <Text variant="pm" style={{ opacity: 0.5 }}>
    This setting cannot be changed
  </Text>
</View>
```

## Advanced examples

### Settings form

```tsx
const [settings, setSettings] = useState({
  notifications: true,
  locationAccess: false,
  biometricAuth: true,
  autoBackup: false,
  darkMode: false,
});

const updateSetting = (key: string, value: boolean) => {
  setSettings((prev) => ({ ...prev, [key]: value }));
};

<Card>
  <Text variant="h4">App Settings</Text>
  <View style={{ gap: 16, marginTop: 16 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text variant="pm">Push Notifications</Text>
        <Text variant="ps" style={{ opacity: 0.7 }}>
          Receive notifications about important updates
        </Text>
      </View>
      <Switch
        value={settings.notifications}
        onValueChange={(value) => updateSetting('notifications', value)}
      />
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text variant="pm">Location Access</Text>
        <Text variant="ps" style={{ opacity: 0.7 }}>
          Allow app to access your location
        </Text>
      </View>
      <Switch
        value={settings.locationAccess}
        onValueChange={(value) => updateSetting('locationAccess', value)}
      />
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text variant="pm">Biometric Authentication</Text>
        <Text variant="ps" style={{ opacity: 0.7 }}>
          Use fingerprint or Face ID to unlock
        </Text>
      </View>
      <Switch
        value={settings.biometricAuth}
        onValueChange={(value) => updateSetting('biometricAuth', value)}
      />
    </View>
  </View>
</Card>;
```

### Conditional settings

```tsx
const [settings, setSettings] = useState({
  autoSync: false,
  syncWifiOnly: true,
  syncFrequency: 'daily',
});

<Card>
  <Text variant="h4">Sync Settings</Text>
  <View style={{ gap: 16, marginTop: 16 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text variant="pm">Auto Sync</Text>
      <Switch
        value={settings.autoSync}
        onValueChange={(value) =>
          setSettings((prev) => ({ ...prev, autoSync: value }))
        }
      />
    </View>

    {settings.autoSync && (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 16,
            opacity: 0.8,
          }}
        >
          <Text variant="pm">WiFi Only</Text>
          <Switch
            value={settings.syncWifiOnly}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, syncWifiOnly: value }))
            }
          />
        </View>

        <View style={{ paddingLeft: 16 }}>
          <Text variant="h5">Sync Frequency</Text>
          <Tabs
            options={[
              { value: 'hourly', label: 'Hourly' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
            ]}
            selected={{
              value: settings.syncFrequency,
              label: settings.syncFrequency,
            }}
            onChange={(option) =>
              setSettings((prev) => ({ ...prev, syncFrequency: option.value }))
            }
          />
        </View>
      </>
    )}
  </View>
</Card>;
```

### Privacy settings

```tsx
const [privacy, setPrivacy] = useState({
  profilePublic: false,
  showOnlineStatus: true,
  allowMessages: true,
  shareAnalytics: false,
});

const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

const updatePrivacySetting = (key: string, value: boolean) => {
  setPrivacy((prev) => ({ ...prev, [key]: value }));
  setHasUnsavedChanges(true);
};

<Card>
  <Text variant="h4">Privacy Settings</Text>
  <View style={{ gap: 20, marginTop: 16 }}>
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="pm">Public Profile</Text>
          <Text variant="ps" style={{ opacity: 0.7, marginTop: 2 }}>
            Make your profile visible to other users
          </Text>
        </View>
        <Switch
          value={privacy.profilePublic}
          onValueChange={(value) =>
            updatePrivacySetting('profilePublic', value)
          }
        />
      </View>
    </View>

    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="pm">Show Online Status</Text>
          <Text variant="ps" style={{ opacity: 0.7, marginTop: 2 }}>
            Let others see when you're online
          </Text>
        </View>
        <Switch
          value={privacy.showOnlineStatus}
          onValueChange={(value) =>
            updatePrivacySetting('showOnlineStatus', value)
          }
        />
      </View>
    </View>

    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="pm">Allow Direct Messages</Text>
          <Text variant="ps" style={{ opacity: 0.7, marginTop: 2 }}>
            Receive messages from other users
          </Text>
        </View>
        <Switch
          value={privacy.allowMessages}
          onValueChange={(value) =>
            updatePrivacySetting('allowMessages', value)
          }
        />
      </View>
    </View>
  </View>

  {hasUnsavedChanges && (
    <View
      style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: colors.primary + '10',
        borderRadius: 8,
      }}
    >
      <Text variant="ps" style={{ color: colors.primary }}>
        You have unsaved changes
      </Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Button
          text="Save"
          size="small"
          onPress={() => setHasUnsavedChanges(false)}
        />
        <Button
          text="Reset"
          size="small"
          variant="outline"
          onPress={() => {
            setPrivacy({
              profilePublic: false,
              showOnlineStatus: true,
              allowMessages: true,
              shareAnalytics: false,
            });
            setHasUnsavedChanges(false);
          }}
        />
      </View>
    </View>
  )}
</Card>;
```

### Feature toggles

```tsx
const [features, setFeatures] = useState({
  betaFeatures: false,
  experimentalUI: false,
  advancedMode: false,
});

const toggleFeature = (feature: string, enabled: boolean) => {
  if (feature === 'advancedMode' && enabled) {
    // Show confirmation for advanced mode
    Alert.alert(
      'Enable Advanced Mode',
      'This will enable experimental features that may be unstable. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Enable',
          onPress: () =>
            setFeatures((prev) => ({ ...prev, [feature]: enabled })),
        },
      ]
    );
  } else {
    setFeatures((prev) => ({ ...prev, [feature]: enabled }));
  }
};

<Card>
  <Text variant="h4">Developer Features</Text>
  <Text variant="ps" style={{ opacity: 0.7, marginTop: 4 }}>
    Experimental features for testing and development
  </Text>

  <View style={{ gap: 16, marginTop: 16 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text variant="pm">Beta Features</Text>
      <Switch
        value={features.betaFeatures}
        onValueChange={(value) => toggleFeature('betaFeatures', value)}
      />
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text variant="pm">Experimental UI</Text>
      <Switch
        value={features.experimentalUI}
        onValueChange={(value) => toggleFeature('experimentalUI', value)}
        disabled={!features.betaFeatures}
      />
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text variant="pm">Advanced Mode</Text>
      <Switch
        value={features.advancedMode}
        onValueChange={(value) => toggleFeature('advancedMode', value)}
      />
    </View>
  </View>
</Card>;
```

### Quick settings panel

```tsx
const [quickSettings, setQuickSettings] = useState({
  wifi: true,
  bluetooth: false,
  airplane: false,
  doNotDisturb: false,
});

const QuickSettingItem = ({
  icon,
  label,
  value,
  onChange,
  disabled = false,
}: {
  icon: IconName;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: value ? colors.primary + '10' : colors.altBackground,
      borderRadius: 8,
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon
        name={icon}
        size={20}
        color={value ? colors.primary : colors.foreground}
      />
      <Text variant="pm">{label}</Text>
    </View>
    <Switch value={value} onValueChange={onChange} disabled={disabled} />
  </View>
);

<Card>
  <Text variant="h4">Quick Settings</Text>
  <View style={{ gap: 8, marginTop: 16 }}>
    <QuickSettingItem
      icon="Wifi"
      label="Wi-Fi"
      value={quickSettings.wifi}
      onChange={(value) =>
        setQuickSettings((prev) => ({ ...prev, wifi: value }))
      }
    />
    <QuickSettingItem
      icon="Bluetooth"
      label="Bluetooth"
      value={quickSettings.bluetooth}
      onChange={(value) =>
        setQuickSettings((prev) => ({ ...prev, bluetooth: value }))
      }
    />
    <QuickSettingItem
      icon="Plane"
      label="Airplane Mode"
      value={quickSettings.airplane}
      onChange={(value) =>
        setQuickSettings((prev) => ({ ...prev, airplane: value }))
      }
    />
    <QuickSettingItem
      icon="Moon"
      label="Do Not Disturb"
      value={quickSettings.doNotDisturb}
      onChange={(value) =>
        setQuickSettings((prev) => ({ ...prev, doNotDisturb: value }))
      }
    />
  </View>
</Card>;
```

## Implementation notes

- The switch has a fixed size of 44px width by 24px height
- Thumb diameter is 20px with 2px padding from the edges
- Smooth animations using React Native Reanimated with 300ms duration
- Automatic color transitions between enabled/disabled states
- Disabled state reduces opacity to 50% and prevents interactions
- The switch respects theme colors for consistent appearance

## Animation details

- **State transition**: 300ms duration with smooth easing
- **Thumb movement**: Smooth translation from left to right position
- **Color transition**: Background color interpolates between border and primary colors
- **Disabled state**: 300ms opacity transition when disabled state changes

## Accessibility

- The switch is fully keyboard accessible
- Screen readers properly announce the switch state (on/off)
- Disabled state prevents interaction and is communicated to assistive technologies
- Proper contrast ratios are maintained for all visual states
- Touch target meets minimum size requirements for accessibility
