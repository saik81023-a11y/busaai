import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign, MapPin, Lightbulb, Handshake, TrendingUp,
  Receipt, Armchair, Building, Package, Landmark, Calculator,
  Target, Megaphone, Users
} from "lucide-react";

const features = [
  { icon: DollarSign, title: "Financial Analysis", desc: "Evaluate your budget and discover viable business models within your means." },
  { icon: MapPin, title: "Location Intelligence", desc: "AI analyzes foot traffic, demographics, and competition for ideal locations." },
  { icon: Lightbulb, title: "Idea Validation", desc: "Get data-driven feedback on whether your business idea can succeed." },
  { icon: Handshake, title: "Partnership Matching", desc: "Find strategic partners and collaboration opportunities near you." },
  { icon: TrendingUp, title: "Income Projections", desc: "Forecast revenue streams based on market data and industry benchmarks." },
  { icon: Receipt, title: "Expense Planning", desc: "Comprehensive breakdown of startup and operating costs." },
  { icon: Armchair, title: "Furniture & Setup", desc: "Itemized lists for office or store setup with cost estimates." },
  { icon: Building, title: "Rent Analysis", desc: "Compare rents across locations and find the best deals." },
  { icon: Package, title: "Material Sourcing", desc: "Identify suppliers and estimate raw material costs." },
  { icon: Landmark, title: "Loan & Funding", desc: "Discover loan options, grants, and funding schemes available to you." },
  { icon: Calculator, title: "EMI Calculator", desc: "Plan repayments with smart EMI projections and interest analysis." },
  { icon: Target, title: "Audience Targeting", desc: "Identify and reach your ideal customer segments with precision." },
  { icon: Megaphone, title: "Marketing Strategies", desc: "AI-generated marketing plans tailored to your budget and audience." },
  { icon: Users, title: "Workforce Planning", desc: "Staffing recommendations based on business type and scale." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 [text-wrap:balance]">
            Everything You Need to Launch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto [text-wrap:balance]">
            Our AI covers every aspect of business planning — from finances to marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Card key={i} className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
