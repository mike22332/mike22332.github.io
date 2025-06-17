import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, MapPin } from 'lucide-react-native';
import { Business } from '@/types/business';
import { getCategoryName } from '@/mocks/businesses';
import Colors from '@/constants/colors';

interface BusinessCardProps {
  business: Business;
  compact?: boolean;
}

export default function BusinessCard({ business, compact = false }: BusinessCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/business/${business.id}`);
  };

  return (
    <Pressable 
      style={[
        styles.container, 
        compact && styles.compactContainer,
        Platform.OS === 'web' && styles.webContainer,
      ]} 
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${business.name}`}
      accessibilityHint="Opens business details page"
    >
      <Image 
        source={{ uri: business.photos[0] }} 
        style={[styles.image, compact && styles.compactImage]} 
        accessibilityLabel={`Photo of ${business.name}`}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{business.name}</Text>
        <Text style={styles.category}>{getCategoryName(business.category)}</Text>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.lightText} />
          <Text style={styles.location} numberOfLines={1}>
            {business.location.city}, {business.location.state}
          </Text>
        </View>
        
        {business.rating && (
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.secondary} fill={Colors.secondary} />
            <Text style={styles.rating}>{business.rating.toFixed(1)}</Text>
            {!compact && (
              <Text style={styles.reviewCount}>({business.reviewCount} reviews)</Text>
            )}
          </View>
        )}
      </View>
      
      {business.subscriptionTier === 'premium' && !compact && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>Premium</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  compactContainer: {
    flexDirection: 'row',
    height: 100,
  },
  webContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  image: {
    height: 180,
    width: '100%',
  },
  compactImage: {
    height: '100%',
    width: 100,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.lightText,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.lightText,
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});