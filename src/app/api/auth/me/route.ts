import { cookies } from 'next/headers';
export async function GET() {
  const cookieStore = await cookies();
  console.log(cookieStore, 'kk');

  const token = cookieStore.get('access_token');

  if (!token) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    }
  );

  if (!res.ok) {
    return Response.json({ authenticated: false, status: 401 });
  }

  const data = await res.json();
  // console.log(data, 'data');

  return Response.json({
    authenticated: true,
    name: data.user_metadata.name,
    department: data.user_metadata.department,
  });
}
