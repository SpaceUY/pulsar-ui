---
title: Loading Indicator
description: Animated loading spinner component with cross-platform compatibility and theming support.
---

The `LoadingIndicator` component provides an animated spinning indicator for loading states. It offers cross-platform compatibility with custom animations on iOS/web and native ActivityIndicator on Android.

## Import

```typescript
import { LoadingIndicator } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
<LoadingIndicator />
```

## Properties

| Property | Type                   | Required | Default value       | Description                     |
| -------- | ---------------------- | -------- | ------------------- | ------------------------------- |
| `size`   | `number`               | ❌       | `24`                | Size of the loading indicator   |
| `color`  | `string`               | ❌       | `colors.foreground` | Color of the loading indicator  |
| `style`  | `StyleProp<ViewStyle>` | ❌       | -                   | Custom styles for the container |

## Basic examples

### Default loading indicator

```tsx
<LoadingIndicator />
```

### Custom size

```tsx
<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
  <LoadingIndicator size={16} />
  <LoadingIndicator size={24} />
  <LoadingIndicator size={32} />
  <LoadingIndicator size={48} />
</View>
```

### Custom color

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <LoadingIndicator color={colors.primary} />
  <LoadingIndicator color="red" />
  <LoadingIndicator color="green" />
  <LoadingIndicator color="blue" />
</View>
```

## Advanced examples

### Loading states in buttons

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitData();
  } finally {
    setIsLoading(false);
  }
};

<Button
  text={isLoading ? '' : 'Submit'}
  onPress={handleSubmit}
  disabled={isLoading}
  style={{ flexDirection: 'row', gap: 8 }}
>
  {isLoading && <LoadingIndicator size={16} color={colors.altForeground} />}
</Button>;
```

### Centered loading overlay

```tsx
const [isLoading, setIsLoading] = useState(true);

{
  isLoading && (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <LoadingIndicator size={32} />
      <Text variant="pm" style={{ marginTop: 8 }}>
        Loading...
      </Text>
    </View>
  );
}
```

### Loading card content

```tsx
<Card>
  <Text variant="h4">User Profile</Text>
  {isLoadingProfile ? (
    <View style={{ alignItems: 'center', padding: 32 }}>
      <LoadingIndicator size={24} />
      <Text variant="pm" style={{ marginTop: 8 }}>
        Loading profile...
      </Text>
    </View>
  ) : (
    <View style={{ gap: 8, marginTop: 12 }}>
      <Text variant="pm">Name: {profile.name}</Text>
      <Text variant="pm">Email: {profile.email}</Text>
    </View>
  )}
</Card>
```

### Inline loading with text

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <LoadingIndicator size={16} />
  <Text variant="pm">Saving changes...</Text>
</View>
```

### Loading list items

```tsx
const ListItem = ({ item, isLoading }: { item: any; isLoading: boolean }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      justifyContent: 'space-between',
    }}
  >
    <View>
      <Text variant="pm">{item.name}</Text>
      <Text variant="ps" style={{ opacity: 0.7 }}>
        {item.description}
      </Text>
    </View>
    {isLoading && <LoadingIndicator size={20} />}
  </View>
);

// Usage
<FlatList
  data={items}
  renderItem={({ item }) => (
    <ListItem item={item} isLoading={loadingItems.includes(item.id)} />
  )}
/>;
```

### Multi-step loading

```tsx
const [loadingStep, setLoadingStep] = useState<string | null>(null);

const steps = [
  { id: 'validate', label: 'Validating data...' },
  { id: 'process', label: 'Processing...' },
  { id: 'save', label: 'Saving changes...' },
  { id: 'complete', label: 'Complete!' },
];

<Card>
  <Text variant="h4">Processing Request</Text>
  <View style={{ gap: 12, marginTop: 16 }}>
    {steps.map((step) => (
      <View
        key={step.id}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
      >
        {loadingStep === step.id ? (
          <LoadingIndicator size={16} />
        ) : (
          <Icon
            name={loadingStep ? 'Check' : 'Circle'}
            size={16}
            color={loadingStep ? colors.primary : colors.border}
          />
        )}
        <Text variant="pm">{step.label}</Text>
      </View>
    ))}
  </View>
</Card>;
```

### Loading with timeout

```tsx
const [isLoading, setIsLoading] = useState(false);
const [hasTimedOut, setHasTimedOut] = useState(false);

const loadWithTimeout = async () => {
  setIsLoading(true);
  setHasTimedOut(false);

  const timeout = setTimeout(() => {
    setHasTimedOut(true);
  }, 10000); // 10 second timeout

  try {
    await loadData();
    clearTimeout(timeout);
  } finally {
    setIsLoading(false);
  }
};

<View style={{ alignItems: 'center', padding: 32 }}>
  {isLoading && !hasTimedOut && (
    <>
      <LoadingIndicator size={32} />
      <Text variant="pm" style={{ marginTop: 8 }}>
        Loading data...
      </Text>
    </>
  )}

  {hasTimedOut && (
    <>
      <Icon name="AlertCircle" size={32} color={colors.destructive} />
      <Text variant="pm" style={{ marginTop: 8 }}>
        Loading is taking longer than expected
      </Text>
      <Button
        text="Retry"
        variant="outline"
        onPress={loadWithTimeout}
        style={{ marginTop: 12 }}
      />
    </>
  )}
</View>;
```

### Loading skeleton effect

```tsx
const LoadingSkeleton = () => (
  <Card>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.border,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingIndicator size={16} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <View
          style={{
            height: 16,
            backgroundColor: colors.border,
            borderRadius: 4,
            width: '70%',
          }}
        />
        <View
          style={{
            height: 12,
            backgroundColor: colors.border,
            borderRadius: 4,
            width: '40%',
          }}
        />
      </View>
    </View>
  </Card>
);

// Usage
{
  isLoading ? <LoadingSkeleton /> : <UserCard user={userData} />;
}
```

### Form submission loading

```tsx
const [formState, setFormState] = useState<
  'idle' | 'loading' | 'success' | 'error'
>('idle');

const handleSubmit = async () => {
  setFormState('loading');
  try {
    await submitForm();
    setFormState('success');
  } catch (error) {
    setFormState('error');
  }
};

<View style={{ gap: 16 }}>
  <Input label="Name" value={name} onChangeText={setName} />
  <Input label="Email" value={email} onChangeText={setEmail} />

  <Button
    text={
      formState === 'loading'
        ? ''
        : formState === 'success'
          ? 'Submitted!'
          : formState === 'error'
            ? 'Try Again'
            : 'Submit'
    }
    onPress={handleSubmit}
    disabled={formState === 'loading'}
    variant={formState === 'error' ? 'destructive' : 'flat'}
  >
    {formState === 'loading' && (
      <LoadingIndicator size={16} color={colors.altForeground} />
    )}
  </Button>

  {formState === 'loading' && (
    <View style={{ alignItems: 'center' }}>
      <Text variant="ps">Please wait while we process your request...</Text>
    </View>
  )}
</View>;
```

## Implementation notes

- On Android, the component uses the native `ActivityIndicator` for optimal performance
- On iOS and web, it uses a custom animated circle with React Native Reanimated
- The animation runs at 60 FPS with a smooth linear rotation
- The loading indicator automatically centers itself within its container
- Color and size props allow for easy customization while maintaining performance
- The component handles different sizes gracefully with proper scaling

## Platform differences

### Android

- Uses native `ActivityIndicator` component
- Inherits system theming and accessibility features
- Optimal performance and battery usage

### iOS/Web

- Custom implementation using React Native Reanimated
- Smooth 1-second rotation cycle with linear easing
- Consistent appearance across platforms

## Accessibility

- Loading indicators are properly announced by screen readers
- Color contrast meets accessibility guidelines when using theme colors
- Loading states are communicated to assistive technologies
- Component respects user's motion preferences when available

## Performance considerations

- Animations automatically pause when the app is in the background
- Memory usage is minimal with efficient animation handling
- Multiple loading indicators can run simultaneously without performance impact
- The component cleans up animations properly when unmounted
