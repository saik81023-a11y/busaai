import hyderabadCity from "@/assets/hyderabad-city.jpg";
import tokyoCity from "@/assets/tokyo-city.jpg";
import newYorkCity from "@/assets/new-york-city.jpg";
import moscowCity from "@/assets/moscow-city.jpg";

const locations = [
  "🇮🇳 Hyderabad", "🇮🇳 Mumbai", "🇮🇳 Bangalore", "🇮🇳 Chennai", "🇮🇳 Delhi",
  "🇮🇳 Kolkata", "🇮🇳 Pune", "🇮🇳 Ahmedabad", "🇺🇸 New York", "🇬🇧 London",
  "🇦🇪 Dubai", "🇸🇬 Singapore", "🇯🇵 Tokyo", "🇦🇺 Sydney", "🇩🇪 Berlin",
  "🇫🇷 Paris", "🇨🇦 Toronto", "🇧🇷 São Paulo", "🇿🇦 Cape Town", "🇰🇷 Seoul",
  "🇷🇺 Moscow", "🇺🇸 San Francisco", "🇹🇷 Istanbul", "🇲🇽 Mexico City",
  "🇹🇭 Bangkok", "🇻🇳 Ho Chi Minh City", "🇳🇬 Lagos", "🇰🇪 Nairobi",
  "🇮🇩 Jakarta", "🇵🇭 Manila", "🇲🇾 Kuala Lumpur", "🇪🇬 Cairo",
];

const featuredLocations = [
  {
    name: "Hyderabad, India",
    description: "A fast-growing hub for technology, services, and startup-friendly business models.",
    image: hyderabadCity,
    alt: "Hyderabad skyline with modern buildings and greenery",
  },
  {
    name: "Tokyo, Japan",
    description: "A high-energy market for innovation, retail experiences, and premium customer segments.",
    image: tokyoCity,
    alt: "Tokyo city street with illuminated buildings and pedestrian crossing",
  },
  {
    name: "New York, USA",
    description: "A global business destination with strong demand, competition, and high-value opportunities.",
    image: newYorkCity,
    alt: "New York City skyline with riverside buildings in daylight",
  },
  {
    name: "Moscow, Russia",
    description: "A major urban market with historic visibility, tourism, and diverse commercial demand.",
    image: moscowCity,
    alt: "Moscow city architecture near Red Square in daylight",
  },
];

const LocationMarquee = () => {
  return (
    <section className="py-10 overflow-hidden bg-muted/30">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground [text-wrap:balance]">
          🌍 Explore Business Ideas Throughout the World with BusaAI
        </h2>
        <p className="text-muted-foreground mt-2 [text-wrap:balance]">Popular locations where entrepreneurs are exploring business opportunities with AI.</p>
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

      <div className="max-w-6xl mx-auto mt-8 px-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featuredLocations.map((location) => (
          <article key={location.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <img
              src={location.image}
              alt={location.alt}
              className="h-48 w-full object-cover"
              loading="lazy"
              width={1024}
              height={768}
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{location.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground [text-wrap:balance]">{location.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LocationMarquee;
