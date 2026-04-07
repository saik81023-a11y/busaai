import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, LogOut, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "User";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">BusaAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <Link to="/suggestions" className="hover:text-foreground transition-colors">Suggestions</Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="max-w-[150px] truncate rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Hi, {displayName}
              </span>
              <Button asChild variant="ghost" size="sm">
                <Link to="/saved-plans"><FolderOpen className="w-4 h-4 mr-1" /> My Plans</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/plan">New Plan</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link to="/login">Start Planning for Free</Link>
            </Button>
          )}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg px-6 py-4 space-y-4">
          <a href="/#features" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="/#how-it-works" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <Link to="/suggestions" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Suggestions</Link>
          {user ? (
            <>
              <div className="rounded-lg bg-primary/10 px-3 py-2 text-sm text-foreground">
                Signed in as <span className="font-medium">{displayName}</span>
              </div>
              <Link to="/saved-plans" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">My Plans</Link>
              <Button asChild size="sm" className="w-full">
                <Link to="/plan" onClick={() => setOpen(false)}>New Plan</Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setOpen(false); }}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild size="sm" className="w-full">
              <Link to="/login" onClick={() => setOpen(false)}>Start Planning for Free</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
