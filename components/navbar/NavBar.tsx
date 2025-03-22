'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';
import { UserDropdownMenu } from '../profile/user-dropdown-menu';
import { createClient } from '@/utils/supabase/client';
import { User } from '@/types/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';

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
        if (error) console.log('Error fetching user:', error);
        setUser(data.user as User | null);
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (!user) return;
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
        setAvatarImage(data?.avatar);
      }
    };
    fetchAvatar();
  }, [user]);

  const links = [
    { name: 'Home', route: '/' },
    { name: 'Leaderboard', route: '/leaderboard' },
    { name: 'About Us', route: '/aboutus' },
    { name: 'Dashboard', route: '/dashboard' },
  ];

  return (
    <nav className="relative flex h-20 items-center gap-2 bg-black p-4 sm:gap-8 sm:p-8">
      <button
        type="button"
        className="focus:outline-hidden relative inline-flex items-center justify-center rounded-md border-white p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        onClick={toggleMenu}
      >
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>
        <FontAwesomeIcon icon={faBars} className={`${isMenuOpen ? 'hidden' : 'block'} size-6`} />
        <FontAwesomeIcon icon={faXmark} className={`${isMenuOpen ? 'block' : 'hidden'} size-6`} />
      </button>
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} absolute left-[-2] top-20 z-10 w-[50%] sm:hidden`}
        id="mobile-menu"
      >
        <div className="flex flex-col space-y-1 bg-neutral-800 px-2 pb-3 pt-2">
          {links.map((item, idx) => (
            <Link
              key={`navbar-mobile-${idx}`}
              href={item.route}
              onClick={toggleMenu}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname === item.route
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <Link href="/" className="flex items-center gap-2 sm:gap-4">
        <Image
          className="size-8 w-auto border-white"
          src="/images/logo.png"
          alt="Logo"
          width={32}
          height={32}
        />
        <span className="font-semibol text-xl text-white">Ineed.io</span>
      </Link>
      <div className="hidden gap-8 sm:flex">
        {links.map((item, idx) => (
          <Link
            href={item.route}
            key={`navbar-${idx}`}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              pathname === item.route
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <ModeToggle />
        {user ? (
          <UserDropdownMenu avatar={avatarImage} />
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
