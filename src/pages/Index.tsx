import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIdentity from "@/components/BrandIdentity";
import BrandBriefing from "@/components/BrandBriefing";
import InstagramSection from "@/components/InstagramSection";
import GoalsSection from "@/components/GoalsSection";
import ContentCalendar from "@/components/ContentCalendar";
import ContentStyleSection from "@/components/ContentStyleSection";
import WhatHappensNext from "@/components/WhatHappensNext";
import Packages from "@/components/Packages";
import AddonsSection from "@/components/AddonsSection";
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
        <ContentStyleSection />
        <ContentCalendar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-16">
          <AddonCard icon="🤳" title="UGC Generator" comingSoon desc="Upload a product photo — we automatically generate a professional UGC video for your Reel calendar. Powered by Sora & VEO3." />
          <AddonCard icon="📸" title="AI Product Shots" comingSoon desc="Professional product photos with AI-generated lifestyle backgrounds in your brand colors. Upload your product, we do the rest." />
          <AddonCard icon="🎬" title="Video & Motion Content" comingSoon desc="Animated social media videos and motion graphics in your brand design. Automatically generated, ready to post." />
        </div>
        <div id="packages">
          <Packages />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-16">
          <PremiumAddonCard
            id="ad-creative-pack"
            icon="🎯"
            title="Ad Creative Pack"
            price="€39"
            tag="CREATIVES"
            purchasable
            buttonLabel="Buy now — €39"
            previewText="5 ad concepts with headline, copy, CTA, and visual direction — tailored for Meta & Google. Ready for designers or AI generation."
            lockedItems={[]}
          />
          <PremiumAddonCard
            id="campaign-blueprint"
            icon="📋"
            title="Campaign Blueprint"
            price="€49"
            tag="STRATEGY"
            highlight
            purchasable
            buttonLabel="Buy now — €49"
            previewText="Complete campaign strategy: goal, target audience, messaging, timeline, channel mix, and budget recommendation."
            lockedItems={[]}
          />
          <PremiumAddonCard
            id="seasonal-planner"
            icon="📅"
            title="Seasonal Campaign Planner"
            price="€19"
            tag="PLANNING"
            purchasable
            buttonLabel="Buy now — €19"
            previewText="Annual calendar with industry-relevant campaign occasions: Black Friday, holidays, Awareness Days — including content ideas."
            lockedItems={[]}
          />
          <PremiumAddonCard
            id="ads-analyst"
            icon="🔍"
            title="Ads Analyst"
            price="€29"
            tag="ANALYSIS"
            purchasable
            buttonLabel="Buy now — €29"
            previewText="See what your competitors are currently running on Meta — creatives, copy, duration. From the Meta Ad Library, fully automated."
            lockedItems={[]}
          />
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
