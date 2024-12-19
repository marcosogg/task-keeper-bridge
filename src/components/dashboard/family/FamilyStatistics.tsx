import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface FamilyMemberStats {
  profile_id: string;
  total_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
}

const StatCard = ({ icon, label, value, bgColor, textColor, borderColor, iconColor }: StatCardProps) => (
  <div className={`flex items-center gap-2 p-3 rounded-lg ${bgColor} ${borderColor}`}>
    <div className={iconColor}>{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  </div>
);

interface FamilyStatisticsProps {
  memberStats?: FamilyMemberStats[];
}

export const FamilyStatistics = ({ memberStats }: FamilyStatisticsProps) => {
  const totalCompleted = memberStats?.reduce((acc, curr) => acc + Number(curr.completed_tasks), 0) || 0;
  const totalActive = memberStats?.reduce((acc, curr) => 
    acc + (Number(curr.total_tasks) - Number(curr.completed_tasks)), 0) || 0;
  const totalOverdue = memberStats?.reduce((acc, curr) => acc + Number(curr.overdue_tasks), 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="group" aria-label="Family task statistics">
      <StatCard
        icon={<CheckCircle2 className="h-5 w-5" />}
        label="Completed Tasks"
        value={totalCompleted}
        bgColor="bg-green-50"
        textColor="text-green-600"
        borderColor="border border-green-100"
        iconColor="text-green-500"
      />
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        label="Active Tasks"
        value={totalActive}
        bgColor="bg-yellow-50"
        textColor="text-yellow-600"
        borderColor="border border-yellow-100"
        iconColor="text-yellow-500"
      />
      <StatCard
        icon={<AlertTriangle className="h-5 w-5" />}
        label="Overdue Tasks"
        value={totalOverdue}
        bgColor="bg-red-50"
        textColor="text-red-600"
        borderColor="border border-red-100"
        iconColor="text-red-500"
      />
    </div>
  );
};