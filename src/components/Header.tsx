import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationCenter } from "./NotificationCenter";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-primary-dark">
            TAZQ
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/dashboard"
              className={`text-gray-600 hover:text-primary ${
                location.pathname === "/dashboard" ? "text-primary" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className={`text-gray-600 hover:text-primary ${
                location.pathname === "/tasks" ? "text-primary" : ""
              }`}
            >
              TAZQ
            </Link>
            <Link
              to="/calendar"
              className={`text-gray-600 hover:text-primary ${
                location.pathname === "/calendar" ? "text-primary" : ""
              }`}
            >
              Calendar
            </Link>
            <Link
              to="/messages"
              className={`text-gray-600 hover:text-primary ${
                location.pathname === "/messages" ? "text-primary" : ""
              }`}
            >
              Messages
            </Link>
            <Link
              to="/family"
              className={`text-gray-600 hover:text-primary ${
                location.pathname === "/family" ? "text-primary" : ""
              }`}
            >
              Family
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <NotificationCenter />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <span className="text-sm text-gray-600">{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};