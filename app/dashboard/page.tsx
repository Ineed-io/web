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

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div className="ineed.io-dashboard.page min-h-screen bg-background p-6">
      <DashboardHeader user={user} />
      <div className="">
        <DashboardMetrics />
        <NewApplicationForm />
        <ApplicationsTable />
      </div>
    </div>
  );
};

export default DashboardPage;
