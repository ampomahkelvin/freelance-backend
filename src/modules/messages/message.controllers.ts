import { Request, Response, NextFunction } from 'express'
import { MessageService } from './services'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../shared/utils/response-utils'
import upload from '../../shared/middleware/upload.middleware'

export class MessageController {
  static sendAttachment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.file) sendErrorResponse(res, 400, 'No file uploaded')
    try {
      upload('attachment', 'attachments', ['image/jpeg', 'image/png', 'image/jpg'])
      const attachment = await MessageService.sendAttachment({
        senderId: req.user!.id,
        receiverId: req.body.receiverId,
        file: req.file!,
        message: req.body.message,
      })

      sendSuccessResponse(res, 200, 'Attachment sent successfully', attachment)
    } catch (e) {
      next(e)
    }
  }

  static getAttachment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { attachmentId } = req.params
    try {
      const attachment = await MessageService.getAttachment(
        Number(attachmentId),
        req.user!.id,
      )
      sendSuccessResponse(
        res,
        200,
        'Attachment retrieved successfully',
        attachment,
      )
    } catch (e) {
      next(e)
    }
  }

  static getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const messages = await MessageService.getMessages(
        Number(req.params.conversationId),
        req.user!.id,
        Number(req.query.page),
        Number(req.query.limit),
      )

      sendSuccessResponse(res, 200, 'Messages fetched successfully', {
        messages,
        meta: {
          page: req.query.page,
          limit: req.query.limit,
          total: messages.length,
        },
      })
    } catch (e) {
      next(e)
    }
  }
}
