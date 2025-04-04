import { FormEvent, useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { TimePickerDemo } from './time-picker';
import { createClient } from '@/utils/supabase/client';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';
import { Separator } from '../ui/separator';

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function NewApplicationForm() {
  const [reminder, setReminder] = useState(false);
  const [date, setDate] = useState<Date>();
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const [error, setError] = useState('');

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

  const handleAddApplication = async (event: FormEvent) => {
    setError('');

    if (
      !companyName.trim() ||
      !role.trim() ||
      !link.trim() ||
      !location.trim()
    ) {
      event.preventDefault();
      setError('Please fill out all fields with valid, non-empty values.');
      return;
    }

    if (user) {
      const supabase = await createClient();
      const { error } = await supabase.from('internships').insert({
        user_id: user.id,
        company_name: companyName.trim(),
        role: role.trim(),
        status: 'Pending',
        link: link.trim(),
        location: location.trim(),
        reminder: date,
      });
      if (error) {
        console.log(error);
        setError('An error occurred while adding the application. Please try again.');
      } else {
        setCompanyName('');
        setRole('');
        setLink('');
        setLocation('');
        setReminder(false);
        setDate(undefined);
      }
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-6 shadow-md shadow-primary">
      <h2 className="text-xl font-semibold md:text-3xl">Add New Application</h2>
      <Separator className="bg-primary" />

      {/* Conditionally show error alert if error state is set */}
      {error && (
        <Alert variant="destructive" className="bg-red-300 text-red-900">
          <AlertTitle>Submission Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleAddApplication}>

        <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:w-[48%]">
            <Label htmlFor="company" className="text-md">
              Company Name
            </Label>
            <Separator className="w-[50%] bg-primary" />
            <Input
              id="company"
              placeholder="Enter company name"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 md:w-[48%]">
            <Label htmlFor="role" className="text-md">
              Role
            </Label>
            <Separator className="w-[50%] bg-primary" />
            <Input
              id="role"
              placeholder="Enter role/position"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 md:w-[48%]">
            <Label htmlFor="link" className="text-md">
              Link
            </Label>
            <Separator className="w-[50%] bg-primary" />
            <Input
              id="link"
              placeholder="Enter link"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 md:w-[48%]">
            <Label htmlFor="location" className="text-md">
              Location
            </Label>
            <Separator className="w-[50%] bg-primary" />
            <Input
              id="location"
              placeholder="Enter location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="reminder" checked={reminder} onCheckedChange={setReminder} />
          <Label htmlFor="reminder">Set Reminder</Label>
        </div>
        {reminder && (
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-2 md:w-[48%]">
              <Label className="text-md">Date</Label>
              <Separator className="w-[50%] bg-primary" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2 md:w-[48%]">
              <Label className="text-md">Time</Label>
              <Separator className="w-[50%] bg-primary" />
              <TimePickerDemo />
            </div>
          </div>
        )}
        <Separator className="bg-primary" />
        <div className="flex items-center justify-center">
          <Button onClick={handleAddApplication} className="w-56">
            Add Application
          </Button>
        </div>
      </form>
    </Card>
  );
}
