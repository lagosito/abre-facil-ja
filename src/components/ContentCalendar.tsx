import { useMemo } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";
import PremiumAddonCard from "./PremiumAddonCard";

type DayType = "empty" | "normal" | "post" | "reel" | "story";

const dayStyles: Record<DayType, string> = {
  empty: "bg-transparent",
  normal: "bg-surface text-muted-foreground",
  post: "bg-foreground text-background font-bold",
  reel: "bg-primary text-primary-foreground font-bold",
  story: "bg-purple-600 text-primary-foreground font-bold",
};

function generateCalendar(totalPosts: number, year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const reels = Math.round(totalPosts * 0.3);
  const stories = Math.round(totalPosts * 0.2);
  const posts = totalPosts - reels - stories;

  const contentDays: Set<number> = new Set();
  if (totalPosts > 0 && daysInMonth > 0) {
    const spacing = daysInMonth / totalPosts;
    for (let i = 0; i < totalPosts; i++) {
      let day = Math.round(spacing * i + spacing / 2);
      day = Math.min(day, daysInMonth);
      day = Math.max(day, 1);
      while (contentDays.has(day) && day <= daysInMonth) day++;
      if (day <= daysInMonth) contentDays.add(day);
    }
  }

  const sortedDays = Array.from(contentDays).sort((a, b) => a - b);
  const dayTypeMap: Record<number, DayType> = {};
  let postCount = 0;
  let reelCount = 0;
  sortedDays.forEach((d, i) => {
    if (reelCount < reels && i % 3 === 1) {
      dayTypeMap[d] = "reel";
      reelCount++;
    } else if (postCount < posts) {
      dayTypeMap[d] = "post";
      postCount++;
    } else if (reelCount < reels) {
      dayTypeMap[d] = "reel";
      reelCount++;
    } else {
      dayTypeMap[d] = "story";
    }
  });

  sortedDays.forEach((d) => {
    if (!dayTypeMap[d]) dayTypeMap[d] = "story";
  });

  const grid: { num: string; type: DayType }[] = [];
  for (let i = 0; i < startOffset; i++) {
    grid.push({ num: "", type: "empty" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({ num: String(d), type: dayTypeMap[d] || "normal" });
  }

  return {
    grid,
    counts: { posts: postCount, reels: reelCount, stories: totalPosts - postCount - reelCount },
  };
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const ContentCalendar = () => {
  const { contentInsights } = useBrandData();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentPosts = contentInsights?.postsPerMonth || 0;
  const rawIdeal = contentInsights?.idealPostsPerMonth || 18;
  const idealPosts = rawIdeal > currentPosts ? rawIdeal : currentPosts + 3;

  const month1Idx = (currentMonth + 1) % 12;
  const month1Year = currentMonth === 11 ? currentYear + 1 : currentYear;
  const month2Idx = (currentMonth + 2) % 12;
  const month2Year = currentMonth >= 10 ? currentYear + 1 : currentYear;

  const idealMonth2 = Math.round(idealPosts * 1.15);

  const cal1 = useMemo(() => generateCalendar(idealPosts, month1Year, month1Idx), [idealPosts, month1Year, month1Idx]);
  const cal2 = useMemo(() => generateCalendar(idealMonth2, month2Year, month2Idx), [idealMonth2, month2Year, month2Idx]);

  return (
    <section className="mb-16">
      <SectionHeader
        num="04"
        title="Your Automated Publishing Plan"
        explain="Based on your Brand DNA, industry benchmark, and goals, El Kiosk has created an optimized content plan. This calendar shows what will be automatically produced and scheduled after activation."
      />

      {/* Summary bar */}
      <div className="bg-card rounded-lg p-5 mb-3.5 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Current</div>
              <div className="font-serif italic text-2xl text-red-500">{currentPosts} <span className="text-sm text-muted-foreground font-sans not-italic">Posts/Month</span></div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-primary">With El Kiosk</div>
              <div className="font-serif italic text-2xl text-primary">{idealPosts} <span className="text-sm text-muted-foreground font-sans not-italic">Posts/Month</span></div>
            </div>
          </div>
          <div className="flex gap-5">
            {[
              { color: "bg-foreground", label: "Post", count: cal1.counts.posts },
              { color: "bg-primary", label: "Reel", count: cal1.counts.reels },
              { color: "bg-purple-600", label: "Story", count: cal1.counts.stories },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <div className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
                {l.count}× {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3.5">
        {/* Month 1 Calendar */}
        <div className="col-span-12 md:col-span-6 bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">
              {monthNames[month1Idx]} {month1Year}
            </div>
            <div className="px-2.5 py-1 rounded-pill bg-primary/10 text-primary text-[10px] font-bold">
              {idealPosts} Posts planned
            </div>
          </div>
          <CalendarGrid days={cal1.grid} />
        </div>

        {/* Month 2 Calendar */}
        <div className="col-span-12 md:col-span-6 bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.06s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">
              {monthNames[month2Idx]} {month2Year}
            </div>
            <div className="px-2.5 py-1 rounded-pill bg-primary/10 text-primary text-[10px] font-bold">
              {idealMonth2} Posts planned
            </div>
          </div>
          <CalendarGrid days={cal2.grid} />
        </div>

        {/* Add-ons */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <PremiumAddonCard
            id="seasonal-planner"
            icon="📅"
            title="Seasonal Campaign Planner"
            price="€19"
            tag="PLANNING"
            purchasable
            buttonLabel="Buy now — €19"
            previewText="Annual calendar with industry-relevant campaign occasions: Black Friday, holidays, Awareness Days — including content ideas for each occasion."
            lockedItems={[]}
          />
          <AddonCard icon="📈" title="Trend Scout" price="€49/month" tag="ADD-ON" desc="Every week: what's going viral in your industry on Instagram — delivered as content ideas directly into your calendar." />
          <AddonCard icon="✉️" title="Newsletter Autopilot" price="€49/month" tag="ADD-ON" desc="Weekly or bi-weekly newsletter — automatically generated with industry news, brand updates, and CTA. You just approve." />
        </div>
      </div>
    </section>
  );
};

const CalendarGrid = ({ days }: { days: { num: string; type: DayType }[] }) => (
  <>
    <div className="grid grid-cols-7 gap-[5px]">
      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
        <div key={d} className="text-center text-[9px] uppercase tracking-[0.1em] font-bold text-muted-foreground pb-1.5">{d}</div>
      ))}
      {days.map((d, i) => (
        <div key={i} className={`aspect-square rounded-[6px] flex items-center justify-center text-[10px] ${dayStyles[d.type]}`}>
          {d.num}
        </div>
      ))}
    </div>
    <div className="flex gap-3 mt-3">
      {[
        { color: "bg-foreground", label: "Post" },
        { color: "bg-primary", label: "Reel" },
        { color: "bg-purple-600", label: "Story" },
      ].map((l) => (
        <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <div className={`w-2 h-2 rounded-sm ${l.color}`} />
          {l.label}
        </div>
      ))}
    </div>
  </>
);

export default ContentCalendar;
