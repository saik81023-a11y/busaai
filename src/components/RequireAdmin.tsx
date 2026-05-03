import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    if (loading) return;
    if (!user) {
      setChecking(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      setIsAdmin(!error && !!data);
      setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, [user, loading]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking access…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 p-6 text-center">
        <h1 className="text-2xl font-bold">403 — Forbidden</h1>
        <p className="text-muted-foreground">You don't have permission to view this page.</p>
      </div>
    );
  }
  return <>{children}</>;
};

export default RequireAdmin;