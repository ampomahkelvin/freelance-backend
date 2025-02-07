import { sqlQuest } from '../../../config/database'
import { messageQueries } from '../queries'
import { ApiError } from '../../../shared/utils/api-error'

export class MessageRepository {
  // Get conversation by user IDs (ordered)
  static getConversationByUsers = async (user1: number, user2: number) => {
    try {
      const conversation = await sqlQuest.oneOrNone(
        messageQueries.getConversationByUsers,
        [user1, user2],
      )

      if (!conversation) new ApiError(404, 'Conversation not found')

      return conversation
    } catch (error) {
      throw error
    }
  }

  // Create a new conversation between two users
  static createConversation = async (user1: number, user2: number) => {
    try {
      return await sqlQuest.one(messageQueries.createConversation, [
        user1,
        user2,
      ])
    } catch (error) {
      throw error
    }
  }

  // Create a new message in a conversation
  static createMessage = async (messageData: {
    senderId: number
    conversationId: number
    message: string
    createdAt: Date
  }) => {
    try {
      const { senderId, conversationId, message, createdAt } = messageData

      return await sqlQuest.one(messageQueries.insertMessage, [
        conversationId,
        senderId,
        message,
        createdAt,
      ])
    } catch (error) {
      throw error
    }
  }

  static getMessages = async (
    conversationId: number,
    userId: number,
    limit: number = 20,
    offset: number = 0
  ) => {
    try {
      // First verify user is part of conversation
      const participants = await sqlQuest.oneOrNone(
        messageQueries.getConversationParticipants,
        [conversationId]
      );

      if (!participants ||
        (participants.user1_id !== userId && participants.user2_id !== userId)) {
        return new ApiError(403, 'Not part of this conversation');
      }

      return await sqlQuest.manyOrNone(messageQueries.getMessages, [
        conversationId,
        userId,
        limit,
        offset
      ]);
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch messages');
    }
  }

  // Get all conversations for a user by user ID
  static getConversationsByUserId = async (userId: number) => {
    try {
      return await sqlQuest.manyOrNone(messageQueries.getUserConversations, [
        userId,
      ])
    } catch (error) {
      throw error
    }
  }

  static sendAttachment = async (messageData: {
    senderId: number
    receiverId: number
    message?: string
    messageType: string
    fileName: string
    fileType: string
    fileSize: number
    fileUrl: string
    conversationId: number
  }) => {
    try {

      return await sqlQuest.one(messageQueries.sendAttachment, [
        messageData.conversationId,
        messageData.senderId,
        messageData.message || '',
        messageData.messageType,
        messageData.fileName,
        messageData.fileType,
        messageData.fileSize,
        messageData.fileUrl,
      ])
    } catch (error) {
      throw new ApiError(500, 'Failed to send attachment')
    }
  }

  static getAttachment = async (attachmentId: number, userId: number) => {
    try {
      return await sqlQuest.oneOrNone(messageQueries.getAttachment, [
        attachmentId,
        userId
      ]);
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch attachment');
    }
  }
}
