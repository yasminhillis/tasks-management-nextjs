import { z } from 'zod';
import { emailField, passwordField } from './shared';

export const LoginSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
