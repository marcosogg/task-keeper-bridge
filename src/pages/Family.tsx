import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FamilyContent } from "@/components/family/FamilyContent";
import { Footer } from "@/components/Footer";

const Family = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <FamilyContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Family;