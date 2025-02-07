import { sqlQuest } from '../../../config/database'
import { applicationQueries } from '../queries'

export class ApplicationRepository {
  static applyForJob = async (body: { jobId: number; freelancerId: number }) => {
    const { jobId, freelancerId } = body
    try {
      return await sqlQuest.oneOrNone(applicationQueries.applyForJob, [jobId, freelancerId])
    } catch (e) {
      throw e
    }
  }

  static deleteApplication = async (body: { jobId: number; freelancerId: number }) => {
    const { jobId, freelancerId } = body
    try {
      return await sqlQuest.none(applicationQueries.deleteApplication, [jobId, freelancerId])
    } catch (e) {
      throw e
    }
  }

  static acceptApplication = async (body: { jobId: number; freelancerId: number }) => {
    const { jobId, freelancerId } = body
    try {
      return await sqlQuest.oneOrNone(applicationQueries.acceptApplication, [jobId, freelancerId])
    } catch (e) {
      throw e
    }
  }

  static getApplicationsForJob = async (jobId: number) => {
    try {
      return await sqlQuest.manyOrNone(applicationQueries.getApplicationsForJob, [jobId])
    } catch (e) {
      throw e
    }
  }

  static getApplicationsByFreelancer = async (freelancerId: number) => {
    try {
      return await sqlQuest.manyOrNone(applicationQueries.getApplicationsByFreelancer, [freelancerId])
    } catch (e) {
      throw e
    }
  }

  static getApplicationStatus = async (jobId: number, freelancerId: number) => {
    try {
      return await sqlQuest.oneOrNone(applicationQueries.getApplicationStatus, [jobId, freelancerId])
    } catch (e) {
      throw e
    }
  }

  static updateApplicationStatus = async (jobId: number, freelancerId: number, status: string) => {
    try {
      return await sqlQuest.oneOrNone(applicationQueries.updateApplicationStatus, [jobId, freelancerId, status])
    } catch (e) {
      throw e
    }
  }

  static checkIfAlreadyApplied = async (jobId: number, freelancerId: number) => {
    try {
      return await sqlQuest.oneOrNone(applicationQueries.checkIfAlreadyApplied, [jobId, freelancerId])
    } catch (e) {
      throw e
    }
  }
}