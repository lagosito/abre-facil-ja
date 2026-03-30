import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIdentity from "@/components/BrandIdentity";
import BrandBriefing from "@/components/BrandBriefing";
import InstagramSection from "@/components/InstagramSection";
import GoalsSection from "@/components/GoalsSection";
import ContentCalendar from "@/components/ContentCalendar";
import ContentStyleSection from "@/components/ContentStyleSection";
import AddonCard from "@/components/AddonCard";
import WhatHappensNext from "@/components/WhatHappensNext";
import Packages from "@/components/Packages";
import CTABlocks from "@/components/CTABlocks";
import EmailCapture from "@/components/EmailCapture";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BrandDataProvider, useBrandData } from "@/context/BrandDataContext";

const PageContent = () => {
  const { loading, loadingStage } = useBrandData();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-28">
        <Hero />
        <BrandIdentity />
        <BrandBriefing />
        <InstagramSection />
        <GoalsSection />
        <ContentCalendar />
        <ContentStyleSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-16">
          <AddonCard icon="🤳" title="UGC Generator" comingSoon desc="Upload a product photo — we automatically generate a professional UGC video for your Reel calendar. Powered by Sora & VEO3." />
          <AddonCard icon="📸" title="AI Product Shots" comingSoon desc="Professional product photos with AI-generated lifestyle backgrounds in your brand colors. Upload your product, we do the rest." />
          <AddonCard icon="🎬" title="Video & Motion Content" comingSoon desc="Animated social media videos and motion graphics in your brand design. Automatically generated, ready to post." />
        </div>
        <div id="packages">
          <Packages />
        </div>
        <WhatHappensNext />
        <CTABlocks />
      </div>
      <EmailCapture />
    </>
  );
};

const Index = () => (
  <BrandDataProvider>
    <PageContent />
  </BrandDataProvider>
);

export default Index;
