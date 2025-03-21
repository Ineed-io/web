'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';
import { UserDropdownMenu } from '../profile/user-dropdown-menu';
import { createClient } from '@/utils/supabase/client';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [user, setUser] = useState<User | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchUser = async () => {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          redirect('/');
        }
        setUser(data.user as User);
        // const client = createClient();
        //}
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (!user) return; // only fetch avatar if user exists
    const fetchAvatar = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar')
        .eq('id', user.id)
        .single();
      if (error) {
        console.error('Error fetching avatar:', error);
      } else {
        setAvatarImage(data?.avatar || null);
      }
    };

    fetchAvatar();
  }, [user]);

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="focus:outline-hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <Link href="/" className="flex items-center">
              <Image
                className="h-8 w-auto"
                src="/images/logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === '/'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === '/profile'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Profile
                </Link>
                <Link
                  href="/leaderboard"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === '/leaderboard'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
  
                >
                  Leaderboard
                </Link>
                <Link
                  href="/settings"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === '/settings'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                
                >
                  Settings
                </Link>
                <Link
                  href="/team"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === '/team'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Team
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ModeToggle />
            {user ? <UserDropdownMenu avatar={avatarImage} /> : <></>}
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              pathname === '/dashboard'
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              pathname === '/profile'
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              pathname === '/settings'
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Leaderboard
          </Link>
          <Link
            href="/leaderboard"
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              pathname === '/leaderboard'
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Settings
          </Link>
          <Link
            href="/team"
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              pathname === '/team'
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
