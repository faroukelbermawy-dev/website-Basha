export type ProductCategory = 
  | 'all'
  | 'jellabiya'
  | 'suits'
  | 'shirts'
  | 'bisht'
  | 'accessories';

export type Language = 'ar' | 'en';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  category: ProductCategory;
  categoryAr: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  leadTime: string;
  tagline: string;
  description: string;
  fabric: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  specs: ProductSpec[];
  features: string[];
  reviews: ProductReview[];
  rating: number;
  renderType: 
    | 'royal-jellabiya-black-gold'
    | 'moroccan-thobe-white-gold'
    | 'basha-tuxedo-suit'
    | 'cashmere-winter-bisht'
    | 'italian-linen-shirt'
    | 'classic-leather-oxford'
    | 'golden-cufflinks-set'
    | 'royal-winter-farwa';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'cod' | 'card' | 'instapay';
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
}
