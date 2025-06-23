import React, { useState } from 'react';
import { Pressable, StyleSheet, Alert, Clipboard, View } from 'react-native';
import Icon from './Icon';
import Text from './Text';
import useTheme from '../hooks/useTheme';

interface CopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  onCopy?: () => void;
  showFeedback?: boolean;
  style?: any;
  iconColor?: string; // Color personalizado para el ícono
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  children,
  onCopy,
  showFeedback = true,
  style,
  iconColor,
}) => {
  const [copied, setCopied] = useState(false);
  const { colors } = useTheme();

  const handleCopy = () => {
    try {
      Clipboard.setString(text);
      setCopied(true);

      if (showFeedback) {
        Alert.alert('Copied!', `"${text}" has been copied to clipboard`);
      }

      onCopy?.();

      // Use setTimeout with reference for better control
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.altBackground,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={handleCopy}
    >
      <View style={styles.content}>
        {children || (
          <Text
            variant="pm"
            style={[styles.text, { color: colors.foreground }]}
          >
            {text}
          </Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name={copied ? 'Check' : 'Copy'}
          size={16}
          color={iconColor || (copied ? colors.primary : colors.foreground)}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    minHeight: 48,
    maxWidth: '100%', // Asegura que no se extienda más allá del contenedor padre
  },
  content: {
    flex: 1,
    marginRight: 12, // Aumenté para dar más espacio al ícono
    minWidth: 0, // Permite que el contenido se comprima si es necesario
    overflow: 'hidden', // Evita que el contenido se desborde
  },
  text: {
    // Estilo para el texto por defecto cuando no hay children
  },
  iconContainer: {
    flexShrink: 0, // Evita que el ícono se comprima
    flexBasis: 16, // Base fija para el ícono
    width: 16, // Ancho fijo del ícono
    height: 16, // Alto fijo del ícono
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2, // Alineación con la primera línea del texto
  },
});
