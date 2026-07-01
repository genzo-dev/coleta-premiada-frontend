import HeroSection from "@/components/HomePage/HeroSection";
import HowToWorkSection from "@/components/HomePage/HowToWorkSection";
import CallToActionSection from "@/components/HomePage/CallToActionSection";
import MaterialsSection from "@/components/HomePage/MaterialsSection";
import Navbar from "@/components/HomePage/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="flex flex-col px-4 sm:px-6 lg:px-8">
        <HowToWorkSection />
        <MaterialsSection />
      </div>
      <CallToActionSection />
    </div>
  );
}
