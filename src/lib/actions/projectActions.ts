'use server';

import { cookies } from 'next/headers';
import { getApiHeaders } from '../utils/getApiHeaders';

export async function getProjectById(projectId: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;

  if (!token) return { success: false, message: 'Unauthorized' };

  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
    {
      headers: await getApiHeaders(),
    }
  );

  if (!res.ok) {
    return {
      success: false,
      message: 'Failed to fetch project',
    };
  }

  const data = await res.json();

  return {
    success: true,
    message: 'Project fetched successfully',
    data: data[0],
  };
}

export async function saveProject() {}

export async function updateProject(
  projectId: string,
  data: { name: string; description?: string }
) {
  try {
    const cookieStore = await cookies();
  
    const token = cookieStore.get('access_token')?.value;
    if (!token) return { success: false, message: 'Unauthorized' };
    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: 'PATCH',
        headers: await getApiHeaders(),
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      }
    );
  
    if (!res.ok) {
      const error = await res.json()      
      return {
        success: false,
        message: 'Update was not successfull. Please try again',
      };
    }
  
    return { success: true, data: null, message: 'Project updated successfully' };

  } catch (error) {
    return {
      success: false, 
      message: 'Network error. Please check your connection and try again'
    }
  }
}
