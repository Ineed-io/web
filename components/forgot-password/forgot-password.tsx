'use client';

import '../../app/globals.css';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/login/card';
import { Input } from '@/components/login/input';
import { Label } from '@/components/login/label';

export const ForgotPasswordForm: React.FC = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email below to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Remembered your password?{' '}
              <Link
                href="/login"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
