#!/bin/bash

# KisaanSaarthi Backend Setup Script
# This script helps you set up the backend quickly

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   🌾 KisaanSaarthi Backend Setup                     ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file with your actual credentials:"
    echo "   - TWILIO_* for SMS/WhatsApp"
    echo "   - RAZORPAY_* for payments"
    echo "   - WEATHER_API_KEY for weather data"
    echo "   - JWT_SECRET (generate a strong random string)"
    echo ""
    read -p "Press Enter to continue with default values (for testing only)..."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🚀 Starting services with Docker Compose..."
echo ""

# Start Docker Compose
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    
    # Display service status
    echo "📊 Service Status:"
    docker-compose ps
    echo ""
    
    # Test health endpoint
    echo "🏥 Testing health endpoint..."
    if curl -s http://localhost:4000/health > /dev/null; then
        echo "✅ Backend API is responding!"
        echo ""
        
        # Display API info
        echo "╔═══════════════════════════════════════════════════════╗"
        echo "║                                                       ║"
        echo "║   ✅ Setup Complete!                                  ║"
        echo "║                                                       ║"
        echo "║   Backend API: http://localhost:4000                 ║"
        echo "║   Health Check: http://localhost:4000/health         ║"
        echo "║                                                       ║"
        echo "║   PostgreSQL: localhost:5432                         ║"
        echo "║   Redis: localhost:6379                              ║"
        echo "║                                                       ║"
        echo "╚═══════════════════════════════════════════════════════╝"
        echo ""
        
        echo "📚 Next Steps:"
        echo "   1. Test the API: curl http://localhost:4000/health"
        echo "   2. Get mandi prices: curl http://localhost:4000/api/v1/mandi"
        echo "   3. View logs: docker-compose logs -f backend"
        echo "   4. Stop services: docker-compose down"
        echo ""
        
        echo "📖 Documentation:"
        echo "   - Quick Start: QUICKSTART.md"
        echo "   - API Examples: API_EXAMPLES.http"
        echo "   - Deployment: DEPLOYMENT.md"
        echo "   - Full Docs: README.md"
        echo ""
        
        echo "🎉 Happy coding!"
    else
        echo "⚠️  Backend API is not responding yet. Please wait a moment and try:"
        echo "   curl http://localhost:4000/health"
    fi
else
    echo "❌ Some services failed to start. Check logs with:"
    echo "   docker-compose logs"
fi

echo ""
