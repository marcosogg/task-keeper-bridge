import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent>
          <div className="p-6">
            <h1>Welcome to your dashboard</h1>
          </div>
        </MainContent>
      </div>
      <Footer />
    </div>
  );
};

export default Index;