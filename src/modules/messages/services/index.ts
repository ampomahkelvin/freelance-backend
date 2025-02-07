import { MessageRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'

export class MessageService {
  private static getOrderedUsers(
    user1: number,
    user2: number,
  ): [number, number] {
    return user1 < user2 ? [user1, user2] : [user2, user1]
  }

  private static getOrCreateConversation = async (
    user1: number,
    user2: number,
  ) => {
    const [user1Id, user2Id] = this.getOrderedUsers(user1, user2)

    const existingConversation = await MessageRepository.getConversationByUsers(
      user1Id,
      user2Id,
    )
    if (existingConversation) return existingConversation

    try {
      return await MessageRepository.createConversation(user1Id, user2Id)
    } catch (e) {
      throw e
    }
  }

  static sendMessage = async (
    senderId: number,
    receiverId: number,
    message: string,
  ) => {
    const conversation = await this.getOrCreateConversation(
      senderId,
      receiverId,
    )

    return MessageRepository.createMessage({
      senderId,
      conversationId: conversation.conversation_id,
      message,
      createdAt: new Date(),
    })
  }

  static getConversation = (user1: number, user2: number) => {
    const [userA, userB] = this.getOrderedUsers(user1, user2)
    return MessageRepository.getConversationByUsers(userA, userB)
  }

  static getMessages = async (
    conversationId: number,
    userId: number,
    page: number = 1,
    pageSize: number = 20,
  ) => {
    const offset = (page - 1) * pageSize

    const messages = await MessageRepository.getMessages(
      conversationId,
      userId,
      pageSize,
      offset,
    )

    // @ts-ignore
    return messages.map((msg) => ({
      id: msg.message_id,
      text: msg.message,
      senderId: msg.sender_id,
      timestamp: msg.created_at,
      type: msg.message_type,
      attachment: msg.attachment_id
        ? {
            id: msg.attachment_id,
            url: msg.file_url,
            name: msg.file_name,
            type: msg.file_type,
            size: msg.file_size,
          }
        : null,
    }))
  }

  static getConversationsByUserId = (userId: number) => {
    return MessageRepository.getConversationsByUserId(userId)
  }

  static sendAttachment = async (fileData: {
    senderId: number
    receiverId: number
    file: Express.Multer.File
    message?: string
  }) => {
    const { senderId, receiverId } = fileData

    const conversation = await this.getOrCreateConversation(
      senderId,
      receiverId,
    )

    const attachmentData = {
      senderId,
      receiverId,
      conversationId: conversation.conversation_id,
      message: fileData.message,
      messageType: 'file',
      fileName: fileData.file.filename,
      fileType: fileData.file.mimetype,
      fileSize: fileData.file.size,
      fileUrl: `/uploads/${fileData.file.filename}`,
    }

    return MessageRepository.sendAttachment(attachmentData)
  }

  static getAttachment = async (attachmentId: number, userId: number) => {
    const attachment = await MessageRepository.getAttachment(
      attachmentId,
      userId,
    )

    if (!attachment)
      throw new ApiError(404, 'Attachment not found or access denied')

    return {
      id: attachment.attachment_id,
      url: attachment.file_url,
      metadata: {
        name: attachment.file_name,
        type: attachment.file_type,
        size: attachment.file_size,
        uploadedAt: attachment.attachment_date,
      },
      context: {
        conversationId: attachment.conversation_id,
        senderId: attachment.sender_id,
        caption: attachment.caption,
        sentAt: attachment.message_date,
      },
    }
  }
}
