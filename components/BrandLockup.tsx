import { BrandLogo } from "@/components/BrandLogo";

type BrandLockupProps = {
  logoClassName?: string;
  sloganClassName?: string;
  showSlogan?: boolean;
  priority?: boolean;
};

export function BrandLockup({
  logoClassName = "w-[6.75rem]",
  sloganClassName = "",
  showSlogan = true,
  priority = false
}: BrandLockupProps) {
  return (
    <div className="inline-flex flex-col items-start leading-none">
      <div className="overflow-hidden leading-[0] [clip-path:inset(5px_0_4px_0)]">
        <BrandLogo
          variant="light"
          priority={priority}
          className={logoClassName}
        />
      </div>
      {showSlogan ? (
        <p
          className={`mt-2 font-display text-[0.5rem] font-semibold uppercase leading-none tracking-[0.32em] text-brand sm:text-[0.52rem] ${sloganClassName}`}
        >
          Space That Glow
        </p>
      ) : null}
    </div>
  );
}
