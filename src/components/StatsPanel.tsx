import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface WeeklyActivity {
  name: string;
  tasks: number;
  events: number;
}

const mockData: WeeklyActivity[] = [
  { name: "Mon", tasks: 4, events: 1 },
  { name: "Tue", tasks: 3, events: 2 },
  { name: "Wed", tasks: 5, events: 0 },
  { name: "Thu", tasks: 2, events: 3 },
  { name: "Fri", tasks: 6, events: 1 },
  { name: "Sat", tasks: 4, events: 2 },
  { name: "Sun", tasks: 3, events: 1 },
];

const fetchWeeklyActivity = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockData;
};

const config = {
  tasks: {
    color: "#9b87f5",
  },
  events: {
    color: "#FEC6A1",
  },
};

export const StatsPanel = () => {
  const { data: weeklyActivity, isLoading } = useQuery({
    queryKey: ['weeklyActivity'],
    queryFn: fetchWeeklyActivity,
  });

  if (isLoading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fadeIn" role="region" aria-label="Weekly activity statistics">
      <CardHeader>
        <CardTitle className="text-xl font-semibold" id="stats-heading">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="h-[200px] w-full" 
          role="img" 
          aria-label="Bar chart showing weekly activity distribution between tasks and events"
        >
          <ChartContainer config={config}>
            <ResponsiveContainer>
              <BarChart 
                data={weeklyActivity} 
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  aria-label="Days of the week"
                />
                <YAxis 
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  aria-label="Number of activities"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload) return null;
                    return (
                      <div 
                        className="rounded-lg border bg-background p-2 shadow-sm"
                        role="tooltip"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                            <span className="text-sm font-medium">Tasks:</span>
                          </div>
                          <div className="text-sm font-medium">{payload[0]?.value}</div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-sm font-medium">Events:</span>
                          </div>
                          <div className="text-sm font-medium">{payload[1]?.value}</div>
                        </div>
                      </div>
                    );
                  }}
                />
                <Bar 
                  dataKey="tasks" 
                  fill={config.tasks.color} 
                  radius={[4, 4, 0, 0]} 
                  name="Tasks"
                  role="graphics-symbol"
                  aria-label="Tasks bar"
                />
                <Bar 
                  dataKey="events" 
                  fill={config.events.color} 
                  radius={[4, 4, 0, 0]} 
                  name="Events"
                  role="graphics-symbol"
                  aria-label="Events bar"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};