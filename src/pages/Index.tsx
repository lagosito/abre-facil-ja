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
  const { loading, loadingStage, errorMessage } = useBrandData();

  if (loading) return <LoadingSpinner />;

  if (loadingStage === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background text-center">
        <h1 className="font-serif italic text-4xl mb-3">{errorMessage ?? "No encontramos este cliente"}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Verifica el nombre del cliente en la URL o vuelve a la página principal.
        </p>
        <a
          href="/"
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-90 transition-all"
        >
          Volver al inicio
        </a>
      </div>
    );
  }



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
