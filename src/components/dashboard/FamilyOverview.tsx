import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFamilyStats } from "@/hooks/queries/useFamilyStats";
import { LoadingState } from "./family/LoadingState";
import { EmptyFamilyState } from "./family/EmptyFamilyState";
import { FamilyHeader } from "./family/FamilyHeader";
import { FamilyMembersList } from "./family/FamilyMembersList";
import { FamilyStatistics } from "./family/FamilyStatistics";
import { useFamilyOverview } from "@/hooks/queries/useFamilyOverview";
import { toast } from "sonner";

export const FamilyOverview = () => {
  const { familyMembers, isLoading, error, familyId } = useFamilyOverview();
  const { memberStats, isLoading: isLoadingStats } = useFamilyStats(familyId);

  if (error) {
    console.error('Error fetching family members:', error);
    toast.error("Failed to load family overview");
    return null;
  }

  if (isLoading || isLoadingStats) {
    return <LoadingState />;
  }

  if (!familyMembers?.length) {
    return <EmptyFamilyState />;
  }

  return (
    <Card>
      <CardHeader>
        <FamilyHeader familyName={familyMembers[0]?.families?.name || 'Your Family'} />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FamilyMembersList members={familyMembers} memberStats={memberStats} />
          <FamilyStatistics memberStats={memberStats} />
        </div>
      </CardContent>
    </Card>
  );
};