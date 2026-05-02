const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border px-6 md:px-12 h-[60px] flex items-center justify-between">
      <a href="https://www.elkiosk.ai/" className="font-serif italic text-[22px] tracking-tight cursor-pointer no-underline text-foreground">
        el <span className="text-primary">Kiosk</span>
      </a>
      <div className="hidden md:block font-mono text-[13px] text-muted-foreground">
        [ Brand Intelligence Report ]
      </div>
      <a
        href="#packages"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="bg-primary text-primary-foreground px-5 py-2.5 rounded-pill text-sm font-semibold hover:brightness-90 transition-all no-underline"
      >
        Choose Plan ↗
      </a>
    </nav>
  );
};

export default Navbar;
