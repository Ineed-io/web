import React from 'react';
import { ForgotPasswordForm } from '../../components/forgot-password/forgot-password';
import '../globals.css';

const ForgotPassword: React.FC = () => {
  return (
    <div className="ineed.io-login-page">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
