import { Router } from 'express';
import { loginUser, getDataUser } from '../controller/login.controller';

const router = Router();

router.post('/', loginUser);
router.get('/data', getDataUser);

module.exports = router;