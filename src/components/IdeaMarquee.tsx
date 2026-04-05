const ideas = [
  "💡 Ask any idea", "📍 Any location", "💰 Any range of finance",
  "🍽️ Cloud Kitchen", "☕ Café Business", "🛒 E-commerce Store",
  "🏋️ Fitness Studio", "📱 Mobile App", "🏠 Real Estate", "🎓 Ed-Tech",
  "🚗 EV Charging", "👗 Fashion Brand", "🌿 Organic Farm",
];

const IdeaMarquee = () => {
  return (
    <section className="py-8 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...ideas, ...ideas].map((idea, i) => (
            <span
              key={i}
              className="mx-3 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-medium text-sm shrink-0 border border-border/50"
            >
              {idea}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeaMarquee;
