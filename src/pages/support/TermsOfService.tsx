import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
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
                  <Shield className="h-8 w-8 text-primary" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold">1. Introduction</h2>
                    <p className="text-gray-600">
                      Welcome to TAZQ. By using our service, you agree to these terms. Please read them carefully.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold">2. Using TAZQ</h2>
                    <p className="text-gray-600">
                      You must follow any policies made available to you within the Service. You may use our Service only as permitted by law. We may suspend or stop providing our Service to you if you do not comply with our terms or policies.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold">3. Privacy and Copyright Protection</h2>
                    <p className="text-gray-600">
                      TAZQ's privacy policies explain how we treat your personal data and protect your privacy when you use our Service. By using our Service, you agree that TAZQ can use such data in accordance with our privacy policies.
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

export default TermsOfService;