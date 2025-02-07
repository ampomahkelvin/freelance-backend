import express from 'express'
import { ApplicationController } from './application.controllers'

const router = express.Router()

router.post('/', ApplicationController.applyForJob)

router.get('/job/:id', ApplicationController.getApplicationsForJob)

router.get('/freelancer/:id', ApplicationController.getApplicationsByFreelancer)

router.get('/status/:jobId', ApplicationController.getApplicationStatus)

router.delete('/:jobId', ApplicationController.deleteApplication)

router.patch('/:jobId/:freelancerId', ApplicationController.acceptApplication)

export default router