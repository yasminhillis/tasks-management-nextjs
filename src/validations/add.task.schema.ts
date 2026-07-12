import { z } from 'zod'; 
import { Status } from '@/lib/types/index'

export const AddTaskSchema = z.object({
    title: z.string().min(3, {message: 'Title must be at least 3 characters'}),
    epic_id: z.string().optional(), 
    description: z.string().optional(),
    assignee_id: z.string().optional(), 
    due_date: z.date().nullable().optional(), 
    status: z.enum(Status).optional()
})

export type AddTaskFormData = z.infer<typeof AddTaskSchema>