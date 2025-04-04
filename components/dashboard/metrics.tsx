import { Users2, UserPlus, TrendingUp,TrendingDown,NotebookPen,LayoutList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Application } from '@/types/application';
import { Separator } from '../ui/separator';

/*
TODO #10: Replace the metrics down below with the cards used in the leaderboard,
will eventually look the same for the dashboard once that is complete,
feel free to copy paste
*/


export function DashboardMetrics({ applications = [] }: { applications: Application[] }) {
  const filterLast30Days = (applications: Application[]): Application[] => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return applications.filter((item) => {
      const date = new Date(item.reminder);
      return date >= thirtyDaysAgo && date <= now;
    });
  };
  
  const filterPrev30Days = (applications: Application[]): Application[] => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    const sixtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    sixtyDaysAgo.setDate(now.getDate() - 60);

    return applications.filter((item) => {
      const date = new Date(item.reminder);
      return date <= thirtyDaysAgo && date >= sixtyDaysAgo;
    });
  };
  const filter30DaysOrMore = (applications: Application[]): Application[] => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return applications.filter((item) => {
      const date = new Date(item.reminder);
      return date <= thirtyDaysAgo;
    });
  };
  const pendingApplications = applications.filter((item) => {
    return item.status === 'Pending';
  });
  const currAcceptedApplications = applications.filter((item) => {
    return item.status === 'Accepted';
  }).length;
  const currRejectedApplications = applications.filter((item) => {
    return item.status === 'Rejected';
  }).length;
  const prevAcceptedApplications = filter30DaysOrMore(applications).filter((item) => {
    return item.status === 'Accepted';
  }).length;
  const prevRejectedApplications = filter30DaysOrMore(applications).filter((item) => {
    return item.status === 'Rejected';
  }).length;
  const prevTotalResults = prevAcceptedApplications + prevRejectedApplications;
  const prevRejectionRate = prevRejectedApplications / prevTotalResults;
  const currTotalResults = currAcceptedApplications + currRejectedApplications;
  const currRejectionRate = currRejectedApplications / currTotalResults;
  const currSuccessRate =  currAcceptedApplications / currTotalResults;
  const ratePercentChange =
    Math.round(((currRejectionRate - prevRejectionRate) / prevRejectionRate) * 100 * 10) / 10;

  const recentApplications = filterLast30Days(applications);
  const prevApplications = filterPrev30Days(applications);
  const totalCount = applications.length;
  const pendingCount = pendingApplications.length;
  const applicationPercentIncrease =
    prevApplications.length > 0
      ? Math.round(
          ((recentApplications.length - prevApplications.length) / prevApplications.length) *
            100 *
            10
        ) / 10
      : 100;

  // TODO #6: Change these icons to match the description of the header (check out the link to get icons): https://lucide.dev/icons/
  const metrics = [
    {
      title: 'Active Applications',
      value: pendingCount + '/' + totalCount,
      trend: Math.round((pendingCount / totalCount) * 100 * 10) / 10,
      icon: Users2,
      total: NotebookPen,
    },
    {
      title: 'Total Applications this Month',
      value: recentApplications.length,
      trend: applicationPercentIncrease,
      icon: UserPlus,
    },
    {
      title: 'Success Rate',
      value: Math.round(currSuccessRate * 100 * 10) / 10 + '%',
      trend: ratePercentChange,
      icon: TrendingUp,
    },
    {
      title: 'Rejection Rate',
      value: Math.round(currRejectionRate * 100 * 10) / 10 + '%',
      trend: ratePercentChange,
      icon: TrendingDown,
    },
    {
      title: 'Pending Applications',
      value: pendingApplications.length,
      trend: ratePercentChange,
      icon: LayoutList,
    },
  ];

  /* 
  TODO #7: Replace these cards with the cards from components/leaderboard/metrics.tsx
  and, make sure you add accurate descriptions, should look just like the leaderboard page,
  except this is for dashboard 
  */

  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row">
      {metrics.map((metric) => (
        <Card
          key={metric.title}
          className="flex flex-1 items-center gap-4 p-6 shadow-md shadow-primary"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8faf3]">
            <metric.icon className="h-6 w-6 text-[#121212]" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="text-lg font-semibold">{metric.title}</h2>
            <Separator className="w-full bg-primary" />
            <p className="text-md">{metric.value}</p>
            {metric.title !== 'Active Applications' ? (
              <p
                className={`text-sm ${metric.trend >= 0 ? (metric.title === 'Total Applications this Month' ? 'text-[#00ac4f]' : 'text-red-500') : metric.title === 'Total Applications this Month' ? 'text-red-500' : 'text-[#00ac4f]'}`}
              >
                {metric.trend >= 0 ? '↑' : '↓'} {Math.abs(metric.trend)}% from previous
              </p>
            ) : (
              <p className={`text-sm text-gray-500`}>{Math.abs(metric.trend)}% of total</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
