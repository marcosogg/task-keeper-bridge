import { CreateTazqButton } from "@/components/CreateTazqButton";
import { useAuth } from "@/contexts/AuthContext";

export const WelcomeBanner = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm animate-fadeIn" role="banner">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm md:text-base text-gray-600" role="status">
            Here's what's happening with your family today.
          </p>
        </div>
        <div>
          <CreateTazqButton />
        </div>
      </div>
    </div>
  );
};