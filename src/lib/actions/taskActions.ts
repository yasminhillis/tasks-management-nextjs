'use server'

import { getApiHeaders } from "../utils/getApiHeaders";

import type { Task } from "../types";

export async function addNewTask(data: Task) {
    try {
        const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/tasks`, {
            method: 'POST',
            headers: await getApiHeaders(),
            body: JSON.stringify({
                project_id: data.project_id,
                assignee_id: data.assignee_id,
                description: data.description,
                due_date: data.due_date,
                epic_id: data.epic_id,
                status: data.status,
                title: data.title
            })
        })

        if (!res.ok) {
            return { success: false, message: 'Something went wrong. Please try again' }
        }
        return { success: true, message: 'Task added successfully' }
    } catch (error) {
        return { success: false, message: 'Network error. Please check you connection' }
    }
}