import React from 'react';
import { createClient } from '@/utils/supabase/server';

const HeaderAuth: React.FC = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (
    <div className="ineed.io-header-auth">Welcome, {user.email}</div>
  ) : (
    <div className="ineed.io-header-auth">Sign in</div>
  );
};

export default HeaderAuth;
