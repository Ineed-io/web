import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Application } from '@/types/application';

interface StatusDialogProps {
  app: Application;
  handleUpdateStatus: (appId: number, newStatus: string) => Promise<void>;
}

export function StatusDialog({ app, handleUpdateStatus }: StatusDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* This is the clickable pill that opens the dialog */}
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className={`rounded-full px-3 py-1 text-sm ${
            app.status === 'Accepted'
              ? 'bg-[#e8faf3] text-[#00ac4f]'
              : app.status === 'Rejected'
                ? 'bg-red-100 text-red-600'
                : 'bg-yellow-100 text-yellow-600'
          } `}
        >
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </button>
      </DialogTrigger>

      {/* The popup content itself */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Choose a new status for <strong>{app.company_name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 py-4">
          <Button
            variant={app.status === 'Pending' ? 'default' : 'outline'}
            onClick={async () => {
              await handleUpdateStatus(app.id, 'Pending');
              setOpen(false); // close the dialog
            }}
            className={`rounded-full px-3 py-1 text-sm ${'bg-yellow-100 text-yellow-600'} `}
          >
            Pending
          </Button>
          <Button
            variant={app.status === 'Accepted' ? 'default' : 'outline'}
            onClick={async () => {
              await handleUpdateStatus(app.id, 'Accepted');
              setOpen(false);
            }}
            className={`rounded-full px-3 py-1 text-sm ${'bg-[#e8faf3] text-[#00ac4f]'} `}
          >
            Accepted
          </Button>
          <Button
            variant={app.status === 'Rejected' ? 'default' : 'outline'}
            onClick={async () => {
              await handleUpdateStatus(app.id, 'Rejected');
              setOpen(false);
            }}
            className={`rounded-full px-3 py-1 text-sm ${'bg-red-100 text-red-600'} `}
          >
            Rejected
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
