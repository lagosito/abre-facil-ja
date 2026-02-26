import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIdentity from "@/components/BrandIdentity";
import BrandBriefing from "@/components/BrandBriefing";
import InstagramSection from "@/components/InstagramSection";
import ContentCalendar from "@/components/ContentCalendar";
import Packages from "@/components/Packages";
import CTABlocks from "@/components/CTABlocks";

const Index = () => (
  <>
    <Navbar />
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-28">
      <Hero />
      <BrandIdentity />
      <BrandBriefing />
      <InstagramSection />
      <ContentCalendar />
      <Packages />
      <CTABlocks />
    </div>
  </>
);

export default Index;
