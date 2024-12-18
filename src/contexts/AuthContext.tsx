import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate checking for an existing session
  useEffect(() => {
    const checkSession = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: "1",
        email,
        fullName: "John Doe",
        role: "parent",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: "1",
        email,
        fullName,
        role: "parent",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Successfully created account!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Successfully signed out!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call
      toast.success("Password reset instructions sent to your email!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};