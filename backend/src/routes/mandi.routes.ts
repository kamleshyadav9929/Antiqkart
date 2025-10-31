import { Router } from 'express';
import {
  getMandiPrices,
  getMandiPriceHistory,
  getStates,
  getCrops,
  getMandis,
} from '../controllers/mandi.controller';

const router = Router();

router.get('/', getMandiPrices);
router.get('/history', getMandiPriceHistory);
router.get('/states', getStates);
router.get('/crops', getCrops);
router.get('/mandis', getMandis);

export default router;
