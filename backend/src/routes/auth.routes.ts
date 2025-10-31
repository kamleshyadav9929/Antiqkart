import { Router } from 'express';
import { requestOTP, verifyOTPAndLogin, getProfile, updateProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { validate, schemas } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/request-otp', validate(schemas.requestOTP), requestOTP);
router.post('/verify-otp', validate(schemas.verifyOTP), verifyOTPAndLogin);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
