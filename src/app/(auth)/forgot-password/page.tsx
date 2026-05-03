import ForgotPasswordForm from './ForgotPasswordForm';
import { Suspense } from 'react';
export default function ForgotPassword() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}
