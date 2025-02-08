'use client';

import '../globals.css';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { signOutAction } from '../actions';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, [supabase]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Profile Page</h1>
        <p className="mb-6 text-center">Welcome {user?.email}</p>
        <Button
          onClick={signOutAction}
          className="w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
