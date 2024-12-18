import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Family from "./pages/Family";
import Landing from "./pages/auth/Landing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import HelpCenter from "./pages/support/HelpCenter";
import ContactSupport from "./pages/support/ContactSupport";
import TermsOfService from "./pages/support/TermsOfService";
import PrivacyPolicy from "./pages/support/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/family" element={<Family />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;