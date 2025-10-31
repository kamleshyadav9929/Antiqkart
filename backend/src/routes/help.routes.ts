import { Router } from 'express';
import {
  createHelpRequest,
  getHelpRequests,
  getHelpRequestById,
  updateHelpRequestStatus,
} from '../controllers/help.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { validate, schemas } from '../middleware/validation';

const router = Router();

// All help routes require authentication
router.use(authenticate);

router.post('/', validate(schemas.createHelpRequest), createHelpRequest);
router.get('/', getHelpRequests);
router.get('/:id', getHelpRequestById);
router.put('/:id/status', requireRole(['admin']), updateHelpRequestStatus);

export default router;
