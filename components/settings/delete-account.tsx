'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteAccountAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubmitButton } from '../submit-button';

// TODO: Add delete account functionality, need to do research on how
// to do delete an account in supabase, and then call that function here,
// might be a little complicated due to authentication issues

//seems to be some issue console logging from the action function, however if you return the object and
//console log in this file everything seems to work

export function DeleteAccount() {
  const [isDeleting] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>Permanently remove your account and all associated data</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Warning: This action cannot be undone. Once you delete your account, all of your data will
          be permanently removed from our systems.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <SubmitButton
                variant="destructive"
                type="submit"
                onClick={deleteAccountAction}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
              </SubmitButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
