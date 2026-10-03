export interface VillaReview {
  id: string;
  author: string;
  avatar: string;
  date: string;
  duration: string;
  rating: number;
  comment: string;
  verified: boolean;
  tag: string;
}

export interface VillaAmenity {
  icon: string;
  title: string;
  subtitle: string;
}

export interface Villa {
  id: string;
  name: string;
  titleFa: string;
  code: string;
  location: string;
  city: string;
  province: string;
  pricePerNight: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  areaSqM: number;
  bedrooms: number;
  bathrooms: number;
  guestCapacity: number;
  maxGuests: number;
  parkingSpaces: number;
  architecturalStyle: string;
  view: string;
  badges: string[];
  instantBook: boolean;
  heroImage: string;
  galleryImages: string[];
  amenities: VillaAmenity[];
  description: string;
  narrative: string;
  coordinates: {
    xPercent: number; // For interactive SVG/Canvas map pin positioning
    yPercent: number;
    lat: number;
    lng: number;
  };
  mapPriceShort: string;
  host: {
    name: string;
    title: string;
    avatar: string;
    experience: string;
    responseRate: string;
    responseTime: string;
    isSuperhost: boolean;
  };
  reviews: VillaReview[];
}

export interface BookingDetails {
  villaId: string;
  villaName: string;
  villaLocation: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  nightlyRate: number;
  cleaningFee: number;
  discount: number;
  totalPrice: number;
  guestName: string;
  guestPhone: string;
  bookingCode: string;
  createdAt: string;
}

export type ActivePage = 'home' | 'catalog' | 'details' | 'bookings' | 'saved' | 'profile';
export type ViewportMode = 'responsive' | 'mobile-mockup' | 'desktop-mockup';
