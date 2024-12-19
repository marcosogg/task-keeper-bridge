import { toast } from "sonner";

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown, fallbackMessage = "An unexpected error occurred") => {
  console.error('Error:', error);
  
  if (error instanceof AppError) {
    toast.error(error.message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error(fallbackMessage);
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};