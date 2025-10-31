import { Response } from 'express';
import { AuthRequest } from '../types';
import { query } from '../utils/db';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { amount, metadata } = req.body;
    
    if (!razorpay) {
      res.status(503).json({ error: 'Payment service not configured' });
      return;
    }
    
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });
    
    // Store in database
    const result = await query(
      `INSERT INTO orders (user_id, amount, currency, provider, provider_order_id, status, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        userId,
        amount,
        'INR',
        'razorpay',
        razorpayOrder.id,
        'created',
        JSON.stringify(metadata || {}),
      ]
    );
    
    res.status(201).json({
      success: true,
      data: {
        order: result.rows[0],
        razorpay_order_id: razorpayOrder.id,
        razorpay_key_id: process.env.RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!process.env.RAZORPAY_KEY_SECRET) {
      res.status(503).json({ error: 'Payment service not configured' });
      return;
    }
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
      res.status(400).json({ error: 'Invalid payment signature' });
      return;
    }
    
    // Update order status
    const result = await query(
      `UPDATE orders
       SET status = 'paid',
           provider_payment_id = $1,
           updated_at = NOW()
       WHERE provider_order_id = $2
       RETURNING *`,
      [razorpay_payment_id, razorpay_order_id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { status, limit = 50, offset = 0 } = req.query;
    
    let queryText = `SELECT * FROM orders WHERE user_id = $1`;
    const params: any[] = [userId];
    let paramCount = 2;
    
    if (status) {
      queryText += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    
    queryText += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit as string), parseInt(offset as string));
    
    const result = await query(queryText, params);
    
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    
    const result = await query(
      `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Webhook handler for Razorpay
export const handleWebhook = async (req: any, res: Response): Promise<void> => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);
    
    if (!process.env.RAZORPAY_KEY_SECRET) {
      res.status(503).json({ error: 'Payment service not configured' });
      return;
    }
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    if (expectedSignature !== signature) {
      res.status(400).json({ error: 'Invalid webhook signature' });
      return;
    }
    
    const event = req.body;
    
    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      
      await query(
        `UPDATE orders
         SET status = 'paid',
             provider_payment_id = $1,
             updated_at = NOW()
         WHERE provider_order_id = $2`,
        [payment.id, payment.order_id]
      );
    }
    
    // Handle payment failed event
    if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      
      await query(
        `UPDATE orders
         SET status = 'failed',
             updated_at = NOW()
         WHERE provider_order_id = $1`,
        [payment.order_id]
      );
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
};
