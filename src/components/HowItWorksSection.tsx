const steps = [
  { num: "01", title: "Share Your Vision", desc: "Tell us about your business idea, budget, and preferred location." },
  { num: "02", title: "AI Analyzes Everything", desc: "Our AI evaluates market data, costs, competition, and opportunities." },
  { num: "03", title: "Get Your Business Plan", desc: "Receive a comprehensive plan with financial projections, strategies, and next steps." },
  { num: "04", title: "Launch & Grow", desc: "Execute with confidence using ongoing AI insights and recommendations." },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">Four simple steps to your perfect business plan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="text-5xl font-bold text-primary/15 mb-3">{s.num}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
