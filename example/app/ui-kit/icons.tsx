import { icons } from 'lucide-react-native';
import {
  View,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Icon, Input } from '@space-uy/rn-spacedev-uikit';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

const ICON_SIZE = 24;
const SPACING = 16;
const screenWidth = Dimensions.get('window').width;
const iconsPerRow = Math.floor(
  (screenWidth - SPACING * 2) / (ICON_SIZE + SPACING)
);
const ITEM_HEIGHT = (screenWidth - SPACING * 2) / iconsPerRow;

const IconRow = ({
  rowIcons,
  style,
}: {
  rowIcons: string[];
  style?: StyleProp<ViewStyle>;
}) => (
  <View style={[styles.row, style]}>
    {rowIcons.map((name) => (
      <View key={name} style={styles.iconContainer}>
        <Icon name={name as any} size={ICON_SIZE} />
      </View>
    ))}
  </View>
);

export default function IconsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const iconRows = useMemo(() => {
    const iconNames = Object.keys(icons).filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const rows = [];
    for (let i = 0; i < iconNames.length; i += iconsPerRow) {
      rows.push(iconNames.slice(i, i + iconsPerRow));
    }
    return rows;
  }, [searchQuery]);

  return (
    <>
      <Input
        style={styles.searchInput}
        placeholder="Search icons..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        iconName="Search"
        clearable
      />
      <FlashList<string[]>
        data={iconRows}
        renderItem={({ item, index }) => (
          <IconRow
            rowIcons={item}
            style={
              index === iconRows.length - 1
                ? { marginBottom: insets.bottom + 24 }
                : undefined
            }
          />
        )}
        estimatedItemSize={ITEM_HEIGHT}
        overrideItemLayout={(layout) => {
          layout.size = ITEM_HEIGHT;
        }}
        keyExtractor={(_, index) => `row-${index}`}
        contentContainerStyle={styles.container}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginEnd: SPACING / 2,
  },
  searchInput: {
    margin: SPACING,
  },
  container: {
    paddingHorizontal: SPACING,
    rowGap: SPACING / 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING / 2,
  },
  iconContainer: {
    width: (screenWidth - SPACING * 2) / iconsPerRow,
    height: (screenWidth - SPACING * 2) / iconsPerRow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
