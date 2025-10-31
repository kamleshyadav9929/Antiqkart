import { Request, Response } from 'express';
import { query } from '../utils/db';
import { generateOTP, storeOTP, verifyOTP } from '../utils/otp';
import { sendOTP } from '../utils/twilio';
import { generateToken } from '../utils/jwt';

export const requestOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    
    // Generate and store OTP
    const otp = generateOTP();
    await storeOTP(phone, otp);
    
    // Send OTP via SMS
    await sendOTP(phone, otp);
    
    res.json({
      success: true,
      message: 'OTP sent successfully',
      expiresIn: 300, // 5 minutes
    });
  } catch (error) {
    console.error('Error requesting OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOTPAndLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, otp } = req.body;
    
    // Verify OTP
    const isValid = await verifyOTP(phone, otp);
    
    if (!isValid) {
      res.status(400).json({ error: 'Invalid OTP' });
      return;
    }
    
    // Upsert user
    const result = await query(
      `INSERT INTO users (phone, verified)
       VALUES ($1, true)
       ON CONFLICT (phone)
       DO UPDATE SET verified = true, updated_at = now()
       RETURNING *`,
      [phone]
    );
    
    const user = result.rows[0];
    
    // Generate JWT token
    const token = generateToken(user);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    res.status(400).json({ error: error.message || 'Failed to verify OTP' });
  }
};

export const getProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        verified: user.verified,
        metadata: user.metadata,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { name, metadata } = req.body;
    
    const result = await query(
      `UPDATE users
       SET name = COALESCE($1, name),
           metadata = COALESCE($2, metadata),
           updated_at = now()
       WHERE id = $3
       RETURNING *`,
      [name, metadata ? JSON.stringify(metadata) : null, userId]
    );
    
    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
