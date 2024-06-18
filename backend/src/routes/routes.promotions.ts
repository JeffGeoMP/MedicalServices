import { Router } from 'express';
import { getAllPromotions } from '../controller/promotions.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

router.get('/get-all', authenticateToken, getAllPromotions);

module.exports = router;