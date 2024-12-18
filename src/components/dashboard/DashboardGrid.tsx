import { InsightsPanel } from "../InsightsPanel";
import { StatsPanel } from "../StatsPanel";
import { FamilyOverview } from "./FamilyOverview";

export const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <FamilyOverview />
        <div className="min-h-[400px]">
          <InsightsPanel />
        </div>
      </div>
      <div className="lg:col-span-5">
        <StatsPanel />
      </div>
    </div>
  );
};