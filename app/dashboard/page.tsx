'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardMetrics } from '@/components/dashboard/metrics';
import { ApplicationsTable } from '@/components/dashboard/applications-table';
import { NewApplicationForm } from '@/components/dashboard/new-application-form';
// import { TimePickerDemo } from '@/components/dashboard/time-picker';
import '../globals.css';
import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';
import { Application } from '@/types/application';

const DashboardPage: React.FC = () => {
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

  return (
    <div className="ineed.io-dashboard.page min-h-screen bg-background p-6">
      <DashboardHeader user={user} />
      <div className="">
        <DashboardMetrics applications={applications} />
        <NewApplicationForm />
        <ApplicationsTable applications={applications} setApplications={setApplications} />
      </div>
    </div>
  );
};

export default DashboardPage;
