import { CalendarPlus, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsightsPanel } from "./InsightsPanel";
import { StatsPanel } from "./StatsPanel";

export const MainContent = () => {
  return (
    <main className="flex-1 bg-gray-50 p-6" role="main" aria-label="Dashboard main content">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeIn" role="banner">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
              <p className="text-gray-600 mt-1" role="status">Here's what's happening with your family today.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                size="default"
                className="bg-primary hover:bg-primary-dark text-white transition-colors"
                aria-label="Add new task"
              >
                <ListPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                Add Task
              </Button>
              <Button 
                variant="outline" 
                size="default"
                className="border-primary text-primary hover:bg-primary/10 transition-colors"
                aria-label="Create new event"
              >
                <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                New Event
              </Button>
            </div>
          </div>
        </div>

        {/* Insights and Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          <InsightsPanel />
          <StatsPanel />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm" role="region" aria-label="Recent activity">
          <h2 className="text-lg font-semibold text-gray-900 mb-4" id="recent-activity-heading">Recent Activity</h2>
          <div className="space-y-4" aria-labelledby="recent-activity-heading">
            {[
              { user: "Mom", action: "completed", item: "Grocery Shopping" },
              { user: "Dad", action: "added", item: "Family Dinner" },
              { user: "John", action: "updated", item: "Weekend Plans" },
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                role="listitem"
              >
                <div 
                  className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm"
                  aria-hidden="true"
                >
                  {activity.user[0]}
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action} {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};