import { Router } from 'express';
import { addNewAssistance, getAssistanceWithDetail } from '../controller/assistance.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

router.post('/add', authenticateToken, addNewAssistance);
router.get('/get', authenticateToken, getAssistanceWithDetail);

module.exports = router;