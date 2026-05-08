import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center md:p-14">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)" }}
        />
        <h2 className="mb-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Ready to turn your idea into a business?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-sm font-light text-muted-foreground">
          Save your plan to revisit anytime. Download as TXT or Word.
        </p>
        <Link
          to="/plan"
          className="inline-block rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-glow"
        >
          Start for free →
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
