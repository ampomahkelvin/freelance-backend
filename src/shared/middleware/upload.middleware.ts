import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import { ApiError } from '../utils/api-error'; // Adjust the import path as needed

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const baseUploadFolder = path.join(__dirname, '../../../uploads');

// Ensure the upload directory exists
const ensureUploadDirExists = (folder: string) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true }); // Create folder if it doesn't exist
  }
};

const storage = (folder: string) =>
  multer.diskStorage({
    destination: (
      _request: Request,
      _file: Express.Multer.File,
      callback: DestinationCallback,
    ): void => {
      try {
        const uploadFolder = path.join(baseUploadFolder, folder);
        console.log(uploadFolder);
        ensureUploadDirExists(uploadFolder);

        callback(null, uploadFolder);
      } catch (error) {
        callback(new ApiError(500, 'Failed to set destination directory'), ''); // Pass error to callback
      }
    },

    filename: (
      _req: Request,
      file: Express.Multer.File,
      callback: FileNameCallback,
    ): void => {
      try {
        const filename = `${Date.now()}-${file.originalname}`; // Fixed template literal syntax
        callback(null, filename);
      } catch (error) {
        callback(new ApiError(500, 'Failed to generate filename'), ''); // Pass error to callback
      }
    },
  });

const upload = (file: string, folder: string, allowedTypes: string[]) =>
  multer({
    storage: storage(folder),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (
      _req: Request,
      file: Express.Multer.File,
      callback: multer.FileFilterCallback,
    ) => {
      try {
        const allowedMimes = allowedTypes.join('|');
        const mimetypeRegex = new RegExp(`^(${allowedMimes})$`, 'i');

        if (mimetypeRegex.test(file.mimetype)) {
          callback(null, true); // Accept the file
        } else {
          callback(new ApiError(400, `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
        }
      } catch (e) {
        callback(new ApiError(500, 'File filter error'));
      }
    },
  }).single(file);

export default upload;