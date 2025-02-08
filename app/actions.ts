'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password || !confirmPassword) {
    return encodedRedirect(
      'error',
      '/signup',
      'Email, password, and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', '/signup', 'Passwords do not match');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/signup', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/signup/verify',
      'Check your email for the confirmation link'
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect('error', '/login', 'Email and password are required');
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/login', error.message);
  }
  return redirect('/profile');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();
  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/settings/reset-password`,
  });
  if (error) {
    return encodedRedirect('error', '/forgot-password', error.message);
  }
  if (callbackUrl) {
    return redirect(callbackUrl);
  }
  return encodedRedirect('success', '/forgot-password', 'Check your email for the reset link');
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('cofirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/settings/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/settings/reset-password', 'Passwords do not match');
  }
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect('error', '/settings/reset-password', error.message);
  }
  encodedRedirect('success', '/settings/reset-password', 'Password updated successfully');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/');
};
