import React from 'react';
import { SignupForm } from '@/components/signup/signup-form';
import '../../globals.css';
import SmtpMessage from '@/app/(auth-pages)/smtp-message';

const Verify: React.FC = () => {
  return (
    <div className="ineed.io-signup-page">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
          <SmtpMessage />
        </div>
      </div>
    </div>
  );
};

export default Verify;
