import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/response-utils';
import { JobService } from '../../modules/jobs/services'

// export const isLoggedInUser = (req: Request, res: Response, next: NextFunction) => {
//   const user = req.user;
//   console.log(user!.id)
//
//   if (user && user.id === Number(req.params.id)) {
//     next();
//   } else {
//     sendErrorResponse(res, 401, 'Unauthorized');
//   }
// }

export const isFreelancer = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user && user.role === 'freelancer') {
    next();
  } else {
    sendErrorResponse(res, 403, 'Access denied. Only freelancers are allowed.');
  }
};

export const isJobOwner = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const jobId = Number(req.params.id);

  try {
    const job = await JobService.getJobById(jobId);

    if (job && job.client_id === user!.id) {
      return next();
    } else {
      return sendErrorResponse(res, 403, 'Access denied. You are not the owner.');
    }
  } catch (error) {
    return sendErrorResponse(res, 500, 'Error retrieving job information.');
  }
};