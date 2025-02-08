'use client';

import '../../app/globals.css';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/login/card';
import { Input } from '@/components/login/input';
import { Label } from '@/components/login/label';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SubmitButton } from '../submit-button';
import { signInAction } from '@/app/actions';

export const LoginForm: React.FC = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form method="post" action="/api/auth/signin">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                  <Link
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <SubmitButton
                pendingText="Signing In..."
                formAction={signInAction}
                className="w-full"
              >
                Login
              </SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              ></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
