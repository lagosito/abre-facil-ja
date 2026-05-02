const CTABlocks = () => (
  <>
    {/* Final CTA */}
    <div className="bg-foreground rounded-lg p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between text-background mt-16 mb-8">
      <div>
        <div className="font-serif italic text-[40px] mb-1.5">Ready to get started?</div>
        <div className="text-background/50 text-[15px]">Your Brand DNA is ready. Choose your plan and we'll start this week.</div>
      </div>
      <div className="flex gap-3 mt-6 md:mt-0">
        <a
          href="https://t.me/elkiosk_onboarding_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-foreground/10 text-background px-7 py-3.5 rounded-pill text-sm font-semibold border border-primary-foreground/20 hover:bg-primary-foreground/[0.18] transition-all no-underline"
        >
          Questions? Write us →
        </a>
        <a
          href="#packages"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-primary-foreground text-foreground px-7 py-3.5 rounded-pill text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all no-underline"
        >
          Choose plan ↗
        </a>
      </div>
    </div>
  </>
);

export default CTABlocks;
