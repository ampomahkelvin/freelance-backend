import { Response } from 'express'

export const sendSuccessResponse = (
  res: Response,
  status: number,
  message: string,
  data?: any,
) => {
  res.status(status).json({
    status: 'success',
    message,
    data,
  })
}

export const sendErrorResponse = (
  res: Response,
  status: number,
  error: any,
) => {
  res.status(status).json({
    status: 'error',
    error,
  })
}
