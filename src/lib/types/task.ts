export enum Status { TO_DO = 'TO_DO', IN_PROGRESS = 'IN_PROGRESS', BLOCKED = 'BLOCKED', IN_REVIEW = 'IN_REVIEW', READY_FOR_QA = 'READY_FOR_QA', REOPENED = 'REOPENED', READY_FOR_PRODUCTION = 'READY_FOR_PRODUCTION', DONE = 'DONE' }
import type { Member } from "./members"
import type { Epic } from "./epic";

export type Task = {
    task_id?: string,
    id?: string,
    project_id: string
    title: string
    assignee_id?: string
    description?: string
    due_date?: string | undefined
    epic_id?: string
    status?: Status,
    assignee?: Member;
}

export type EpicTask = {
    assignee: Pick<Member, 'email' | 'name' | 'role' & {id : string}>,
    created_at: string
    created_by: Member,
    description: string,
    due_date: string,
    epic: Pick<Epic, 'epic_id' | 'title' | 'id'>,
    epic_id: string,
    id: string,
    project_id: string,
    status: string,
    task_id: string,
    title: string
}