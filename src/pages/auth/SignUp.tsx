import { AuthLayout } from "@/components/auth/AuthLayout";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
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

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--color-primary))',
                  brandAccent: 'rgb(var(--color-primary-dark))',
                },
              },
            },
          }}
          view="sign_up"
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
        />
      </div>
    </AuthLayout>
  );
};

export default SignUp;