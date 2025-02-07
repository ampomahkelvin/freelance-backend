import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Env from '../utils/env'
import { sendErrorResponse } from '../utils/response-utils'
import { User } from '../../../types'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    const JWT_SECRET = Env.get('JWT_SECRET')

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) sendErrorResponse(res, 403, 'Unauthorized')

      req.user = user as User
      next()
    })
  } else {
    sendErrorResponse(res, 401, 'No token provided')
  }
}
