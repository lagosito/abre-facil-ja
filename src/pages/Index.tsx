import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIdentity from "@/components/BrandIdentity";
import BrandBriefing from "@/components/BrandBriefing";
import ICPIntelligence from "@/components/ICPIntelligence";
import ICPErrorBoundary from "@/components/ICPErrorBoundary";
import InstagramSection from "@/components/InstagramSection";
import GoalsSection from "@/components/GoalsSection";
import ContentCalendar from "@/components/ContentCalendar";
import ContentStyleSection from "@/components/ContentStyleSection";
import WhatHappensNext from "@/components/WhatHappensNext";
import Packages from "@/components/Packages";
import AddonsSection from "@/components/AddonsSection";

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
        <ICPErrorBoundary>
          <ICPIntelligence />
        </ICPErrorBoundary>
        <InstagramSection />
        <GoalsSection />
        <ContentStyleSection />
        <ContentCalendar />
        <div id="packages">
          <Packages />
        </div>
        <AddonsSection />
        <WhatHappensNext />
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
