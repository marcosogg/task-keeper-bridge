import { InsightsPanel } from "../InsightsPanel";
import { StatsPanel } from "../StatsPanel";

export const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
      <div className="lg:col-span-7 w-full">
        <InsightsPanel />
      </div>
      <div className="lg:col-span-5 w-full">
        <StatsPanel />
      </div>
    </div>
  );
};