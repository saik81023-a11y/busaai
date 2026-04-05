import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] p-12 md:p-16 shadow-2xl shadow-primary/20">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Build Your Dream Business? 🚀
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-4 max-w-xl mx-auto">
          Let AI guide you through every step — from idea to income.
        </p>
        <p className="text-primary-foreground/70 text-sm mb-8 max-w-xl mx-auto">
          💾 Save your plan to revisit anytime • 📥 Download as TXT or Word
        </p>
        <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
          <Link to="/plan">Get Started Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
