import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

/* ─── Data shape ─── */

export interface BrandColors {
  hex: string;
  light: boolean;
}

export interface InstagramPost {
  bg: string;
  likes: number;
  comments: number;
}

export interface Objective {
  icon: string;
  label: string;
  value: string;
}

export interface PackageFeature {
  text: string;
  locked: boolean;
}

export interface PackageData {
  name: string;
  desc: string;
  price: string;
  recommended: boolean;
  features: PackageFeature[];
}

export interface BrandData {
  /* General */
  brandName: string;
  website: string;
  brandEssence: string;

  /* Identity */
  colors: BrandColors[];
  fonts: { display: string; body: string };
  values: string[];
  aesthetic: string[];
  tones: string[];

  /* Briefing */
  businessOverview: string;
  aiBriefing: string;

  /* Instagram */
  instagramHandle: string;
  instagramStats: { val: string; lbl: string }[];
  instagramPosts: InstagramPost[];
  objectives: Objective[];

  /* Content Calendar */
  calendarMonth: string;
  calendarExplain: string;

  /* Packages */
  packages: PackageData[];
  recommendedExplain: string;
}

/* ─── Default / fallback data (Blumenhaus Martina) ─── */

const defaultData: BrandData = {
  brandName: "Blumenhaus Martina",
  website: "blumenhaus-martina.de",
  brandEssence: "Wo jede Blume eine Geschichte erzählt.",

  colors: [
    { hex: "#2D4A3E", light: false },
    { hex: "#F2C4A0", light: true },
    { hex: "#E8DDD0", light: true },
    { hex: "#111111", light: false },
  ],
  fonts: { display: "Instrument Serif", body: "DM Sans" },
  values: ["Authentisch", "Nachhaltig", "Lokal"],
  aesthetic: ["Natural", "Warm", "Artisanal"],
  tones: ["Persönlich", "Einladend"],

  businessOverview:
    "Blumenhaus Martina ist ein inhabergeführtes Blumengeschäft in Hamburg-Altona, das seit 2015 frische Saisonsblumen, handgefertigte Sträuße und nachhaltige Pflanzenpflege anbietet. Die Marke setzt auf lokale Lieferketten und persönliche Beratung als Differenzierungsmerkmal gegenüber Supermärkten und Online-Anbietern.",
  aiBriefing:
    "Die visuelle Kommunikation sollte die Wärme und Handwerkskunst des Ladens widerspiegeln. Empfohlen: natürliches Licht, erdige Töne, nahbare Texte ohne Marketingfloskeln. Die Hauptzielgruppe — Frauen 28–45 in Hamburg — schätzt Authentizität über Perfektion. Instagram und Pinterest sind die relevantesten Kanäle. Empfohlener Content-Mix: 40% Produkte in Szene gesetzt, 30% Behind-the-scenes, 30% Saison- und Eventinhalte.",

  instagramHandle: "@blumenhaus.martina",
  instagramStats: [
    { val: "2.4K", lbl: "Followers" },
    { val: "3.2%", lbl: "Engagement" },
    { val: "8", lbl: "Posts / Monat" },
    { val: "↗ +4%", lbl: "Wachstum" },
  ],
  instagramPosts: [
    { bg: "linear-gradient(135deg,#2D4A3E,#4a7c68)", likes: 84, comments: 6 },
    { bg: "linear-gradient(135deg,#F2C4A0,#e8a07a)", likes: 112, comments: 14 },
    { bg: "linear-gradient(135deg,#E8DDD0,#d4c4b0)", likes: 67, comments: 3 },
    { bg: "linear-gradient(135deg,#5c3a2a,#8a5a3c)", likes: 145, comments: 21 },
    { bg: "linear-gradient(135deg,#2D4A3E,#1a2e26)", likes: 93, comments: 8 },
    { bg: "linear-gradient(135deg,#F2C4A0,#f5d5ba)", likes: 78, comments: 5 },
  ],
  objectives: [
    { icon: "🎯", label: "Hauptziel", value: "Mehr lokale Sichtbarkeit" },
    { icon: "📱", label: "Hauptkanal", value: "Instagram + Stories" },
    { icon: "📸", label: "Assets vorhanden", value: "Eigene Fotos, kein Video" },
    { icon: "💸", label: "Paid Ads", value: "Noch nicht aktiv" },
  ],

  calendarMonth: "März",
  calendarExplain:
    "Basierend auf deinen Zielen und deiner Brand-DNA haben wir einen ersten Content-Plan für März erstellt. Posts, Reels und Stories sind bereits auf deine beste Posting-Zeit abgestimmt.",

  packages: [
    {
      name: "Starter",
      desc: "Für Unternehmen, die einen ersten Schritt im Social Media machen möchten.",
      price: "€349",
      recommended: false,
      features: [
        { text: "12 Posts / Monat", locked: false },
        { text: "2 Plattformen (IG + FB)", locked: false },
        { text: "Brand DNA Board", locked: false },
        { text: "4 Reels / Stories", locked: false },
        { text: "Content-Kalender", locked: false },
        { text: "Analytics Dashboard", locked: true },
        { text: "Ads Analyst", locked: true },
        { text: "UGC Videos", locked: true },
      ],
    },
    {
      name: "Essential",
      desc: "Für wachsende Unternehmen, die Content ernst nehmen und messbare Ergebnisse wollen.",
      price: "€599",
      recommended: true,
      features: [
        { text: "24 Posts / Monat", locked: false },
        { text: "3 Plattformen (+ LinkedIn)", locked: false },
        { text: "Brand DNA Board", locked: false },
        { text: "7 Reels / Stories", locked: false },
        { text: "Analytics Dashboard", locked: false },
        { text: "Ads Analyst ✦", locked: false },
        { text: "UGC Videos", locked: true },
        { text: "TikTok Integration", locked: true },
        { text: "Motion Graphics", locked: true },
      ],
    },
    {
      name: "Advanced",
      desc: "Für Unternehmen, die ihre Social-Media-Präsenz vollständig skalieren möchten.",
      price: "€999",
      recommended: false,
      features: [
        { text: "40 Posts / Monat", locked: false },
        { text: "4 Plattformen (+ TikTok)", locked: false },
        { text: "Brand DNA Board", locked: false },
        { text: "12 Reels mit Motion Graphics", locked: false },
        { text: "Analytics Dashboard", locked: false },
        { text: "Ads Analyst", locked: false },
        { text: "UGC Generator ✦", locked: false },
        { text: "Trend Scout", locked: false },
        { text: "10 Revisionsrunden", locked: false },
      ],
    },
  ],
  recommendedExplain:
    "Basierend auf deinen Zielen, deinem aktuellen Stand und deiner Branche empfehlen wir dir das Essential-Paket. Hier siehst du auch, was mit einem anderen Paket noch möglich wäre.",
};

/* ─── Context ─── */

const BrandDataContext = createContext<BrandData>(defaultData);

export const useBrandData = () => useContext(BrandDataContext);

/** Deep-merge param data over defaults so partial JSON works */
function mergeData(partial: Partial<BrandData>): BrandData {
  return { ...defaultData, ...partial };
}

export const BrandDataProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const data = useMemo(() => {
    const encoded = searchParams.get("d");
    if (!encoded) return defaultData;
    try {
      const json = atob(encoded);
      const parsed = JSON.parse(json) as Partial<BrandData>;
      return mergeData(parsed);
    } catch (e) {
      console.warn("Failed to parse ?d= parameter:", e);
      return defaultData;
    }
  }, [searchParams]);

  return (
    <BrandDataContext.Provider value={data}>
      {children}
    </BrandDataContext.Provider>
  );
};
