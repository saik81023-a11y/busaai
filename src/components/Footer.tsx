import { Brain, Mail } from "lucide-react";
import VisitorCounter from "./VisitorCounter";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">BusaAI</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <a href="mailto:contact@busaai.com" className="hover:text-foreground transition-colors">
              contact@busaai.com
            </a>
          </div>
          <VisitorCounter />
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground space-y-1">
          <p className="italic">"Engineering Your Entrepreneurship Vision"</p>
          <p>© 2026 BusaAI. AI-powered business planning for everyone.</p>
          <p>
            All rights reserved. For enquiries, contact{" "}
            <a href="mailto:contactbusaai@gmail.com" className="text-primary hover:underline">
              contactbusaai@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
