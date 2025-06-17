import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SUBSCRIPTION_TIERS } from '@/constants/subscriptionTiers';
import { SubscriptionTierId } from '@/types/subscription';
import Colors from '@/constants/colors';
import SubscriptionTierCard from '@/components/SubscriptionTierCard';
import { useSubscriptionStore } from '@/hooks/useSubscriptionStore';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function SubscriptionScreen() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const { selectedTierId, setSelectedTier, setBusinessInfo } = useSubscriptionStore();
  const { isAuthenticated, user } = useAuthStore();

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user && !businessEmail) {
      setBusinessEmail(user.email);
    }
  }, [user, businessEmail]);

  const handleSelectTier = (tierId: SubscriptionTierId) => {
    setSelectedTier(tierId);
    // Show validation immediately when a tier is selected
    setShowValidation(true);
  };

  const isFieldRequired = (field: string) => {
    if (!selectedTierId) return false;
    
    // All tiers require name and email
    if (field === 'name' || field === 'email') {
      return true;
    }
    
    // Phone is optional for basic, required for standard and premium
    if (field === 'phone') {
      return selectedTierId === 'standard' || selectedTierId === 'premium';
    }
    
    return false;
  };

  const isFieldEmpty = (field: string) => {
    switch (field) {
      case 'name':
        return !businessName.trim();
      case 'email':
        return !businessEmail.trim();
      case 'phone':
        return !businessPhone.trim();
      default:
        return false;
    }
  };

  const shouldShowError = (field: string) => {
    return showValidation && isFieldRequired(field) && isFieldEmpty(field);
  };

  const getRequiredFieldsForTier = (tierId: SubscriptionTierId) => {
    const baseFields = ['Business name', 'Business email'];
    
    if (tierId === 'standard' || tierId === 'premium') {
      baseFields.push('Business phone');
    }
    
    return baseFields;
  };

  const handleProceedToCheckout = () => {
    if (!selectedTierId) {
      Alert.alert('Error', 'Please select a subscription tier');
      return;
    }

    // Always show validation when continue button is pressed
    setShowValidation(true);

    if (!businessName.trim()) {
      Alert.alert('Error', 'Please enter your business name');
      return;
    }

    if (!businessEmail.trim()) {
      Alert.alert('Error', 'Please enter your business email');
      return;
    }

    // Check if phone is required for selected tier
    if ((selectedTierId === 'standard' || selectedTierId === 'premium') && !businessPhone.trim()) {
      Alert.alert('Error', 'Business phone is required for this plan');
      return;
    }

    // Store the business information
    setBusinessInfo(businessName, businessEmail, businessPhone);

    // Check if user is authenticated, if not redirect to auth
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    // Navigate to payment screen
    router.push('/payment');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>List Your Business</Text>
        <Text style={styles.subtitle}>
          Choose a subscription plan to list your Black-owned business on our platform
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Select a Plan</Text>

      {SUBSCRIPTION_TIERS.map(tier => (
        <SubscriptionTierCard
          key={tier.id}
          tier={tier}
          isSelected={selectedTierId === tier.id}
          onSelect={() => handleSelectTier(tier.id)}
        />
      ))}

      <View style={styles.businessInfoHeader}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        {selectedTierId && (
          <View style={styles.requiredFieldsInfo}>
            <Text style={styles.requiredFieldsTitle}>Required for {SUBSCRIPTION_TIERS.find(t => t.id === selectedTierId)?.name}:</Text>
            <Text style={styles.requiredFieldsList}>
              {getRequiredFieldsForTier(selectedTierId).join(', ')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, shouldShowError('name') && styles.errorLabel]}>
              Business Name *
            </Text>
            {shouldShowError('name') && (
              <Text style={styles.errorText}>Required</Text>
            )}
          </View>
          <TextInput
            style={[
              styles.input,
              shouldShowError('name') && styles.errorInput
            ]}
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Enter your business name"
            placeholderTextColor={Colors.placeholder}
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, shouldShowError('email') && styles.errorLabel]}>
              Business Email *
            </Text>
            {shouldShowError('email') && (
              <Text style={styles.errorText}>Required</Text>
            )}
          </View>
          <TextInput
            style={[
              styles.input,
              shouldShowError('email') && styles.errorInput
            ]}
            value={businessEmail}
            onChangeText={setBusinessEmail}
            placeholder="Enter your business email"
            placeholderTextColor={Colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Text style={[
              styles.label, 
              shouldShowError('phone') && styles.errorLabel
            ]}>
              Business Phone {isFieldRequired('phone') ? '*' : '(Optional)'}
            </Text>
            {shouldShowError('phone') && (
              <Text style={styles.errorText}>Required for this plan</Text>
            )}
          </View>
          <TextInput
            style={[
              styles.input,
              shouldShowError('phone') && styles.errorInput
            ]}
            value={businessPhone}
            onChangeText={setBusinessPhone}
            placeholder="Enter your business phone"
            placeholderTextColor={Colors.placeholder}
            keyboardType="phone-pad"
            autoCorrect={false}
          />
        </View>
      </View>

      <Text style={styles.disclaimer}>
        By submitting this form, you agree to our Terms of Service and Privacy Policy.
        Our team will contact you to complete the setup process and collect additional
        information based on your selected plan.
      </Text>

      <Pressable 
        style={[
          styles.submitButton, 
          !selectedTierId && styles.disabledButton
        ]} 
        onPress={handleProceedToCheckout}
        disabled={!selectedTierId}
      >
        <Text style={styles.submitButtonText}>
          Continue to Checkout
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
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
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  businessInfoHeader: {
    marginBottom: 16,
  },
  requiredFieldsInfo: {
    backgroundColor: 'rgba(93, 74, 126, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  requiredFieldsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  requiredFieldsList: {
    fontSize: 14,
    color: Colors.text,
  },
  formContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  errorLabel: {
    color: Colors.error,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorInput: {
    borderColor: Colors.error,
    backgroundColor: 'rgba(244, 67, 54, 0.05)',
  },
  disclaimer: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 24,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});