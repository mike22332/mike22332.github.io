import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Business } from '@/types/business';
import Colors from '@/constants/colors';
import { getCategoryName } from '@/mocks/businesses';

interface FeaturedBusinessesCarouselProps {
  businesses: Business[];
}

export default function FeaturedBusinessesCarousel({ businesses }: FeaturedBusinessesCarouselProps) {
  const router = useRouter();

  const handleBusinessPress = (businessId: string) => {
    router.push(`/business/${businessId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Businesses</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {businesses.map(business => (
          <Pressable 
            key={business.id} 
            style={styles.card}
            onPress={() => handleBusinessPress(business.id)}
          >
            <Image 
              source={{ uri: business.photos[0] }} 
              style={styles.image} 
            />
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>{business.name}</Text>
                <Text style={styles.category}>{getCategoryName(business.category)}</Text>
                
                {business.rating && (
                  <View style={styles.ratingContainer}>
                    <Star size={14} color={Colors.secondary} fill={Colors.secondary} />
                    <Text style={styles.rating}>{business.rating.toFixed(1)}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: Colors.text,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  card: {
    width: 240,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#EEEEEE',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});