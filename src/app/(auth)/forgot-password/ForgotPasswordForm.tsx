'use client';
import {
  type ForgotPasswordFormData,
  ForgotPasswordSchema,
} from '@/validations/forgot.password.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTime, setShowTime] = useState('');
  const [enableResendButton, setEnableResendButton] = useState(false);
  const [resendTrialsLeft, setResendTrialsLeft] = useState<number>(3);
  const [userEmail, setUserEmail] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

  useEffect(() => {
    return () => stopTimer();
  }, []);

  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let time = 300;
    setEnableResendButton(false);
    intervalRef.current = setInterval(() => {
      if (time <= 0) {
        stopTimer();
        setEnableResendButton(true);
      } else {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        setShowTime(
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
        time -= 1;
      }
    }, 1000);
  }

  async function sendEmail(data: ForgotPasswordFormData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        setError('root', {
          message: error.msg || 'Something went wrong. Please try again',
        });
        return false;
      }
      reset();
      setShowSuccessMessage(true);
      startTimer();
      return true;
    } catch (error) {
      console.log(error, 'error');
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError('root', {
          message: 'Network error. Please check your connection and try again.',
        });
        return false;
      }
      setError('root', {
        message: 'Something went wrong. Please try again',
      });
      return false;
    }
  }

  async function onSubmit(data: ForgotPasswordFormData) {
    setUserEmail(data.email);
    await sendEmail(data);
  }

  async function resendEmail() {
    if (resendTrialsLeft === 0) return;
    let data = { email: userEmail };
    const success = await sendEmail(data);
    if (success) setResendTrialsLeft((prev) => prev - 1);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 font-sans rounded-md mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      >
        {urlError && (
          <div className="text-red-500 bg-red-600/10 p-3 mb-3 rounded-sm">
            {urlError}
          </div>
        )}
        <div className="bg-surface-highest w-[48px] mx-auto h-[48px] rounded-lg flex items-center mb-6">
          <Image
            className="mx-auto "
            src="/lock-reset.png"
            alt="lock rest icon"
            width={20}
            height={20}
          />
        </div>
        <h3 className="font-semibold text-2xl text-center text-slate-900 mb-2">
          Forgot password?
        </h3>
        <p className="text-[#434654] text-sm text-center w-64 mx-auto mb-8">
          No worries, we'll send you reset instructions.
        </p>

        <div className="flex flex-col gap-2">
          <label
            className="uppercase font-bold text-xs text-[#434654]"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="bg-surface-highest px-4 py-3 rounded-xs text-[#737685] mb-4 focus:outline-none focus:border focus:border-primary-container"
            {...register('email')}
            id="email"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <div className="text-red-500 px-2 py-3 mb-2 text-center bg-red-600/10 p-3 mb-3 rounded-sm">
            {errors.email?.message}
          </div>
        )}
        {errors.root && (
          <div className="text-red-500 bg-red-600/10 p-3 mb-3 rounded-sm">
            {errors.root?.message}
          </div>
        )}
        <button
          disabled={isSubmitting}
          className="text-white bg-linear-to-r from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors py-3 w-full font-semibold text-sm cursor-pointer mb-10 disabled:opacity-50"
          type="submit"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>

        <Link
          className="cursor-pointer flex items-center justify-center text-center text-[#003D9B] hover:text-[#2b76e8] transition-colors mx-auto text-sm font-medium gap-2"
          href="/login"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to log in
        </Link>
      </form>

      {showSuccessMessage && (
        <>
          <div className="flex flex-col w-[342px]  bg-[#82F9BE]/30 text-[#005235] backdrop-blur-md rounded-sm p-4 border border-[#0052351A] font-sans mb-10 md:hidden">
            <div className="flex gap-3 mb-3">
              <span
                className="material-symbols-outlined items-center"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <p className="text-[#005235] font-sans text-xs">
                If an account exists with this email, we've sent a password
                reset link.
              </p>
            </div>

            <hr className="text-[#0052351A] mb-3" />

            <div className="flex items-center justify-between">
              <p className="uppercase font-bold text-[11px] text-[#00523599]">
                Didn't receive email?
              </p>
              <button
                disabled={!enableResendButton || resendTrialsLeft === 0}
                onClick={() => resendEmail()}
                className="text-[#003D9B] uppercase text-[11px] tracking-[1.1px] font-bold cursor-pointer disabled:cursor-not-allowed"
              >
                {enableResendButton ? 'Resend' : `Resend in ${showTime}`}
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-col w-[342px]  bg-[#82F9BE]/30 text-[#005235] backdrop-blur-md rounded-sm p-2 border border-[#0052351A] font-sans mb-6">
            <div className="flex gap-3">
              <span
                className="material-symbols-outlined items-center"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <p className="text-[#005235] font-sans text-xs">
                If an account exists with this email, we've sent a password
                reset link.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="uppercase text-[11px] font-bold leading-[16.5px] tracking-[0.55px] uppercase text-[#434654] mb-3">
              Didn't receive the email?
            </p>
            <button
              disabled={!enableResendButton || resendTrialsLeft === 0}
              onClick={() => resendEmail()}
              className="bg-[#F1F3FF] w-full flex items-center justify-center gap-1 rounded-sm text-[16px] font-semibold leading-[24px] text-[#737685] w-[366px] h-[48px] mb-10 cursor-pointer disabled:cursor-not-allowed"
            >
              {enableResendButton ? (
                'Resend'
              ) : (
                <>
                  <span
                    className="material-symbols-outlined text-[#737685]"
                    style={{ fontSize: '16px' }}
                  >
                    timer
                  </span>{' '}
                  <span>Resend in {showTime}</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
}
