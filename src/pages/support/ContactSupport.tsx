import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactSupport = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                        <Input id="subject" placeholder="How can we help?" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us more about your issue..."
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Other Ways to Reach Us</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <span>support@tazq.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <span>1-800-TAZQ-HELP</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Support Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 8:00 PM EST<br />
                        Saturday - Sunday: 10:00 AM - 6:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactSupport;