export type SubscriptionTierId = 'basic' | 'standard' | 'premium';

export interface SubscriptionTier {
  id: SubscriptionTierId;
  name: string;
  price: number;
  features: string[];
  color: string;
}