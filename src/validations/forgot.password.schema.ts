import { z } from 'zod'; 
import { emailField } from './shared';

export const ForgotPasswordSchema = z.object({
    email: emailField
})

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>