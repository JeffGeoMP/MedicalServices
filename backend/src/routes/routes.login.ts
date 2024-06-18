import { Router } from 'express';
import { loginUser } from '../controller/login.controller';

const router = Router();

router.post('/', loginUser);

module.exports = router;