import { z } from 'zod';
import { emailField, passwordField } from './shared';
export const SignupSchema = z
  .object({
    name: z
      .string()
      .superRefine((val, ctx) => {
        if (val.length === 0) return;

        if (val !== val.trim()) {
          ctx.addIssue({
            code: 'custom',
            message: 'No trailing or leading spaces allowed',
          });
          return;
        }

        if (/  /.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'No double spaces allowed',
          });
          return;
        }

        if (!/^\p{L}+(?: \p{L}+)*$/u.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Name must contain letters only',
          });
        }
      })
      .min(3, { message: 'Name must be at least 3 characters' })
      .max(50, { message: 'Name must be at most 50 characters' }),
    email: emailField,
    jobTitle: z.string().optional().or(z.literal('')),
    password: passwordField,
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof SignupSchema>;
