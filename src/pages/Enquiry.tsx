import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Send, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import busaaiLogo from "@/assets/busaai-logo.png";

const Enquiry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
      message: message.trim(),
    });

    if (error) {
      toast.error("Failed to submit enquiry. Please try again.");
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
              Your enquiry has been submitted. We'll get back to you at your email shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              You can also reach us at{" "}
              <a href="mailto:contact@busaai.com" className="text-primary hover:underline">contact@busaai.com</a>
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
          <CardHeader className="text-center">
            <img src={busaaiLogo} alt="BusaAI Logo" className="w-16 h-16 mx-auto mb-2" width={64} height={64} />
            <CardTitle>Contact Us 📧</CardTitle>
            <CardDescription>
              Have a question or want to learn more? Send us a message and we'll respond to your email.
              You can also write to us at <a href="mailto:contact@busaai.com" className="text-primary hover:underline">contact@busaai.com</a>
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-h-[120px]"
                  maxLength={2000}
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="w-4 h-4" /> Submit Enquiry</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Enquiry;
