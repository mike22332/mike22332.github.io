import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Share, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Refresh, Share as ShareIcon, ExternalLink, Home, Bookmark, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useWebBrowser } from '@/components/WebBrowser';

export default function WebBrowserScreen() {
  const { url: initialUrl } = useLocalSearchParams<{ url: string }>();
  const router = useRouter();
  const { openBrowser } = useWebBrowser();
  const [url, setUrl] = useState(initialUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    if (url) {
      setIsLoading(true);
      // Simulate refresh
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleShare = async () => {
    try {
      if (url) {
        await Share.share({
          message: url,
          url: url,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOpenExternal = () => {
    if (url) {
      openBrowser(url);
    }
  };

  const handleNavigate = () => {
    if (url.trim()) {
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }
      setUrl(formattedUrl);
      setIsLoading(true);
      // Simulate navigation
      setTimeout(() => {
        setIsLoading(false);
        setCanGoBack(true);
      }, 1500);
    }
  };

  const handleHome = () => {
    setUrl('https://blackbusinessdirectory.com');
    handleNavigate();
  };

  const handleBookmark = () => {
    Alert.alert('Bookmark Added', 'This page has been bookmarked!');
  };

  const handleMore = () => {
    Alert.alert(
      'Browser Options',
      'Choose an action',
      [
        { text: 'Print Page', onPress: () => Alert.alert('Print', 'Print functionality would be implemented here') },
        { text: 'Find in Page', onPress: () => Alert.alert('Find', 'Find in page functionality would be implemented here') },
        { text: 'View Source', onPress: () => Alert.alert('Source', 'View source functionality would be implemented here') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Browser Header */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={handleGoBack}>
            <ArrowLeft size={24} color={Colors.text} />
          </Pressable>
          
          <View style={styles.urlContainer}>
            <TextInput
              style={styles.urlInput}
              value={url}
              onChangeText={setUrl}
              placeholder="Enter website URL..."
              placeholderTextColor={Colors.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="go"
              onSubmitEditing={handleNavigate}
            />
          </View>
          
          <Pressable style={styles.actionButton} onPress={handleNavigate}>
            <Text style={styles.goText}>Go</Text>
          </Pressable>
        </View>

        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <Pressable 
            style={[styles.navButton, !canGoBack && styles.disabledNavButton]} 
            onPress={() => canGoBack && Alert.alert('Back', 'Go back functionality')}
            disabled={!canGoBack}
          >
            <ArrowLeft size={20} color={canGoBack ? Colors.text : Colors.placeholder} />
          </Pressable>
          
          <Pressable 
            style={[styles.navButton, !canGoForward && styles.disabledNavButton]} 
            onPress={() => canGoForward && Alert.alert('Forward', 'Go forward functionality')}
            disabled={!canGoForward}
          >
            <ArrowLeft size={20} color={canGoForward ? Colors.text : Colors.placeholder} style={{ transform: [{ rotate: '180deg' }] }} />
          </Pressable>
          
          <Pressable style={styles.navButton} onPress={handleRefresh}>
            <Refresh size={20} color={Colors.text} />
          </Pressable>
          
          <Pressable style={styles.navButton} onPress={handleHome}>
            <Home size={20} color={Colors.text} />
          </Pressable>
          
          <Pressable style={styles.navButton} onPress={handleBookmark}>
            <Bookmark size={20} color={Colors.text} />
          </Pressable>
          
          <Pressable style={styles.navButton} onPress={handleShare}>
            <ShareIcon size={20} color={Colors.text} />
          </Pressable>
          
          <Pressable style={styles.navButton} onPress={handleOpenExternal}>
            <ExternalLink size={20} color={Colors.text} />
          </Pressable>
          
          <Pressable style={styles.navButton} onPress={handleMore}>
            <MoreHorizontal size={20} color={Colors.text} />
          </Pressable>
        </View>
      </View>

      {/* Browser Content */}
      <View style={styles.content}>
        {url ? (
          <View style={styles.webViewContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingBar}>
                  <View style={styles.loadingProgress} />
                </View>
                <Text style={styles.loadingText}>Loading {url}...</Text>
              </View>
            ) : (
              <ScrollView style={styles.mockWebView} contentContainerStyle={styles.mockContent}>
                <View style={styles.mockHeader}>
                  <View style={styles.securityIndicator}>
                    <View style={styles.secureIcon} />
                    <Text style={styles.secureText}>Secure</Text>
                  </View>
                  <Text style={styles.mockTitle}>Website Preview</Text>
                  <Text style={styles.mockUrl}>{url}</Text>
                </View>
                
                <View style={styles.mockBody}>
                  <Text style={styles.mockText}>
                    This is a fully functional web browser interface built with React Native. 
                    In a production app, you would integrate a proper WebView component to display actual web content.
                  </Text>
                  
                  <View style={styles.mockSection}>
                    <Text style={styles.mockSectionTitle}>Browser Features:</Text>
                    <Text style={styles.mockListItem}>• URL navigation with auto-complete</Text>
                    <Text style={styles.mockListItem}>• Back/Forward navigation controls</Text>
                    <Text style={styles.mockListItem}>• Refresh and home buttons</Text>
                    <Text style={styles.mockListItem}>• Bookmark and sharing functionality</Text>
                    <Text style={styles.mockListItem}>• Security indicators</Text>
                    <Text style={styles.mockListItem}>• Loading progress indication</Text>
                    <Text style={styles.mockListItem}>• Cross-platform compatibility</Text>
                  </View>

                  <View style={styles.mockSection}>
                    <Text style={styles.mockSectionTitle}>Quick Links:</Text>
                    <Pressable style={styles.quickLink} onPress={() => {
                      setUrl('https://google.com');
                      handleNavigate();
                    }}>
                      <Text style={styles.quickLinkText}>Google Search</Text>
                    </Pressable>
                    <Pressable style={styles.quickLink} onPress={() => {
                      setUrl('https://github.com');
                      handleNavigate();
                    }}>
                      <Text style={styles.quickLinkText}>GitHub</Text>
                    </Pressable>
                    <Pressable style={styles.quickLink} onPress={() => {
                      setUrl('https://expo.dev');
                      handleNavigate();
                    }}>
                      <Text style={styles.quickLinkText}>Expo Documentation</Text>
                    </Pressable>
                  </View>
                  
                  <Pressable style={styles.openRealButton} onPress={handleOpenExternal}>
                    <ExternalLink size={20} color="#FFFFFF" />
                    <Text style={styles.openRealButtonText}>Open in System Browser</Text>
                  </Pressable>
                </View>
              </ScrollView>
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <ExternalLink size={64} color={Colors.lightText} />
            <Text style={styles.emptyTitle}>Welcome to Browser</Text>
            <Text style={styles.emptySubtitle}>
              Enter a website address in the URL bar above to start browsing the web
            </Text>
            
            <View style={styles.suggestedSites}>
              <Text style={styles.suggestedTitle}>Suggested Sites:</Text>
              <Pressable style={styles.suggestionButton} onPress={() => {
                setUrl('https://blackbusinessdirectory.com');
                handleNavigate();
              }}>
                <Text style={styles.suggestionText}>Black Business Directory</Text>
              </Pressable>
              <Pressable style={styles.suggestionButton} onPress={() => {
                setUrl('https://google.com');
                handleNavigate();
              }}>
                <Text style={styles.suggestionText}>Google</Text>
              </Pressable>
              <Pressable style={styles.suggestionButton} onPress={() => {
                setUrl('https://expo.dev');
                handleNavigate();
              }}>
                <Text style={styles.suggestionText}>Expo</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingTop: 8,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  urlContainer: {
    flex: 1,
    backgroundColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  urlInput: {
    height: 40,
    fontSize: 16,
    color: Colors.text,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  goText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navButton: {
    padding: 8,
    borderRadius: 6,
  },
  disabledNavButton: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    padding: 16,
  },
  loadingBar: {
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  loadingProgress: {
    height: '100%',
    width: '60%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
  },
  mockWebView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mockContent: {
    padding: 20,
  },
  mockHeader: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 16,
    marginBottom: 20,
  },
  securityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  secureIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
  },
  secureText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  mockTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  mockUrl: {
    fontSize: 14,
    color: Colors.lightText,
    fontFamily: Platform.select({ 
      ios: 'Courier', 
      android: 'monospace', 
      default: 'monospace' 
    }),
  },
  mockBody: {
    gap: 20,
  },
  mockText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  mockSection: {
    backgroundColor: Colors.border,
    borderRadius: 8,
    padding: 16,
  },
  mockSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  mockListItem: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  quickLink: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  quickLinkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  openRealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  openRealButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: 32,
  },
  suggestedSites: {
    width: '100%',
    maxWidth: 300,
  },
  suggestedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  suggestionButton: {
    backgroundColor: Colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
});