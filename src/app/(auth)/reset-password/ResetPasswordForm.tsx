'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ResetPasswordSchema,
  ResetPasswordFormData,
} from '@/validations/reset.password';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  const password = watch('password') ?? '';
  const isBetweenMinAndMaxChars = password.length >= 8 && password.length <= 64;
  const hasLowerAndUpperCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasOneDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const hasLowerCaseLetter = /^(?=.*[a-z]).+$/.test(password);
  const hasUppercaseLetter = /(?=.*[A-Z])/.test(password);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('access_token');

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      const res = await fetch(
        '/api/auth/reset-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: data.password ,token: token}),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        setError('root', {
          message: error.message || error.msg || 'Something went wrong',
        });
        return;
      }

      setShowSuccessMessage(true);

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setError('root', {
        message: 'Something went wrong. Please try again',
      });
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  function handlePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="font-sans relative md:w-[512px] md:bg-white mb-8">
      {showSuccessMessage && (
        <div className=" bg-[#82F9BE]/30 text-[#005235] backdrop-blur-md rounded-sm p-4 border border-[#0052351A] font-sans mb-10 absolute top-1/4 z-2">
          Your password has been updated successfully. You can now log in
        </div>
      )}
      <h1 className="font-semibold text-2xl text-slate-900 sm:hidden text-center mb-2 mt-6">
        Create a New Password
      </h1>
      <p className="text-sm text-[#434654] sm:hidden text-center max-w-[304px] mx-auto mb-8">
        Create a new, strong password to secure your workstation access.
      </p>

      <div className="bg-white p-8 flex flex-col mx-auto shadow-soft-xl rounded-md border border-[#C3C6D64D] pb-9">
        <h3 className="font-semibold text-2xl text-slate-900 hidden sm:block mb-[21px]">
          Create a New Password
        </h3>
        <p className="text-sm text-[#434654] hidden sm:block mb-[36px]">
          Create a new, strong password to secure your workstation access.
        </p>
        <label
          htmlFor="password"
          className="uppercase font-bold text-[11px] text-slate-600 mb-2 tracking-[0.55px]"
        >
          New Password
        </label>
        <div className="relative mb-4">
          <input
            {...register('password')}
            id="password"
            aria-describedby={errors.password ? "password-error" : undefined}
            className="bg-surface-low px-4 py-3 rounded-xs text-[#737685] w-full focus:outline-none border border-transparent focus:border-primary-container"
            type={showPassword ? 'text' : 'password'}
          />
          <button
            onClick={handlePasswordVisibility}
            type="button"
            className="material-symbols-outlined cursor-pointer absolute top-1/2 right-1 -translate-1/2 text-[#434654] hover:text-[#003D9B] transition-colors"
            style={{ fontSize: '20px' }}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </button>
        </div>
        {errors.password && <div role="alert" id="password-error" className='text-red-500 text-sm mb-2'>{errors.password.message}</div>}

        <label
          htmlFor="confirmPassword"
          className="uppercase font-bold text-[11px] text-slate-600 mb-2 tracking-[0.55px]"
        >
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined }
          className="bg-surface-low px-4 py-3 rounded-xs text-[#737685] focus:outline-none border border-transparent focus:border-primary-container"
          id="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && <div role="alert" id="confirmPassword-error" className='text-red-500 text-sm mt-'>{errors.confirmPassword.message}</div>}

        <div className="bg-surface-low w-[276px] rounded-sm my-6 p-5 md:w-full border border-[#C3C6D61A]">
          <h2 className="uppercase text-slate-600 text-[11px] font-bold tracking-[0.55px] mb-4">
            Security Requirements
          </h2>
          <ul className="md:grid grid-cols-2 md:w-[372px] md:h-[82px]">
            <li className="flex items-center gap-[6px] text-slate-900 text-[13px] mb-2">
              <span
                className="material-symbols-outlined"
                style={{
                  color: '#004E32',
                  fontSize: '17px',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {isBetweenMinAndMaxChars
                  ? 'check_circle'
                  : 'radio_button_unchecked'}
              </span>
              <span
                className={`${isBetweenMinAndMaxChars ? '' : 'opacity-50'}`}
              >
                8 - 64 characters
              </span>
            </li>

            <li className="flex items-center gap-[6px] text-slate-900 text-[13px] mb-2 md:hidden">
              <span
                className="material-symbols-outlined"
                style={{
                  color: '#004E32',
                  fontSize: '17px',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {hasLowerAndUpperCase
                  ? 'check_circle'
                  : 'radio_button_unchecked'}
              </span>
              <span className={`${hasLowerAndUpperCase ? '' : 'opacity-50'}`}>
                Uppercase & Lowercase
              </span>
            </li>

            <li className="md:flex items-center gap-[6px] text-slate-900 text-[13px] mb-2 hidden">
              <span
                className="material-symbols-outlined"
                style={{
                  color: '#004E32',
                  fontSize: '17px',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {hasUppercaseLetter
                  ? 'check_circle'
                  : 'radio_button_unchecked'}
              </span>
              <span className={`${hasUppercaseLetter ? '' : 'opacity-50'}`}>
                Uppercase letter
              </span>
            </li>
            
            <li className="hidden md:flex items-center gap-[6px] text-slate-900 text-[13px] mb-2">
              <span
                className="material-symbols-outlined"
                style={{
                  color: '#004E32',
                  fontSize: '17px',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {hasLowerCaseLetter
                  ? 'check_circle'
                  : 'radio_button_unchecked'}
              </span>
              <span className={`${hasLowerCaseLetter ? '' : 'opacity-50'}`}>
                Lowercase letter
              </span>
            </li>

            <li className="flex items-center gap-[6px] text-slate-900 text-[13px] mb-2">
              <span
                className="material-symbols-outlined"
                style={{
                  color: '#004E32',
                  fontSize: '17px',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {hasOneDigit ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className={`${hasOneDigit ? '' : 'opacity-50'} md:hidden`}>
                At least one digit
              </span>

              <span className={`${hasOneDigit ? '' : 'opacity-50'} hidden md:block`}>
                One digit
              </span>
            </li>

            <li className="flex items-center gap-[6px] text-slate-900 text-[13px] mb-2">
              <span
                className="material-symbols-outlined"
                style={{
                  color: '#004E32',
                  fontSize: '17px',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {hasSpecialChar ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className={`${hasSpecialChar ? '' : 'opacity-50'}`}>
                Special character <span className='md:hidden'>(e.g. !@#$)</span>
              </span>
            </li>
          </ul>
        </div>

        <button
          disabled={isSubmitting}
          className="mb-6 cursor-pointer bg-linear-to-r from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors text-white px-2 py-4 rounded-xs disabled:opacity-50"
          type="submit"
        >
          {isSubmitting ? 'Loading...' : 'Update Password'}
        </button>

        {errors.root && <div role='alert'>{errors.root.message}</div>}

        <Link
          className="text-[#003D9B] text-center text-sm font-medium cursor-pointer hover:text-[#2b76e8] transition-colors"
          href="/login"
        >
          Back to Log In
        </Link>
      </div>
    </form>
  );
}
