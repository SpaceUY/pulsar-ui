import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Card,
  Icon,
  IconButton,
  Input,
  Text,
} from '@space-uy/rn-spacedev-uikit';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../../src/hooks/useTheme';
import { useEffect, useState } from 'react';
import ThemeSettingsModal from '../components/ThemeSettingsModal';
import componentsData from '../assets/data/components.json';

const components = componentsData;

export default function UIKitScreen() {
  const [search, setSearch] = useState('');
  const [filteredComponents, setFilteredComponents] = useState(components);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const cardSize = (width - 48) / 2;

  useEffect(() => {
    setFilteredComponents(
      components.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCardPress = (route: string) => {
    router.push(route);
    setTimeout(() => {
      Keyboard.dismiss();
    }, 0);
  };

  const handleThemePress = () => {
    Keyboard.dismiss();
    setIsThemeModalVisible(true);
  };

  return (
    <View style={[styles.root, { paddingTop: top + 16 }]}>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.header}>
          <Input
            style={styles.searchInput}
            iconName="Search"
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            clearable
          />
          <IconButton
            iconName="Palette"
            variant="outline"
            size="large"
            onPress={handleThemePress}
          />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={filteredComponents}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        contentContainerStyle={[
          styles.contentListContainer,
          { paddingBottom: bottom + 16 },
        ]}
        renderItem={({ item }) => (
          <Pressable
            style={styles.button}
            onPress={() => handleCardPress(item.route)}
          >
            <Card style={{ width: cardSize, height: cardSize }}>
              <Card variant="tinted" style={styles.iconContainer}>
                <Icon
                  name={item.iconName as any}
                  size={40}
                  color={colors.primary}
                />
              </Card>
              <View style={styles.contentContainer}>
                <Text style={styles.label} variant="h4" numberOfLines={1}>
                  {item.name}
                </Text>
                <Icon
                  style={styles.chevron}
                  name="ChevronRight"
                  size={16}
                  color={colors.foreground}
                />
              </View>
            </Card>
          </Pressable>
        )}
      />

      <ThemeSettingsModal
        visible={isThemeModalVisible}
        onClose={() => setIsThemeModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 16,
    paddingVertical: 8,
  },
  searchInput: { flex: 1 },
  contentListContainer: { gap: 16, paddingHorizontal: 8 },
  button: { marginHorizontal: 8 },
  iconContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  label: { flex: 1 },
  chevron: { marginLeft: 8 },
});
