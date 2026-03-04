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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-16">
          <AddonCard icon="📈" title="Trend Scout" desc="Jede Woche: was in deiner Branche auf Instagram gerade viral geht — direkt als Content-Ideen in deinen Kalender integriert." />
          <AddonCard icon="📊" title="Performance Report" desc="Automatischer PDF-Bericht jeden Monat: Reach, Engagement, Wachstum — alles übersichtlich aufbereitet, direkt zu dir geschickt." />
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
