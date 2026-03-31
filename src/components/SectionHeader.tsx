interface SectionHeaderProps {
  num: string;
  title: string;
  explain: string;
}

const SectionHeader = ({ num, title, explain }: SectionHeaderProps) =>
<>
    <div className="flex items-baseline gap-4 mb-3">
      <span className="font-serif text-sm font-normal text-primary">{num}</span>
      <span className="font-serif text-4xl tracking-normal font-normal text-primary">{title}</span>
    </div>
    <div className="h-px bg-border mb-2.5" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-[680px]">{explain}</p>
  </>;


export default SectionHeader;