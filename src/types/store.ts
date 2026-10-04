export type Category =
  | 'all'
  | 'tracksuits'
  | 'jackets'
  | 'leather'
  | 'sportswear'
  | 'gymwear'
  | 'streetwear'
  | 'caps_hats'
  | 'hoodies'
  | 'tees'
  | 'trousers';

export type GenderTarget = 'all' | 'men' | 'ladies' | 'kids' | 'unisex';

export type FitType = 'Oversized' | 'Relaxed' | 'Boxy' | 'Tailored' | 'Athletic Fit' | 'Compression' | 'Regular';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface SizeGuideRow {
  size: string;
  chestOrWaist: string;
  length: string;
  shoulderOrInseam: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  fitsTrueToSize: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  gender: 'men' | 'ladies' | 'kids' | 'unisex';
  genderLabel: string;
  subType?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  tagline: string;
  fit: FitType;
  fabric: string;
  gsm?: number;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  badge?: string;
  isCustomAdded?: boolean;
  careInstructions: string[];
  sizeGuide: SizeGuideRow[];
  reviews: Review[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'online_bank' | 'jazzcash_easypaisa' | 'cod';
  paymentReference?: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'Order Placed' | 'In Production' | 'Quality Check' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
