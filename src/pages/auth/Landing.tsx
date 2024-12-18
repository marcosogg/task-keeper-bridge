import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Calendar, MessageSquare, Users } from "lucide-react";

const Landing = () => {
  return (
    <AuthLayout>
      <div className="space-y-16 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Family Organization Made Simple
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            TAZQ brings your family together with a unified platform for tasks, events, and communication - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<CheckCircle className="w-8 h-8 text-primary" />}
            title="Task Management"
            description="Create and track family tasks with ease"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8 text-primary" />}
            title="Shared Calendar"
            description="Keep everyone on the same schedule"
          />
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8 text-primary" />}
            title="Family Chat"
            description="Stay connected with integrated messaging"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-primary" />}
            title="Family Groups"
            description="Organize activities for different family members"
          />
        </section>

        {/* Social Proof Section */}
        <section className="text-center space-y-6 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Trusted by Families Everywhere
          </h2>
          <p className="text-gray-600">
            Join thousands of families who use TAZQ to stay organized and connected
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10k+</p>
              <p className="text-sm text-gray-600">Active Families</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50k+</p>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <div className="bg-primary/5 w-16 h-16 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Landing;