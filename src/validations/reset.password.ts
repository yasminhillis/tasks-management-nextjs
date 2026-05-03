import { passwordField } from './shared';
import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;
