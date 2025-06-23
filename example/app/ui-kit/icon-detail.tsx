import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  Card,
  Icon,
  Text,
  CopyToClipboard,
  useUIKitTheme,
} from '@space-uy/rn-spacedev-uikit';

export default function IconDetailScreen() {
  const { iconName } = useLocalSearchParams<{ iconName: string }>();
  const { colors } = useUIKitTheme();

  if (!iconName) {
    return null;
  }

  const codeSnippet = `<Icon name="${iconName}" size={24} />`;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Card variant="tinted" style={[styles.iconCard]}>
          <Icon name={iconName as any} size={120} color={colors.primary} />
        </Card>

        <Text
          variant="h2"
          style={[styles.iconName, { color: colors.foreground }]}
        >
          {iconName}
        </Text>

        <View style={styles.copySection}>
          <Text
            variant="pm"
            style={[styles.copyLabel, { color: colors.foreground }]}
          >
            Copy icon name:
          </Text>
          <CopyToClipboard text={iconName} style={styles.copyButton} />
        </View>

        <View style={styles.usageSection}>
          <Text
            variant="pm"
            style={[styles.usageLabel, { color: colors.foreground }]}
          >
            Usage:
          </Text>
          <CopyToClipboard
            text={codeSnippet}
            showFeedback={true}
            style={[
              styles.codeSnippetButton,
              {
                backgroundColor: colors.altForeground,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              variant="pm"
              style={[styles.codeSnippetText, { color: colors.foreground }]}
            >
              {codeSnippet}
            </Text>
          </CopyToClipboard>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconCard: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconName: {
    marginBottom: 32,
    textAlign: 'center',
  },
  copySection: {
    width: '100%',
    marginBottom: 24,
  },
  copyLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  copyButton: {
    width: '100%',
  },
  usageSection: {
    width: '100%',
  },
  usageLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  codeSnippetButton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
  },
  codeSnippetText: {
    fontFamily: 'monospace',
  },
});
