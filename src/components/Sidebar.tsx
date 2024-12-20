import { Calendar, Home, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useQuickStats } from "@/hooks/queries/useQuickStats";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

const NavItem = ({ icon: Icon, label, href }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <a 
      href={href}
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
        isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </a>
  );
};

export const Sidebar = () => {
  const { data: stats, isLoading } = useQuickStats();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Family Overview
          </h3>
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white ring-2 ring-white">JD</div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white ring-2 ring-white">AS</div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-gray-700 ring-2 ring-white">+3</div>
          </div>
        </div>
        
        <nav className="space-y-1" aria-label="Main navigation">
          <NavItem 
            icon={Home} 
            label="Dashboard" 
            href="/dashboard"
          />
          <NavItem 
            icon={Calendar} 
            label="TAZQ" 
            href="/tasks"
          />
          <NavItem 
            icon={Calendar} 
            label="Calendar" 
            href="/calendar"
          />
          <NavItem 
            icon={MessageSquare} 
            label="Messages" 
            href="/messages"
          />
          <NavItem 
            icon={Users} 
            label="Family" 
            href="/family"
          />
        </nav>
        
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Quick Stats
          </h3>
          <div className="space-y-3">
            {isLoading ? (
              <>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Active Tasks</div>
                  <Skeleton className="h-8 w-16 mt-1" />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Upcoming Events</div>
                  <Skeleton className="h-8 w-16 mt-1" />
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 p-3 rounded-lg transition-colors hover:bg-gray-100">
                  <div className="text-sm text-gray-600">Active Tasks</div>
                  <div className="text-2xl font-semibold text-primary-dark">{stats?.activeTasks || 0}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg transition-colors hover:bg-gray-100">
                  <div className="text-sm text-gray-600">Upcoming Events</div>
                  <div className="text-2xl font-semibold text-primary-dark">{stats?.upcomingEvents || 0}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};