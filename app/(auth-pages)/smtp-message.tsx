import { InfoIcon } from 'lucide-react';
import React from 'react';

const SmtpMessage: React.FC = () => {
  return (
    <div className="flex gap-4 rounded-md border bg-muted/50 px-5 py-3">
      <InfoIcon size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-secondary-foreground">
          <strong> Confirm:</strong> Please check your email to confirm your account.
        </small>
      </div>
    </div>
  );
};

export default SmtpMessage;
