import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, Save, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Business Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          Turn Your Ideas Into
          <span className="block bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
            Profitable Businesses
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Get AI-driven insights on finances, location analysis, market strategies,
          workforce planning, and everything you need to launch and grow your business.
        </p>

        <p className="text-base text-primary font-semibold mb-4 italic">
          ✨ "Engineering Your Entrepreneurship Vision"
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted">
            <Save className="w-3.5 h-3.5 text-primary" /> Save your plan to revisit anytime
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted">
            <Globe className="w-3.5 h-3.5 text-primary" /> Explore ideas worldwide
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            <Link to="/plan">Start Planning <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span>AI Analysis</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>🚀 1,000,000+ Business Plans</span>
          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>Free to Start</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
