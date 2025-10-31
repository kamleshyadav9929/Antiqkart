-- Sample seed data for KisaanSaarthi

-- Insert sample mandi prices (Punjab - Wheat, Rice)
INSERT INTO mandi_prices (state, mandi_name, crop, variety, price_min, price_max, modal_price, unit, date, source) VALUES
('Punjab', 'Ludhiana', 'Wheat', 'Lokwan', 2050.00, 2150.00, 2100.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Punjab', 'Ludhiana', 'Wheat', 'Sharbati', 2100.00, 2200.00, 2150.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Punjab', 'Amritsar', 'Wheat', 'Lokwan', 2040.00, 2140.00, 2090.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Punjab', 'Ludhiana', 'Rice', 'Basmati', 3500.00, 3800.00, 3650.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Punjab', 'Patiala', 'Rice', 'PR-126', 2800.00, 3000.00, 2900.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Haryana', 'Karnal', 'Wheat', 'HD-2967', 2080.00, 2180.00, 2130.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Haryana', 'Karnal', 'Rice', 'Basmati-1121', 3600.00, 3900.00, 3750.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Uttar Pradesh', 'Meerut', 'Wheat', 'PBW-343', 2030.00, 2130.00, 2080.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Maharashtra', 'Pune', 'Onion', 'Red', 800.00, 1200.00, 1000.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Maharashtra', 'Nashik', 'Onion', 'Red', 850.00, 1250.00, 1050.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Karnataka', 'Bangalore', 'Tomato', 'Hybrid', 1500.00, 2000.00, 1750.00, 'Quintal', CURRENT_DATE, 'agmarknet'),
('Tamil Nadu', 'Chennai', 'Rice', 'IR-20', 2600.00, 2800.00, 2700.00, 'Quintal', CURRENT_DATE, 'agmarknet');

-- Insert sample government schemes
INSERT INTO items (source, source_url, title, description, state, category, event_date, verified) VALUES
('PM-KISAN', 'https://pmkisan.gov.in', 'PM-KISAN 16th Installment', 'Direct income support of ₹6000 per year to farmer families. Next installment expected in December 2025.', 'All India', 'subsidy', '2025-12-15', TRUE),
('Agriculture Dept Punjab', 'https://agripb.gov.in', 'Punjab Crop Diversification Scheme', 'Financial assistance for farmers shifting from paddy to alternative crops. Subsidy up to ₹15000/acre.', 'Punjab', 'subsidy', '2025-11-30', TRUE),
('Haryana Govt', 'https://agricultureharyana.gov.in', 'Mera Pani Meri Virasat Yojana', 'Incentive of ₹7000 per acre for farmers switching from paddy to other crops to conserve groundwater.', 'Haryana', 'subsidy', '2025-12-01', TRUE),
('Ministry of Agriculture', 'https://agricoop.gov.in', 'Soil Health Card Scheme', 'Free soil testing and health cards for all farmers. Apply online or at nearest Krishi Vigyan Kendra.', 'All India', 'service', '2025-11-15', TRUE);

-- Insert sample admin user (password: admin123 - bcrypt hash)
INSERT INTO users (phone, name, role, verified) VALUES
('+919999999999', 'Admin User', 'admin', TRUE);

-- Insert sample regular users
INSERT INTO users (phone, name, role, verified) VALUES
('+919876543210', 'Rajesh Kumar', 'user', TRUE),
('+919876543211', 'Suresh Singh', 'user', TRUE),
('+919876543212', 'Ramesh Patel', 'seller', TRUE);

-- Insert sample marketplace listings
INSERT INTO listings (seller_id, title, description, category, price, unit, quantity, location, state, status) VALUES
((SELECT id FROM users WHERE phone = '+919876543212'), 'Fresh Wheat - Premium Quality', 'High quality wheat from my farm. Lokwan variety. Freshly harvested.', 'grains', 2200.00, 'Quintal', 50, 'Ludhiana', 'Punjab', 'active'),
((SELECT id FROM users WHERE phone = '+919876543212'), 'Basmati Rice - Export Quality', 'Premium basmati rice suitable for export. Aged 1 year.', 'grains', 4000.00, 'Quintal', 30, 'Amritsar', 'Punjab', 'active');

-- Insert sample subscriptions
INSERT INTO subscriptions (user_id, type, filter, mode, active) VALUES
((SELECT id FROM users WHERE phone = '+919876543210'), 'mandi_price', '{"state": "Punjab", "crop": "Wheat"}', 'whatsapp', TRUE),
((SELECT id FROM users WHERE phone = '+919876543211'), 'weather', '{"location": "Ludhiana"}', 'sms', TRUE);
