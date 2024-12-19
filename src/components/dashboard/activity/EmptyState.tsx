export const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div className="text-center py-8 text-gray-500">
        No recent activity to display
      </div>
    </div>
  );
};