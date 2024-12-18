import { InsightsPanel } from "../InsightsPanel";
import { StatsPanel } from "../StatsPanel";
import { FamilyOverview } from "./FamilyOverview";

export const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
      <div className="lg:col-span-7 space-y-4 md:space-y-6">
        <FamilyOverview />
        <InsightsPanel />
      </div>
      <div className="lg:col-span-5 w-full h-full">
        <StatsPanel />
      </div>
    </div>
  );
};