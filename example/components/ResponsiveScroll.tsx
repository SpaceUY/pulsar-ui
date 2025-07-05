import type { PropsWithChildren } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
};

export default function ResponsiveScroll({ style, children }: Props) {
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';

  return (
    <View style={[style, styles.container]}>
      <ScrollView
        style={[style]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          { width: isWeb ? Math.min(600, width) : width },
        ]}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
});
