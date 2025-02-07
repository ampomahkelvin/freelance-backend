import { ApplicationRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'

export class ApplicationService {
  private static checkIfAlreadyApplied = async (
    jobId: number,
    freelancerId: number,
  ) => {
    return await ApplicationRepository.checkIfAlreadyApplied(
      jobId,
      freelancerId,
    )
  }

  static applyForJob = async (body: {
    jobId: number
    freelancerId: number
  }) => {
    const alreadyApplied = await this.checkIfAlreadyApplied(
      body.jobId,
      body.freelancerId,
    )
    if (alreadyApplied)
      throw new ApiError(400, 'Freelancer has already applied for this job')
    return await ApplicationRepository.applyForJob(body)
  }

  static deleteApplication = async (body: {
    jobId: number
    freelancerId: number
  }) => {
    const alreadyApplied = await this.checkIfAlreadyApplied(
      body.jobId,
      body.freelancerId,
    )
    if (!alreadyApplied)
      throw new ApiError(400, 'Freelancer has not applied for this job')
    return await ApplicationRepository.deleteApplication(body)
  }

  static acceptApplication = async (body: {
    jobId: number
    freelancerId: number
  }) => {
    return await ApplicationRepository.acceptApplication(body)
  }

  static getApplicationsForJob = async (jobId: number) => {
    return await ApplicationRepository.getApplicationsForJob(jobId)
  }

  static getApplicationsByFreelancer = async (freelancerId: number) => {
    return await ApplicationRepository.getApplicationsByFreelancer(freelancerId)
  }

  static getApplicationStatus = async (jobId: number, freelancerId: number) => {
    return await ApplicationRepository.getApplicationStatus(jobId, freelancerId)
  }

  static updateApplicationStatus = async (
    jobId: number,
    freelancerId: number,
    status: string,
  ) => {
    return await ApplicationRepository.updateApplicationStatus(
      jobId,
      freelancerId,
      status,
    )
  }
}
