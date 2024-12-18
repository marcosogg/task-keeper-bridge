import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FamilyContent } from "@/components/family/FamilyContent";

const Family = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <FamilyContent />
      </div>
    </div>
  );
};

export default Family;