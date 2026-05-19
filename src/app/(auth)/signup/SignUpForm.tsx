'use client';
import Link from 'next/link';
import { SignupSchema, type SignupFormData } from '@/validations/signup.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [apiError, setApiError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: SignupFormData) {
    try {
      const res = await fetch(
        '/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        setApiError(error.msg || 'Something went wrong. Please try again');
        return;
      }
      setIsRedirecting(true);
      router.push('/project');
    } catch (error) {
      setApiError('Network error. Please check your connection');
    }
  }

  const password = watch('password') ?? '';

  const hasMinLength = password.length >= 8;
  const hasMixedCase =
    /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="font-bold text-[10px] uppercase text-slate-600">
          Name
        </label>
        <input
          {...register('name')}
          className="bg-surface-highest text-base p-3 rounded-sm text-[#737685] border border-transparent focus:outline-none focus:border-primary-container"
          type="text"
          id="name"
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="Enter your full name"
        />
        <span className="text-slate-200 text-[10px]">
          3-50 characters, letters only.
        </span>
        {errors.name && (
          <div role="alert" id="name-error" className="text-red-500">{errors.name.message}</div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="font-bold text-[10px] uppercase text-slate-600">
          Email
        </label>
        <input
          {...register('email')}
          className="bg-surface-highest text-base p-3 rounded-sm text-[#737685] border border-transparent focus:outline-none focus:border-primary-container"
          type="text"
          id="email"
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="yourname@company.com"
        />
        {errors.email && (
          <div role="alert" id="email-error" className="text-red-500">{errors.email.message}</div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="jobTitle" className="font-bold text-[10px] uppercase text-slate-600">
          JoB Title (Optional)
        </label>
        <input
          {...register('jobTitle')}
          className="bg-surface-highest text-base p-3 rounded-sm text-[#737685] border border-transparent focus:outline-none focus:border-primary-container"
          type="text"
          id="jobTitle"
          aria-describedby={errors.jobTitle ? "job-title-error" : undefined}
          placeholder="e.g. Project Manager"
        />
        {errors.jobTitle && (
          <div role="alert" id="job-title-error" className="text-red-500">{errors.jobTitle.message}</div>
        )}
      </div>

      <div className="md:flex gap-3">
        <div className="flex flex-col space-y-2 w-full mb-2 md:mb-0">
          <label htmlFor="password" className="font-bold text-[10px] uppercase text-slate-600">
            Password
          </label>
          <input
            {...register('password')}
            className="bg-surface-highest text-base p-3 rounded-sm text-[#737685] border border-transparent focus:outline-none focus:border-primary-container"
            type="password"
            id="password"
            aria-describedby={errors.password ? "password-error" : undefined}
            placeholder="Minimum 8 characters"
          />
          {errors.password && (
            <div role="alert" id="password-error" className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label htmlFor="confirmPassword" className="font-bold text-[10px] uppercase text-slate-600">
            Cofirm Password
          </label>
          <input
            {...register('confirmPassword')}
            className="bg-surface-highest text-base p-3 rounded-sm text-[#737685] border border-transparent focus:outline-none focus:border-primary-container"
            type="password"
            id="confirmPassword"
            aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
            placeholder="Repeat your password"
          />
          {errors.confirmPassword && (
            <div role="alert" id="confirm-password-error" className="text-red-500">{errors.confirmPassword.message}</div>
          )}
        </div>
      </div>

      <div className="bg-surface-highest text-[#434654] text-xs font-sans p-4 rounded-md hidden md:block">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <span
              className={`material-symbols-outlined ${hasMinLength ? 'text-success' : 'text-[#737685]'}`}
              style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
            >
              {hasMinLength ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            At least 8 characters
          </li>

          <li className="flex items-center gap-1">
            <span
              className={`material-symbols-outlined text-xs ${hasMixedCase ? 'text-success' : 'text-[#737685]'}`}
              style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
            >
              {hasMixedCase ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            One uppercase, lowercase, and digit
          </li>

          <li className="flex items-center gap-1">
            <span
              className={`material-symbols-outlined text-xs ${hasSpecialChar ? 'text-success' : 'text-[#737685]'} `}
              style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
            >
              {hasSpecialChar ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            One special character
          </li>
        </ul>
      </div>
      {apiError && (
        <div className="text-red-600 bg-red-200 p-4">{apiError}</div>
      )}
      <button
        type="submit"
        disabled={isSubmitting || isRedirecting}
        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-semibold px-2 py-4 rounded-sm font-sans bg-radial from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors"
      >
        {isSubmitting ? 'Loading...' : isRedirecting ? 'Redirecting...' : 'Create Account'}
      </button>
      <p className="text-slate-600 text-sm text-center">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#003D9B]">
          Log in
        </Link>
      </p>
    </form>
  );
}
