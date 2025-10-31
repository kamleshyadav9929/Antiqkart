# KisaanSaarthi Backend API

Backend API for KisaanSaarthi - A comprehensive platform for farmers providing mandi prices, weather information, government schemes, marketplace, and help desk services.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Cache/Queue**: Redis
- **Authentication**: JWT with Phone OTP
- **Payments**: Razorpay
- **Messaging**: Twilio (SMS & WhatsApp)

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis 6+
- Twilio account (for SMS/WhatsApp)
- Razorpay account (for payments)
- OpenWeatherMap API key (for weather data)

## Installation

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

3. **Set up database**:
```bash
# Create database
createdb kisaansaarthi

# Run migrations
psql $DATABASE_URL -f migrations/001_init.sql
psql $DATABASE_URL -f migrations/002_seed_sample_data.sql
```

4. **Start Redis**:
```bash
redis-server
```

## Running the Application

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

The API will be available at `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/request-otp` - Request OTP for phone number
- `POST /api/v1/auth/verify-otp` - Verify OTP and login
- `GET /api/v1/auth/profile` - Get user profile (authenticated)
- `PUT /api/v1/auth/profile` - Update user profile (authenticated)

### Mandi Prices
- `GET /api/v1/mandi` - Get mandi prices with filters
- `GET /api/v1/mandi/history` - Get price history for a crop
- `GET /api/v1/mandi/states` - Get list of states
- `GET /api/v1/mandi/crops` - Get list of crops
- `GET /api/v1/mandi/mandis` - Get list of mandis

### Weather
- `GET /api/v1/weather?lat={lat}&lon={lon}` - Get weather data for location

### Government Schemes
- `GET /api/v1/schemes` - Get government schemes with filters
- `GET /api/v1/schemes/:id` - Get scheme details

### Subscriptions
- `POST /api/v1/subscriptions` - Create subscription (authenticated)
- `GET /api/v1/subscriptions` - Get user subscriptions (authenticated)
- `PUT /api/v1/subscriptions/:id` - Update subscription (authenticated)
- `DELETE /api/v1/subscriptions/:id` - Delete subscription (authenticated)

### Orders & Payments
- `POST /api/v1/orders` - Create order (authenticated)
- `POST /api/v1/orders/verify` - Verify payment (authenticated)
- `GET /api/v1/orders` - Get user orders (authenticated)
- `GET /api/v1/orders/:id` - Get order details (authenticated)
- `POST /api/v1/orders/webhook` - Razorpay webhook handler

### Help Requests
- `POST /api/v1/help` - Create help request (authenticated)
- `GET /api/v1/help` - Get user help requests (authenticated)
- `GET /api/v1/help/:id` - Get help request details (authenticated)
- `PUT /api/v1/help/:id/status` - Update help request status (admin only)

## Database Schema

The database schema includes the following tables:
- `users` - User accounts
- `mandi_prices` - Mandi price data
- `items` - Government schemes and notifications
- `weather_cache` - Cached weather data
- `subscriptions` - User subscriptions for alerts
- `orders` - Payment orders
- `listings` - Marketplace listings
- `help_requests` - Help desk requests
- `scraper_logs` - Scraper execution logs

## Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Request OTP: `POST /api/v1/auth/request-otp` with `{ "phone": "+919876543210" }`
2. Verify OTP: `POST /api/v1/auth/verify-otp` with `{ "phone": "+919876543210", "otp": "123456" }`
3. Use the returned token in subsequent requests: `Authorization: Bearer <token>`

## Rate Limiting

- General API endpoints: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- OTP requests: 2 requests per minute

## Error Handling

All errors follow this format:
```json
{
  "error": "Error message",
  "details": [] // Optional validation details
}
```

## Development

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # Route definitions
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── index.ts         # Application entry point
├── migrations/          # Database migrations
├── package.json
├── tsconfig.json
└── .env.example
```

### Adding New Endpoints

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Register route in `src/index.ts`
4. Add validation schema if needed in `src/middleware/validation.ts`

## Deployment

### Using Docker
```bash
docker build -t kisaan-saarthi-backend .
docker run -p 4000:4000 --env-file .env kisaan-saarthi-backend
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment, especially:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET` (use a strong random string)
- `TWILIO_*` credentials
- `RAZORPAY_*` credentials
- `WEATHER_API_KEY`

## Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## License

MIT
