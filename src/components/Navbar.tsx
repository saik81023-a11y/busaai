import { useState } from "react";
import { Menu, X, LogOut, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <nav className="sticky top-0 z-50 h-[60px] border-b border-border bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-[1.3rem] font-extrabold tracking-tight text-primary">
          Busa<span className="font-normal text-muted-foreground">AI</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li><a href="/#tool" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Try it</a></li>
          <li><a href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a></li>
          <li><a href="/#how" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How it works</a></li>
          <li><Link to="/suggestions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Suggestions</Link></li>
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="max-w-[140px] truncate rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                Hi, {displayName}
              </span>
              <Link
                to="/saved-plans"
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <FolderOpen className="h-4 w-4" /> My Plans
              </Link>
              <Link
                to="/plan"
                className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
              >
                New Plan
              </Link>
              <button
                onClick={signOut}
                title="Sign out"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-primary px-5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow md:inline-flex"
            >
              Start for free
            </Link>
          )}

          <button
            className="p-2 text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-3 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-lg md:hidden">
          <a href="/#tool" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">Try it</a>
          <a href="/#features" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="/#how" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">How it works</a>
          <Link to="/suggestions" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">Suggestions</Link>
          {user ? (
            <>
              <div className="rounded-md bg-primary/10 px-3 py-2 text-sm">
                Signed in as <span className="font-medium">{displayName}</span>
              </div>
              <Link to="/saved-plans" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">My Plans</Link>
              <Link to="/plan" onClick={() => setOpen(false)} className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
                New Plan
              </Link>
              <button onClick={() => { signOut(); setOpen(false); }} className="block w-full rounded-md border border-border-strong px-4 py-2 text-sm">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
              Start for free
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
