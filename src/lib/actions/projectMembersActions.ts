'use server';

import { cookies } from 'next/headers';

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