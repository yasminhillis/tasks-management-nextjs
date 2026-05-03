import { z } from 'zod';

export const emailField = z.email({ message: 'Invalid Email' });

export const passwordField = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(64, { message: 'Password must be at most 64 characters' })
  .regex(/^\S+$/, { message: 'Password must not contain spaces' })
  .regex(/[a-z]/, { message: 'At least one lowercase letter required' })
  .regex(/[A-Z]/, { message: 'At least one uppercase letter required' })
  .regex(/[0-9]/, { message: 'At least one digit required' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'At least one special character required',
  });
