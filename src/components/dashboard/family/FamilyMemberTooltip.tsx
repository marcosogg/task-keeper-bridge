import { CheckCircle2, Clock } from "lucide-react";

interface FamilyMemberStats {
  profile_id: string;
  total_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
}

interface FamilyMemberTooltipProps {
  name: string;
  stats?: FamilyMemberStats;
}

export const FamilyMemberTooltip = ({ name, stats }: FamilyMemberTooltipProps) => {
  if (!stats) return null;
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block">
      <div className="bg-white p-2 rounded-lg shadow-lg text-xs whitespace-nowrap border">
        <p className="font-medium">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center">
            <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
            {stats.completed_tasks}/{stats.total_tasks}
          </span>
          {stats.overdue_tasks > 0 && (
            <span className="flex items-center text-red-500">
              <Clock className="h-3 w-3 mr-1" />
              {stats.overdue_tasks} overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};