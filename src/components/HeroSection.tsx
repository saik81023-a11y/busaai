import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
      <div>
        <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          <span className="inline-block h-px w-6 bg-primary" />
          AI Business Planning
        </div>
        <h1 className="mb-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.2rem]">
          Turn your idea into a <span className="text-primary">funded plan</span>
        </h1>
        <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
          Get AI-powered feasibility scores, recommended budgets, location insights, and a practical roadmap — in under 30 seconds.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/plan"
            className="rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-glow"
          >
            Analyze my idea →
          </Link>
          <a
            href="#how"
            className="rounded-lg border border-border-strong px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Hero card */}
      <div className="relative hidden overflow-hidden rounded-2xl border border-border bg-card p-7 md:block">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)" }}
        />
        <div className="mb-6 flex items-center justify-between">
          <div className="font-display text-sm font-bold">Cloud Kitchen — Hyderabad</div>
          <div className="rounded-full bg-primary/15 px-2.5 py-1 text-[0.7rem] font-medium text-primary">
            ✦ AI Analysis
          </div>
        </div>
        <div className="mx-auto mb-5 flex h-20 w-20 flex-col items-center justify-center rounded-full border-[3px] border-primary">
          <div className="font-display text-2xl font-extrabold leading-none text-primary">82</div>
          <div className="text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">Score</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { l: "Budget", v: "₹8.5L", s: "Recommended start" },
            { l: "ROI Est.", v: "14 mo", s: "Break-even" },
            { l: "Market", v: "High", s: "Demand score" },
            { l: "Risk", v: "Medium", s: "Competition" },
          ].map((m) => (
            <div key={m.l} className="rounded-[10px] bg-accent p-3.5">
              <div className="mb-1 text-[0.7rem] uppercase tracking-wide text-muted-foreground">{m.l}</div>
              <div className="font-display text-base font-bold">{m.v}</div>
              <div className="mt-0.5 text-[0.7rem] text-muted-foreground/70">{m.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
