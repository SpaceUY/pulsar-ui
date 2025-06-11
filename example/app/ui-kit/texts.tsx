import { View, StyleSheet } from 'react-native';
import { Text } from '@space-uy/rn-spacedev-uikit';

const textVariants = [
  { variant: 'h1', label: 'Heading 1' },
  { variant: 'h2', label: 'Heading 2' },
  { variant: 'h3', label: 'Heading 3' },
  { variant: 'h4', label: 'Heading 4' },
  { variant: 'h5', label: 'Heading 5' },
  { variant: 'pl', label: 'Paragraph Large' },
  { variant: 'pm', label: 'Paragraph Medium' },
  { variant: 'ps', label: 'Paragraph Small' },
  { variant: 'caption', label: 'Caption' },
] as const;

export default function TextsScreen() {
  return (
    <View style={styles.container}>
      {textVariants.map(({ variant, label }) => (
        <View key={variant} style={styles.textContainer}>
          <Text variant={variant}>
            {label} - This is an example of {variant} text
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#FFFFFF',
  },
  textContainer: {
    marginBottom: 16,
  },
});
