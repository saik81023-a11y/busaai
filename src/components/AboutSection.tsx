const stats = [
  { num: "50K+", label: "Ideas Analyzed" },
  { num: "120+", label: "Countries Supported" },
  { num: "92%", label: "Planning Accuracy" },
  { num: "30s", label: "Average Analysis Time" },
];

const AboutSection = () => {
  return (
    <div className="border-y border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 py-8 md:gap-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-2xl font-extrabold text-primary md:text-[1.75rem]">{s.num}</div>
            <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
