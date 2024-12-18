import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FamilyContent } from "@/components/family/FamilyContent";
import { Footer } from "@/components/Footer";

const Family = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <FamilyContent />
      </div>
      <Footer />
    </div>
  );
};

export default Family;