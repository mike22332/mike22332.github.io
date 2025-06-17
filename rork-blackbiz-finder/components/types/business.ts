export type BusinessCategory = 
  | 'restaurant' 
  | 'retail' 
  | 'beauty' 
  | 'health' 
  | 'service' 
  | 'tech' 
  | 'art' 
  | 'education' 
  | 'finance' 
  | 'other';

export type SubscriptionTier = 'basic' | 'standard' | 'premium';

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface BusinessLocation {
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
}

export interface BusinessContact {
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  subscriptionTier: SubscriptionTier;
  description?: string;
  location: BusinessLocation;
  contact: BusinessContact;
  photos: string[];
  hours?: BusinessHours[];
  rating?: number;
  reviewCount?: number;
  specialOffers?: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}