import { useRef, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { BottomSheet, Switch, Text, Card, Icon } from '@space-uy/pulsar-ui';
import { useUIKitTheme } from '@space-uy/pulsar-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onClose: () => void;
};

type BottomSheetRef = {
  show: () => void;
  hide: () => void;
  isActive: boolean;
};

const ThemeSettingsModal = ({ visible, onClose }: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const {
    theme,
    setTheme: setUIKitTheme,
    setColorScheme,
    colors,
    colorScheme,
  } = useUIKitTheme();
  const insets = useSafeAreaInsets();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.show();
    } else {
      bottomSheetRef.current?.hide();
    }
  }, [visible]);

  const handleColorChange = (color: string) => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        light: { ...theme.colors.light, primary: color },
        dark: { ...theme.colors.dark, primary: color },
      },
    };
    setUIKitTheme({ ...newTheme, insets });
  };

  const handleBorderRadiusChange = (radius: number) => {
    const newTheme = {
      ...theme,
      roundness: radius,
    };
    setUIKitTheme({ ...newTheme, insets });
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setColorScheme(newDarkMode ? 'dark' : 'light');
  };

  // Get the current primary color for the active color scheme
  const getCurrentPrimaryColor = () => {
    return colors.primary; // Use colors.primary which is already the right color for current scheme
  };

  // Get the default color for the current scheme
  const getDefaultColorForScheme = () => {
    return isDarkMode ? '#FAFAFA' : '#09090B';
  };

  const styles = StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: insets.bottom + 16,
      marginHorizontal: 16,
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionsRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
  });

  return (
    <BottomSheet ref={bottomSheetRef} onBackdropPress={onClose}>
      <View style={[styles.container]}>
        <Text variant="h2">Theme Settings</Text>

        <Card>
          <View style={styles.cardRow}>
            <Text variant="h3">Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={handleDarkModeToggle} />
          </View>
        </Card>

        <Card>
          <Text variant="h3">Border Radius</Text>
          <View style={styles.optionsRow}>
            {[4, 6, 8, 12].map((radius) => (
              <Pressable
                key={radius}
                onPress={() => handleBorderRadiusChange(radius)}
                style={({ pressed }) => ({
                  width: 40,
                  height: 40,
                  borderRadius: radius,
                  backgroundColor: colors.border,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: theme.roundness === radius ? 2 : 0,
                  borderColor: colors.primary,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text variant="caption">{radius}</Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <Card>
          <Text variant="h3">Main Color</Text>
          <View style={styles.optionsRow}>
            {[
              getDefaultColorForScheme(), // Use the default color for current scheme
              '#3B82F6', // Softer blue
              '#8B5CF6', // Softer purple
              '#10B981', // Pleasant green
            ].map((color) => {
              const isSelected = getCurrentPrimaryColor() === color;
              return (
                <Pressable
                  key={color}
                  onPress={() => handleColorChange(color)}
                  style={({ pressed }) => ({
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? colors.primary : colors.border,
                    opacity: pressed ? 0.7 : 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  })}
                >
                  {isSelected && (
                    <Icon
                      name="Check"
                      size={20}
                      color={
                        color === '#FAFAFA' || color === '#FFFFFF'
                          ? '#000000'
                          : '#FFFFFF'
                      }
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Card>
      </View>
    </BottomSheet>
  );
};

export default ThemeSettingsModal;
