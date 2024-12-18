import { Calendar, Home, MessageSquare, Users } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Family Overview</h3>
          <div className="mt-4 flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white">JD</div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">AS</div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-gray-700">+3</div>
          </div>
        </div>
        
        <nav className="space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg bg-gray-100">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <Users className="h-5 w-5" />
            <span>Family</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <Calendar className="h-5 w-5" />
            <span>Calendar</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </a>
        </nav>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Quick Stats</h3>
          <div className="mt-4 space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Active Tasks</div>
              <div className="text-2xl font-semibold text-primary-dark">12</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Upcoming Events</div>
              <div className="text-2xl font-semibold text-primary-dark">3</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};