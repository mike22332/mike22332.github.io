import React from 'react';
import { Platform, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

interface WebBrowserProps {
  url: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export const openWebBrowser = async ({ url, onOpen, onClose }: WebBrowserProps) => {
  try {
    // Ensure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }

    onOpen?.();

    if (Platform.OS === 'web') {
      // On web, open in new tab
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
      onClose?.();
    } else {
      // On mobile, use in-app browser
      const result = await WebBrowser.openBrowserAsync(formattedUrl, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
        controlsColor: '#5D4A7E',
        toolbarColor: '#FFFFFF',
        secondaryToolbarColor: '#F5F5F5',
        showTitle: true,
        enableBarCollapsing: true,
        showInRecents: false,
      });

      onClose?.();
      return result;
    }
  } catch (error) {
    console.error('Error opening web browser:', error);
    Alert.alert(
      'Error',
      'Unable to open the website. Please try again later.',
      [
        {
          text: 'Open in External Browser',
          onPress: () => Linking.openURL(formattedUrl),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }
};

// Hook for easier usage in components
export const useWebBrowser = () => {
  const router = useRouter();

  const openBrowser = (url: string, options?: { onOpen?: () => void; onClose?: () => void; useInAppBrowser?: boolean }) => {
    // If useInAppBrowser is true, navigate to our custom browser screen
    if (options?.useInAppBrowser) {
      router.push({
        pathname: '/web-browser',
        params: { url }
      });
      return;
    }

    return openWebBrowser({
      url,
      onOpen: options?.onOpen,
      onClose: options?.onClose,
    });
  };

  const openInAppBrowser = (url: string) => {
    router.push({
      pathname: '/web-browser',
      params: { url }
    });
  };

  return { openBrowser, openInAppBrowser };
};

export default {
  open: openWebBrowser,
  useWebBrowser,
};