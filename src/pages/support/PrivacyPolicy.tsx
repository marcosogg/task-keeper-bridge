import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Lock className="h-8 w-8 text-primary" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                    <p className="text-gray-600">
                      We collect information to provide better services to our users. This includes information you provide to us, such as your name, email address, and family information.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold">2. How We Use Information</h2>
                    <p className="text-gray-600">
                      We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect TAZQ and our users.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold">3. Information Security</h2>
                    <p className="text-gray-600">
                      We work hard to protect TAZQ and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;