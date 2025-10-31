import { Router } from 'express';
import {
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} from '../controllers/subscriptions.controller';
import { authenticate } from '../middleware/auth';
import { validate, schemas } from '../middleware/validation';

const router = Router();

// All subscription routes require authentication
router.use(authenticate);

router.post('/', validate(schemas.createSubscription), createSubscription);
router.get('/', getSubscriptions);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
