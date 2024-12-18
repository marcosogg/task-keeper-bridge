import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Info, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
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
                  <HelpCircle className="h-8 w-8 text-primary" />
                  Help Center
                </CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search for answers..." 
                    className="pl-10 w-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I create a TAZQ?</AccordionTrigger>
                      <AccordionContent>
                        Click the "Create TAZQ" button from any page to start creating a new task, event, or reminder. The smart creation flow will guide you through the process.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I invite family members?</AccordionTrigger>
                      <AccordionContent>
                        Go to the Family page and click the "Invite Member" button. Enter their email address and they'll receive an invitation to join your family group.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I convert a task to an event?</AccordionTrigger>
                      <AccordionContent>
                        Yes! TAZQ is designed to be flexible. You can convert between different types of activities by editing the TAZQ and selecting a different type.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpCenter;