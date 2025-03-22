import './globals.css';
import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

// TODO: Create the not found page, a page that will be displayed
// when a user tries to access a page that doesn't exist
// Feel free to use this as inspiration: https://flowbite.com/blocks/marketing/404/

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-9xl font-extrabold tracking-tight text-primary">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground">
          The page might have been removed, had its name changed, or is temporarily unavailable.
          Head back home to keep exploring!
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
