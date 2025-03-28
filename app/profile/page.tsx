'use client';

import { DashboardHeader as ProfileHeader } from '@/components/dashboard/header';
import { DashboardMetrics as ProfileMetrics } from '@/components/dashboard/metrics';
import { Badges } from '@/components/dashboard/badges';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import '../globals.css';
import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect } from 'react';
import { UserMetadata, User } from '@/types/user';
import { Application } from '@/types/application';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';

const fadeInVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

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

  useEffect(() => {
    if (!user) return;
    const fetchAvatar = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar, firstName')
        .eq('id', user.id)
        .single();
      if (error) {
        console.error('Error fetching avatar:', error);
      } else {
        setAvatarImage(data?.avatar || null);
        if (data?.firstName) {
          setFirstName(data.firstName);
          setUser((prevUser) => {
            if (!prevUser) return null;
            const updatedMetadata: UserMetadata = {
              first_name: data.firstName,
              last_name: prevUser.user_metadata?.last_name || '',
              timestamp: prevUser.user_metadata?.timestamp || new Date().toISOString(),
            };
            return { ...prevUser, user_metadata: updatedMetadata };
          });
        }
      }
    };
    fetchAvatar();
  }, [user]);

  /*
  TODO #12: If a user has a bio in their profiles table, display it under their avatar

  //need new useEffect for the bio
  //we have to make a bio component to display the bio
  */

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="ineed.io-profile.page min-h-screen p-6">
        <div className="flex flex-col items-center">
          <ProfileHeader user={user} />
          <div className="mb-1"></div>
          <div className="group relative">
            <Avatar className="h-60 w-60 shadow-md shadow-primary mb-8">

              <AvatarImage src={avatarImage || ''} />
              <AvatarFallback>{firstName ? firstName.charAt(0) : 'U'}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="shadow-lg shadow-900/10">
          <div>
            <ProfileMetrics applications={applications}/>
            <div className = "mb-8"> </div>
            <Badges/>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
