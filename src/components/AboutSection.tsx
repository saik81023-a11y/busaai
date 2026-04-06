import { Globe2, ImagePlus, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: Target,
    title: "Validate faster",
    description:
      "Check feasibility, budget fit, risks, and next steps before you invest time and money.",
  },
  {
    icon: Globe2,
    title: "Explore worldwide",
    description:
      "Compare business opportunities across Indian cities and global markets from one place.",
  },
  {
    icon: ImagePlus,
    title: "Search with visuals",
    description:
      "Upload reference images so BusaAI can understand your product, store style, or setup idea better.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              About BusaAI
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
              🇮🇳 Made in India
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground [text-wrap:balance]">
            BusaAI helps entrepreneurs turn ideas into clear, practical business plans.
          </h2>

          <p className="mt-5 max-w-2xl text-lg text-muted-foreground [text-wrap:balance]">
            From feasibility scoring and recommended budgets to location analysis, resource links, and saved plans,
            BusaAI gives founders a faster way to explore business ideas throughout the world.
          </p>
        </div>

        <div className="grid gap-4">
          {highlights.map((item) => (
            <Card key={item.title} className="border-border/60 bg-card/80">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground [text-wrap:balance]">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;