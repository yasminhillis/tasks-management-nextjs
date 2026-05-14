'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { type LoginFormData, LoginSchema } from '@/validations/login.schema';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  async function onSubmit(data: LoginFormData) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        setError('root', {
          message: error.message || 'Something went wrong. Please try again',
        });
        return;
      }
      reset();
      router.push('/project');
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError('root', {
          message: 'Please check your connection and try again',
        });
      } else {
        setError('root', {
          message: 'Something went wrong. Please try again',
        });
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="uppercase text-xs font-bold" htmlFor="">
          Email Address
        </label>

        <div className="relative">
          <input
            {...register('email')}
            className="focus:outline-none focus:border focus:border-primary-container bg-surface-highest p-4 rounded-md text-[#737685] sm:rounded-xs w-full"
            placeholder="curator@workspace.com"
          />
          <Image
            className="absolute top-1/2 right-3 -translate-y-1/2 sm:hidden"
            src="/mail.png"
            alt="email icon"
            width={20}
            height={20}
          />
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="uppercase text-xs font-bold" htmlFor="">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[#003D9B] text-[11px] font-bold hover:text-[#2b76e8] transition-colors"
          >
            Forgot?
          </Link>
        </div>

        <div className="relative">
          <input
            {...register('password')}
            className="w-full focus:outline-none focus:border focus:border-primary-container  bg-surface-highest p-4 rounded-md text-[#737685] sm:rounded-xs"
            type="password"
            placeholder="Enter your password"
          />
          <Image
            className="absolute top-1/2 right-3 -translate-y-1/2 sm:hidden"
            src="/lock.png"
            alt="lock icon"
            width={20}
            height={20}
          />
        </div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          id="remember-me"
          {...register('rememberMe')}
          type="checkbox"
          placeholder="Remember Me"
          className="cursor-pointer"
        />
        <label
          htmlFor="remember-me"
          className="text-[#434654] text-sm font-medium cursor-pointer"
        >
          Remember Me
        </label>
      </div>

      {errors.root && <div className="text-red-500">{errors.root.message}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer bg-linear-to-r from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors text-white px-2 py-4 rounded-md sm:rounded-xs mb-8 disabled:opacity-50"
      >
        <span className="sm:hidden flex items-center justify-center gap-2">
          {isSubmitting ? 'Loading...' : 'Sign In'}

          <Image src="/arrow.png" height={13} width={13} alt="arrow icon" />
        </span>{' '}
        <span className="hidden sm:inline">
          {isSubmitting ? 'Loading...' : 'Log In'}
        </span>
      </button>

      <p className="text-slate-600 text-sm text-center mb-4">
        Don't have an account?{' '}
        <Link
          href="/signup"
          className="text-[#003D9B] font-semibold text-sm hover:text-[#2b76e8] transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
