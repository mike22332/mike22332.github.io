import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check, Star } from 'lucide-react-native';
import { SubscriptionTier } from '@/types/subscription';
import Colors from '@/constants/colors';

interface SubscriptionTierCardProps {
  tier: SubscriptionTier;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function SubscriptionTierCard({ 
  tier, 
  isSelected = false,
  onSelect 
}: SubscriptionTierCardProps) {
  return (
    <Pressable 
      style={[
        styles.container,
        isSelected && { borderColor: tier.color, borderWidth: 2 }
      ]}
      onPress={onSelect}
    >
      <View style={[styles.header, { backgroundColor: tier.color }]}>
        <Text style={styles.name}>{tier.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${tier.price}</Text>
          <Star size={20} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.perMonth}>/month</Text>
        </View>
      </View>
      
      <View style={styles.featuresContainer}>
        {tier.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Check size={16} color={tier.color} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <Pressable 
        style={[styles.selectButton, { backgroundColor: tier.color }]}
        onPress={onSelect}
      >
        <Text style={styles.selectButtonText}>
          {isSelected ? 'Selected' : 'Select Plan'}
        </Text>
      </Pressable>
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
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  perMonth: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  featuresContainer: {
    padding: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  featureText: {
    fontSize: 16,
    color: Colors.text,
  },
  selectButton: {
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});