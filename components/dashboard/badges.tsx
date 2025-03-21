import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';

// Map badge names to image filenames
{
  /* TODO #1: Scour the internet for more badges, and come up with ideas for badges!*/
}

/* TODO #2: Add badge functionality. Think about a clever way to store which user has
what badge unlocked in the database. We shouldn't have to create a column for each badge, and have that
set to false initially until they unlock it, this causes way too much redudancy and extra storage that's not needed.
Once that is figured out, implement badge functionality here. Remember, all badges should be set to false initially,
and once they've unlocked a badge (once "something" is set to true), then it should be unlocked.
*/

const badgeImages: { [key: string]: string } = {
  'Applied to any internship(s)': '/images/new.png',
  'Applied to 10+ internships': '/images/10plus.png',
  'Applied to 25+ internships': '/images/25plus.png',
  'Applied to 50+ internships': '/images/50plus.png',
  'Applied to 100+ internships': '/images/100plus.png',
  'Applied to 200+ internships': '/images/200plus.png',
  'Breaking In: Accepted to an internship': '/images/accepted.png',
  'Accepted to 5 internships': '/images/accepted5.png',
  'Accepted to 10 internships': '/images/accepted10.png',
  'Active 7 days in a row': '/images/third.png',
  'Active 30 days in a row': '/images/second.png',
  'Active 365 days in a row': '/images/best.png',
  'First Bruise': '/images/firstbruise.webp',
  '100 Rejections': '/images/100rejections_badge-min.png',
  '1000 Rejections': '/images/1000rejections_badge-min.png',
  'Applied to a FAANG company': '/images/cash.png',
  'Accepted by a FAANG company': '/images/party.svg',
  'Applied to all FAANG companies': '/images/please.svg',
  'Accepted by all FAANG companies': '/images/demon.png',
  'Rejected by all FAANG companies': '/images/sad.png',

  // Profile Achievements (maybe include joining a group)
  'Profile Pioneer': '/images/logo.png',
  'Joining a Group': '/images/teamwork.webp',

  // Special Scenarios
  'High Roller: Accepted by 3 internships in one day': '/images/highroller.webp', // 3 in the same day
  'Bouncing Back: Applying after 50 rejections': '/images/bouncingback.webp', // applying even after 50 rejections

  // Event Achievements
  'Early bird gets the worm: Apply at the start of internship season': '/images/earlybird.webp',

  // Rank Achievements
  // 'Achieve Top 10% Appliers': '/images/top10percent.webp',
  // 'Achieve Top 1% Appliers': '/images/top1percent.webp',
  // 'Achieve Top 10 Appliers': '/images/top10.webp',
  'Achieve the Number 1 Applier': '/images/top1.webp',
};

export function Badges() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Achievement Badges</h2>
      <div className="flex flex-wrap gap-5">
        <TooltipProvider>
          {Object.keys(badgeImages).map((badgeName, index) => {
            const badge = {
              id: index + 1,
              name: badgeName,
              description: `${badgeName}`,
              earned: Math.random() > 0.5,
            };
            return (
              <Tooltip key={badge.id}>
                <TooltipTrigger>
                  <Image
                    src={badgeImages[badge.name]}
                    alt={`Badge ${badge.id}`}
                    width={32}
                    height={32}
                    className={`cursor-pointer ${badge.earned ? 'opacity-100' : 'opacity-50'}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </Card>
  );
}
