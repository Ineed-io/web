import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faSlack, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const SocialTray = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-4">
      <Link href="https://github.com/michiganhackers">
        <div className="flex items-center justify-center rounded-full bg-[#2b3137] p-2">
          <FontAwesomeIcon icon={faGithub} className="w-6" />
        </div>
      </Link>
      <Link href="https://instagram.com/michiganhackers">
        <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#405DE6] via-[#E4405F] to-[#F9CE34] p-2">
          <FontAwesomeIcon icon={faInstagram} className="w-6" />
        </div>
      </Link>
      <Link href="https://michiganhackers.slack.com/join/shared_invite/zt-2o3f23lvn-xuOr29HVpuh3w2DM1hmQLg#/shared-invite/email">
        <div className="flex items-center justify-center rounded-full bg-[#E01E5A] p-2">
          <FontAwesomeIcon icon={faSlack} className="w-6" />
        </div>
      </Link>
      <Link href="https://twitter.com/michiganhackers">
        <div className="flex items-center justify-center rounded-full bg-[#1d9bf0] p-2">
          <FontAwesomeIcon icon={faTwitter} className="w-6" />
        </div>
      </Link>
    </div>
  );
};

export default SocialTray;
