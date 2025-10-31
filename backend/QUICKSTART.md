# KisaanSaarthi Backend - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Option 1: Docker (Recommended)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create .env file
cp .env.example .env
# Edit .env with your credentials (optional for local testing)

# 3. Start all services (Postgres + Redis + Backend)
docker-compose up -d

# 4. Check if services are running
docker-compose ps

# 5. View logs
docker-compose logs -f backend
```

The API will be available at `http://localhost:4000`

### Option 2: Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL and Redis
# Make sure you have PostgreSQL and Redis running locally

# 3. Create database
createdb kisaansaarthi

# 4. Run migrations
psql postgres://user:pass@localhost:5432/kisaansaarthi -f migrations/001_init.sql
psql postgres://user:pass@localhost:5432/kisaansaarthi -f migrations/002_seed_sample_data.sql

# 5. Create .env file
cp .env.example .env
# Edit DATABASE_URL and REDIS_URL

# 6. Start development server
npm run dev
```

## 🧪 Testing the API

### 1. Health Check
```bash
curl http://localhost:4000/health
```

### 2. Get Mandi Prices (No Auth Required)
```bash
# Get all mandi prices
curl http://localhost:4000/api/v1/mandi

# Filter by state
curl "http://localhost:4000/api/v1/mandi?state=Punjab"

# Filter by crop
curl "http://localhost:4000/api/v1/mandi?crop=Wheat"

# Get states list
curl http://localhost:4000/api/v1/mandi/states

# Get crops list
curl http://localhost:4000/api/v1/mandi/crops
```

### 3. Authentication Flow

**Step 1: Request OTP**
```bash
curl -X POST http://localhost:4000/api/v1/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}'
```

**Step 2: Verify OTP** (In development, check Redis or logs for OTP)
```bash
curl -X POST http://localhost:4000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "otp": "123456"}'
```

Response will include a JWT token:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

**Step 3: Use Token for Protected Endpoints**
```bash
# Save token
TOKEN="your_jwt_token_here"

# Get profile
curl http://localhost:4000/api/v1/auth/profile \
  -H "Authorization: Bearer $TOKEN"

# Update profile
curl -X PUT http://localhost:4000/api/v1/auth/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Rajesh Kumar"}'
```

### 4. Weather API
```bash
# Get weather for Ludhiana (lat: 30.9010, lon: 75.8573)
curl "http://localhost:4000/api/v1/weather?lat=30.9010&lon=75.8573&location=Ludhiana"
```

### 5. Government Schemes
```bash
# Get all schemes
curl http://localhost:4000/api/v1/schemes

# Filter by state
curl "http://localhost:4000/api/v1/schemes?state=Punjab"

# Filter by category
curl "http://localhost:4000/api/v1/schemes?category=subsidy"
```

### 6. Subscriptions (Requires Auth)
```bash
TOKEN="your_jwt_token_here"

# Create subscription
curl -X POST http://localhost:4000/api/v1/subscriptions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "mandi_price",
    "filter": {"state": "Punjab", "crop": "Wheat"},
    "mode": "whatsapp"
  }'

# Get my subscriptions
curl http://localhost:4000/api/v1/subscriptions \
  -H "Authorization: Bearer $TOKEN"
```

### 7. Orders & Payments (Requires Auth)
```bash
TOKEN="your_jwt_token_here"

# Create order
curl -X POST http://localhost:4000/api/v1/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "metadata": {"service": "form_filling"}
  }'

# Get my orders
curl http://localhost:4000/api/v1/orders \
  -H "Authorization: Bearer $TOKEN"
```

### 8. Help Requests (Requires Auth)
```bash
TOKEN="your_jwt_token_here"

# Create help request
curl -X POST http://localhost:4000/api/v1/help \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "form_filling",
    "description": "Need help with PM-KISAN registration"
  }'

# Get my help requests
curl http://localhost:4000/api/v1/help \
  -H "Authorization: Bearer $TOKEN"
```

## 🔧 Development Tips

### Check OTP in Development
Since Twilio might not be configured in development:

```bash
# Connect to Redis
docker exec -it kisaan-redis redis-cli

# Get OTP for a phone number
GET otp:+919876543210
```

### Access Database
```bash
# Using Docker
docker exec -it kisaan-postgres psql -U kisaan -d kisaansaarthi

# Locally
psql postgres://kisaan:kisaan123@localhost:5432/kisaansaarthi
```

### View Logs
```bash
# Docker
docker-compose logs -f backend

# Local
# Logs will appear in terminal where you ran npm run dev
```

## 📊 Sample Data

The seed migration includes:
- 12 sample mandi prices (Punjab, Haryana, UP, Maharashtra, Karnataka, Tamil Nadu)
- 4 government schemes
- 3 sample users (including 1 admin)
- 2 marketplace listings
- 2 subscriptions

### Test Users
- Admin: `+919999999999`
- User 1: `+919876543210`
- User 2: `+919876543211`
- Seller: `+919876543212`

## 🛑 Stopping Services

```bash
# Docker
docker-compose down

# To remove volumes (database data)
docker-compose down -v
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Check what's using port 4000
lsof -i :4000

# Kill the process
kill -9 <PID>
```

### Database connection error
```bash
# Check if Postgres is running
docker-compose ps postgres

# Restart Postgres
docker-compose restart postgres
```

### Redis connection error
```bash
# Check if Redis is running
docker-compose ps redis

# Restart Redis
docker-compose restart redis
```

## 📚 Next Steps

1. Configure Twilio credentials in `.env` for SMS/WhatsApp
2. Configure Razorpay credentials for payments
3. Get OpenWeatherMap API key for weather data
4. Build the frontend application
5. Set up scrapers for mandi price data
6. Deploy to production

## 🔗 Useful Links

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Twilio API](https://www.twilio.com/docs)
- [Razorpay API](https://razorpay.com/docs/api/)
