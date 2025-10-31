import { Router } from 'express';
import {
  createOrder,
  verifyPayment,
  getOrders,
  getOrderById,
  handleWebhook,
} from '../controllers/orders.controller';
import { authenticate } from '../middleware/auth';
import { validate, schemas } from '../middleware/validation';

const router = Router();

// Webhook (no auth required)
router.post('/webhook', handleWebhook);

// Protected routes
router.post('/', authenticate, validate(schemas.createOrder), createOrder);
router.post('/verify', authenticate, verifyPayment);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);

export default router;
