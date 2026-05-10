import { z } from 'zod'; 

export const AddProjectSchema = z.object({
    name: z.string().min(3, {message: 'Project name should not be less than 3 characters'}).max(100, { message: 'Project name should not exceed 100 characters' }),
    description: z.string().max(500).optional().transform(val => val === '' ? undefined : val)
})

export type ADDProjectFormData = z.input<typeof AddProjectSchema>