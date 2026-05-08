const steps = [
  { n: 1, title: "Enter your idea", desc: "Describe your business concept in plain language" },
  { n: 2, title: "Add context", desc: "Set your location, budget, and experience level" },
  { n: 3, title: "AI analyzes", desc: "Our model processes market signals in real time" },
  { n: 4, title: "Get your plan", desc: "Download a complete feasibility report instantly" },
];

const HowItWorksSection = () => {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
        <span className="inline-block h-px w-4 bg-primary" />
        Process
      </div>
      <h2 className="mb-12 font-display text-3xl font-extrabold tracking-tight md:text-[2.2rem]">
        How it works
      </h2>

      <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
        <div
          className="absolute left-[10%] right-[10%] top-7 hidden h-px lg:block"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), hsl(var(--border)), transparent)" }}
        />
        {steps.map((s) => (
          <div key={s.n} className="relative z-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-card font-display text-lg font-extrabold text-primary">
              {s.n}
            </div>
            <h4 className="mb-1 font-display text-sm font-bold">{s.title}</h4>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
