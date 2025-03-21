'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { Profile } from '@/types/profile';

// FormField component for consistent styling
const FormField = ({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid gap-2 rounded-md border border-input/10 p-2 transition-colors hover:border-input/30">
      <Label htmlFor={id} className="font-medium">
        {label}
      </Label>
      {children}
    </div>
  );
};

// Simplified college search component using existing components
const CollegeSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [colleges, setColleges] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);

  // Fetch colleges when the component mounts
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        // For now, we'll use mock data
        const mockColleges = [
          'Harvard University',
          'Stanford University',
          'Massachusetts Institute of Technology',
          'Yale University',
          'Princeton University',
          'University of California, Berkeley',
          'Columbia University',
          'University of Chicago',
          'University of Pennsylvania',
          'Cornell University',
          'California Institute of Technology',
          'Duke University',
          'University of Michigan',
          'Northwestern University',
          'Johns Hopkins University',
          'University of California, Los Angeles',
          'New York University',
          'University of Washington',
          'University of Texas at Austin',
          'University of Wisconsin-Madison',
        ];

        setColleges(mockColleges);
        setFilteredColleges(mockColleges);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Filter colleges based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = colleges.filter((college) =>
        college.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges(colleges);
    }
  }, [searchTerm, colleges]);

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search for a college..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
      />

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a college" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {filteredColleges.length === 0 ? (
              <div className="p-2 text-center text-muted-foreground">No colleges found</div>
            ) : (
              filteredColleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

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
    }
  );

  const [isDirty, setIsDirty] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [user, setUser] = useState<Profile | null>(null);

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

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 16 }, (_, i) => (currentYear - 5 + i).toString());
  const ageOptions = Array.from({ length: 83 }, (_, i) => (i + 0).toString());

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Update Profile</CardTitle>
        <CardDescription>Update your profile information below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField label="Avatar URL" id="avatar">
              <Input
                id="avatar"
                name="avatar"
                value={profile.avatar}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </FormField>

            <FormField label="Username" id="username">
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                placeholder="johndoe"
              />
            </FormField>

            <FormField label="First Name" id="firstName">
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
            </FormField>

            <FormField label="Last Name" id="lastName">
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
            </FormField>

            <FormField label="Age" id="age">
              <Select
                value={profile.age}
                onValueChange={(value) => handleSelectChange('age', value)}
              >
                <SelectTrigger id="age">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            {/* Use the simplified CollegeSearch component */}
            <FormField label="College" id="college">
              <CollegeSearch
                value={profile.college}
                onChange={(value) => handleSelectChange('college', value)}
              />
            </FormField>

            <FormField label="Graduation Year" id="gradYear">
              <Select
                value={profile.gradYear}
                onValueChange={(value) => handleSelectChange('gradYear', value)}
              >
                <SelectTrigger id="gradYear">
                  <SelectValue placeholder="Select graduation year" />
                </SelectTrigger>
                <SelectContent>
                  {graduationYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Major" id="major">
              <Input
                id="major"
                name="major"
                value={profile.major}
                onChange={handleInputChange}
                placeholder="Computer Science"
              />
            </FormField>

            <FormField label="Biography" id="bio">
              <Input
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Hello, I'm John Doe!"
              />
            </FormField>

            <Button type="submit" className="mt-2 w-full" disabled={!isDirty || isFormEmpty}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
