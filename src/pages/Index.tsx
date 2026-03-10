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
import SectionSkeleton, { CalendarSkeleton } from "@/components/SectionSkeleton";
import { BrandDataProvider, useBrandData } from "@/context/BrandDataContext";
import { useEffect, useState } from "react";

const CountdownBanner = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="analyzing-banner border-b border-primary/10 px-6 py-2.5 text-center sticky top-[60px] z-40">
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
        ⏳ Completing your full report...{" "}
        {seconds > 0 ? `~${seconds}s remaining` : "almost done..."}
      </div>
    </div>
  );
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="section-appear" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

const PageContent = () => {
  const { loading, loadingStage } = useBrandData();

  // Show progress bar loading screen before ANY data arrives
  if (loading) return <LoadingSpinner />;

  const isPartial = loadingStage === "partial" || loadingStage === "waiting";
  const isComplete = loadingStage === "complete";

  return (
    <>
      <Navbar />
      {isPartial && <CountdownBanner />}
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-28">
        {/* Always visible — uses whatever data is available */}
        <Hero />
        <BrandIdentity />

        {/* Stage 2 sections: real content or skeletons */}
        {isComplete ? (
          <>
            <FadeInSection>
              <BrandBriefing />
            </FadeInSection>
            <FadeInSection delay={100}>
              <InstagramSection />
            </FadeInSection>
            <FadeInSection delay={200}>
              <ContentCalendar />
            </FadeInSection>
            <FadeInSection delay={300}>
              <ContentStyleSection />
            </FadeInSection>
            <FadeInSection delay={350}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-16">
                <AddonCard icon="🤳" title="UGC Generator" comingSoon desc="Upload a product photo — we automatically generate a professional UGC video for your Reel calendar. Powered by Sora & VEO3." />
                <AddonCard icon="📸" title="AI Product Shots" comingSoon desc="Professional product photos with AI-generated lifestyle backgrounds in your brand colors. Upload your product, we do the rest." />
                <AddonCard icon="🎬" title="Video & Motion Content" comingSoon desc="Animated social media videos and motion graphics in your brand design. Automatically generated, ready to post." />
              </div>
            </FadeInSection>
            <FadeInSection delay={400}>
              <div id="packages">
                <Packages />
              </div>
            </FadeInSection>
            <FadeInSection delay={450}>
              <WhatHappensNext />
            </FadeInSection>
            <FadeInSection delay={500}>
              <CTABlocks />
            </FadeInSection>
          </>
        ) : (
          <>
            <SectionSkeleton headerNum="02" headerTitle="Brand Briefing" lines={5} />
            <SectionSkeleton headerNum="03" headerTitle="Your Instagram — Current Snapshot" lines={4} />
            <div className="grid grid-cols-12 gap-3.5 mb-16">
              <div className="col-span-12 md:col-span-6">
                <CalendarSkeleton />
              </div>
              <div className="col-span-12 md:col-span-6">
                <CalendarSkeleton />
              </div>
            </div>
            <SectionSkeleton headerNum="05" headerTitle="Pick Your Plan" lines={3} />
          </>
        )}
      </div>
      {isComplete && <EmailCapture />}
    </>
  );
};

const Index = () => (
  <BrandDataProvider>
    <PageContent />
  </BrandDataProvider>
);

export default Index;
