import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { budget, location, businessIdea } = await req.json();

    if (!budget || !location || !businessIdea) {
      return new Response(
        JSON.stringify({ error: "Budget, location, and business idea are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert business consultant and AI advisor. Analyze the user's business idea and provide comprehensive, actionable recommendations. Use relevant emojis throughout for readability. Structure your response in clear markdown sections:

## 📊 Business Feasibility Score
Provide a **Feasibility Score: XX%** (a number between 0-100) based on the budget, location, market demand, competition, and overall viability. Explain briefly why you gave this score.

## 💰 Recommended Budget
Provide a **Recommended Budget** range for this business idea in the given location. Compare it with the user's stated budget and advise if they need more or if they have surplus.

## 💡 Business Viability Assessment
Brief assessment of the idea's potential.

## 💰 Financial Breakdown
- Estimated startup costs
- Monthly operating expenses
- Revenue projections (6-month and 12-month)
- Break-even timeline

## 📍 Location Analysis
- Suitability of the chosen location
- Rent estimates
- Foot traffic and demographic insights
- Nearby competition

## 🏗️ Setup Requirements
- Furniture and equipment needed with cost estimates
- Materials and inventory
- Technology/software needs

## 🏦 Funding Options
- Loan options available
- EMI calculations for different loan amounts
- Government schemes or grants
- Alternative funding sources

## 🎯 Target Audience
- Primary customer segments
- Customer personas
- Buying behavior insights

## 📣 Marketing Strategy
- Digital marketing plan
- Social media strategy
- Local marketing tactics
- Budget allocation for marketing

## 👥 Workforce Plan
- Required team size and roles
- Salary estimates
- Hiring timeline

## ⚠️ Risks & Mitigation
- Key risks and how to handle them

## 🔗 Useful Resources
- Suggest relevant YouTube channels/videos for learning about this business type
- Suggest relevant online courses or resources
- Suggest industry associations or communities

## ✅ Next Steps
- Prioritized action items to get started

Be specific with numbers and estimates. Use the budget and location provided to give realistic, localized recommendations. Use emojis to make sections visually engaging.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Please analyze this business idea and provide detailed recommendations:

**Budget:** ${budget}
**Location:** ${location}
**Business Idea:** ${businessIdea}`,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Failed to get AI recommendations." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("business-plan error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
