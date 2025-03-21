import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import SocialTray from './SocialTray';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-4 px-4 sm:px-12">
      <div className="flex items-center gap-4">
        <Link href="/" className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Ineed.io
          </span>
        </Link>
        <Separator orientation="vertical" className="h-12 bg-primary" />
        <SocialTray />
      </div>
      <Separator />
      <ul className="flex items-center gap-8">
        <li>
          <Link href="/" className="me-4 hover:underline md:me-6">
            Home
          </Link>
        </li>
        <li>
          <Link href="/team" className="me-4 hover:underline md:me-6">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/faq" className="me-4 hover:underline md:me-6">
            FAQ
          </Link>
        </li>
      </ul>
      <span className="pb-4 text-sm text-gray-500 dark:text-gray-400">
        © {year}{' '}
        <Link href="/" className="hover:underline">
          Ineed.io™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
