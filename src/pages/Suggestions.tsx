import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Send, Loader2, CheckCircle, Lightbulb, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Suggestions = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("suggestion");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      email: email.trim(),
      message: `[${type.toUpperCase()}] ${message.trim()}`,
    });

    if (error) {
      toast.error("Failed to submit. Please try again.");
      console.error(error);
    } else {
      setSubmitted(true);
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-12 flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Thank You! 🎉</h2>
            <p className="text-muted-foreground">
              Your {type} has been submitted. We'll review it and get back to you shortly.
            </p>
            <Button asChild className="mt-4">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>💡 Suggestions & Collaborations</CardTitle>
            <CardDescription>
              Have an idea to improve BusaAI or want to collaborate? We'd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="suggestion" onValueChange={setType}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="suggestion" className="flex-1">
                  <Lightbulb className="w-4 h-4 mr-1" /> Suggestion
                </TabsTrigger>
                <TabsTrigger value="collaboration" className="flex-1">
                  <Handshake className="w-4 h-4 mr-1" /> Collaboration
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={255}
                  />
                </div>
                <TabsContent value="suggestion" className="mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="suggestion-msg">Your Suggestion</Label>
                    <Textarea
                      id="suggestion-msg"
                      placeholder="Share your idea for improving BusaAI..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[120px]"
                      maxLength={2000}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="collaboration" className="mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="collab-msg">Collaboration Details</Label>
                    <Textarea
                      id="collab-msg"
                      placeholder="Tell us about your collaboration idea, your expertise, and how we can work together..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                      className="min-h-[120px]"
                      maxLength={2000}
                    />
                  </div>
                </TabsContent>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit {type === "suggestion" ? "Suggestion" : "Collaboration Request"}</>
                  )}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Suggestions;
