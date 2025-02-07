import { Client, LibraryResponse, SendEmailV3_1 } from 'node-mailjet'
import Env from '../utils/env'
import { ApiError } from '../utils/api-error'

type EmailParams = {
  recipient: string
  recipientName?: string
  subject: string
  html: string
  text: string
}

class EmailService {
  private static client = new Client({
    apiKey: Env.get('MAILJET_API_KEY'),
    apiSecret: Env.get('MAILJET_API_SECRET'),
  })

  private static from = {
    Email: Env.get('EMAIL_FROM_ADDRESS'),
    Name: Env.get('EMAIL_FROM_NAME'),
  }

  private static sendEmail = async (
    params: EmailParams,
    templateId?: number,
    templateLanguage?: boolean,
    variables?: Record<string, any>,
  ) => {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: this.from,
          To: [{ Email: params.recipient, Name: params.recipientName }],
          Subject: params.subject,
          HTMLPart: params.html,
          TextPart: params.text,
          TemplateLanguage: templateLanguage ?? true,
          TemplateID: templateId,
          Variables: variables,
          TemplateErrorReporting: {
            Email: Env.get('EMAIL_ERROR_REPORTING'),
            Name: 'Email Error Reporter',
          },
        },
      ],
    }

    try {
      const result: LibraryResponse<SendEmailV3_1.Response> = await this.client
        .post('send', { version: 'v3.1' })
        .request(data)
      const { Status } = result.body.Messages[0]

      if (Status !== 'success') throw new ApiError(500, 'Failed to send email')
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Failed to send email: ${e.message}`)

      throw new ApiError(500, 'Unknown error sending email')
    }
  }

  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const subject = 'Welcome to our app'

    const templateId = 6670048
    const templateLanguage = true
    const variables = {
      username: name,
    }

    // Fallback content
    const htmlFallback = `
      <p>Hi ${name},</p>
      <p>Thanks for joining us.</p>
    `

    const textFallback = `Thanks for joining us`

    await this.sendEmail(
      {
        recipient: email,
        recipientName: name,
        subject,
        html: htmlFallback,
        text: textFallback,
      },
      templateId,
      templateLanguage,
      variables,
    )
  }

  static async sendPasswordResetLink({
    email,
    name,
    resetLink,
  }: {
    email: string
    name: string
    resetLink: string
  }): Promise<void> {
    const subject = 'Password Reset Request'

    const templateId = 6670049
    const templateLanguage = true
    const variables = {
      username: name,
      resetLink: resetLink,
    }

    // Fallback content if template fails
    const htmlFallback = `
      <p>Dear ${name},</p>
      <p>Use this link to reset your password: 
        <a href="${resetLink}">Reset Password</a>
      </p>
    `

    const textFallback = `Password Reset: ${resetLink}`

    await this.sendEmail(
      {
        recipient: email,
        recipientName: name,
        subject,
        html: htmlFallback,
        text: textFallback,
      },
      templateId,
      templateLanguage,
      variables,
    )
  }

  static async sendPasswordResetConfirmation(
    email: string,
    name: string,
  ): Promise<void> {
    const subject = 'Password Changed Successfully'

    const templateId = 6670050
    const templateLanguage = true
    const variables = {
      username: name,
    }

    // Fallback content
    const htmlFallback = `
      <p>Hi ${name},</p>
      <p>Your password was successfully changed.</p>
    `

    const textFallback = `Password updated for ${email}`

    await this.sendEmail(
      {
        recipient: email,
        recipientName: name,
        subject,
        html: htmlFallback,
        text: textFallback,
      },
      templateId,
      templateLanguage,
      variables,
    )
  }
}

export default EmailService
