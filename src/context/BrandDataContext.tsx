import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export interface BrandColors {
  hex: string;
  light: boolean;
}

export interface InstagramPost {
  bg?: string;
  imageUrl?: string;
  url?: string;
  likes: number;
  comments: number;
  type?: string;
  caption?: string;
}

export interface GrowthProjection {
  current: string;
  month3: string;
  month6: string;
  month12: string;
  currentEng: string;
  month3Eng: string;
  month6Eng: string;
  month12Eng: string;
  percentGrowth3: string;
  percentGrowth6: string;
  percentGrowth12: string;
}

export interface ContentInsights {
  bestPostLikes: number;
  bestPostComments: number;
  bestPostCaption: string;
  avgLikes: number;
  avgComments: number;
  postsPerMonth: number;
  idealPostsPerMonth: number;
  engagementRate: number;
  benchmarkRate: number;
  aboveBenchmark: boolean;
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
  brandName: string;
  website: string;
  brandEssence: string;
  firstName: string;
  chatId: string;
  brandLogoUrl: string;
  logoBgColor: string;
  colors: BrandColors[];
  fonts: { display: string; body: string };
  values: string[];
  aesthetic: string[];
  tones: string[];
  businessOverview: string;
  aiBriefing: string;
  targetAudience: string;
  contentOpportunities: string;
  positioning: string;
  platforms: string;
  instagramHandle: string;
  instagramStats: { val: string; lbl: string }[];
  instagramPosts: InstagramPost[];
  growthProjection: GrowthProjection | null;
  contentInsights: ContentInsights | null;
  objectives: Objective[];
  calendarMonth: string;
  calendarExplain: string;
  packages: PackageData[];
  recommendedExplain: string;
}

interface IncomingData {
  brandName?: string;
  website?: string;
  brandEssence?: string;
  colors?: { hex: string; light: boolean }[];
  fonts?: { display: string; body: string };
  values?: string[];
  aesthetic?: string[];
  tones?: string[];
  businessOverview?: string;
  aiBriefing?: string;
  instagramHandle?: string;
  instagramStats?: { val: string; lbl: string }[];
  instagramPosts?: { bg?: string; imageUrl?: string; url?: string; likes: number; comments: number; type?: string; caption?: string }[];
  chatId?: string;
  firstName?: string;
  brand_logo_url?: string;
  logoUrl?: string;
  logoBgColor?: string;
  tagline?: string;
  websiteUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  darkColor?: string;
  fontName?: string;
  brandValues?: string[];
  toneOfVoice?: string[];
  overview?: string;
  targetAudience?: string;
  contentOpportunities?: string;
  positioning?: string;
  platforms?: string;
  contentStrategy?: string;
  growthProjection?: GrowthProjection;
  contentInsights?: ContentInsights;
  objectives?: Objective[];
  status?: string;
  brandDna?: string;
  _partial?: boolean;
  _status?: string;
}

export type LoadingStage = "waiting" | "complete";

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

const defaultData: BrandData = {
  brandName: "Blumenhaus Martina",
  website: "blumenhaus-martina.de",
  brandEssence: "Wo jede Blume eine Geschichte erzählt.",
  firstName: "",
  chatId: "",
  brandLogoUrl: "",
  logoBgColor: "#111111",
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
  businessOverview: "Blumenhaus Martina ist ein inhabergeführtes Blumengeschäft in Hamburg-Altona, das seit 2015 frische Saisonsblumen, handgefertigte Sträuße und nachhaltige Pflanzenpflege anbietet.",
  aiBriefing: "Die visuelle Kommunikation sollte die Wärme und Handwerkskunst des Ladens widerspiegeln.",
  targetAudience: "",
  contentOpportunities: "",
  positioning: "",
  platforms: "",
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
  growthProjection: null,
  contentInsights: null,
  calendarMonth: "März",
  calendarExplain: "Basierend auf deinen Zielen und deiner Brand-DNA haben wir einen ersten Content-Plan für März erstellt.",
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
  recommendedExplain: "Basierend auf deinen Zielen, deinem aktuellen Stand und deiner Branche empfehlen wir dir das Essential-Paket.",
};

function mapIncoming(incoming: IncomingData): Partial<BrandData> {
  const mapped: Partial<BrandData> = {};

  if (incoming.brandName) mapped.brandName = incoming.brandName;
  if (incoming.firstName) mapped.firstName = incoming.firstName;
  if (incoming.chatId) mapped.chatId = incoming.chatId;
  if (incoming.brand_logo_url) mapped.brandLogoUrl = incoming.brand_logo_url;
  if (incoming.logoUrl) mapped.brandLogoUrl = incoming.logoUrl;
  if (incoming.logoBgColor) mapped.logoBgColor = incoming.logoBgColor;

  if (incoming.website) mapped.website = incoming.website;
  if (incoming.brandEssence) mapped.brandEssence = incoming.brandEssence;
  if (incoming.colors?.length) mapped.colors = incoming.colors;
  if (incoming.fonts) mapped.fonts = incoming.fonts;
  if (incoming.values?.length) mapped.values = incoming.values;
  if (incoming.aesthetic?.length) mapped.aesthetic = incoming.aesthetic;
  if (incoming.tones?.length) mapped.tones = incoming.tones;
  if (incoming.businessOverview) mapped.businessOverview = incoming.businessOverview;
  if (incoming.aiBriefing) mapped.aiBriefing = incoming.aiBriefing;
  if (incoming.instagramHandle) mapped.instagramHandle = incoming.instagramHandle;
  if (incoming.instagramStats?.length) mapped.instagramStats = incoming.instagramStats;
  if (incoming.instagramPosts?.length) mapped.instagramPosts = incoming.instagramPosts;
  if (incoming.objectives?.length) mapped.objectives = incoming.objectives;
  if (incoming.growthProjection) mapped.growthProjection = incoming.growthProjection;
  if (incoming.contentInsights) mapped.contentInsights = incoming.contentInsights;

  if (incoming.tagline) mapped.brandEssence = incoming.tagline;
  if (incoming.websiteUrl) mapped.website = incoming.websiteUrl;
  if (incoming.primaryColor || incoming.secondaryColor || incoming.accentColor || incoming.darkColor) {
    const colors: BrandColors[] = [];
    if (incoming.primaryColor) colors.push({ hex: incoming.primaryColor, light: isLightColor(incoming.primaryColor) });
    if (incoming.secondaryColor) colors.push({ hex: incoming.secondaryColor, light: isLightColor(incoming.secondaryColor) });
    if (incoming.accentColor) colors.push({ hex: incoming.accentColor, light: isLightColor(incoming.accentColor) });
    if (incoming.darkColor) colors.push({ hex: incoming.darkColor, light: isLightColor(incoming.darkColor) });
    mapped.colors = colors;
  }
  if (incoming.fontName) mapped.fonts = { display: incoming.fontName, body: "DM Sans" };
  if (incoming.brandValues) mapped.values = incoming.brandValues;
  if (incoming.toneOfVoice) mapped.tones = incoming.toneOfVoice;
  if (incoming.overview) mapped.businessOverview = incoming.overview;
  if (incoming.contentStrategy) mapped.aiBriefing = incoming.contentStrategy;
  if (incoming.targetAudience) mapped.targetAudience = incoming.targetAudience;
  if (incoming.contentOpportunities) mapped.contentOpportunities = incoming.contentOpportunities;
  if (incoming.positioning) mapped.positioning = incoming.positioning;
  if (incoming.platforms) mapped.platforms = incoming.platforms;

  return mapped;
}

/* ── Auto-save webhook (debounced) ── */
const SAVE_WEBHOOK = "https://lagosito.app.n8n.cloud/webhook/elk-save-customizations";
const SAVE_DEBOUNCE_MS = 2000;

interface UserCustomizations {
  colors?: BrandColors[];
  fonts?: { display: string; body: string };
  values?: string[];
  tones?: string[];
  selectedObjectives?: string[];
  selectedAddons?: string[];
  userEmail?: string;
}

function useAutoSave(recordId: string | null, chatId: string, brandName: string) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPayloadRef = useRef<string>("");

  const save = useCallback(
    (customizations: UserCustomizations) => {
      if (!recordId) return;

      const payload = JSON.stringify({
        recordId,
        chatId,
        brandName,
        customizations,
        savedAt: new Date().toISOString(),
      });

      // Skip if nothing changed
      if (payload === lastPayloadRef.current) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        lastPayloadRef.current = payload;
        fetch(SAVE_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: payload,
        }).catch((e) => console.warn("Auto-save failed:", e));
      }, SAVE_DEBOUNCE_MS);
    },
    [recordId, chatId, brandName]
  );

  return save;
}

/* ── Context ── */
type ProcessingState = "idle" | "processing" | "timeout";

interface BrandDataContextValue {
  data: BrandData;
  loading: boolean;
  processing: ProcessingState;
  loadingStage: LoadingStage;
  retryProcessing: () => void;
  recordId: string | null;
  selectedObjectives: string[];
  setSelectedObjectives: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAddons: string[];
  setSelectedAddons: React.Dispatch<React.SetStateAction<string[]>>;
  userEmail: string;
  setUserEmail: (email: string) => void;
  hasInteracted: boolean;
  markInteraction: () => void;
  triggerSave: (customizations: UserCustomizations) => void;
}

const BrandDataContext = createContext<BrandDataContextValue>({
  data: defaultData,
  loading: false,
  processing: "idle",
  loadingStage: "complete",
  retryProcessing: () => {},
  recordId: null,
  selectedObjectives: [],
  setSelectedObjectives: () => {},
  selectedAddons: [],
  setSelectedAddons: () => {},
  userEmail: "",
  setUserEmail: () => {},
  hasInteracted: false,
  markInteraction: () => {},
  triggerSave: () => {},
});

export const useBrandData = () => {
  const ctx = useContext(BrandDataContext);
  return {
    ...ctx.data,
    loading: ctx.loading,
    processing: ctx.processing,
    loadingStage: ctx.loadingStage,
    retryProcessing: ctx.retryProcessing,
    recordId: ctx.recordId,
    selectedObjectives: ctx.selectedObjectives,
    setSelectedObjectives: ctx.setSelectedObjectives,
    selectedAddons: ctx.selectedAddons,
    setSelectedAddons: ctx.setSelectedAddons,
    userEmail: ctx.userEmail,
    setUserEmail: ctx.setUserEmail,
    hasInteracted: ctx.hasInteracted,
    markInteraction: ctx.markInteraction,
    triggerSave: ctx.triggerSave,
  };
};

export const BrandDataProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const dParam = searchParams.get("d");
  const [data, setData] = useState<BrandData>(defaultData);
  const [loading, setLoading] = useState(!!idParam);
  const [processing, setProcessing] = useState<ProcessingState>(idParam ? "processing" : "idle");
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(idParam ? "waiting" : "complete");
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [userEmail, setUserEmailState] = useState<string>("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollSessionRef = useRef(0);

  const recordId = idParam;
  const autoSave = useAutoSave(recordId, data.chatId, data.brandName);

  const markInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const setUserEmail = useCallback(
    (email: string) => {
      setUserEmailState(email);
      if (recordId && email.includes("@")) {
        const payload = JSON.stringify({
          recordId,
          chatId: data.chatId,
          brandName: data.brandName,
          customizations: { userEmail: email },
          savedAt: new Date().toISOString(),
        });

        fetch(SAVE_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: payload,
        }).catch((e) => console.warn("Email save failed:", e));

        fetch("https://lagosito.app.n8n.cloud/webhook/elk-email-confirm", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: payload,
        }).catch((e) => console.warn("Email confirm failed:", e));
      }
    },
    [recordId, data.chatId, data.brandName]
  );

  const triggerSave = useCallback(
    (customizations: UserCustomizations) => {
      autoSave(customizations);
    },
    [autoSave]
  );

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const fetchBrandData = useCallback(
    async (id: string, sessionId: number) => {
      const url = `https://lagosito.app.n8n.cloud/webhook/elk-get-dna?id=${encodeURIComponent(id)}`;

      try {
        const response = await fetch(url, { mode: "cors" });
        console.log("[Polling]", response);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const brandDna = (await response.json()) as IncomingData;

        if (sessionId !== pollSessionRef.current) {
          return;
        }

        const hasPartialData = brandDna?._status === "analyzing" && brandDna?._partial === true;
        const hasFullData = !!(brandDna?.brandName && brandDna.brandName.trim() !== "") && brandDna?._status !== "analyzing";

        if (!hasPartialData && !hasFullData) {
          setLoading(true);
          setProcessing("processing");
          setLoadingStage("waiting");
          return;
        }

        const mapped = mapIncoming(brandDna);
        pollSessionRef.current += 1;
        stopPolling();
        setData((prev) => ({ ...prev, ...mapped }));
        setLoading(false);
        setProcessing("idle");
        setLoadingStage(hasPartialData ? "partial" : "complete");
      } catch {
        if (sessionId !== pollSessionRef.current) {
          return;
        }

        setLoading(true);
        setProcessing("processing");
        setLoadingStage("waiting");
      }
    },
    [stopPolling]
  );

  const retryProcessing = useCallback(() => {
    if (!idParam) return;
    stopPolling();
    setLoading(true);
    setProcessing("processing");
    setLoadingStage("waiting");
    setRetryKey((prev) => prev + 1);
  }, [idParam, stopPolling]);

  useEffect(() => {
    stopPolling();

    if (idParam) {
      setLoading(true);
      setProcessing("processing");
      setLoadingStage("waiting");

      pollSessionRef.current += 1;
      const sessionId = pollSessionRef.current;

      void fetchBrandData(idParam, sessionId);

      pollIntervalRef.current = setInterval(() => {
        void fetchBrandData(idParam, sessionId);
      }, 4000);

      timeoutRef.current = setTimeout(() => {
        if (sessionId !== pollSessionRef.current) {
          return;
        }

        pollSessionRef.current += 1;
        stopPolling();
        setLoading(false);
        setProcessing("timeout");
        setLoadingStage("waiting");
      }, 90000);

      return () => {
        pollSessionRef.current += 1;
        stopPolling();
      };
    }

    if (dParam) {
      try {
        const json = atob(dParam);
        const parsed = JSON.parse(json) as IncomingData;
        const mapped = mapIncoming(parsed);
        setData({ ...defaultData, ...mapped });
      } catch (e) {
        console.warn("Failed to parse ?d= parameter:", e);
        setData(defaultData);
      }
    } else {
      setData(defaultData);
    }

    setLoading(false);
    setProcessing("idle");
    setLoadingStage("complete");

    return () => {
      pollSessionRef.current += 1;
      stopPolling();
    };
  }, [idParam, dParam, fetchBrandData, retryKey, stopPolling]);

  return (
    <BrandDataContext.Provider
      value={{
        data,
        loading,
        processing,
        loadingStage,
        retryProcessing,
        recordId,
        selectedObjectives,
        setSelectedObjectives,
        selectedAddons,
        setSelectedAddons,
        userEmail,
        setUserEmail,
        hasInteracted,
        markInteraction,
        triggerSave,
      }}
    >
      {children}
    </BrandDataContext.Provider>
  );
};
