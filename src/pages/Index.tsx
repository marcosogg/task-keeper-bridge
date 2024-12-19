import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import { Footer } from "@/components/Footer";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent>
          <ErrorBoundary>
            <div className="p-6 space-y-6">
              <WelcomeBanner />
              <DashboardGrid />
              <RecentActivity />
            </div>
          </ErrorBoundary>
        </MainContent>
      </div>
      <Footer />
    </div>
  );
};

export default Index;