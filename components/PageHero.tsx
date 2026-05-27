type PageHeroProps = {
  label: string;
  title: string;
  description?: string;
};

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <header className="border-b border-white/[0.06] py-16 md:py-24">
      <div className="section-shell">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-brand">
          {label}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-extralight leading-[1.1] tracking-[-0.02em] text-pearl md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-8 text-pearl/55 md:text-lg md:leading-9">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
