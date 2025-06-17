import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, Lock, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useSubscriptionStore } from '@/hooks/useSubscriptionStore';
import { SUBSCRIPTION_TIERS } from '@/constants/subscriptionTiers';
import { SubscriptionTierId } from '@/types/subscription';
import { trpc } from '@/lib/trpc';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function PaymentScreen() {
  const router = useRouter();
  const { selectedTierId, businessName, businessEmail, businessPhone, clearSubscriptionData } = useSubscriptionStore();
  const { isAuthenticated } = useAuthStore();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedTier = SUBSCRIPTION_TIERS.find(tier => tier.id === selectedTierId);

  // Redirect to auth if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated]);

  const processPaymentMutation = trpc.payment.processSubscription.useMutation({
    onSuccess: (data) => {
      setIsProcessing(false);
      if (data.success) {
        Alert.alert(
          'Payment Successful',
          `Your ${selectedTier?.name} subscription has been activated! Your subscription ID is ${data.subscriptionId}. You will be charged $${selectedTier?.price} monthly.`,
          [
            {
              text: 'OK',
              onPress: () => {
                clearSubscriptionData();
                router.back();
              }
            }
          ]
        );
      } else {
        Alert.alert('Payment Failed', data.error || 'An error occurred while processing your payment. Please try again.');
      }
    },
    onError: (error) => {
      setIsProcessing(false);
      Alert.alert('Payment Error', error.message || 'Failed to process payment. Please check your card details and try again.');
    }
  });

  const formatCardNumber = (text: string) => {
    // Remove non-digit characters
    const digits = text.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = digits.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    // Remove non-digit characters
    const digits = text.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length > 2) {
      setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2, 4)}`);
    } else {
      setExpiryDate(digits);
    }
  };

  const validateCardNumber = (cardNumber: string) => {
    const digits = cardNumber.replace(/\s/g, '');
    return digits.length >= 13 && digits.length <= 19;
  };

  const validateExpiryDate = (expiryDate: string) => {
    const [month, year] = expiryDate.split('/');
    if (!month || !year) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;
    
    return true;
  };

  const handlePayment = () => {
    if (!selectedTierId || !selectedTier) {
      Alert.alert('Error', 'No subscription plan selected');
      return;
    }

    if (!cardNumber.trim()) {
      Alert.alert('Error', 'Please enter your card number');
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Error', 'Please enter a valid card number');
      return;
    }

    if (!expiryDate.trim()) {
      Alert.alert('Error', 'Please enter your card expiry date');
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
      return;
    }

    if (!cvv.trim() || cvv.length < 3) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return;
    }

    if (!cardHolderName.trim()) {
      Alert.alert('Error', 'Please enter the cardholder name');
      return;
    }

    setIsProcessing(true);

    // Process payment with Stripe - ensure selectedTierId is properly typed
    processPaymentMutation.mutate({
      tierId: selectedTierId as SubscriptionTierId,
      businessName,
      businessEmail,
      businessPhone,
      cardNumber: cardNumber.replace(/\s/g, ''),
      expiryDate,
      cvv,
      cardHolderName,
    });
  };

  if (!selectedTier) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No subscription plan selected</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Details</Text>
        <Text style={styles.subtitle}>
          Complete your subscription by entering your payment information
        </Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Subscription Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Plan:</Text>
          <Text style={styles.summaryValue}>{selectedTier.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount:</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.summaryValue}>${selectedTier.price}</Text>
            <Star size={16} color={Colors.secondary} fill={Colors.secondary} />
            <Text style={styles.summaryValue}>/month</Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Business:</Text>
          <Text style={styles.summaryValue}>{businessName}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Email:</Text>
          <Text style={styles.summaryValue}>{businessEmail}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Credit Card Information</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Number *</Text>
          <View style={styles.cardInputContainer}>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={formatCardNumber}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              maxLength={19} // 16 digits + 3 spaces
              autoCorrect={false}
            />
            <CreditCard size={20} color={Colors.lightText} style={styles.cardIcon} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Expiry Date *</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={formatExpiryDate}
              placeholder="MM/YY"
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              maxLength={5} // MM/YY
              autoCorrect={false}
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>CVV *</Text>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              placeholder="123"
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cardholder Name *</Text>
          <TextInput
            style={styles.input}
            value={cardHolderName}
            onChangeText={setCardHolderName}
            placeholder="Enter name on card"
            placeholderTextColor={Colors.placeholder}
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={styles.securityNote}>
        <Lock size={20} color={Colors.success} />
        <Text style={styles.securityText}>
          Your payment is processed securely through Stripe. We never store your credit card details.
        </Text>
      </View>

      <Text style={styles.disclaimer}>
        By completing this payment, you agree to a recurring monthly charge of ${selectedTier.price} until cancelled. You can manage your subscription in your account settings.
      </Text>

      <Pressable 
        style={[styles.payButton, isProcessing && styles.disabledButton]} 
        onPress={handlePayment}
        disabled={isProcessing}
      >
        <View style={styles.payButtonContent}>
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Processing Payment...' : `Pay $${selectedTier.price} Now`}
          </Text>
          <Star size={20} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      </Pressable>

      <Text style={styles.testCardInfo}>
        Test Card: 4242 4242 4242 4242 | Exp: 12/25 | CVV: 123
      </Text>
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
  summaryContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.lightText,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  cardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    position: 'absolute',
    right: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    gap: 12,
  },
  securityText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  disclaimer: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  payButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  testCardInfo: {
    fontSize: 12,
    color: Colors.lightText,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
    backgroundColor: 'rgba(93, 74, 126, 0.1)',
    padding: 8,
    borderRadius: 6,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
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
});