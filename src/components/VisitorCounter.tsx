import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const visitorId = crypto.randomUUID();

    const register = async () => {
      await (supabase.from as any)("active_visitors").insert({ id: visitorId });
    };

    const fetchCount = async () => {
      const { count: c } = await (supabase.from as any)("active_visitors")
        .select("*", { count: "exact", head: true });
      setCount(c ?? 0);
    };

    register().then(fetchCount);

    const channel = supabase
      .channel("visitors")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "active_visitors" },
        () => fetchCount()
      )
      .subscribe();

    const cleanup = async () => {
      await (supabase.from as any)("active_visitors").delete().eq("id", visitorId);
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      cleanup();
      channel.unsubscribe();
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="w-4 h-4 text-primary" />
      <span>
        <strong className="text-foreground">{count}</strong> viewing now
      </span>
    </div>
  );
};

export default VisitorCounter;
