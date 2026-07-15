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

export interface Lookalike {
  company_name: string;
  url: string;
  why_similar: string;
}

export interface Objective {
  icon: string;
  label: string;
  value: string;
  contentIdea?: string;
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
  dos: string[];
  donts: string[];
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
  lookalikes: Lookalike[];
}

interface IncomingData {
  [key: string]: unknown;
  fields?: Record<string, unknown>;
  brandName?: string;
  clientName?: string;
  website?: string;
  brandEssence?: string;
  colors?: { hex: string; light: boolean }[];
  fonts?: { display: string; body: string };
  values?: string[];
  aesthetic?: string[];
  tones?: string[];
  dos?: string[] | string;
  donts?: string[] | string;
  toneTags?: string[] | string;
  aestheticTags?: string[] | string;
  businessOverview?: string;
  aiBriefing?: string;
  instagramHandle?: string;
  instagramStats?: { val: string; lbl: string }[];
  instagramPosts?: { bg?: string; imageUrl?: string; url?: string; likes: number; comments: number; type?: string; caption?: string }[];
  chatId?: string;
  firstName?: string;
  brand_logo_url?: string;
  logo?: string;
  logoUrl?: string;
  brandLogoUrl?: string;
  logoBgColor?: string;
  tagline?: string;
  websiteUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  darkColor?: string;
  lightColor?: string;
  fontName?: string;
  displayFont?: string;
  bodyFont?: string;
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
  customizations?: Record<string, unknown> | string;
  Customizations?: Record<string, unknown> | string;
  _partial?: boolean;
  _status?: string;
  lookalikes?: unknown;
}

export type LoadingStage = "waiting" | "complete" | "error";

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function toList(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/[,\n;|•·]+/)
      .map((s) => s.replace(/^[-–•\s]+/, "").trim())
      .filter(Boolean);
  }
  return [];
}

const defaultData: BrandData = {
  brandName: "Your Brand",
  website: "www.your-website.com",
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
  dos: [],
  donts: [],
  businessOverview: "Blumenhaus Martina ist ein inhabergeführtes Blumengeschäft in Hamburg-Altona, das seit 2015 frische Saisonsblumen, handgefertigte Sträuße und nachhaltige Pflanzenpflege anbietet.",
  aiBriefing: "Die visuelle Kommunikation sollte die Wärme und Handwerkskunst des Ladens widerspiegeln.",
  targetAudience: "",
  contentOpportunities: "",
  positioning: "",
  platforms: "",
  instagramHandle: "",
  instagramStats: [],
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
        { text: "10 Posts / Monat", locked: false },
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
        { text: "20 Posts / Monat", locked: false },
        { text: "3 Plattformen (+ LinkedIn)", locked: false },
        { text: "Brand DNA Board", locked: false },
        { text: "7 Reels / Stories", locked: false },
        { text: "Analytics Dashboard", locked: false },
        { text: "Ads Analyst ❖", locked: false },
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
        { text: "UGC Generator ❖", locked: false },
        { text: "Trend Scout", locked: false },
        { text: "10 Revisionsrunden", locked: false },
      ],
    },
  ],
  recommendedExplain: "Basierend auf deinen Zielen, deinem aktuellen Stand und deiner Branche empfehlen wir dir das Essential-Paket.",
  lookalikes: [],
};

function mapIncoming(incoming: IncomingData): Partial<BrandData> {
  const mapped: Partial<BrandData> = {};

  if (incoming.brandName) mapped.brandName = incoming.brandName;
  if (incoming.clientName) mapped.brandName = incoming.clientName;
  if (incoming.firstName) mapped.firstName = incoming.firstName;
  if (incoming.chatId) mapped.chatId = incoming.chatId;
  if (incoming.brand_logo_url) mapped.brandLogoUrl = incoming.brand_logo_url;
  if (incoming.logoUrl) mapped.brandLogoUrl = incoming.logoUrl;
  if (incoming.brandLogoUrl) mapped.brandLogoUrl = incoming.brandLogoUrl;
  if (incoming.logo) mapped.brandLogoUrl = incoming.logo;
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
  if (incoming.displayFont || incoming.bodyFont) {
    mapped.fonts = {
      display: incoming.displayFont || incoming.fontName || defaultData.fonts.display,
      body: incoming.bodyFont || "DM Sans",
    };
  } else if (incoming.fontName) {
    mapped.fonts = { display: incoming.fontName, body: "DM Sans" };
  }
  if (incoming.brandValues) mapped.values = incoming.brandValues;
  if (incoming.toneOfVoice) mapped.tones = incoming.toneOfVoice;
  if (incoming.toneTags) mapped.tones = toList(incoming.toneTags);
  if (incoming.aestheticTags) mapped.aesthetic = toList(incoming.aestheticTags);
  if (incoming.dos) mapped.dos = toList(incoming.dos);
  if (incoming.donts) mapped.donts = toList(incoming.donts);
  if (incoming.overview) mapped.businessOverview = incoming.overview;
  if (incoming.contentStrategy) mapped.aiBriefing = incoming.contentStrategy;
  if (incoming.targetAudience) mapped.targetAudience = incoming.targetAudience;
  if (incoming.contentOpportunities) mapped.contentOpportunities = incoming.contentOpportunities;
  if (incoming.positioning) mapped.positioning = incoming.positioning;
  if (incoming.platforms) mapped.platforms = incoming.platforms;

  if (Array.isArray(incoming.lookalikes)) {
    mapped.lookalikes = (incoming.lookalikes as unknown[])
      .map((raw) => {
        const l = (raw ?? {}) as Record<string, unknown>;
        return {
          company_name: String(l.company_name ?? l.company ?? "").trim(),
          url: String(l.url ?? "").trim(),
          why_similar: String(l.why_similar ?? l.why ?? "").trim(),
        };
      })
      .filter((l) => l.company_name);
  }

  return mapped;
}

/* ── Auto-save webhook (debounced) ── */
const SAVE_WEBHOOK = "https://lagosito.app.n8n.cloud/webhook/elk-save-customizations";
const SAVE_DEBOUNCE_MS = 2000;
const CLIENT_ENDPOINT = "https://node-banana-v2.vercel.app/api/client";

export interface UserCustomizations {
  colors?: BrandColors[];
  fonts?: { display: string; body: string };
  values?: string[];
  tones?: string[];
  selectedObjectives?: string[];
  selectedAddons?: string[];
  contentFormats?: string[];
  visualStyle?: string | string[] | null;
  benchmark?: string;
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

/* ── Dynamic Google Fonts loader ── */
function useFontLoader(displayFont: string, bodyFont: string) {
  useEffect(() => {
    const families = Array.from(new Set([displayFont, bodyFont].filter(Boolean)));
    if (!families.length) return;
    const id = "elk-dynamic-fonts";
    const href =
      "https://fonts.googleapis.com/css2?" +
      families
        .map((f) => `family=${encodeURIComponent(f)}:ital,wght@0,400;0,500;0,600;0,700;1,400`)
        .join("&") +
      "&display=swap";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  }, [displayFont, bodyFont]);
}

/* ── Context ── */
interface BrandDataContextValue {
  data: BrandData;
  loading: boolean;
  loadingStage: LoadingStage;
  countdown: number;
  recordId: string | null;
  errorMessage: string | null;
  selectedObjectives: string[];
  setSelectedObjectives: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAddons: string[];
  setSelectedAddons: React.Dispatch<React.SetStateAction<string[]>>;
  userEmail: string;
  setUserEmail: (email: string) => void;
  hasInteracted: boolean;
  markInteraction: () => void;
  triggerSave: (customizations: UserCustomizations) => void;
  savedCustomizations: UserCustomizations | null;
}

const BrandDataContext = createContext<BrandDataContextValue>({
  data: defaultData,
  loading: false,
  loadingStage: "complete",
  countdown: 0,
  recordId: null,
  errorMessage: null,
  selectedObjectives: [],
  setSelectedObjectives: () => {},
  selectedAddons: [],
  setSelectedAddons: () => {},
  userEmail: "",
  setUserEmail: () => {},
  hasInteracted: false,
  markInteraction: () => {},
  triggerSave: () => {},
  savedCustomizations: null,
});

export const useBrandData = () => {
  const ctx = useContext(BrandDataContext);
  return {
    ...ctx.data,
    loading: ctx.loading,
    loadingStage: ctx.loadingStage,
    countdown: ctx.countdown,
    recordId: ctx.recordId,
    errorMessage: ctx.errorMessage,
    selectedObjectives: ctx.selectedObjectives,
    setSelectedObjectives: ctx.setSelectedObjectives,
    selectedAddons: ctx.selectedAddons,
    setSelectedAddons: ctx.setSelectedAddons,
    userEmail: ctx.userEmail,
    setUserEmail: ctx.setUserEmail,
    hasInteracted: ctx.hasInteracted,
    markInteraction: ctx.markInteraction,
    triggerSave: ctx.triggerSave,
    savedCustomizations: ctx.savedCustomizations,
  };
};

const COUNTDOWN_SECONDS = 180;
const POLL_MAX_MS = 180_000; // 3 minutes
const POLL_START_MS = 5_000;
const POLL_MAX_INTERVAL_MS = 60_000;
const POLL_MAX_CONSECUTIVE_ERRORS = 2;

export const BrandDataProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const dParam = searchParams.get("d");
  const clientParam = searchParams.get("client");
  const initialLoading = !!idParam || !!clientParam;
  const [data, setData] = useState<BrandData>(defaultData);
  const [loading, setLoading] = useState(initialLoading);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(initialLoading ? "waiting" : "complete");
  const [countdown, setCountdown] = useState(idParam ? COUNTDOWN_SECONDS : 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [userEmail, setUserEmailState] = useState<string>("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [savedCustomizations, setSavedCustomizations] = useState<UserCustomizations | null>(null);

  const recordId = idParam;
  const autoSave = useAutoSave(recordId, data.chatId, data.brandName);

  useFontLoader(data.fonts.display, data.fonts.body);

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

  const applyCustomizations = useCallback((incoming: IncomingData) => {
    const raw = incoming.customizations ?? incoming.Customizations;
    if (!raw) return;
    let parsed: UserCustomizations | null = null;
    try {
      parsed = typeof raw === "string" && raw ? JSON.parse(raw) : (raw as UserCustomizations);
    } catch {
      return;
    }
    if (!parsed || typeof parsed !== "object") return;
    setSavedCustomizations(parsed);
    if (Array.isArray(parsed.selectedObjectives)) setSelectedObjectives(parsed.selectedObjectives);
    if (Array.isArray(parsed.selectedAddons)) setSelectedAddons(parsed.selectedAddons);
    if (typeof parsed.userEmail === "string" && parsed.userEmail) setUserEmailState(parsed.userEmail);
  }, []);

  // ── Fetch by client name ──
  useEffect(() => {
    if (!clientParam || idParam) return;
    let cancelled = false;
    setLoading(true);
    setLoadingStage("waiting");
    setErrorMessage(null);

    (async () => {
      try {
        const url = `${CLIENT_ENDPOINT}?name=${encodeURIComponent(clientParam)}`;
        const res = await fetch(url);
        if (!res.ok) {
          if (res.status === 404) throw new Error("not_found");
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        const client = (json?.client ?? json) as IncomingData | null;
        if (!client || typeof client !== "object") throw new Error("not_found");
        if (cancelled) return;
        const mapped = mapIncoming(client);
        setData({ ...defaultData, ...mapped });
        applyCustomizations(client);
        setLoading(false);
        setLoadingStage("complete");
      } catch (e) {
        if (cancelled) return;
        console.warn("[ELK] Client fetch failed:", e);
        setErrorMessage("No encontramos este cliente");
        setLoading(false);
        setLoadingStage("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clientParam, idParam, applyCustomizations]);

  // ── Polling by record id (legacy) ──
  useEffect(() => {
    if (!idParam) {
      if (clientParam) return; // handled by client fetch effect
      if (dParam) {
        try {
          const json = atob(dParam);
          const parsed = JSON.parse(json) as IncomingData;
          const mapped = mapIncoming(parsed);
          setData({ ...defaultData, ...mapped });
          applyCustomizations(parsed);
        } catch (e) {
          console.warn("Failed to parse ?d= parameter:", e);
          setData(defaultData);
        }
      } else {
        setData(defaultData);
      }
      setLoading(false);
      setLoadingStage("complete");
      return;
    }

    setLoading(true);
    setLoadingStage("waiting");
    setCountdown(COUNTDOWN_SECONDS);
    let stopped = false;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const finishSuccess = (brandDna: IncomingData) => {
      stopped = true;
      clearInterval(countdownInterval);
      if (pollTimer) clearTimeout(pollTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      const mapped = mapIncoming(brandDna);
      setData((prev) => ({ ...prev, ...mapped }));
      applyCustomizations(brandDna);
      setCountdown(0);
      setLoading(false);
      setLoadingStage("complete");
    };

    const failWithError = (reason: string, message: string) => {
      if (stopped) return;
      stopped = true;
      clearInterval(countdownInterval);
      if (pollTimer) clearTimeout(pollTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      console.warn("[ELK] Report load failed:", reason);
      setErrorMessage(message);
      setCountdown(0);
      setLoading(false);
      setLoadingStage("error");
    };

    let pollTimer: ReturnType<typeof setTimeout> | null = null;
    let nextDelay = POLL_START_MS;
    let consecutiveErrors = 0;
    let paused = false;

    const scheduleNext = (delay: number) => {
      if (stopped) return;
      pollTimer = setTimeout(runPoll, delay);
    };

    const runPoll = async () => {
      if (stopped) return;
      if (paused) {
        // Wait for visibility to resume
        pollTimer = null;
        return;
      }
      const url = `https://lagosito.app.n8n.cloud/webhook/elk-get-dna?id=${encodeURIComponent(idParam)}`;
      try {
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) {
          consecutiveErrors += 1;
          if (consecutiveErrors >= POLL_MAX_CONSECUTIVE_ERRORS) {
            failWithError(`http_${response.status}`, "No pudimos cargar este reporte");
            return;
          }
        } else {
          const brandDna = (await response.json()) as IncomingData;
          const isProcessing =
            brandDna?._partial ||
            brandDna?._status === "processing" ||
            brandDna?._status === "analyzing" ||
            brandDna?.status === "processing";
          if (brandDna?.brandName && !isProcessing) {
            finishSuccess(brandDna);
            return;
          }
          consecutiveErrors = 0;
        }
      } catch (e) {
        console.warn("[ELK] Poll error:", e);
        consecutiveErrors += 1;
        if (consecutiveErrors >= POLL_MAX_CONSECUTIVE_ERRORS) {
          failWithError("network", "No pudimos cargar este reporte");
          return;
        }
      }
      if (stopped) return;
      // Exponential backoff: 5s → 10s → 20s → 40s → 60s (cap)
      const delay = nextDelay;
      nextDelay = Math.min(nextDelay * 2, POLL_MAX_INTERVAL_MS);
      scheduleNext(delay);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        paused = true;
        if (pollTimer) {
          clearTimeout(pollTimer);
          pollTimer = null;
        }
      } else if (paused) {
        paused = false;
        if (!stopped && !pollTimer) {
          // Resume immediately
          runPoll();
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Kick off the first poll immediately
    runPoll();

    const timeoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      failWithError("timeout", "This report is taking longer than expected");
    }, POLL_MAX_MS);

    return () => {
      stopped = true;
      clearInterval(countdownInterval);
      if (pollTimer) clearTimeout(pollTimer);
      clearTimeout(timeoutTimer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [idParam, dParam, clientParam, applyCustomizations]);

  return (
    <BrandDataContext.Provider
      value={{
        data,
        loading,
        loadingStage,
        countdown,
        recordId,
        errorMessage,
        selectedObjectives,
        setSelectedObjectives,
        selectedAddons,
        setSelectedAddons,
        userEmail,
        setUserEmail,
        hasInteracted,
        markInteraction,
        triggerSave,
        savedCustomizations,
      }}
    >
      {children}
    </BrandDataContext.Provider>
  );
};
