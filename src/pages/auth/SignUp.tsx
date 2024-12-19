import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto space-y-6 p-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-gray-500">Join TAZQ to start organizing with your family</p>
        </div>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;