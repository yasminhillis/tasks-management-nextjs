import { z } from 'zod'

export const EpicSchema = z.object({
  title: z.string().min(3, { message: 'Title is required (minimum 3 characters)' }),
  description: z.string().max(500, { message: 'Description must be 500 characters or less' }).optional(),
  assignee_id: z.string()
    .optional()
    .transform(val => val === '' ? undefined : val)
    .pipe(z.string().uuid().optional()),
  deadline: z.string().optional().refine((value) => {
    if (!value) return true;
    const deadline = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline >= today;
  }, {
    message: 'Deadline must be today or in the future'
  })
});

export type EpicFormData = z.input<typeof EpicSchema>
