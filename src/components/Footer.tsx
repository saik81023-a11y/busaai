import { Brain, Mail } from "lucide-react";
import VisitorCounter from "./VisitorCounter";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground tracking-tight">BusaAI</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">🇮🇳 Made in India</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <a href="mailto:contactbusaai@gmail.com" className="hover:text-foreground transition-colors">
              contactbusaai@gmail.com
            </a>
          </div>
          <VisitorCounter />
        </div>
        <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
          <p>© 2026 BusaAI. Explore business ideas throughout the world with AI-powered business planning.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
