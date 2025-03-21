'use client';

import React, { useEffect } from 'react';
import { useParams, redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import '../../globals.css';

// DO NOT WORK ON THIS YET!!! --- Need to update database columns

/* 
TODO (Large TODO): This is going to be the profile page to view other users.
Essentially, a user can go to like /profile/123 (for now, we will refer to users by their unique id, later usernames)
The "123" portion is going to be a users UNIQUE ID. Essentially, this is what's going to happen
1. Grab the 123 out of the url (look into dynamic routing, one of the key features of next.js: https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)
2. IF THE ID == CURRENTLY LOGGED IN USER.ID, REDIRECT TO /profile (shouldn't be able to view their own profile from a 3rd person view if that makes sense)
3. ELSE, Query the database to grab the user's information (similar to the profile page, without the profile header though)
4. When querying, remember that the "123" is the id, so only get the user with that "123" id
5. IF USER DOESN"T EXIST (error), then SAY USER WASN'T FOUND (don't worry about styliing for now, just functionality)
6. ELSE, display all their stats, like the app/profile/page.tsx, except WITHOUT THE PROFILE HEADER COMPONENT (which would say something like "Hello John")

*/

const UserProfilePage: React.FC = () => {
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchData = async () => {
      const client = createClient();
      const user = await client.auth.getUser();
      if (user.data.user?.id === id) {
        redirect('/profile');
      }
    };
  }, []);
  return (
    <div className="ineed.io-profile.page min-h-screen bg-background p-6">
      User profile page (to be implemented)
    </div>
  );
};

export default UserProfilePage;
