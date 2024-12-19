import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    </div>
  );
};