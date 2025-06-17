import React from 'react';
import { Pressable, Text, StyleSheet, View, Alert } from 'react-native';
import { ExternalLink, Globe } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useWebBrowser } from './WebBrowser';

interface WebBrowserButtonProps {
  url: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  style?: any;
  onPress?: () => void;
  useInAppBrowser?: boolean;
}

export default function WebBrowserButton({ 
  url, 
  title, 
  subtitle, 
  icon, 
  style,
  onPress,
  useInAppBrowser = false
}: WebBrowserButtonProps) {
  const { openBrowser, openInAppBrowser } = useWebBrowser();

  const handlePress = () => {
    onPress?.();
    
    if (useInAppBrowser) {
      openInAppBrowser(url);
    } else {
      // Show options for how to open the link
      Alert.alert(
        'Open Link',
        `How would you like to open ${title}?`,
        [
          {
            text: 'In-App Browser',
            onPress: () => openInAppBrowser(url),
          },
          {
            text: 'System Browser',
            onPress: () => openBrowser(url),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    }
  };

  return (
    <Pressable 
      style={[styles.container, style]} 
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${title} in browser`}
    >
      <View style={styles.iconContainer}>
        {icon || <Globe size={20} color={Colors.primary} />}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      <ExternalLink size={16} color={Colors.lightText} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.lightText,
  },
});