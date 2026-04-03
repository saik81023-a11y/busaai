import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">BusaAI</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 BusaAI. AI-powered business planning for everyone.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
