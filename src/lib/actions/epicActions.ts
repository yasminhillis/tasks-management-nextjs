'use server';
import { cookies } from 'next/headers';

type Epic = {
  title: string;
  description: string | undefined;
  assignee_id: string | undefined;
  project_id: string;
  deadline: string | undefined;
};

async function getApiHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  return {
    apikey: process.env.SUPABASE_ANON_KEY!,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export default async function addNewEpic(data: Epic) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/epics`, {
    method: 'POST',
    headers: await getApiHeaders(),
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      assignee_id: data.assignee_id,
      project_id: data.project_id,
      deadline: data.deadline,
    }),
  });

  if (!res.ok) {
    const error = await res.json();

    return {
      success: false,
      message: 'Adding a new epic failed. Please try again',
    };
  }

  return { success: true, message: 'Epic created successfully' };
}
