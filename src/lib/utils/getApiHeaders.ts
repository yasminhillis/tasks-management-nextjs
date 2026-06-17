'use server';
import { cookies } from 'next/headers';
export async function getApiHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    return {
        apikey: process.env.SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}