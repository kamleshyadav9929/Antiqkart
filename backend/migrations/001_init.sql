-- KisaanSaarthi Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200),
  role VARCHAR(50) DEFAULT 'user',
  verified BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);

-- Items table (exams/results/generic government schemes)
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(200),
  source_url TEXT,
  title VARCHAR(500),
  description TEXT,
  state VARCHAR(100),
  category VARCHAR(100),
  event_date DATE,
  scraped_at TIMESTAMP DEFAULT now(),
  raw_json JSONB DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_items_state ON items(state);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_event_date ON items(event_date);

-- Mandi prices table
CREATE TABLE IF NOT EXISTS mandi_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state VARCHAR(100),
  mandi_name VARCHAR(255),
  crop VARCHAR(255),
  variety VARCHAR(255),
  price_min NUMERIC(10,2),
  price_max NUMERIC(10,2),
  modal_price NUMERIC(10,2),
  unit VARCHAR(50) DEFAULT 'Quintal',
  date DATE NOT NULL,
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(state, mandi_name, crop, variety, date)
);

CREATE INDEX idx_mandi_state ON mandi_prices(state);
CREATE INDEX idx_mandi_crop ON mandi_prices(crop);
CREATE INDEX idx_mandi_date ON mandi_prices(date DESC);
CREATE INDEX idx_mandi_state_crop_date ON mandi_prices(state, crop, date DESC);

-- Weather cache table
CREATE TABLE IF NOT EXISTS weather_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_name VARCHAR(255),
  lat NUMERIC(10,6),
  lon NUMERIC(10,6),
  payload JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(lat, lon)
);

CREATE INDEX idx_weather_location ON weather_cache(location_name);
CREATE INDEX idx_weather_coords ON weather_cache(lat, lon);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- mandi_price, weather, scheme
  filter JSONB DEFAULT '{}',
  mode VARCHAR(20) DEFAULT 'whatsapp', -- whatsapp/sms/inapp
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_type ON subscriptions(type);
CREATE INDEX idx_subscriptions_active ON subscriptions(active);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  provider VARCHAR(50) DEFAULT 'razorpay',
  provider_order_id VARCHAR(200),
  provider_payment_id VARCHAR(200),
  status VARCHAR(50) DEFAULT 'created', -- created, paid, failed, refunded
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_provider_order_id ON orders(provider_order_id);

-- Marketplace listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price NUMERIC(10,2) NOT NULL,
  unit VARCHAR(50),
  quantity NUMERIC(10,2),
  location VARCHAR(255),
  state VARCHAR(100),
  images JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'active', -- active, sold, inactive
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_listings_seller ON listings(seller_id);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_state ON listings(state);

-- Help requests table
CREATE TABLE IF NOT EXISTS help_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(100) NOT NULL, -- form_filling, document_help, general
  description TEXT,
  attachments JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed, cancelled
  assigned_to UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_help_requests_user ON help_requests(user_id);
CREATE INDEX idx_help_requests_status ON help_requests(status);
CREATE INDEX idx_help_requests_type ON help_requests(type);

-- Scraper logs table
CREATE TABLE IF NOT EXISTS scraper_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL, -- success, failed, partial
  message TEXT,
  records_count INTEGER DEFAULT 0,
  error_details JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_scraper_logs_source ON scraper_logs(source);
CREATE INDEX idx_scraper_logs_status ON scraper_logs(status);
CREATE INDEX idx_scraper_logs_created ON scraper_logs(created_at DESC);

-- OTP verification table (temporary storage)
CREATE TABLE IF NOT EXISTS otp_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  attempts INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_otp_phone ON otp_verifications(phone);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);
