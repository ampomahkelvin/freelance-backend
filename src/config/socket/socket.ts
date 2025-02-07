import { Server, Socket } from 'socket.io'
import { MessageService } from '../../modules/messages/services'

export interface CustomSocket extends Socket {
  userId?: number
}

export const initializeSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket: CustomSocket) => {
    const userId = socket.handshake.query.userId
    if (userId) {
      socket.userId = Number(userId)
      console.log('User connected:', socket.userId)
    } else {
      console.log('No userId provided')
    }

    socket.join(socket.userId!.toString())

    socket.on('send_message', async (data) => {
      try {
        const { receiverId, message } = data
        await MessageService.sendMessage(
          socket.userId!,
          receiverId,
          message,
        )

        // send to both sender and receiver
        io.to(socket.userId!.toString())
          .to(receiverId.toString())
          .emit('new_message', message)
      } catch (error) {
        console.error('Error sending message:', error)
      }
    })

    socket.on('send_attachment', async (data) => {
      try {
        const { receiverId, attachmentId } = data
        const attachment = await MessageService.getAttachment(
          attachmentId,
          socket.userId!,
        )

        io.to(socket.userId!.toString())
          .to(receiverId.toString())
          .emit('new_attachment', attachment)
      } catch (error) {
        socket.emit('error', { message: 'Failed to send attachment' })
      }
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId)
    })
  })
}
