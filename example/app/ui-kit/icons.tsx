import { useMemo, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type StyleProp,
  Pressable,
} from 'react-native';
import { icons } from 'lucide-react-native';
import { Icon, Input, Header } from '@space-uy/pulsar-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LegendList } from '@legendapp/list';

import useTheme from '../../../src/hooks/useTheme';

const ICON_SIZE = 24;
const SPACING = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ICONS_PER_ROW = Math.floor(
  (SCREEN_WIDTH - SPACING * 2) / (ICON_SIZE + SPACING)
);
const ITEM_HEIGHT = (SCREEN_WIDTH - SPACING * 2) / ICONS_PER_ROW;

// Pre-calculate icon names to avoid doing it on every render
const ALL_ICON_NAMES = Object.keys(icons);

const IconRow = ({
  rowIcons,
  style,
  onIconPress,
}: {
  rowIcons: string[];
  style?: StyleProp<ViewStyle>;
  onIconPress: (iconName: string) => void;
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, style]}>
      {rowIcons.map((name) => (
        <Pressable
          key={name}
          style={[
            styles.iconContainer,
            { backgroundColor: colors.altBackground },
          ]}
          onPress={() => onIconPress(name)}
        >
          <Icon name={name as any} size={ICON_SIZE} />
        </Pressable>
      ))}
    </View>
  );
};

export default function IconsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';

  const iconRows = useMemo(() => {
    let iconNames = ALL_ICON_NAMES;

    // Filter only if there's a search query
    if (searchQuery.trim()) {
      iconNames = ALL_ICON_NAMES.filter((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const rows = [];
    for (let i = 0; i < iconNames.length; i += ICONS_PER_ROW) {
      rows.push(iconNames.slice(i, i + ICONS_PER_ROW));
    }
    return rows;
  }, [searchQuery]);

  const handleIconPress = useCallback((iconName: string) => {
    router.push(`/ui-kit/icon-detail?iconName=${iconName}`);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: string[]; index: number }) => (
      <IconRow
        {...(index === iconRows.length - 1 && {
          style: { marginBottom: insets.bottom + 24 },
        })}
        rowIcons={item}
        onIconPress={handleIconPress}
      />
    ),
    [iconRows.length, insets.bottom, handleIconPress]
  );

  const keyExtractor = useCallback(
    (_: string[], index: number) => `row-${index}`,
    []
  );

  return (
    <View style={styles.root}>
      {headerVisible ? (
        <Header
          title="Icons"
          leftButton={{ iconName: 'ChevronLeft', onPress: () => router.back() }}
        >
          <Input
            placeholder="Search icons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            iconName="Search"
            clearable
          />
        </Header>
      ) : (
        <Input
          placeholder="Search icons..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          iconName="Search"
          clearable
        />
      )}
      <LegendList
        data={iconRows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={ITEM_HEIGHT}
        contentContainerStyle={styles.container}
        recycleItems={true}
        drawDistance={100}
        waitForInitialLayout={true}
        maintainVisibleContentPosition={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    paddingHorizontal: SPACING,
    paddingTop: SPACING / 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING,
    height: ITEM_HEIGHT,
  },
  iconContainer: {
    width: (SCREEN_WIDTH - SPACING * 2) / ICONS_PER_ROW,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
