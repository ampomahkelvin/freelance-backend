import { NextFunction, Request, Response } from 'express'
import { ZodType } from 'zod'
import { ApiError } from '../utils/api-error'

export class ValidationMiddleware {
  static readonly validateRequest = <T extends ZodType<any, any, any>>(
    schema: T,
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      schema
        .parseAsync({ ...req.query, ...req.body })
        .then(() => {
          return next()
        })
        .catch((error) => {
          return ApiError.appError(error, req, res, next)
        })
    }
  }
}
