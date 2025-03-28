'use client';

import { useEffect, useState } from 'react';
import { X, Search, Download } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Application } from '@/types/application';
//import { createClient } from '@/utils/supabase/client';
//import { mkConfig, generateCsv, asString } from 'export-to-csv';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { createClient } from '@/utils/supabase/client';
import { } from 'export-to-csv';
import { mkConfig, generateCsv, asString } from 'export-to-csv'; // Updated imports
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'; //believe this should be next/navigation not next/router
import { StatusDialog } from './statusdialog';
import { Separator } from '../ui/separator';

dayjs.extend(advancedFormat);

export function ApplicationsTable({
  applications,
  setApplications,
  refreshApplications,
}: {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  refreshApplications: () => Promise<void>;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredApplications = applications.filter((app) =>
    app.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [checkedApplications, setCheckedApplications] = useState<Application[]>([]);

  const handleDelete = async (id: string) => {
    const supabase = await createClient();
    const { error } = await supabase.from('internships').delete().eq('id', id);
    if (error) {
      console.error('Error deleting application:', error.message);
      return;
    }
    setApplications(applications.filter((app) => `${app.id}` !== id));
  };

  const handleDeleteMultiple = async (apps: Application[]) => {
    const supabase = await createClient();

    const app_ids = apps.map((app) => app.id);

    const { error } = await supabase.from('internships').delete().eq('user_id', apps[0].user_id).in('id', app_ids);

    if (error) {
      console.error('Error deleting application:', error.message);
      return;
    }

    setApplications(applications.filter((app) => !app_ids.includes(app.id)));

    setCheckedApplications([]);

    const select_all = document.querySelector(
      'input[type="checkbox"][name="select-all"]'
    );
    (select_all as HTMLInputElement).checked = false;
  }

  const exportToCsv = () => {
    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: `applications_${new Date().toISOString().split('T')[0]}`,
    });

    const data = applications.map((app) => ({
      company: app.company_name,
      position: app.company_name,
      appliedDate: dayjs(app.created_at).format('MMMM Do YYYY h:mm A'),
      location: app.location,
      link: app.link,
      role: app.role,
      status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
    }));

    const csvOutput = generateCsv(csvConfig)(data);
    const csvString = asString(csvOutput);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${csvConfig.filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    filteredApplications.forEach((app) => {
      const checkbox = document.querySelector(`input[type="checkbox"][name="${app.id}"]`);
      if (checkbox?.ariaChecked) {
        setCheckedApplications((prev) => [...prev, app]);
      }
    });

    if (checkedApplications.length === applications.length && checkedApplications.length > 0) {
      const select_all = document.querySelector(
        'input[type="checkbox"][name="select-all"]'
      );
      (select_all as HTMLInputElement).checked = true;
    }
  }, [filteredApplications]);

  //TODO: Add functionality such that users can update the status of an internship!
  //Check out https://ui.shadcn.com/docs/components/dialog for the popup
  //(i.e, they can click on the status, and it should bring a popup where they can change the status.)
  /*
  Recommended steps:
  1. console.log() the status each time you change it, and see if its actually changing
  2. query the database (remember to only update the internship that they are changing the status of, use the unique id)
  3. verify changes are being made
  */
  async function updateStatusInSupabase(id: number, newStatus: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('internships')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error.message);
      return null;
    }
    return data;
  }

  const handleUpdateStatus = async (appId: number, newStatus: string) => {
    console.log('About to update status:', newStatus);
    const result = await updateStatusInSupabase(appId, newStatus);
    if (result) {
      // Update local state so the UI changes immediately
      setApplications((prevApps) =>
        prevApps.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      await refreshApplications();
      router.refresh();
    }
  };

  // TODO
  // Create button to import csv file with application data
  // Probably show user a standard format to import csv as
  // Read the file and populate database with data

  return (
    <Card className="flex flex-col gap-6 p-6 shadow-md shadow-primary">
      {/* Search and Export UI */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <h2 className="text-xl font-semibold md:text-3xl">Recent Applications</h2>
        <div className="flex flex-col gap-4 md:ml-auto md:flex-row md:items-center">
          <Button onClick={exportToCsv} variant="default">
            Export to CSV
            <Download />
          </Button>
          <Input
            placeholder="Search..."
            className="w-[300px] border-[#374151] pl-10 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator className="bg-primary" />

      <Table id="applications-table">
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Application Link</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <input
                  type="checkbox"
                  name={app.id.toString()}
                  onChange={(e) => {
                    if (e.target.checked) {
                      console.log(`Checked internship id: ${app.id}`);
                      setCheckedApplications((prev) => [...prev, app]);
                    }

                    else {
                      console.log(`Unchecked internship id: ${app.id}`);
                      const index = checkedApplications.indexOf(
                        applications.find((application) => application.id === app.id)!
                      );

                      if (index > -1) {
                        setCheckedApplications((prev) => {
                          const newChecked = [...prev];
                          newChecked.splice(index, 1);
                          return newChecked;
                        });
                      }


                      const select_all = document.querySelector(
                        'input[type="checkbox"][name="select-all"]'
                      );
                      (select_all as HTMLInputElement).checked = false;
                    }
                  }
                  }
                />
              </TableCell>
              <TableCell className="font-medium">{app.company_name}</TableCell>
              <TableCell>{app.company_name}</TableCell>
              <TableCell>{dayjs(app.created_at).format('MMMM Do YYYY h:mm A')}</TableCell>
              <TableCell>{app.location}</TableCell>
              <TableCell>
                <a href={app.link}>{app.link}</a>
              </TableCell>
              <TableCell>{app.role}</TableCell>
              <TableCell>
                <StatusDialog app={app} handleUpdateStatus={handleUpdateStatus} />
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Application</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the application for {app.company_name}? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(`${app.id}`)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                name="select-all"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheckedApplications(filteredApplications);
                  } else {
                    setCheckedApplications([]);
                  }

                  const all_checkboxes = document.querySelectorAll('input[type="checkbox"]');
                  all_checkboxes.forEach((checkbox) => {
                    (checkbox as HTMLInputElement).checked = e.target.checked;
                  });
                  console.log(`${e.target.checked ? 'C' : 'Unc'}hecked all internships`);
                }}
              />
            </TableCell>
            <TableCell colSpan={8}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={checkedApplications.length == 0 || applications.length == 0}
                  >
                    Delete Selected
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Application</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the following applications:
                      <ScrollArea className="h-96 w-full rounded-md border p-4">
                      <ul>
                        {checkedApplications.map((app) => (
                          <li key={app.id}>{app.company_name}</li>
                        ))}
                        </ul>
                      </ScrollArea>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteMultiple(checkedApplications)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
