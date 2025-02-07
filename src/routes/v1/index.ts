import express from 'express'
import authRouter from '../../modules/auth/auth.routes'
import userRouter from '../../modules/users/user.routes'
import freelancerRouter from '../../modules/freelancers/freelancer.routes'
import jobRouter from '../../modules/jobs/job.routes'
import applicationRouter from '../../modules/applications/application.routes'
import messageRouter from '../../modules/applications/application.routes'
import { authenticateUser } from '../../shared/middleware/authenticate-user.middleware'

const appRouter = express.Router()
appRouter.use('/auth', authRouter)
appRouter.use('/users', authenticateUser, userRouter)
appRouter.use('/freelancers', authenticateUser, freelancerRouter)
appRouter.use('/jobs', authenticateUser, jobRouter)
appRouter.use('/applications', authenticateUser, applicationRouter)
appRouter.use('/messages', authenticateUser, messageRouter)

export const Router = appRouter
