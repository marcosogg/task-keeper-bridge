import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset logic will be implemented later with Supabase
    console.log("Reset password requested for:", email);
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto space-y-6 p-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-gray-500">
            {!submitted
              ? "Enter your email to receive a password reset link"
              : "Check your email for reset instructions"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              If an account exists for {email}, you will receive password reset
              instructions.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSubmitted(false)}
            >
              Try Another Email
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;