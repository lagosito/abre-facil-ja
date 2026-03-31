import SectionHeader from "./SectionHeader";
import PremiumAddonCard from "./PremiumAddonCard";
import AddonCard from "./AddonCard";

const AddonsSection = () => {
  return (
    <section className="mb-16">
      <SectionHeader
        num="08"
        title="Add-ons"
        explain="Boost your brand strategy with powerful extras. One-time reports and recurring services — pick what fits your goals."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <PremiumAddonCard
          id="campaign-blueprint"
          icon="📋"
          title="Campaign Blueprint"
          price="€49"
          tag="STRATEGY"
          highlight
          purchasable
          buttonLabel="Buy now — €49"
          previewText="Full content campaign strategy with objectives, messaging, and calendar."
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
          previewText="Performance audit and recommendations for your current ad spend."
          lockedItems={[]}
        />
        <PremiumAddonCard
          id="ad-creative-pack"
          icon="🎯"
          title="Ad Creative Pack"
          price="€39"
          tag="CREATIVES"
          purchasable
          buttonLabel="Buy now — €39"
          previewText="5 ready-to-run ad creatives matched to your brand."
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
          previewText="Plan content around key dates and seasonal moments."
          lockedItems={[]}
        />
        <AddonCard
          icon="📈"
          title="Trend Scout"
          price="€49/mo"
          tag="ADD-ON"
          desc="Weekly trend reports tailored to your industry and audience."
        />
        <AddonCard
          icon="✉️"
          title="Newsletter Autopilot"
          price="€49/mo"
          tag="ADD-ON"
          desc="Monthly email newsletter written and designed for your brand."
        />
      </div>
    </section>
  );
};

export default AddonsSection;
