import { useState, useMemo } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import PremiumAddonCard from "./PremiumAddonCard";

const ExpandableText = ({ text, lineClamp = 3 }: { text: string; lineClamp?: number }) => {
  const [expanded, setExpanded] = useState(false);
  const