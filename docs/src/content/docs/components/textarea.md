---
title: TextArea
description: Multi-line text input component with character counting, labels, and automatic height adjustment.
---

The `TextArea` component provides a multi-line text input with character counting, labels, hints, and automatic height adjustment. It's ideal for longer text content like messages, descriptions, and comments.

## Import

```typescript
import { TextArea, type InputRef } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
const [message, setMessage] = useState('');

<TextArea
  label="Message"
  placeholder="Enter your message"
  value={message}
  onChangeText={setMessage}
/>;
```

## Properties

| Property        | Type                     | Required | Default value | Description                              |
| --------------- | ------------------------ | -------- | ------------- | ---------------------------------------- |
| `label`         | `string`                 | ❌       | -             | Label text displayed above the textarea  |
| `hint`          | `string`                 | ❌       | -             | Hint text displayed below the textarea   |
| `error`         | `boolean`                | ❌       | `false`       | Whether the textarea is in error state   |
| `numberOfLines` | `number`                 | ❌       | `4`           | Number of visible lines in the textarea  |
| `maxLength`     | `number`                 | ❌       | `1200`        | Maximum number of characters allowed     |
| `onChangeText`  | `(text: string) => void` | ❌       | -             | Callback when textarea text changes      |
| `editable`      | `boolean`                | ❌       | `true`        | Whether the textarea is editable         |
| `style`         | `StyleProp<ViewStyle>`   | ❌       | -             | Custom styles for the textarea container |
| `...rest`       | `TextInputProps`         | ❌       | -             | Additional TextInput props               |

## InputRef Methods

When using a ref, the following methods are available:

| Method  | Type         | Description                |
| ------- | ------------ | -------------------------- |
| `focus` | `() => void` | Focus the textarea         |
| `blur`  | `() => void` | Remove focus from textarea |

## Basic examples

### Simple textarea

```tsx
const [comment, setComment] = useState('');

<TextArea
  label="Comment"
  placeholder="Share your thoughts..."
  value={comment}
  onChangeText={setComment}
  numberOfLines={3}
/>;
```

### Textarea with character limit

```tsx
const [description, setDescription] = useState('');

<TextArea
  label="Description"
  placeholder="Describe your project..."
  value={description}
  onChangeText={setDescription}
  maxLength={500}
  numberOfLines={5}
  hint="Provide a detailed description of your project"
/>;
```

### Error state textarea

```tsx
const [feedback, setFeedback] = useState('');
const [hasError, setHasError] = useState(false);

<TextArea
  label="Feedback"
  placeholder="Your feedback is important to us"
  value={feedback}
  onChangeText={(text) => {
    setFeedback(text);
    setHasError(text.length < 10);
  }}
  error={hasError}
  hint={
    hasError
      ? 'Feedback must be at least 10 characters long'
      : 'Help us improve our service'
  }
  numberOfLines={4}
/>;
```

## Advanced examples

### Contact form

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const [errors, setErrors] = useState<Record<string, boolean>>({});

const validateForm = () => {
  const newErrors: Record<string, boolean> = {};
  newErrors.name = formData.name.length < 2;
  newErrors.email = !formData.email.includes('@');
  newErrors.subject = formData.subject.length < 5;
  newErrors.message = formData.message.length < 20;
  setErrors(newErrors);
  return !Object.values(newErrors).some(Boolean);
};

<Card>
  <Text variant="h3">Contact Us</Text>
  <Text variant="ps" style={{ opacity: 0.7, marginTop: 4 }}>
    We'd love to hear from you
  </Text>

  <View style={{ gap: 16, marginTop: 20 }}>
    <Input
      label="Name"
      value={formData.name}
      onChangeText={(name) => setFormData((prev) => ({ ...prev, name }))}
      error={errors.name}
      hint={errors.name ? 'Name must be at least 2 characters' : ''}
      placeholder="Your full name"
    />

    <Input
      label="Email"
      value={formData.email}
      onChangeText={(email) => setFormData((prev) => ({ ...prev, email }))}
      error={errors.email}
      hint={errors.email ? 'Please enter a valid email address' : ''}
      placeholder="your@email.com"
      keyboardType="email-address"
    />

    <Input
      label="Subject"
      value={formData.subject}
      onChangeText={(subject) => setFormData((prev) => ({ ...prev, subject }))}
      error={errors.subject}
      hint={errors.subject ? 'Subject must be at least 5 characters' : ''}
      placeholder="What is this about?"
    />

    <TextArea
      label="Message"
      value={formData.message}
      onChangeText={(message) => setFormData((prev) => ({ ...prev, message }))}
      error={errors.message}
      hint={
        errors.message
          ? 'Message must be at least 20 characters'
          : 'Tell us more about your inquiry'
      }
      placeholder="Your message here..."
      numberOfLines={6}
      maxLength={2000}
    />

    <Button
      text="Send Message"
      onPress={validateForm}
      disabled={Object.values(formData).some((value) => !value.trim())}
    />
  </View>
</Card>;
```

### Review form

```tsx
const [review, setReview] = useState({
  rating: 5,
  title: '',
  comment: '',
});

<Card>
  <Text variant="h3">Write a Review</Text>

  <View style={{ gap: 16, marginTop: 16 }}>
    <View>
      <Text variant="h5" style={{ marginBottom: 8 }}>
        Rating
      </Text>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => setReview((prev) => ({ ...prev, rating: star }))}
          >
            <Icon
              name="Star"
              size={24}
              color={star <= review.rating ? '#FFD700' : colors.border}
            />
          </Pressable>
        ))}
      </View>
    </View>

    <Input
      label="Review Title"
      value={review.title}
      onChangeText={(title) => setReview((prev) => ({ ...prev, title }))}
      placeholder="Summarize your experience"
      maxLength={100}
    />

    <TextArea
      label="Review Comment"
      value={review.comment}
      onChangeText={(comment) => setReview((prev) => ({ ...prev, comment }))}
      placeholder="Share your detailed experience..."
      numberOfLines={5}
      maxLength={1000}
      hint="Help others by sharing specific details about your experience"
    />

    <Button
      text="Submit Review"
      onPress={() => console.log('Review submitted:', review)}
      disabled={!review.title.trim() || !review.comment.trim()}
    />
  </View>
</Card>;
```

### Note-taking app

```tsx
const [notes, setNotes] = useState([
  { id: 1, title: 'Meeting Notes', content: '', lastModified: new Date() },
  { id: 2, title: 'Ideas', content: '', lastModified: new Date() },
]);

const [selectedNote, setSelectedNote] = useState(notes[0]);

const updateNote = (content: string) => {
  const updatedNote = {
    ...selectedNote,
    content,
    lastModified: new Date(),
  };
  setSelectedNote(updatedNote);
  setNotes((prev) =>
    prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
  );
};

<View style={{ flexDirection: 'row', flex: 1 }}>
  {/* Note List */}
  <View
    style={{ width: 200, borderRightWidth: 1, borderRightColor: colors.border }}
  >
    <Text variant="h4" style={{ padding: 16 }}>
      Notes
    </Text>
    {notes.map((note) => (
      <Pressable
        key={note.id}
        style={{
          padding: 16,
          backgroundColor:
            selectedNote.id === note.id ? colors.primary + '10' : 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
        onPress={() => setSelectedNote(note)}
      >
        <Text variant="pm">{note.title}</Text>
        <Text variant="ps" style={{ opacity: 0.7, marginTop: 4 }}>
          {note.lastModified.toLocaleDateString()}
        </Text>
      </Pressable>
    ))}
  </View>

  {/* Note Editor */}
  <View style={{ flex: 1, padding: 16 }}>
    <Input
      value={selectedNote.title}
      onChangeText={(title) => setSelectedNote((prev) => ({ ...prev, title }))}
      placeholder="Note title"
      style={{ marginBottom: 16, fontSize: 18, fontWeight: 'bold' }}
    />

    <TextArea
      value={selectedNote.content}
      onChangeText={updateNote}
      placeholder="Start writing your note..."
      numberOfLines={20}
      maxLength={5000}
      style={{ flex: 1 }}
    />

    <Text
      variant="caption"
      style={{ textAlign: 'right', marginTop: 8, opacity: 0.7 }}
    >
      Last modified: {selectedNote.lastModified.toLocaleString()}
    </Text>
  </View>
</View>;
```

### Controlled textarea with ref

```tsx
const textareaRef = useRef<InputRef>(null);
const [content, setContent] = useState('');

const insertTemplate = (template: string) => {
  setContent((prev) => prev + template);
  textareaRef.current?.focus();
};

<View style={{ gap: 16 }}>
  <View>
    <Text variant="h5" style={{ marginBottom: 8 }}>
      Quick Templates
    </Text>
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Button
        text="Thank you"
        size="small"
        variant="outline"
        onPress={() => insertTemplate('Thank you for your time. ')}
      />
      <Button
        text="Best regards"
        size="small"
        variant="outline"
        onPress={() => insertTemplate('\n\nBest regards,\n')}
      />
      <Button
        text="Please advise"
        size="small"
        variant="outline"
        onPress={() => insertTemplate('Please advise. ')}
      />
    </View>
  </View>

  <TextArea
    ref={textareaRef}
    label="Email Content"
    value={content}
    onChangeText={setContent}
    placeholder="Compose your email..."
    numberOfLines={8}
    maxLength={3000}
  />

  <View style={{ flexDirection: 'row', gap: 8 }}>
    <Button text="Clear" variant="outline" onPress={() => setContent('')} />
    <Button
      text="Focus"
      variant="outline"
      onPress={() => textareaRef.current?.focus()}
    />
    <Button text="Send" disabled={!content.trim()} />
  </View>
</View>;
```

### Auto-save textarea

```tsx
const [content, setContent] = useState('');
const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>(
  'saved'
);

useEffect(() => {
  if (content.trim()) {
    setSaveStatus('unsaved');
    const timer = setTimeout(() => {
      setSaveStatus('saving');
      // Simulate auto-save
      setTimeout(() => {
        setSaveStatus('saved');
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [content]);

<View style={{ gap: 16 }}>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Text variant="h4">Document Editor</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {saveStatus === 'saving' && <LoadingIndicator size={16} />}
      <Text
        variant="ps"
        style={{
          color:
            saveStatus === 'saved'
              ? 'green'
              : saveStatus === 'saving'
                ? colors.primary
                : 'orange',
        }}
      >
        {saveStatus === 'saved'
          ? 'Saved'
          : saveStatus === 'saving'
            ? 'Saving...'
            : 'Unsaved changes'}
      </Text>
    </View>
  </View>

  <TextArea
    value={content}
    onChangeText={setContent}
    placeholder="Start typing your document..."
    numberOfLines={15}
    maxLength={10000}
    hint="Your changes are automatically saved"
  />
</View>;
```

### Readonly textarea

```tsx
const termsOfService = `
These Terms of Service ("Terms") govern your use of our application and services. By using our services, you agree to these terms.

1. Acceptance of Terms
By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.

3. Disclaimer
The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability.
`;

<Card>
  <Text variant="h3">Terms of Service</Text>
  <TextArea
    value={termsOfService}
    editable={false}
    numberOfLines={10}
    style={{
      backgroundColor: colors.altBackground,
      marginTop: 16,
    }}
    hint="Please read our terms of service carefully"
  />

  <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
    <Button text="Accept" />
    <Button text="Decline" variant="outline" />
  </View>
</Card>;
```

## Implementation notes

- Built on top of InputContainer for consistent styling and behavior
- Character counter appears in the bottom-right corner showing current/max characters
- The textarea automatically grows to accommodate the specified number of lines
- Text input starts at the top-left and supports multi-line editing
- Maximum length enforcement prevents typing beyond the specified limit
- Error states change border color and display hint text in error color
- The component handles platform-specific text alignment and behavior

## Character counting

- Character count displays as "current / maximum" in the bottom-right
- Updates in real-time as the user types
- Prevents input when maximum length is reached
- Counter color matches the theme foreground color

## Styling

### Theme integration

The TextArea automatically applies theme styling:

- **Background**: Uses theme background colors
- **Border**: Uses theme border colors with focus state changes
- **Text**: Uses theme typography and foreground colors
- **Character counter**: Uses caption variant with theme colors

### Layout

- **Flexible height**: Based on numberOfLines \* 22px per line
- **Text alignment**: Top-left aligned for natural writing flow
- **Padding**: Consistent with other input components
- **Counter position**: Bottom-right with proper spacing

## Accessibility

- TextArea fields are fully keyboard accessible
- Labels are properly associated with textarea fields
- Hint text provides additional context for screen readers
- Character limits are announced to assistive technologies
- Error states are communicated to screen readers
- Focus management works correctly with keyboard navigation
