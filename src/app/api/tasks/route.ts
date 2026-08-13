import { getApiHeaders } from "@/lib/utils/getApiHeaders";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId'); 
    const status = req.nextUrl.searchParams.get('status');
    // console.log(projectId, 'projectId');
    // console.log(status, 'status');
    

    try {
        const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}`, {
            headers: await getApiHeaders()
        });
        if (!res.ok) {
            const error = await res.json();
            console.log(error, 'error');  
            return Response.json({success: false, message: 'fetching tasks failed', error}, {status: res.status})
        }
        const tasks =  await res.json(); 
        // console.log(tasks, 'tasks');
        return Response.json({success: true, message: 'tasks fetched successfully', tasks, taskCount: tasks.length},  {status: 200})
        
    } catch (error) {
        return Response.json({ success: false, message: 'Network error. Please try again' }, {status: 503})
    }
}