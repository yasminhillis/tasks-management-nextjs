'use server';

import { cookies } from 'next/headers';

export async function getProjectById(projectId: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;

  if (!token) return { success: false, message: 'Unauthorized' };

  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
    {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      }
    );
  
    if (!res.ok) {
      const error = await res.json()
      console.log(error, 'error3333333333');
      
      return {
        success: false,
        message: 'Update was not successfull. Please try again',
      };
    }
  
    return { success: true, data: null, message: 'Project updated successfully' };

  } catch (error) {
    console.error('updateProject failed:', error);
    return {
      success: false, 
      message: 'Network error. Please check your connection and try again'
    }
  }
}

export async function getProjectMembers(
  projectId: string
): Promise<
  | { success: boolean; message: string; data?: undefined }
  | { success: boolean; data: any; message: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) return { success: false, message: 'Unauthorized' };
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/get_project_members?project_id=eq.${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: process.env.SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) return { success: false, message: 'Failed to fetch project members' };

  const data = await res.json();

  return { success: true, data: data, message: 'Fetched members successfully' };
}
