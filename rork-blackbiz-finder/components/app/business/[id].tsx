import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Share, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BUSINESSES, getCategoryName } from '@/mocks/businesses';
import { useBusinessStore } from '@/hooks/useBusinessStore';
import { Heart, MapPin, Phone, Globe, Mail, Clock, Share as ShareIcon, Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react-native';
import Colors from '@/constants/colors';
import PhotoGallery from '@/components/PhotoGallery';
import BusinessHours from '@/components/BusinessHours';
import { useWebBrowser } from '@/components/WebBrowser';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useBusinessStore();
  const { openBrowser } = useWebBrowser();
  
  const business = BUSINESSES.find(b => b.id === id);
  
  if (!business) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Business not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }
  
  const favorited = isFavorite(business.id);
  
  const handleToggleFavorite = () => {
    toggleFavorite(business.id);
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${business.name} on Black Business Directory! ${business.description || ''}`,
        // In a real app, you would include a deep link URL here
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const handleCall = () => {
    if (business.contact.phone) {
      Linking.openURL(`tel:${business.contact.phone}`);
    }
  };
  
  const handleEmail = () => {
    if (business.contact.email) {
      Linking.openURL(`mailto:${business.contact.email}`);
    }
  };
  
  const handleWebsite = () => {
    if (business.contact.website) {
      openBrowser(business.contact.website);
    }
  };
  
  const handleSocialMedia = (platform: 'instagram' | 'twitter' | 'facebook') => {
    const handle = business.contact[platform];
    if (!handle) return;
    
    let url = '';
    switch (platform) {
      case 'instagram':
        url = `https://instagram.com/${handle.replace('@', '')}`;
        break;
      case 'twitter':
        url = `https://twitter.com/${handle.replace('@', '')}`;
        break;
      case 'facebook':
        url = `https://facebook.com/${handle}`;
        break;
    }
    
    if (url) {
      openBrowser(url);
    }
  };
  
  const handleGetDirections = () => {
    const { latitude, longitude } = business.location;
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
      web: `https://maps.google.com/?q=${latitude},${longitude}`
    });
    
    if (url) {
      if (Platform.OS === 'web') {
        openBrowser(url);
      } else {
        Linking.openURL(url);
      }
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <PhotoGallery photos={business.photos} />
        
        <View style={styles.actions}>
          <Pressable 
            style={[styles.actionButton, favorited && styles.favoriteButton]} 
            onPress={handleToggleFavorite}
          >
            <Heart 
              size={20} 
              color={favorited ? '#FFFFFF' : Colors.primary} 
              fill={favorited ? '#FFFFFF' : 'transparent'} 
            />
            <Text style={[styles.actionText, favorited && styles.favoriteText]}>
              {favorited ? 'Favorited' : 'Favorite'}
            </Text>
          </Pressable>
          
          <Pressable style={styles.actionButton} onPress={handleShare}>
            <ShareIcon size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton} onPress={handleGetDirections}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Directions</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.category}>{getCategoryName(business.category)}</Text>
        
        {business.rating && (
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{business.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.reviewCount}>
              {business.reviewCount} {business.reviewCount === 1 ? 'review' : 'reviews'}
            </Text>
          </View>
        )}
        
        {business.description && (
          <Text style={styles.description}>{business.description}</Text>
        )}
        
        {business.subscriptionTier === 'premium' && business.specialOffers && business.specialOffers.length > 0 && (
          <View style={styles.specialOffersContainer}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            {business.specialOffers.map((offer, index) => (
              <View key={index} style={styles.offerItem}>
                <View style={styles.offerBullet} />
                <Text style={styles.offerText}>{offer}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact & Location</Text>
          
          <View style={styles.contactItem}>
            <MapPin size={20} color={Colors.primary} />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactText}>
                {business.location.address}, {business.location.city}, {business.location.state} {business.location.zip}
              </Text>
            </View>
          </View>
          
          {business.contact.phone && (
            <Pressable style={styles.contactItem} onPress={handleCall}>
              <Phone size={20} color={Colors.primary} />
              <Text style={styles.contactText}>{business.contact.phone}</Text>
            </Pressable>
          )}
          
          {business.contact.email && (
            <Pressable style={styles.contactItem} onPress={handleEmail}>
              <Mail size={20} color={Colors.primary} />
              <Text style={styles.contactText}>{business.contact.email}</Text>
            </Pressable>
          )}
          
          {business.contact.website && (
            <Pressable style={styles.contactItem} onPress={handleWebsite}>
              <Globe size={20} color={Colors.primary} />
              <Text style={styles.contactText}>{business.contact.website}</Text>
              <ExternalLink size={16} color={Colors.lightText} style={styles.externalLinkIcon} />
            </Pressable>
          )}
        </View>
        
        {(business.contact.instagram || business.contact.twitter || business.contact.facebook) && (
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>Social Media</Text>
            <View style={styles.socialButtons}>
              {business.contact.instagram && (
                <Pressable 
                  style={styles.socialButton} 
                  onPress={() => handleSocialMedia('instagram')}
                >
                  <Instagram size={24} color="#FFFFFF" />
                </Pressable>
              )}
              
              {business.contact.twitter && (
                <Pressable 
                  style={styles.socialButton} 
                  onPress={() => handleSocialMedia('twitter')}
                >
                  <Twitter size={24} color="#FFFFFF" />
                </Pressable>
              )}
              
              {business.contact.facebook && (
                <Pressable 
                  style={styles.socialButton} 
                  onPress={() => handleSocialMedia('facebook')}
                >
                  <Facebook size={24} color="#FFFFFF" />
                </Pressable>
              )}
            </View>
          </View>
        )}
        
        {business.hours && (
          <View style={styles.hoursSection}>
            <View style={styles.hoursTitleRow}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Business Hours</Text>
            </View>
            <BusinessHours hours={business.hours} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: Colors.card,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  favoriteButton: {
    backgroundColor: Colors.primary,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text,
  },
  favoriteText: {
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: Colors.lightText,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reviewCount: {
    color: Colors.lightText,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 24,
  },
  specialOffersContainer: {
    backgroundColor: 'rgba(242, 183, 5, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginRight: 8,
  },
  offerText: {
    fontSize: 16,
    color: Colors.text,
  },
  contactSection: {
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    color: Colors.text,
  },
  externalLinkIcon: {
    marginLeft: 8,
  },
  socialSection: {
    marginBottom: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoursSection: {
    marginBottom: 24,
  },
  hoursTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
});