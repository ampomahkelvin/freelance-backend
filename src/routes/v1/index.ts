import express from 'express';
import  authRouter  from '../../modules/auth/auth.routes';
import  userRouter  from '../../modules/users/user.routes';
import  freelancerRouter  from '../../modules/freelancers/freelancer.routes';

const appRouter = express.Router();
appRouter.use('/auth', authRouter);
appRouter.use('/users', userRouter);
appRouter.use('/freelancers', freelancerRouter);

export const Router = appRouter;