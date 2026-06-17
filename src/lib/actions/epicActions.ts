'use server';
import { getApiHeaders } from '../utils/getApiHeaders';

type Epic = {
  title: string;
  description: string | undefined;
  assignee_id: string | undefined;
  project_id: string;
  deadline: string | undefined;
};

export default async function addNewEpic(data: Epic) {
  try {
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
  } catch (error) {
    return { 
      success: false, 
      message: 'Network error. Please check your connection and try again'
    }
  }

}
