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
import { useRouter } from 'next/navigation';

interface ProfileData {
  username: string;
  firstName: string;
}

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [profileUser, setProfileUser] = useState<ProfileData | null>(null);
  const router = useRouter();

  const refreshApps = async () => {
    router.refresh();
  };

  const fetchInternships = async () => {
    const client = createClient();
    const authUser = await client.auth.getUser();
    const { data, error } = await client
      .from('internships')
      .select('*')
      .eq('user_id', authUser.data.user?.id);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setApplications(data);
    }
  };

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
    fetchInternships();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const client = createClient();
      const { data, error } = await client
        .from('profiles')
        .select('username, firstName')
        .eq('id', user.id);
      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data && data.length > 0) {
        setProfileUser({
          username: data[0].username,
          firstName: data[0].firstName,
        });
      }
    };
    fetchProfile();
  }, [user]);
  return (
    <div className="ineed.io-dashboard.page min-h-screen bg-background p-6">
      <DashboardHeader user={user} profile={profileUser || undefined} />
      <div className="">
        <DashboardMetrics applications={applications} />
        <NewApplicationForm />
        <ApplicationsTable
          applications={applications}
          setApplications={setApplications}
          refreshApplications={refreshApps}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
