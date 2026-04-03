import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">BusaAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/plan">Get Started</Link>
          </Button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-4 space-y-4">
          <a href="#features" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Button asChild size="sm" className="w-full">
            <Link to="/plan" onClick={() => setOpen(false)}>Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
