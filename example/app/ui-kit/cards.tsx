import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon, Button, IconButton } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import useTheme from '../../../src/hooks/useTheme';
import { convertHexToRgba } from '../../../src/utils/uiUtils';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function CardsExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  const toggleLike = (cardId: string) => {
    setLikedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Cards
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Container components with different variants and content types
          </Text>
        </View>
      )}

      <Card
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Card Variants
        </Text>
        <View style={styles.cardContainer}>
          <Card style={styles.sampleCard}>
            <Text variant="h4">Default Card</Text>
            <Text variant="ps" style={styles.cardDescription}>
              This is a default card with some content inside it.
            </Text>
          </Card>

          <Card variant="alternative" style={styles.sampleCard}>
            <Text variant="h4">Outlined Card</Text>
            <Text variant="ps" style={styles.cardDescription}>
              This card has a border instead of elevation.
            </Text>
          </Card>

          <Card
            variant="tinted"
            style={[
              styles.sampleCard,
              { backgroundColor: convertHexToRgba(colors.border, 0.5) },
            ]}
          >
            <Text variant="h4">Tinted Card</Text>
            <Text variant="ps" style={styles.cardDescription}>
              This card has a tinted background color.
            </Text>
          </Card>
        </View>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Interactive Card
        </Text>
        <Card style={styles.interactiveCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text variant="h4">Interactive Content</Text>
              <Text variant="ps" style={styles.cardSubtitle}>
                This card contains interactive elements
              </Text>
            </View>
            <IconButton
              iconName={likedCards.interactive ? 'Heart' : 'HeartCrack'}
              variant="transparent"
              size="small"
              onPress={() => toggleLike('interactive')}
            />
          </View>
          <Text variant="ps" style={styles.cardContent}>
            Cards can contain any type of content including buttons, icons, and
            other interactive elements. This makes them perfect for creating
            rich user interfaces.
          </Text>
          <View style={styles.cardActions}>
            <Button text="Action" variant="outline" size="small" />
            <Button text="Primary" size="small" />
          </View>
        </Card>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Card with Content
        </Text>
        <Card style={styles.contentCard}>
          <View style={styles.cardImagePlaceholder}>
            <Icon name="Image" size={32} color={colors.foreground} />
          </View>
          <View style={styles.cardBody}>
            <Text variant="h4">Card Title</Text>
            <Text variant="ps" style={styles.cardDescription}>
              This card demonstrates how to structure content with images,
              titles, and descriptions in a clean layout.
            </Text>
            <View style={styles.cardMeta}>
              <View style={styles.metaItem}>
                <Icon name="Calendar" size={14} color={colors.foreground} />
                <Text variant="caption" style={styles.metaText}>
                  Dec 12, 2023
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="User" size={14} color={colors.foreground} />
                <Text variant="caption" style={styles.metaText}>
                  John Doe
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </Card>

      <Card style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Nested Cards
        </Text>
        <Card style={styles.nestedCard}>
          <Text variant="h4" style={styles.nestedTitle}>
            Parent Card
          </Text>
          <Card
            variant="tinted"
            style={[
              styles.childCard,
              { backgroundColor: convertHexToRgba(colors.primary, 0.1) },
            ]}
          >
            <Text variant="pm">Nested Child Card</Text>
            <Text variant="ps" style={styles.nestedDescription}>
              Cards can be nested to create complex layouts and visual
              hierarchies.
            </Text>
          </Card>
        </Card>
      </Card>

      <View style={styles.spacer} />
    </ResponsiveScroll>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 16 },
  spacer: { height: 40 },
  likeButton: {},
  likeButtonActive: { tintColor: '#EF4444' },
  firstExample: { marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginBottom: 24 },
  exampleTitle: { marginBottom: 16 },
  cardContainer: { gap: 16 },
  sampleCard: { padding: 16 },
  cardDescription: { marginTop: 8, opacity: 0.7 },
  interactiveCard: { padding: 16 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardSubtitle: { opacity: 0.7, marginTop: 4 },
  cardContent: { marginBottom: 16, lineHeight: 20, opacity: 0.8 },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  contentCard: { overflow: 'hidden' },
  cardImagePlaceholder: {
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: { padding: 16 },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: { opacity: 0.7 },
  nestedCard: { padding: 16 },
  nestedTitle: { marginBottom: 16 },
  childCard: { padding: 12 },
  nestedDescription: { marginTop: 8, opacity: 0.7 },
});
