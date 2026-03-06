import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIdentity from "@/components/BrandIdentity";
import BrandBriefing from "@/components/BrandBriefing";
import InstagramSection from "@/components/InstagramSection";
import ContentCalendar from "@/components/ContentCalendar";
import ContentStyleSection from "@/components/ContentStyleSection";
import AddonCard from "@/components/AddonCard";
import WhatHappensNext from "@/components/WhatHappensNext";
import Packages from "@/components/Packages";
import CTABlocks from "@/components/CTABlocks";
import EmailCapture from "@/components/EmailCapture";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProcessingScreen from "@/components/ProcessingScreen";
import { BrandDataProvider, useBrandData } from "@/context/BrandDataContext";

const PageContent = () => {
  const { loading, processing } = useBrandData();

  if (loading) return <LoadingSpinner />;
  if (processing !== "idle") return <ProcessingScreen />;

  return (
    <>
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-28">
        <Hero />
        <BrandIdentity />
        <BrandBriefing />
        <InstagramSection />
        <ContentCalendar />
        <ContentStyleSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-16">
          <AddonCard icon="🤳" title="UGC Generator" comingSoon desc="Lade ein Produktfoto hoch — wir generieren automatisch einen professionellen UGC-Video für deinen Reel-Kalender. Powered by Sora & VEO3." />
          <AddonCard icon="📸" title="AI Product Shots" comingSoon desc="Professionelle Produktfotos mit AI-generierten Lifestyle-Hintergründen in deinen Markenfarben. Lade dein Produkt hoch, wir machen den Rest." />
          <AddonCard icon="🎬" title="Video & Motion Content" comingSoon desc="Animierte Social-Media-Videos und Motion Graphics in deinem Brand-Design. Automatisch generiert, ready to post." />
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
