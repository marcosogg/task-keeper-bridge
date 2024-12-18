import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const mockData = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 3 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 2 },
  { name: "Fri", tasks: 6 },
  { name: "Sat", tasks: 4 },
  { name: "Sun", tasks: 3 },
];

const config = {
  tasks: {
    color: "#9b87f5",
  },
};

export const StatsPanel = () => {
  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer config={config}>
            <BarChart data={mockData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload) return null;
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium">Tasks:</span>
                      </div>
                      <div className="text-sm font-medium">{payload[0]?.value}</div>
                    </div>
                  </div>
                );
              }} />
              <Bar dataKey="tasks" fill={config.tasks.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};