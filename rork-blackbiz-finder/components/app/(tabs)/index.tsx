import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, X } from 'lucide-react-native';
import { CATEGORIES, getFeaturedBusinesses } from '@/mocks/businesses';
import { useBusinessStore } from '@/hooks/useBusinessStore';
import Colors from '@/constants/colors';
import SearchBar from '@/components/SearchBar';
import CategoryButton from '@/components/CategoryButton';
import FeaturedBusinessesCarousel from '@/components/FeaturedBusinessesCarousel';
import BusinessCard from '@/components/BusinessCard';

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAddBusiness, setShowAddBusiness] = React.useState(true);
  const { resetFilters } = useBusinessStore();
  
  // Reset any filters when coming to the home screen
  useEffect(() => {
    resetFilters();
  }, []);

  const featuredBusinesses = getFeaturedBusinesses();
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery }
      });
    }
  };

  const handleListBusiness = () => {
    router.push('/subscription');
  };

  const handleDismissAddBusiness = () => {
    setShowAddBusiness(false);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[
        styles.content,
        // Web-specific responsive styles
        Platform.OS === 'web' && styles.webContent
      ]}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>b</Text>
          </View>
        </View>
        <Text style={styles.title}>Discover Black-Owned Businesses</Text>
        <Text style={styles.subtitle}>Support local businesses in your community</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
        />
      </View>
      
      {showAddBusiness && (
        <View style={[styles.addBusinessContainer, Platform.OS === 'web' && styles.webAddBusinessContainer]}>
          <View style={styles.addBusinessHeader}>
            <Text style={styles.addBusinessTitle}>List Your Business</Text>
            <Pressable 
              style={styles.dismissButton} 
              onPress={handleDismissAddBusiness}
              accessibilityLabel="Dismiss business listing prompt"
              accessibilityRole="button"
            >
              <X size={16} color={Colors.lightText} />
            </Pressable>
          </View>
          <Text style={styles.addBusinessSubtitle}>
            Get discovered by thousands of potential customers
          </Text>
          <Pressable 
            style={styles.addBusinessButton} 
            onPress={handleListBusiness}
            accessibilityLabel="Add your business to the directory"
            accessibilityRole="button"
          >
            <Plus size={20} color={Colors.primary} />
            <Text style={styles.addBusinessText}>Add Your Business</Text>
          </Pressable>
        </View>
      )}
      
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {CATEGORIES.map(category => (
            <CategoryButton 
              key={category.id} 
              category={category} 
            />
          ))}
        </ScrollView>
      </View>
      
      <FeaturedBusinessesCarousel businesses={featuredBusinesses} />
      
      <View style={styles.recentBusinesses}>
        <Text style={styles.sectionTitle}>Recently Added</Text>
        {/* Show the 3 most recent businesses */}
        {[...featuredBusinesses].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 3).map(business => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </View>
      
      <View style={[styles.listBusinessContainer, Platform.OS === 'web' && styles.webListBusinessContainer]}>
        <Text style={styles.listBusinessText}>
          Own a Black Business? Get discovered by thousands of potential customers.
        </Text>
        <Pressable 
          style={styles.listBusinessButton} 
          onPress={handleListBusiness}
          accessibilityLabel="List your business on the platform"
          accessibilityRole="button"
        >
          <Text style={styles.listBusinessButtonText}>List Your Business</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  webContent: Platform.select({
    web: {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
      paddingHorizontal: 24,
    },
    default: {},
  }),
  header: {
    padding: 16,
    paddingTop: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: 'System',
    letterSpacing: -2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  addBusinessContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  webAddBusinessContainer: {
    marginHorizontal: 'auto',
    maxWidth: 800,
  },
  addBusinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  addBusinessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  dismissButton: {
    padding: 4,
  },
  addBusinessSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 12,
  },
  addBusinessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(93, 74, 126, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    gap: 8,
  },
  addBusinessText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: Colors.text,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  recentBusinesses: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  listBusinessContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  webListBusinessContainer: {
    marginHorizontal: 'auto',
    maxWidth: 800,
  },
  listBusinessText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  listBusinessButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  listBusinessButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});