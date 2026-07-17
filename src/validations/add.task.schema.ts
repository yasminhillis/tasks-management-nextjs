import { z } from 'zod'; 
import { Status } from '@/lib/types/index'

export const AddTaskSchema = z.object({
    title: z.string().min(3, {message: 'Title must be at least 3 characters'}),
    epic_id: z.string().optional(), 
    description: z.string().optional(),
    assignee_id: z.string().optional(), 
    due_date: z.date().nullable().optional().refine(
      (value) => {
        if (!value) return true;
        const deadline = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return deadline >= today;
      },
      {
        message: 'Deadline must be today or in the future',
      }
    ), 
    status: z.enum(Status).optional()
})

export type AddTaskFormData = z.infer<typeof AddTaskSchema>