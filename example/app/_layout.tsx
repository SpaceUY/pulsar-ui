import { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  useColorScheme,
  I18nManager,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Header, useUIKitTheme } from '@space-uy/pulsar-ui';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_700Bold,
  useFonts,
} from '@expo-google-fonts/sora';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_700Bold,
  });
  const [rtlLoaded, setRtlLoaded] = useState(false);
  const isExpoGo = Constants.appOwnership === 'expo';

  // Load RTL preference on native builds
  useEffect(() => {
    const reloadApp = async () => {
      try {
        await Updates.reloadAsync();
      } catch {
        // Fallback for dev builds where Updates may not work
        if (NativeModules.DevSettings) {
          NativeModules.DevSettings.reload();
        }
      }
    };

    const loadRTLPreference = async () => {
      // Skip RTL logic in Expo Go
      if (isExpoGo) {
        setRtlLoaded(true);
        return;
      }

      try {
        const rtlValue = await AsyncStorage.getItem('rtl_enabled');
        if (rtlValue !== null) {
          const isRTL = JSON.parse(rtlValue);
          if (I18nManager.isRTL !== isRTL) {
            I18nManager.forceRTL(isRTL);
            I18nManager.allowRTL(isRTL);
            await reloadApp();
            return;
          }
        }
      } catch (e) {
        // Ignore errors
      } finally {
        setRtlLoaded(true);
      }
    };
    loadRTLPreference();
  }, [isExpoGo]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if ((loaded || Platform.OS === 'web') && rtlLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, rtlLoaded]);

  if ((!loaded && Platform.OS !== 'web') || !rtlLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Layout = () => {
  const insets = useSafeAreaInsets();
  const { setTheme, setColorScheme, colors } = useUIKitTheme();
  const colorScheme = useColorScheme();

  // Configure custom theme on mount
  useEffect(() => {
    setTheme({
      colors: {
        light: {
          primary: '#09090B',
          foregroundOnPrimary: '#FFFFFF',
          background: '#FFFFFF',
          altBackground: '#FFFFFF',
          foreground: '#09090B',
          altForeground: '#FAFAFA',
          border: '#E4E4E7',
          destructive: '#DC2626',
          foregroundOnDestructive: '#FFFFFF',
        },
        dark: {
          primary: '#FAFAFA',
          foregroundOnPrimary: '#09090B',
          background: '#09090B',
          altBackground: '#09090B',
          foreground: '#FAFAFA',
          altForeground: '#18181B',
          border: '#27272A',
          destructive: '#DC2626',
          foregroundOnDestructive: '#FFFFFF',
        },
      },
      fonts: {
        light: 'Sora_300Light',
        regular: 'Sora_400Regular',
        medium: 'Sora_500Medium',
        bold: 'Sora_700Bold',
      },
      roundness: 6,
      insets,
    });
  }, [insets, setTheme]);

  // Sync color scheme with system
  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  const renderHeader = (props: any): React.ReactNode => {
    const { options, back } = props as NativeStackHeaderProps;
    const backIcon = I18nManager.isRTL ? 'ChevronRight' : 'ChevronLeft';
    return (
      <Header
        title={options.title || ''}
        {...(back && {
          leftButton: { iconName: backIcon, onPress: () => router.back() },
        })}
      />
    );
  };

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.foreground },
        header: renderHeader,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ui-kit/tabs" options={{ title: 'Tabs' }} />
      <Stack.Screen name="ui-kit/buttons" options={{ title: 'Buttons' }} />
      <Stack.Screen name="ui-kit/inputs" options={{ title: 'Inputs' }} />
      <Stack.Screen name="ui-kit/textarea" options={{ title: 'Textarea' }} />
      <Stack.Screen name="ui-kit/texts" options={{ title: 'Texts' }} />
      <Stack.Screen name="ui-kit/select" options={{ title: 'Select' }} />
      <Stack.Screen name="ui-kit/cards" options={{ title: 'Cards' }} />
      <Stack.Screen name="ui-kit/loaders" options={{ title: 'Loaders' }} />
      <Stack.Screen
        name="ui-kit/calendar-picker"
        options={{ title: 'Calendar Picker' }}
      />
      <Stack.Screen
        name="ui-kit/checkboxes"
        options={{ title: 'Checkboxes' }}
      />
      <Stack.Screen name="ui-kit/chips" options={{ title: 'Chips' }} />
      <Stack.Screen name="ui-kit/icons" options={{ headerShown: false }} />
      <Stack.Screen
        name="ui-kit/icon-detail"
        options={{ title: 'Icon Detail' }}
      />
      <Stack.Screen
        name="ui-kit/icon-buttons"
        options={{ title: 'Icon Buttons' }}
      />
      <Stack.Screen name="ui-kit/otp-input" options={{ title: 'Otp Input' }} />
      <Stack.Screen name="ui-kit/headers" options={{ title: 'Headers' }} />
      <Stack.Screen
        name="ui-kit/copy-to-clipboard"
        options={{ title: 'Copy to Clipboard' }}
      />
      <Stack.Screen name="ui-kit/dialog" options={{ title: 'Dialog' }} />
      <Stack.Screen name="ui-kit/accordion" options={{ title: 'Accordion' }} />
      <Stack.Screen
        name="ui-kit/bottom-sheet"
        options={{ title: 'Bottom Sheet' }}
      />
      <Stack.Screen
        name="ui-kit/input-container"
        options={{ title: 'Input Container' }}
      />
      <Stack.Screen
        name="ui-kit/button-container"
        options={{ title: 'Button Container' }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({ root: { flex: 1 } });
