import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

type SavedPlan = {
  id: string;
  budget: string;
  location: string;
  business_idea: string;
  plan_content: string;
  created_at: string;
};

const SavedPlans = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("saved_plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load saved plans");
      } else {
        setPlans(data || []);
      }
      setLoading(false);
    };
    fetchPlans();
  }, [user]);

  const deletePlan = async (id: string) => {
    const { error } = await supabase.from("saved_plans").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete plan");
    } else {
      setPlans((p) => p.filter((plan) => plan.id !== id));
      toast.success("Plan deleted");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Saved Plans</span>
            </div>
          </div>
          <Button asChild size="sm">
            <Link to="/plan"><Plus className="w-4 h-4 mr-1" /> New Plan</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No saved plans yet.</p>
            <Button asChild>
              <Link to="/plan">Create Your First Plan</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(expandedId === plan.id ? null : plan.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plan.business_idea.slice(0, 80)}{plan.business_idea.length > 80 ? "..." : ""}</CardTitle>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>💰 {plan.budget}</span>
                        <span>📍 {plan.location}</span>
                        <span>{new Date(plan.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlan(plan.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                {expandedId === plan.id && (
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{plan.plan_content}</ReactMarkdown>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPlans;
