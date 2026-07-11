import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

function getHeaders(token: string | undefined) {
  return {
    Authorization: `Bearer ${token}`,
    apikey: process.env.SUPABASE_ANON_KEY!,
    'Content-Type': 'application/json',
  };
}

export async function GET(
  req: NextRequest,
  { params }: {params: Promise<{ epicId: string }>}
) {
  const projectId = req.nextUrl.searchParams.get('projectId');
  const { epicId } = await params;

  const cookieStore = await cookies();
  const token = await cookieStore.get('access_token')?.value;
  try {
    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
      {
        headers: getHeaders(token),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return Response.json(
        { success: false, message: 'Something went wrong', error },
        { status: 404 }
      );
    }
    const result = await res.json();

    if (result.length === 0) {
      return Response.json(
        { success: false, message: 'Epic not found' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Epic details fetched successfully',
        epic: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ success: false, error: error }, { status: 404 });
  }
}
