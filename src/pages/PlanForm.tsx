import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Brain, Loader2, Sparkles, Save, FolderOpen, Download, FileText } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import busaaiLogo from "@/assets/busaai-logo.png";

const PLAN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/business-plan`;

async function streamPlan({
  budget,
  location,
  businessIdea,
  onDelta,
  onDone,
}: {
  budget: string;
  location: string;
  businessIdea: string;
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(PLAN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ budget, location, businessIdea }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to generate plan");
  }

  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

function downloadAsText(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function markdownToPlainText(md: string): string {
  return md
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

const PlanForm = () => {
  const { user, loading: authLoading } = useAuth();
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [businessIdea, setBusinessIdea] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!budget.trim() || !location.trim() || !businessIdea.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setResult("");
    setSaved(false);

    // Log search for admin visibility
    (supabase.from as any)("user_searches").insert({
      user_id: user.id,
      budget: budget.trim(),
      location: location.trim(),
      business_idea: businessIdea.trim(),
    });

    let accumulated = "";

    try {
      await streamPlan({
        budget: budget.trim(),
        location: location.trim(),
        businessIdea: businessIdea.trim(),
        onDelta: (chunk) => {
          accumulated += chunk;
          setResult(accumulated);
        },
        onDone: () => {
          setIsLoading(false);
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to generate plan");
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result || !user) return;
    setIsSaving(true);

    const { error } = await supabase.from("saved_plans").insert({
      user_id: user.id,
      budget: budget.trim(),
      location: location.trim(),
      business_idea: businessIdea.trim(),
      plan_content: result,
    });

    if (error) {
      toast.error("Failed to save plan");
    } else {
      toast.success("Plan saved! 🎉");
      setSaved(true);
    }
    setIsSaving(false);
  };

  const handleDownloadPDF = () => {
    const header = `BusaAI - AI Business Plan\n${"=".repeat(40)}\n\nBusiness Idea: ${businessIdea}\nBudget: ${budget}\nLocation: ${location}\nGenerated: ${new Date().toLocaleDateString()}\n\n${"=".repeat(40)}\n\n`;
    const plain = markdownToPlainText(result);
    const footer = `\n\n${"=".repeat(40)}\nGenerated by BusaAI (busaai.lovable.app)\nDisclaimer: Information is given by AI from different available sources.\n© 2026 BusaAI | contact@busaai.com | contactbusaai@gmail.com`;
    downloadAsText(header + plain + footer, `BusaAI-Plan-${Date.now()}.txt`);
    toast.success("Plan downloaded! 📄");
  };

  const handleDownloadDoc = () => {
    const header = `<html><head><meta charset="utf-8"><title>BusaAI Business Plan</title></head><body style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;">`;
    const logoHtml = `<div style="text-align:center;margin-bottom:20px;"><h1 style="color:#4F46E5;">BusaAI</h1></div>`;
    const metaHtml = `<div style="background:#f5f5f5;padding:15px;border-radius:8px;margin-bottom:20px;"><p><strong>Business Idea:</strong> ${businessIdea}</p><p><strong>Budget:</strong> ${budget}</p><p><strong>Location:</strong> ${location}</p><p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p></div>`;
    const contentHtml = result
      .replace(/## (.*)/g, '<h2 style="color:#4F46E5;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n- /g, "<br>• ")
      .replace(/\n/g, "<br>");
    const footerHtml = `<hr style="margin-top:40px;"><p style="text-align:center;color:#888;font-size:12px;">Generated by BusaAI (busaai.lovable.app)<br>Disclaimer: Information is given by AI from different available sources.<br>© 2026 BusaAI | contact@busaai.com | contactbusaai@gmail.com</p></body></html>`;
    
    const blob = new Blob([header + logoHtml + metaHtml + contentHtml + footerHtml], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BusaAI-Plan-${Date.now()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Plan downloaded as Word! 📝");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Business Planner</span>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/saved-plans"><FolderOpen className="w-4 h-4 mr-1" /> My Plans</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Business Plan Generator
            </CardTitle>
            <CardDescription>
              Enter your details below and our AI will create a comprehensive business plan with financial projections, recommended budget, marketing strategies, and more. 🚀
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="budget">💰 Budget</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., ₹5,00,000 or $50,000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    disabled={isLoading}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">📍 Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Bangalore, India or New York, USA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isLoading}
                    maxLength={200}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idea">💡 Business Idea</Label>
                <Textarea
                  id="idea"
                  placeholder="Describe your business idea in detail. For example: I want to open a cloud kitchen that specialises in healthy meal prep delivery for office workers..."
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[120px]"
                  maxLength={2000}
                />
              </div>
              <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Business Plan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (() => {
          const scoreMatch = result.match(/Feasibility Score:\s*(\d+)%/i);
          const feasibilityScore = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
          const scoreColor = feasibilityScore !== null
            ? feasibilityScore >= 70 ? "text-green-600" : feasibilityScore >= 40 ? "text-yellow-600" : "text-red-600"
            : "";

          return (
            <>
              {feasibilityScore !== null && !isLoading && (
                <Card className="mb-4">
                  <CardContent className="py-6 flex flex-col items-center gap-2">
                    <p className="text-sm text-muted-foreground font-medium">📊 Business Feasibility</p>
                    <p className={`text-5xl font-bold ${scoreColor}`}>{feasibilityScore}%</p>
                    <p className="text-xs text-muted-foreground">
                      {feasibilityScore >= 70 ? "🟢 High feasibility – Strong potential!" : feasibilityScore >= 40 ? "🟡 Moderate feasibility – Needs refinement" : "🔴 Low feasibility – Consider pivoting"}
                    </p>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
                  <CardTitle>Your AI Business Plan 📋</CardTitle>
                  {!isLoading && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" /> Download TXT
                      </Button>
                      <Button onClick={handleDownloadDoc} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" /> Download DOC
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving || saved}
                        variant={saved ? "secondary" : "default"}
                        size="sm"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : saved ? (
                          "✅ Saved"
                        ) : (
                          <><Save className="w-4 h-4 mr-1" /> Save Plan</>
                        )}
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center">
                    <p>Generated by BusaAI | <a href="mailto:contact@busaai.com" className="text-primary hover:underline">contact@busaai.com</a></p>
                    <p className="mt-1">⚠️ Disclaimer: Information is given by AI from different available sources.</p>
                  </div>
                </CardContent>
              </Card>
            </>
          );
        })()}

        {isLoading && !result && (
          <Card>
            <CardContent className="py-12 flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">🔍 Analysing your business idea...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlanForm;
