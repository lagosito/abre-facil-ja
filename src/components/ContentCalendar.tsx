import { useMemo } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";

type DayType = "empty" | "normal" | "post" | "reel" | "story";

const dayStyles: Record<DayType, string> = {
  empty: "bg-transparent",
  normal: "bg-surface text-muted-foreground",
  post: "bg-foreground text-background font-bold",
  reel: "bg-primary text-primary-foreground font-bold",
  story: "bg-purple-600 text-primary-foreground font-bold",
};

function generateCalendar(totalPosts: number, year: number, month: number) {
  // month is 0-indexed (0 = January)
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Convert Sunday=0 to Monday-based: Mon=0, Tue=1, ..., Sun=6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  // Distribute content types: ~50% posts, ~30% reels, ~20% stories
  const reels = Math.round(totalPosts * 0.3);
  const stories = Math.round(totalPosts * 0.2);
  const posts = totalPosts - reels - stories;

  // Pick evenly-spaced days for content
  const contentDays: Set<number> = new Set();
  if (totalPosts > 0 && daysInMonth > 0) {
    const spacing = daysInMonth / totalPosts;
    for (let i = 0; i < totalPosts; i++) {
      let day = Math.round(spacing * i + spacing / 2);
      day = Math.min(day, daysInMonth);
      day = Math.max(day, 1);
      // Avoid duplicates — shift to nearest free day
      while (contentDays.has(day) && day <= daysInMonth) day++;
      if (day <= daysInMonth) contentDays.add(day);
    }
  }

  // Assign types to content days
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

  // Remaining content days get story type
  sortedDays.forEach((d) => {
    if (!dayTypeMap[d]) dayTypeMap[d] = "story";
  });

  // Build grid
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
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const ContentCalendar = () => {
  const { contentInsights } = useBrandData();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Use ideal posts or default to 18
  const idealPosts = contentInsights?.idealPostsPerMonth || 18;

  // Generate two months
  const month1Idx = (currentMonth + 1) % 12;
  const month1Year = currentMonth === 11 ? currentYear + 1 : currentYear;
  const month2Idx = (currentMonth + 2) % 12;
  const month2Year = currentMonth >= 10 ? currentYear + 1 : currentYear;

  const idealMonth2 = Math.round(idealPosts * 1.15); // slight increase for month 2

  const cal1 = useMemo(() => generateCalendar(idealPosts, month1Year, month1Idx), [idealPosts, month1Year, month1Idx]);
  const cal2 = useMemo(() => generateCalendar(idealMonth2, month2Year, month2Idx), [idealMonth2, month2Year, month2Idx]);

  const currentPosts = contentInsights?.postsPerMonth || 0;

  return (
    <section className="mb-16">
      <SectionHeader
        num="04"
        title="Dein automatisierter Publishing-Plan"
        explain="Basierend auf deiner Brand-DNA, deinem Branchenbenchmark und deinen Zielen hat El Kiosk einen optimierten Content-Plan erstellt. Dieser Kalender zeigt, was nach Aktivierung automatisch produziert und geplant wird."
      />

      {/* Summary bar */}
      <div className="bg-card rounded-lg p-5 mb-3.5 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Aktuell</div>
              <div className="font-serif italic text-2xl text-red-500">{currentPosts} <span className="text-sm text-muted-foreground font-sans not-italic">Posts/Monat</span></div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-primary">Mit El Kiosk</div>
              <div className="font-serif italic text-2xl text-primary">{idealPosts} <span className="text-sm text-muted-foreground font-sans not-italic">Posts/Monat</span></div>
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
              {idealPosts} Posts geplant
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
              {idealMonth2} Posts geplant
            </div>
          </div>
          <CalendarGrid days={cal2.grid} />
        </div>

        {/* Add-on */}
        <div className="col-span-12">
          <AddonCard
            icon="🎬"
            title="UGC Generator"
            desc="Lade ein Produktfoto hoch — wir generieren automatisch einen professionellen UGC-Video für deinen Reel-Kalender. Powered by Sora & VEO3."
          />
        </div>
      </div>
    </section>
  );
};

const CalendarGrid = ({ days }: { days: { num: string; type: DayType }[] }) => (
  <>
    <div className="grid grid-cols-7 gap-[5px]">
      {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
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
