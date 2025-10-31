import { Request } from 'express';

export interface User {
  id: string;
  phone: string;
  name?: string;
  role: string;
  verified: boolean;
  metadata?: any;
  created_at: Date;
  updated_at?: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface MandiPrice {
  id: string;
  state: string;
  mandi_name: string;
  crop: string;
  variety?: string;
  price_min: number;
  price_max: number;
  modal_price?: number;
  unit: string;
  date: Date;
  source: string;
  created_at: Date;
}

export interface Subscription {
  id: string;
  user_id: string;
  type: 'mandi_price' | 'weather' | 'scheme';
  filter: any;
  mode: 'whatsapp' | 'sms' | 'inapp';
  active: boolean;
  created_at: Date;
}

export interface Order {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  provider: string;
  provider_order_id?: string;
  provider_payment_id?: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  metadata?: any;
  created_at: Date;
  updated_at?: Date;
}

export interface HelpRequest {
  id: string;
  user_id: string;
  type: string;
  description?: string;
  attachments?: any[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assigned_to?: string;
  order_id?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  category?: string;
  price: number;
  unit?: string;
  quantity?: number;
  location?: string;
  state?: string;
  images?: string[];
  status: 'active' | 'sold' | 'inactive';
  created_at: Date;
  updated_at?: Date;
}
