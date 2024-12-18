import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface FamilyMemberStats {
  profile_id: string;
  total_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
}

interface FamilyStatisticsProps {
  memberStats?: FamilyMemberStats[];
}

export const FamilyStatistics = ({ memberStats }: FamilyStatisticsProps) => {
  const totalCompleted = memberStats?.reduce((acc, curr) => acc + Number(curr.completed_tasks), 0) || 0;
  const totalActive = memberStats?.reduce((acc, curr) => 
    acc + (Number(curr.total_tasks) - Number(curr.completed_tasks)), 0) || 0;
  const totalOverdue = memberStats?.reduce((acc, curr) => acc + Number(curr.overdue_tasks), 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm font-medium">Completed Tasks</p>
          <p className="text-2xl font-bold text-green-600">{totalCompleted}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
        <Clock className="h-5 w-5 text-yellow-500" />
        <div>
          <p className="text-sm font-medium">Active Tasks</p>
          <p className="text-2xl font-bold text-yellow-600">{totalActive}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <div>
          <p className="text-sm font-medium">Overdue Tasks</p>
          <p className="text-2xl font-bold text-red-600">{totalOverdue}</p>
        </div>
      </div>
    </div>
  );
};