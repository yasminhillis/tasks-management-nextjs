import { getApiHeaders } from "@/lib/utils/getApiHeaders";

export async function GET({ params }: { params: Promise<{ epicId: string }> }) {
    const {epicId} = await params;
    try {
        const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/project_tasks?epic_id=eq.${epicId}`, {
            headers: await getApiHeaders()
        });

        if (!res.ok) {
            const error = await res.json();
            const statusCode = res.status === 400 ? 400 : 500
            return Response.json({ success: false, message: 'Something went wrong. Please try again', error }, { status: statusCode })
        }

        Response.json({ success: true, message: 'Epic tasks are fetched successfully' }, { status: 200 })

    } catch (error) {
        Response.json({ success: false, message: 'Network error. Please check your connection and try again', error}, { status: 500})
    }
}