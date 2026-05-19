'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash;

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    const type = params.get('type');

    const error = params.get('error');
    const errorDescription = params.get('error_description');

    if (error) {
      router.push(`/forgot-password?error=${errorDescription}`);
      return;
    }

    if (type === 'recovery' && accessToken) {
      router.push(`/reset-password?access_token=${accessToken}`);
      return;
    }

    router.push('/login');
}, [router])

return <div></div>
}