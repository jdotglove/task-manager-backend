import { Router } from 'express';

import { loginHandler,  signupHandler} from './handlers';

const router = Router();

router.post('/login', loginHandler);

router.post('/signup', signupHandler);

export default router;