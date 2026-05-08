const features = [
  { icon: "📊", title: "Feasibility Score", desc: "Get a 0–100 score backed by market data, location factors, competition density, and current demand trends." },
  { icon: "💰", title: "Budget Planner", desc: "Receive a realistic startup budget broken down by setup, operations, marketing, and working capital." },
  { icon: "📍", title: "Location Intelligence", desc: "Discover the best localities based on footfall, demographics, and competitor density." },
  { icon: "⚠️", title: "Risk Assessment", desc: "Understand key risks before you invest — regulation, competition, saturation, and seasonality." },
  { icon: "🚀", title: "Launch Roadmap", desc: "Get a practical 90-day action plan with milestones, priorities, and first steps." },
  { icon: "🌍", title: "Global Coverage", desc: "Works for any city, any country. BusaAI understands local regulations and market dynamics worldwide." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
        <span className="inline-block h-px w-4 bg-primary" />
        What you get
      </div>
      <h2 className="mb-3 font-display text-3xl font-extrabold tracking-tight md:text-[2.2rem]">
        Everything you need to plan smart
      </h2>
      <p className="mb-12 max-w-xl font-light text-muted-foreground">
        From validation to launch — every signal in one place.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-lg">
              {f.icon}
            </div>
            <h3 className="mb-2 font-display text-base font-bold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
