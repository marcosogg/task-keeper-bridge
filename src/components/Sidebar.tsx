import { Calendar, Home, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  href: string;
}

const NavItem = ({ icon: Icon, label, isActive, href }: NavItemProps) => (
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

export const Sidebar = () => {
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
            isActive={true}
            href="#"
          />
          <NavItem 
            icon={Users} 
            label="Family" 
            href="#"
          />
          <NavItem 
            icon={Calendar} 
            label="Calendar" 
            href="#"
          />
          <NavItem 
            icon={MessageSquare} 
            label="Messages" 
            href="#"
          />
        </nav>
        
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <div className="text-sm text-gray-600">Active Tasks</div>
              <div className="text-2xl font-semibold text-primary-dark">12</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <div className="text-sm text-gray-600">Upcoming Events</div>
              <div className="text-2xl font-semibold text-primary-dark">3</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};