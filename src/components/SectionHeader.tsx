interface SectionHeaderProps {
  num: string;
  title: string;
  explain: string;
}

const SectionHeader = ({ num, title, explain }: SectionHeaderProps) => (
  <>
    <div className="flex items-baseline gap-4 mb-3">
      <span className="font-serif italic text-sm text-muted-foreground">{num}</span>
      <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-foreground">{title}</span>
    </div>
    <div className="h-px bg-border mb-2.5" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-[680px]">{explain}</p>
  </>
);

export default SectionHeader;
