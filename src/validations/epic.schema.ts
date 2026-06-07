import { z } from 'zod'

// export const EpicSchema = z.object({
//      title: z.string().min(3, { message: 'Project name must be at least 3 characters' }),
//      description: z.string().optional(),
//      assignee_id: z.preprocess((value) => value === "" ? undefined : value, z.uuid().optional()), 
//      deadline: z.preprocess((value) => value === "" ? undefined : value, z.string().optional().refine((value) => {
//         if (!value) return true;
//         const deadline = new Date(value); 
//         const today = new Date(); 
//         today.setHours(0,0,0,0);
//         return deadline >= today
//      }, {
//         message: 'Deadline must be today or in the future'
//      }))
// })

// export type EpicFormData = z.output<typeof EpicSchema>


export const EpicSchema = z.object({
  title: z.string().min(3, {message: 'Title is required (minimum 3 characters)'}),
  description: z.string().max(500, {message: 'Descriprion must be 500 characters or less'}).optional(),
  assignee_id:z.preprocess(
  (val) => val === '' ? undefined : val, 
  z.string().uuid().optional()
),
  deadline: z.string().optional().refine((value) => {
        if (!value) return true;
        const deadline = new Date(value); 
        const today = new Date(); 
        today.setHours(0,0,0,0);
        return deadline >= today
     }, {
        message: 'Deadline must be today or in the future'
     })
});

export type EpicFormData = z.output<typeof EpicSchema>
