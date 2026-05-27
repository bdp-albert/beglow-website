type ImagePlaceholderProps = {
  label?: string;
  className?: string;
  fill?: boolean;
};

export function ImagePlaceholder({
  label = "Image",
  className = "",
  fill = false
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border border-white/[0.06] bg-graphite ${
        fill ? "absolute inset-0 h-full w-full" : "aspect-video w-full"
      } ${className}`}
      role="img"
      aria-label={label}
    >
      <p className="max-w-[14rem] px-6 text-center text-[0.6rem] font-medium uppercase leading-relaxed tracking-[0.28em] text-pearl/25">
        {label}
      </p>
    </div>
  );
}
