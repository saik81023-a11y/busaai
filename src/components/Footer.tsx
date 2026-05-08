import VisitorCounter from "./VisitorCounter";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="font-display text-lg font-extrabold text-primary">
          Busa<span className="font-normal text-muted-foreground">AI</span>
        </div>
        <p className="text-center text-xs text-muted-foreground/80 md:text-left">
          AI-powered business planning for every entrepreneur, everywhere.
        </p>
        <div className="flex items-center gap-4">
          <VisitorCounter />
          <a href="mailto:contactbusaai@gmail.com" className="text-xs text-muted-foreground hover:text-foreground">
            contactbusaai@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground/60">
        © 2026 BusaAI · Engineering Your Entrepreneurship Vision
      </div>
    </footer>
  );
};

export default Footer;
