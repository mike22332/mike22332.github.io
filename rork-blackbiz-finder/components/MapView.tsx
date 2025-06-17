import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { Business } from '@/types/business';
import Colors from '@/constants/colors';

// This is a mock map component since we can't use actual maps in this environment
// In a real app, you would use react-native-maps or similar

interface MapViewProps {
  businesses: Business[];
  selectedBusinessId?: string;
  onSelectBusiness?: (businessId: string) => void;
}

export default function MapView({ 
  businesses, 
  selectedBusinessId,
  onSelectBusiness 
}: MapViewProps) {
  const router = useRouter();

  const handleBusinessPress = (businessId: string) => {
    if (onSelectBusiness) {
      onSelectBusiness(businessId);
    }
  };

  const handleViewDetails = (businessId: string) => {
    router.push(`/business/${businessId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?q=80&w=1080' }} 
          style={styles.mapBackground}
        />
        <Text style={styles.mapPlaceholder}>Interactive Map</Text>
        
        {/* Map pins */}
        {businesses.map(business => (
          <Pressable
            key={business.id}
            style={[
              styles.mapPin,
              {
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 50}%`,
              },
              selectedBusinessId === business.id && styles.selectedMapPin
            ]}
            onPress={() => handleBusinessPress(business.id)}
          >
            <MapPin 
              size={24} 
              color={selectedBusinessId === business.id ? Colors.secondary : Colors.primary} 
              fill={selectedBusinessId === business.id ? Colors.secondary : 'transparent'} 
            />
          </Pressable>
        ))}
      </View>

      {/* Business cards at bottom of map */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {businesses.map(business => (
          <Pressable 
            key={business.id}
            style={[
              styles.card,
              selectedBusinessId === business.id && styles.selectedCard
            ]}
            onPress={() => handleBusinessPress(business.id)}
          >
            <Image source={{ uri: business.photos[0] }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={1}>{business.name}</Text>
              <Text style={styles.cardAddress} numberOfLines={1}>
                {business.location.address}
              </Text>
              <Pressable 
                style={styles.viewButton}
                onPress={() => handleViewDetails(business.id)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  mapPlaceholder: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 8,
  },
  mapPin: {
    position: 'absolute',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  selectedMapPin: {
    zIndex: 10,
  },
  cardsContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    width: 240,
    height: 140,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    marginRight: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  cardImage: {
    width: 100,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});