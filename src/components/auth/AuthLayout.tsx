import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export const AuthLayout = ({ children, showNav = true }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-dark">
            TAZQ
          </Link>
          {showNav && (
            <nav className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-white bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};