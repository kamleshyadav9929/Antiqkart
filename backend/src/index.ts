import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiLimiter, authLimiter, otpLimiter } from './middleware/rateLimit';

// Import routes
import authRoutes from './routes/auth.routes';
import mandiRoutes from './routes/mandi.routes';
import weatherRoutes from './routes/weather.routes';
import schemesRoutes from './routes/schemes.routes';
import subscriptionsRoutes from './routes/subscriptions.routes';
import ordersRoutes from './routes/orders.routes';
import helpRoutes from './routes/help.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'KisaanSaarthi API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes with rate limiting
app.use('/api/v1/auth/request-otp', otpLimiter);
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/mandi', apiLimiter, mandiRoutes);
app.use('/api/v1/weather', apiLimiter, weatherRoutes);
app.use('/api/v1/schemes', apiLimiter, schemesRoutes);
app.use('/api/v1/subscriptions', apiLimiter, subscriptionsRoutes);
app.use('/api/v1/orders', apiLimiter, ordersRoutes);
app.use('/api/v1/help', apiLimiter, helpRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🌾 KisaanSaarthi Backend API                       ║
║                                                       ║
║   Server running on port ${PORT}                        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
║                                                       ║
║   API Endpoints:                                      ║
║   - POST /api/v1/auth/request-otp                    ║
║   - POST /api/v1/auth/verify-otp                     ║
║   - GET  /api/v1/mandi                               ║
║   - GET  /api/v1/weather                             ║
║   - GET  /api/v1/schemes                             ║
║   - POST /api/v1/subscriptions                       ║
║   - POST /api/v1/orders                              ║
║   - POST /api/v1/help                                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

export default app;
