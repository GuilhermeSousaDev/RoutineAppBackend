import { Router } from 'express';
import userRouter from '../../../../modules/User/infra/http/routes/user.routes';

const router = Router();

router.use('/user', userRouter);

export default router;