import multer from 'multer'
import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import { ApiError } from '../utils/api-error' // Import fs to check for directory existence or handle errors

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const uploadFolder = path.join(__dirname, '../../../uploads')

// Ensure the upload directory exists
const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true }) // Create folder if it doesn't exist
  }
}

const storage = multer.diskStorage({
  destination: (
    _request: Request,
    _file: Express.Multer.File,
    callback: DestinationCallback,
  ): void => {
    try {
      ensureUploadDirExists()

      callback(null, uploadFolder)
    } catch (error) {
      callback(new ApiError(500, 'Failed to set destination directory'), '') // Pass error to callback
    }
  },

  filename: (
    _req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback,
  ): void => {
    try {
      const filename = `${Date.now()}-${file.originalname}`
      callback(null, filename)
    } catch (error) {
      callback(new ApiError(500, 'Failed to generate filename'), '') // Pass error to callback
    }
  },
})

const upload = multer({ storage })

export default upload
