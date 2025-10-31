import { Response } from 'express';
import { AuthRequest } from '../types';
import { query } from '../utils/db';

export const createSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { type, filter, mode } = req.body;
    
    const result = await query(
      `INSERT INTO subscriptions (user_id, type, filter, mode)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, type, JSON.stringify(filter), mode || 'whatsapp']
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

export const getSubscriptions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    const result = await query(
      `SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

export const updateSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { filter, mode, active } = req.body;
    
    const result = await query(
      `UPDATE subscriptions
       SET filter = COALESCE($1, filter),
           mode = COALESCE($2, mode),
           active = COALESCE($3, active)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [
        filter ? JSON.stringify(filter) : null,
        mode,
        active,
        id,
        userId,
      ]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }
    
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
};

export const deleteSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    
    const result = await query(
      `DELETE FROM subscriptions WHERE id = $1 AND user_id = $2 RETURNING id`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }
    
    res.json({
      success: true,
      message: 'Subscription deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
};
