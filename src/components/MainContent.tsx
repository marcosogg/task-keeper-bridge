import { CalendarPlus, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsightsPanel } from "./InsightsPanel";
import { StatsPanel } from "./StatsPanel";

export const MainContent = () => {
  return (
    <main className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your family today.</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-primary hover:bg-primary-dark">
                <ListPlus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <CalendarPlus className="mr-2 h-4 w-4" />
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
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { user: "Mom", action: "completed", item: "Grocery Shopping" },
              { user: "Dad", action: "added", item: "Family Dinner" },
              { user: "John", action: "updated", item: "Weekend Plans" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm">
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