import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { CATEGORIES, getBusinessesByCategory } from '@/mocks/businesses';
import { BusinessCategory } from '@/types/business';
import Colors from '@/constants/colors';
import BusinessCard from '@/components/BusinessCard';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = id as BusinessCategory;
  
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  const businesses = getBusinessesByCategory(categoryId);
  
  // Set the header title
  useEffect(() => {
    if (category) {
      // This will update the header title
    }
  }, [category]);
  
  if (!category) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Category not found</Text>
      </View>
    );
  }
  
  return (
    <>
      <Stack.Screen options={{ title: category.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.subtitle}>
            {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'} found
          </Text>
        </View>
        
        {businesses.length > 0 ? (
          businesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No businesses found in this category</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
  },
});