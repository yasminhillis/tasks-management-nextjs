import React from 'react';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <div className="md:w-xl bg-white mx-auto rounded-lg px-8 py-5 mb-8 shadow-soft-xl">
      <h2 className="text-center font-semibold text-2xl text-slate-900 mb-2">
        Create your workspace
      </h2>
      <p className="text-center font-normal text-sm text-slate-600 mb-10">
        Join the editorial approach to task management.
      </p>
      <SignUpForm />
    </div>
  );
}
