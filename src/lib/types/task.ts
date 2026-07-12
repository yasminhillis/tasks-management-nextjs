export enum Status { TO_DO = 'TO_DO', IN_PROGRESS = 'IN_PROGRESS', BLOCKED = 'BLOCKED', IN_REVIEW = 'IN_REVIEW', READY_FOR_QA = 'READY_FOR_QA', REOPENED = 'REOPENED', READY_FOR_PRODUCTION = 'READY_FOR_PRODUCTION', DONE = 'DONE' }

export type Task = {
    project_id: string
    title: string
    assignee_id?: string
    description?: string
    due_date?: Date | null
    epic_id?: string
    status?:  Status
}