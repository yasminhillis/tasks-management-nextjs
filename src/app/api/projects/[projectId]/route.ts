import { getApiHeaders } from "@/lib/utils/getApiHeaders";

export async function GET(req: Request,{ params }: { params: Promise<{ projectId: string }> }) {
    console.log('kkakasoj');
    
    const { projectId } = await params;
    try {

        const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&select=*`, {
            headers: await getApiHeaders()
        })

        if (!res.ok) {
            return Response.json({ success: false, message: 'Fetching project failed. Please try again' }, { status: res.status })
        }

        const data = await res.json()
        const projectName = data[0].name

        return Response.json({ success: true, message: 'Fetched project successfully', projectName}, { status: 200 })

    } catch (error) {
        return Response.json({ success: false, message: 'Network error. Please try again later' }, { status: 503 })
    }
}