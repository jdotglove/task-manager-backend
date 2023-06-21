import { Router } from 'express';

import loginRoute from './api/login';
import userRoutes from './api/user';

const router = Router();

router.use(loginRoute);
router.use(userRoutes);

export default router;