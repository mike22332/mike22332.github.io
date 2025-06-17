import { Business, BusinessCategory } from '@/types/business';

export const BUSINESSES: Business[] = [
  {
    id: '1',
    name: "Soul Food Kitchen",
    category: 'restaurant',
    subscriptionTier: 'premium',
    description: "Authentic soul food restaurant serving traditional Southern cuisine with a modern twist. Our recipes have been passed down through generations, offering a true taste of heritage.",
    location: {
      address: "123 Main Street",
      city: "Atlanta",
      state: "GA",
      zip: "30303",
      latitude: 33.7490,
      longitude: -84.3880
    },
    contact: {
      phone: "404-555-1234",
      email: "info@soulfoodkitchen.com",
      website: "www.soulfoodkitchen.com",
      instagram: "@soulfoodkitchen",
      twitter: "@soulfoodkitchen",
      facebook: "SoulFoodKitchen"
    },
    photos: [
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1080",
      "https://images.unsplash.com/photo-1583224964978-2e827ef39746?q=80&w=1080",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Tuesday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Wednesday", open: "11:00", close: "22:00", isClosed: false },
      { day: "Thursday", open: "11:00", close: "23:00", isClosed: false },
      { day: "Friday", open: "11:00", close: "00:00", isClosed: false },
      { day: "Saturday", open: "10:00", close: "00:00", isClosed: false },
      { day: "Sunday", open: "10:00", close: "21:00", isClosed: false }
    ],
    rating: 4.8,
    reviewCount: 342,
    specialOffers: [
      "10% off for first-time customers",
      "Free dessert with orders over $50"
    ],
    featured: true,
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-06-20T15:30:00Z"
  },
  {
    id: '2',
    name: "Curl Culture Hair Salon",
    category: 'beauty',
    subscriptionTier: 'standard',
    description: "Specializing in natural hair care, textured hair styling, and protective styles. Our experienced stylists celebrate and enhance your natural beauty.",
    location: {
      address: "456 Auburn Ave",
      city: "Atlanta",
      state: "GA",
      zip: "30312",
      latitude: 33.7566,
      longitude: -84.3730
    },
    contact: {
      phone: "404-555-6789",
      email: "appointments@curlculture.com",
      website: "www.curlculturesalon.com",
      instagram: "@curlculture"
    },
    photos: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1080",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "", close: "", isClosed: true },
      { day: "Tuesday", open: "10:00", close: "19:00", isClosed: false },
      { day: "Wednesday", open: "10:00", close: "19:00", isClosed: false },
      { day: "Thursday", open: "10:00", close: "19:00", isClosed: false },
      { day: "Friday", open: "09:00", close: "20:00", isClosed: false },
      { day: "Saturday", open: "09:00", close: "18:00", isClosed: false },
      { day: "Sunday", open: "12:00", close: "17:00", isClosed: false }
    ],
    rating: 4.7,
    reviewCount: 189,
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-06-15T11:45:00Z"
  },
  {
    id: '3',
    name: "Tech Innovators",
    category: 'tech',
    subscriptionTier: 'premium',
    description: "Black-owned tech company specializing in web development, mobile apps, and digital marketing solutions for small businesses and startups.",
    location: {
      address: "789 Peachtree St",
      city: "Atlanta",
      state: "GA",
      zip: "30308",
      latitude: 33.7815,
      longitude: -84.3830
    },
    contact: {
      phone: "404-555-9012",
      email: "hello@techinnovators.com",
      website: "www.techinnovators.com",
      instagram: "@techinnovators",
      twitter: "@techinnovators",
      facebook: "TechInnovators"
    },
    photos: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1080",
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1080",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "09:00", close: "18:00", isClosed: false },
      { day: "Tuesday", open: "09:00", close: "18:00", isClosed: false },
      { day: "Wednesday", open: "09:00", close: "18:00", isClosed: false },
      { day: "Thursday", open: "09:00", close: "18:00", isClosed: false },
      { day: "Friday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Saturday", open: "", close: "", isClosed: true },
      { day: "Sunday", open: "", close: "", isClosed: true }
    ],
    rating: 4.9,
    reviewCount: 127,
    specialOffers: [
      "Free consultation for new clients",
      "20% off first project"
    ],
    featured: true,
    createdAt: "2023-03-05T14:30:00Z",
    updatedAt: "2023-06-25T10:20:00Z"
  },
  {
    id: '4',
    name: "Urban Threads Clothing",
    category: 'retail',
    subscriptionTier: 'standard',
    description: "Contemporary urban clothing brand featuring original designs that celebrate Black culture and heritage. Ethically sourced materials and local production.",
    location: {
      address: "321 Edgewood Ave",
      city: "Atlanta",
      state: "GA",
      zip: "30312",
      latitude: 33.7540,
      longitude: -84.3720
    },
    contact: {
      phone: "404-555-3456",
      email: "shop@urbanthreads.com",
      website: "www.urbanthreadsclothing.com",
      instagram: "@urbanthreads"
    },
    photos: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1080",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "11:00", close: "19:00", isClosed: false },
      { day: "Tuesday", open: "11:00", close: "19:00", isClosed: false },
      { day: "Wednesday", open: "11:00", close: "19:00", isClosed: false },
      { day: "Thursday", open: "11:00", close: "19:00", isClosed: false },
      { day: "Friday", open: "11:00", close: "21:00", isClosed: false },
      { day: "Saturday", open: "10:00", close: "21:00", isClosed: false },
      { day: "Sunday", open: "12:00", close: "18:00", isClosed: false }
    ],
    rating: 4.6,
    reviewCount: 215,
    createdAt: "2023-01-20T11:45:00Z",
    updatedAt: "2023-06-10T16:30:00Z"
  },
  {
    id: '5',
    name: "Prosperity Financial Services",
    category: 'finance',
    subscriptionTier: 'premium',
    description: "Financial planning, wealth management, and investment services focused on building generational wealth in the Black community. Specializing in first-time investors and entrepreneurs.",
    location: {
      address: "555 Marietta St",
      city: "Atlanta",
      state: "GA",
      zip: "30313",
      latitude: 33.7680,
      longitude: -84.4050
    },
    contact: {
      phone: "404-555-7890",
      email: "info@prosperityfinancial.com",
      website: "www.prosperityfinancialservices.com",
      instagram: "@prosperityfinancial",
      twitter: "@prosperityfin",
      facebook: "ProsperityFinancial"
    },
    photos: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1080",
      "https://images.unsplash.com/photo-1556742208-999815fca738?q=80&w=1080",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Tuesday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Wednesday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Thursday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Friday", open: "09:00", close: "16:00", isClosed: false },
      { day: "Saturday", open: "10:00", close: "14:00", isClosed: false },
      { day: "Sunday", open: "", close: "", isClosed: true }
    ],
    rating: 4.9,
    reviewCount: 98,
    specialOffers: [
      "Free initial consultation",
      "Financial literacy workshop every first Saturday"
    ],
    featured: true,
    createdAt: "2023-02-15T13:20:00Z",
    updatedAt: "2023-06-18T09:10:00Z"
  },
  {
    id: '6',
    name: "Healthy Roots Juice Bar",
    category: 'health',
    subscriptionTier: 'standard',
    description: "Organic juice bar and smoothie shop with a focus on health and wellness. Featuring fresh, locally-sourced ingredients and traditional healing recipes.",
    location: {
      address: "987 Ponce de Leon Ave",
      city: "Atlanta",
      state: "GA",
      zip: "30306",
      latitude: 33.7740,
      longitude: -84.3550
    },
    contact: {
      phone: "404-555-2345",
      email: "hello@healthyroots.com",
      website: "www.healthyrootsjuice.com",
      instagram: "@healthyroots"
    },
    photos: [
      "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=1080",
      "https://images.unsplash.com/photo-1622597467836-f3e6707e1fd6?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "07:00", close: "19:00", isClosed: false },
      { day: "Tuesday", open: "07:00", close: "19:00", isClosed: false },
      { day: "Wednesday", open: "07:00", close: "19:00", isClosed: false },
      { day: "Thursday", open: "07:00", close: "19:00", isClosed: false },
      { day: "Friday", open: "07:00", close: "19:00", isClosed: false },
      { day: "Saturday", open: "08:00", close: "18:00", isClosed: false },
      { day: "Sunday", open: "09:00", close: "16:00", isClosed: false }
    ],
    rating: 4.7,
    reviewCount: 156,
    createdAt: "2023-03-10T08:45:00Z",
    updatedAt: "2023-06-22T14:15:00Z"
  },
  {
    id: '7',
    name: "Creative Minds Art Gallery",
    category: 'art',
    subscriptionTier: 'standard',
    description: "Contemporary art gallery showcasing works by Black artists from around the world. Regular exhibitions, artist talks, and community workshops.",
    location: {
      address: "654 Peters St",
      city: "Atlanta",
      state: "GA",
      zip: "30310",
      latitude: 33.7380,
      longitude: -84.4150
    },
    contact: {
      phone: "404-555-8901",
      email: "gallery@creativeminds.com",
      website: "www.creativemindsart.com",
      instagram: "@creativemindsart"
    },
    photos: [
      "https://images.unsplash.com/photo-1594784237780-d5db82c2a4da?q=80&w=1080",
      "https://images.unsplash.com/photo-1577720643272-265f09367456?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "", close: "", isClosed: true },
      { day: "Tuesday", open: "11:00", close: "18:00", isClosed: false },
      { day: "Wednesday", open: "11:00", close: "18:00", isClosed: false },
      { day: "Thursday", open: "11:00", close: "18:00", isClosed: false },
      { day: "Friday", open: "11:00", close: "20:00", isClosed: false },
      { day: "Saturday", open: "10:00", close: "20:00", isClosed: false },
      { day: "Sunday", open: "12:00", close: "17:00", isClosed: false }
    ],
    rating: 4.8,
    reviewCount: 112,
    createdAt: "2023-04-05T15:30:00Z",
    updatedAt: "2023-06-20T12:40:00Z"
  },
  {
    id: '8',
    name: "Heritage Books & Cafe",
    category: 'retail',
    subscriptionTier: 'premium',
    description: "Independent bookstore specializing in literature by Black authors, with a cozy cafe serving coffee from Black-owned roasters and homemade pastries.",
    location: {
      address: "234 Decatur St",
      city: "Atlanta",
      state: "GA",
      zip: "30303",
      latitude: 33.7520,
      longitude: -84.3750
    },
    contact: {
      phone: "404-555-4567",
      email: "books@heritagebooks.com",
      website: "www.heritagebooksandcafe.com",
      instagram: "@heritagebooks",
      twitter: "@heritagebooks",
      facebook: "HeritageBooksCafe"
    },
    photos: [
      "https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?q=80&w=1080",
      "https://images.unsplash.com/photo-1608505256259-f2e8a93e29b0?q=80&w=1080",
      "https://images.unsplash.com/photo-1530785602389-07594beb8b73?q=80&w=1080"
    ],
    hours: [
      { day: "Monday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Tuesday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Wednesday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Thursday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Friday", open: "08:00", close: "22:00", isClosed: false },
      { day: "Saturday", open: "09:00", close: "22:00", isClosed: false },
      { day: "Sunday", open: "10:00", close: "18:00", isClosed: false }
    ],
    rating: 4.9,
    reviewCount: 203,
    specialOffers: [
      "Book club membership discounts",
      "Author signing events monthly"
    ],
    featured: true,
    createdAt: "2023-01-25T10:15:00Z",
    updatedAt: "2023-06-15T17:50:00Z"
  },
  {
    id: '9',
    name: "Essence Beauty Supply",
    category: 'beauty',
    subscriptionTier: 'basic',
    description: "Beauty supply store carrying a wide range of hair and skincare products specifically formulated for Black hair and skin.",
    location: {
      address: "876 MLK Jr Dr",
      city: "Atlanta",
      state: "GA",
      zip: "30314",
      latitude: 33.7560,
      longitude: -84.4230
    },
    contact: {
      phone: "404-555-6789"
    },
    photos: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1080"
    ],
    rating: 4.5,
    reviewCount: 87,
    createdAt: "2023-05-10T09:30:00Z",
    updatedAt: "2023-06-05T13:20:00Z"
  },
  {
    id: '10',
    name: "Legacy Construction",
    category: 'service',
    subscriptionTier: 'basic',
    description: "Full-service construction company specializing in residential and commercial projects.",
    location: {
      address: "432 Joseph E. Lowery Blvd",
      city: "Atlanta",
      state: "GA",
      zip: "30314",
      latitude: 33.7620,
      longitude: -84.4280
    },
    contact: {
      phone: "404-555-0123"
    },
    photos: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1080"
    ],
    rating: 4.6,
    reviewCount: 42,
    createdAt: "2023-04-20T11:45:00Z",
    updatedAt: "2023-05-30T16:10:00Z"
  }
];

export const CATEGORIES: { id: BusinessCategory; name: string; icon: string }[] = [
  { id: 'restaurant', name: 'Restaurants', icon: 'utensils' },
  { id: 'retail', name: 'Retail', icon: 'shopping-bag' },
  { id: 'beauty', name: 'Beauty & Barber', icon: 'scissors' },
  { id: 'health', name: 'Health & Wellness', icon: 'heart' },
  { id: 'service', name: 'Services', icon: 'briefcase' },
  { id: 'tech', name: 'Technology', icon: 'laptop' },
  { id: 'art', name: 'Art & Culture', icon: 'palette' },
  { id: 'education', name: 'Education', icon: 'book' },
  { id: 'finance', name: 'Financial', icon: 'dollar-sign' },
  { id: 'other', name: 'Other', icon: 'more-horizontal' }
];

export const getCategoryName = (categoryId: BusinessCategory): string => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.name : 'Other';
};

export const getCategoryIcon = (categoryId: BusinessCategory): string => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.icon : 'more-horizontal';
};

export const getBusinessesByCategory = (categoryId: BusinessCategory): Business[] => {
  return BUSINESSES.filter(business => business.category === categoryId);
};

export const getFeaturedBusinesses = (): Business[] => {
  return BUSINESSES.filter(business => business.featured);
};

export const searchBusinesses = (query: string): Business[] => {
  const lowercaseQuery = query.toLowerCase();
  return BUSINESSES.filter(business => 
    business.name.toLowerCase().includes(lowercaseQuery) ||
    business.description?.toLowerCase().includes(lowercaseQuery) ||
    business.category.toLowerCase().includes(lowercaseQuery) ||
    business.location.city.toLowerCase().includes(lowercaseQuery) ||
    business.location.state.toLowerCase().includes(lowercaseQuery)
  );
};