const locations = [
  "🇮🇳 Hyderabad", "🇮🇳 Mumbai", "🇮🇳 Bangalore", "🇮🇳 Chennai", "🇮🇳 Delhi",
  "🇮🇳 Kolkata", "🇮🇳 Pune", "🇮🇳 Ahmedabad", "🇺🇸 New York", "🇬🇧 London",
  "🇦🇪 Dubai", "🇸🇬 Singapore", "🇯🇵 Tokyo", "🇦🇺 Sydney", "🇩🇪 Berlin",
  "🇫🇷 Paris", "🇨🇦 Toronto", "🇧🇷 São Paulo", "🇿🇦 Cape Town", "🇰🇷 Seoul",
];

const LocationMarquee = () => {
  return (
    <section className="py-10 overflow-hidden bg-muted/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          🌍 Explore Business Ideas Throughout the World with BusaAI
        </h2>
        <p className="text-muted-foreground mt-2">Popular locations where entrepreneurs are building with AI</p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...locations, ...locations].map((loc, i) => (
            <span
              key={i}
              className="mx-4 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-medium text-sm shrink-0"
            >
              {loc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationMarquee;
