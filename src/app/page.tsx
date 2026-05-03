'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash;
    // console.log(hash, 'hash');

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    const type = params.get('type');
    // console.log(type, 'type');

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

    async function checkAuth() {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        router.push('/projects');
      } else {
        router.push('/login');
      }
    }

    checkAuth();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
