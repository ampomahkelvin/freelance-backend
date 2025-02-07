interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'freelancer';
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  profilePicture?: string;
}

// Extend the Express namespace to include the `User` type
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}