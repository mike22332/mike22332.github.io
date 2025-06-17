import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useBusinessStore } from '@/hooks/useBusinessStore';
import Colors from '@/constants/colors';
import BusinessCard from '@/components/BusinessCard';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { getFavoriteBusinesses } = useBusinessStore();
  const favoriteBusinesses = getFavoriteBusinesses();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Businesses</Text>
      
      {favoriteBusinesses.length > 0 ? (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {favoriteBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={64} color={Colors.primary} />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Save your favorite Black-owned businesses to quickly find them later
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    padding: 16,
    paddingBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    maxWidth: '80%',
  },
});