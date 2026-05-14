import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    return Response.json({ success: true });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  if (!res.ok) {
    return Response.json(
      { message: 'Logout failed, please try again.' },
      { status: 400 }
    );
  }

  return Response.json(
    { message: 'Logged out successfully', success: true },
    { status: 200 }
  );
}
