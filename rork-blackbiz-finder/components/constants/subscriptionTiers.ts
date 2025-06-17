import { SubscriptionTier } from '@/types/subscription';

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 20,
    features: [
      'Business name listing',
      'Category listing',
      'Location on map',
      'Basic contact information',
    ],
    color: '#5D4A7E',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 35,
    features: [
      'Everything in Basic',
      'Business description',
      'Photo gallery (up to 5 photos)',
      'Business hours',
      'Full contact details',
      'Social media links',
    ],
    color: '#7E5D9B',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 50,
    features: [
      'Everything in Standard',
      'Priority placement in search results',
      'Featured on home screen',
      'Promotional banner',
      'Special offers section',
      'Unlimited photos',
      'Analytics dashboard',
    ],
    color: '#F2B705',
  },
];