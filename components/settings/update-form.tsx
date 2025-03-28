'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
// import { User } from '@/types/user';
import { Profile } from '@/types/profile';
//import { SupabaseClient } from '@supabase/supabase-js';

interface ProfileFormProps extends React.ComponentPropsWithoutRef<'div'> {
  initialProfile?: {
    avatar: string;
    username: string;
    firstName: string;
    lastName: string;
    age: string;
    college: string;
    gradYear: string;
    major: string;
    bio: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  className,
  initialProfile,
  ...props
}) => {
  const [profile, setProfile] = useState(
    initialProfile || {
      avatar: '',
      username: '',
      firstName: '',
      lastName: '',
      age: '',
      college: '',
      gradYear: '',
      major: '',
      bio: '',
      linkedin: '',
      github: '',
      portfolio: '',
    }
  );

  const [isDirty, setIsDirty] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [user, setUser] = useState<Profile | null>(null);
  //const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  // fetch user info from SupaBase client on initial render
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
    }

    const dbUser = await supabase.from('profiles').select('*').eq('id', data.user?.id);
    setUser(dbUser.data?.at(0));
  };

  useEffect(() => {
    const isChanged = Object.keys(profile).some(
      (key) =>
        profile[key as keyof typeof profile] !== initialProfile?.[key as keyof typeof profile]
    );
    setIsDirty(isChanged);

    const isEmpty = Object.values(profile).every((value) => value === '');
    setIsFormEmpty(isEmpty);
  }, [profile, initialProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const supabase = createClient();

    // need to "upsert" data (allows you to insert a new row if it does not exist, or update it if it does.)
    const profileFields = Object.keys(profile);
    if (user) {
      for (let i = 0; i < profileFields.length; i++) {
        const key = profileFields[i] as keyof typeof profile;
        if (profile[key] === '') {
          continue;
        }

        const { error } = await supabase
          .from('profiles')
          .upsert({ id: user.id, [key]: profile[key] });

        if (error) {
          console.error(error);
        }
      }
    }
  };

  /* 
  TODO #9: Add the following links and columns in the database:
  1. LinkedIn
  2. GitHub
  3. Portfolio
  Should be able to update this as well (store this information in the profiles table)
  */

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Update Profile</CardTitle>
        <CardDescription>Update your profile information below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                name="avatar"
                value={profile.avatar}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                placeholder="johndoe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={profile.age}
                onChange={handleInputChange}
                placeholder="25"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                name="college"
                value={profile.college}
                onChange={handleInputChange}
                placeholder="University of Example"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gradYear">Graduation Year</Label>
              <Input
                id="gradYear"
                name="gradYear"
                type="number"
                value={profile.gradYear}
                onChange={handleInputChange}
                placeholder="2025"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                name="major"
                value={profile.major}
                onChange={handleInputChange}
                placeholder="Computer Science"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Biography</Label>
              <Input
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Hello, I'm John Doe!"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={profile.github}
                onChange={handleInputChange}
                placeholder="https://github.com/yourusername"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input
                  id="portfolio"
                  name="portfolio"
                  value={profile.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://your-portfolio.com"
                  />
                </div>
            <Button type="submit" className="w-full" disabled={!isDirty || isFormEmpty}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
