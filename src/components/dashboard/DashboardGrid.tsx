import { InsightsPanel } from "../InsightsPanel";
import { StatsPanel } from "../StatsPanel";

export const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
      <div className="md:col-span-3 w-full">
        <InsightsPanel />
      </div>
      <div className="md:col-span-2 w-full">
        <StatsPanel />
      </div>
    </div>
  );
};