import { Response } from 'express';
import { AuthRequest } from '../types';
import { query } from '../utils/db';
import { sendWhatsApp } from '../utils/twilio';

export const createHelpRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const userPhone = req.user?.phone;
    const userName = req.user?.name || 'User';
    const { type, description, attachments } = req.body;
    
    const result = await query(
      `INSERT INTO help_requests (user_id, type, description, attachments, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, type, description, JSON.stringify(attachments || []), 'pending']
    );
    
    const helpRequest = result.rows[0];
    
    // Send WhatsApp notification to user
    const message = `नमस्ते ${userName},\n\nआपका सहायता अनुरोध प्राप्त हो गया है।\n\nअनुरोध ID: ${helpRequest.id}\nप्रकार: ${type}\n\nहमारी टीम 24 घंटे के अंदर आपसे संपर्क करेगी।\n\n- KisaanSaarthi टीम`;
    
    try {
      if (userPhone) {
        await sendWhatsApp(userPhone, message);
      }
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
      // Don't fail the request if notification fails
    }
    
    res.status(201).json({
      success: true,
      data: helpRequest,
    });
  } catch (error) {
    console.error('Error creating help request:', error);
    res.status(500).json({ error: 'Failed to create help request' });
  }
};

export const getHelpRequests = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { status, limit = 50, offset = 0 } = req.query;
    
    let queryText = `SELECT * FROM help_requests WHERE user_id = $1`;
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
    console.error('Error fetching help requests:', error);
    res.status(500).json({ error: 'Failed to fetch help requests' });
  }
};

export const getHelpRequestById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    
    const result = await query(
      `SELECT * FROM help_requests WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Help request not found' });
      return;
    }
    
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching help request:', error);
    res.status(500).json({ error: 'Failed to fetch help request' });
  }
};

export const updateHelpRequestStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    const { id } = req.params;
    const { status, assigned_to } = req.body;
    
    // Only admins can update status
    if (userRole !== 'admin') {
      res.status(403).json({ error: 'Only admins can update help request status' });
      return;
    }
    
    const result = await query(
      `UPDATE help_requests
       SET status = COALESCE($1, status),
           assigned_to = COALESCE($2, assigned_to),
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [status, assigned_to, id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Help request not found' });
      return;
    }
    
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating help request:', error);
    res.status(500).json({ error: 'Failed to update help request' });
  }
};
