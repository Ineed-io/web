'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return encodedRedirect(
      'error',
      '/signup',
      'Email, password, and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', '/signup/error', 'Passwords do not match');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
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
    return encodedRedirect('error', '/login/error', error.message);
  }
  return redirect('/dashboard');
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

  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  if (!password || !confirmPassword) {
    return encodedRedirect(
      'error',
      '/settings/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', '/settings/account', 'Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect('error', '/settings/account', error.message);
  }

  return encodedRedirect('success', '/settings/account', 'Password updated successfully');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/');
};

export const deleteAccountAction = async () => {
  const supabase = await createClient('deleteAccount');
  await supabase.rpc('delete_user');
  await supabase.auth.signOut();
  return redirect('/');
};
