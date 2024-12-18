import { WelcomeBanner } from "./dashboard/WelcomeBanner";
import { DashboardGrid } from "./dashboard/DashboardGrid";
import { RecentActivity } from "./dashboard/RecentActivity";

export const MainContent = () => {
  return (
    <main className="flex-1 bg-gray-50 p-4 md:p-6" role="main" aria-label="Dashboard main content">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <WelcomeBanner />
        <DashboardGrid />
        <RecentActivity />
      </div>
    </main>
  );
};