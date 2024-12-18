import { Link } from "react-router-dom";
import { HelpCircle, Mail, Shield, Lock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container py-4 md:py-6">
        <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Link
            to="/help"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            Help Center
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </Link>
          <Link
            to="/terms"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Shield className="h-4 w-4" />
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Lock className="h-4 w-4" />
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};