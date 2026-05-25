'use server';

import { cookies } from 'next/headers'; 



export async function getProjectById(projectId: string){
    const cookieStore = await cookies(); 

    const token = cookieStore.get('access_token')?.value; 

    if (!token) return { success: false, message: 'Unauthorized'}

    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`, {
        headers: {
            apikey: process.env.SUPABASE_ANON_KEY!, 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    })

    if (!res.ok) {
        return {
            success: false, 
            message: 'Failed to fetch project'
        }
    }

    const data = await res.json()

    return { success: true, message: 'Project fetched successfully', data: data[0] }
} 

export async function saveProject(){

} 

export async function updateProject(projectId: string, data: {name: string, description?: string}){
    const cookieStore = await cookies(); 

    const token = cookieStore.get('access_token')?.value; 
    if (!token) return { success: false, message: 'Unauthorized'}
    const res = await fetch(`${process.env.SUPABASE_URL}//rest/v1/projects?id=eq.${projectId}`, {
        method: 'PATCH', 
        headers: {
            apikey: process.env.SUPABASE_ANON_KEY!, 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name, 
            description: data.description
        })
    })
    if (!res.ok) {
        return { success: false, message: 'Update was not successfull. Please try again' }
    }

    return { success: true, data: null, message: 'Project updated successfully' }

} 