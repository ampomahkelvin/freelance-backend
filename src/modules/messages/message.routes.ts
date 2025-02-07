import express from 'express'
import { MessageController } from './message.controllers'

const router = express.Router()

router.post('/attachments/send-attachment', MessageController.sendAttachment)
router.post('/attachments/:id', MessageController.getAttachment)

router.use('uploads', express.static('attachments'))

export default router