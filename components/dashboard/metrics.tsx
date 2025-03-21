import { NotebookPen, CircleCheckBig, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Application } from '@/types/application';

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

  // TODO: Change these icons to match the description of the header (check out the link to get icons): https://lucide.dev/icons/
  const metrics = [
    {
      title: 'Active Applications',
      value: pendingCount + '/' + totalCount,
      trend: Math.round((pendingCount / totalCount) * 100 * 10) / 10,
      icon: NotebookPen,
      total: applications.length,
    },
    {
      title: 'Total Applications this Month',
      value: recentApplications.length,
      trend: applicationPercentIncrease,
      icon: CircleCheckBig,
    },
    {
      title: 'Rejection Rate',
      value: Math.round(currRejectionRate * 100 * 10) / 10 + '%',
      trend: ratePercentChange,
      icon: X,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8faf3]">
              <metric.icon className="h-6 w-6 text-[#121212]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{metric.title}</p>
              <p className="text-2xl font-semibold">{metric.value}</p>
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
          </div>
        </Card>
      ))}
    </div>
  );
}
