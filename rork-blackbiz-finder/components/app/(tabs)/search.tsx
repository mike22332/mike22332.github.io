import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CATEGORIES } from '@/mocks/businesses';
import { useBusinessStore } from '@/hooks/useBusinessStore';
import { BusinessCategory } from '@/types/business';
import Colors from '@/constants/colors';
import SearchBar from '@/components/SearchBar';
import CategoryButton from '@/components/CategoryButton';
import BusinessCard from '@/components/BusinessCard';
import MapView from '@/components/MapView';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | undefined>(undefined);
  
  const { businesses, searchBusinesses, filterByCategory } = useBusinessStore();

  useEffect(() => {
    if (params.query) {
      setSearchQuery(params.query);
      searchBusinesses(params.query);
    }
  }, [params.query]);

  const handleSearch = () => {
    searchBusinesses(searchQuery);
  };

  const handleCategorySelect = (category: BusinessCategory | null) => {
    setSelectedCategory(category);
    filterByCategory(category);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          <CategoryButton 
            category={{ id: 'all' as BusinessCategory, name: 'All' }}
            isSelected={selectedCategory === null}
            onPress={() => handleCategorySelect(null)}
          />
          {CATEGORIES.map(category => (
            <CategoryButton 
              key={category.id} 
              category={category}
              isSelected={selectedCategory === category.id}
              onPress={() => handleCategorySelect(category.id)}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.viewToggleContainer}>
        <Text style={styles.resultsText}>
          {businesses.length} {businesses.length === 1 ? 'result' : 'results'}
        </Text>
        <Pressable style={styles.viewToggleButton} onPress={toggleViewMode}>
          <Text style={styles.viewToggleText}>
            {viewMode === 'list' ? 'Map View' : 'List View'}
          </Text>
        </Pressable>
      </View>
      
      {viewMode === 'list' ? (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {businesses.length > 0 ? (
            businesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No businesses found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.mapContainer}>
          {businesses.length > 0 ? (
            <MapView 
              businesses={businesses}
              selectedBusinessId={selectedBusinessId}
              onSelectBusiness={setSelectedBusinessId}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No businesses found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: Colors.text,
  },
  viewToggleButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  viewToggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  mapContainer: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
  },
});