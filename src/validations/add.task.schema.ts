import { z } from 'zod'; 

// const TaskStatus = z.enum(['TO_DO', 'IN_PROGRESS', 'BLOCKED', 'IN_REVIEW', 'READY_FOR_QA', 'REOPENED', 'READY_FOR_PRODUCTION', 'DONE'])
import { Status } from '@/lib/types/index'
export const AddTaskSchema = z.object({
    title: z.string().min(3, {message: 'Title must be at least 3 characters'}),
    epic_id: z.string().optional(), 
    description: z.string().optional(),
    assignee_id: z.string().optional(), 
    due_date: z.string().optional(), 
    status: z.enum(Status).optional()
})

export type AddTaskFormData = z.infer<typeof AddTaskSchema>