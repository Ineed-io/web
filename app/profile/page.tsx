'use client';

import { DashboardHeader as ProfileHeader } from '@/components/dashboard/header';
import { ProfileMetrics } from '@/components/profile/metrics';
/* import { SubmissionsCalendar } from '@/components/dashboard/submissions-calendar';
import { ActivityChart } from '@/components/dashboard/activity-chart'; */
// import { TimePickerDemo } from '@/components/dashboard/time-picker';
import '../globals.css';
import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';
import { Badges } from '@/components/dashboard/badges';
import { Application } from '@/types/application';


const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchUser = async () => {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          redirect('/');
        }
        setUser(data.user as User);
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const client = createClient();
      const user = await client.auth.getUser();

      const { data, error } = await client
        .from('internships')
        .select('*')
        .eq('user_id', user.data.user?.id);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setApplications(data);
      }
    };

    fetchData();
  }, []);

  //TODO #1:Add an avatar that will be displayed under the dashboard header (get the avatar_url from the profiles table)

  /*TODO #2: Add the following stats: Total applications, 
  success rate, pending / total, success / total, rejected / total.
  USE THE EXPLORE PAGE CARDS (they are pre-styled already) to display stats
  REPLACE THE DASHBOARD METRICS WITH A NEW COMPONENT CALLED: ProfileMetrics, and create that in the components/profile folder
  Copy paste the cards from the app/explore/page.tsx page, and fetch and calculate all the statistics from the database 
  */ 



 
  return (
    <div className="ineed.io-profile.page min-h-screen bg-background p-6">
      {/* FIXME: There is a bug here, when the user changes their first name, it still uses the
      first name they signed up with (but this works in the dashboard page, fix this.)
      */}
      <ProfileHeader user={user} />
      <div className="">
        <ProfileMetrics applications={applications} />
        {/* <ActivityChart />
        <SubmissionsCalendar /> */}
        <Badges />
      </div>
    </div>
  );
};

export default ProfilePage;
