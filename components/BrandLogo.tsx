import Image from "next/image";

const LOGO_ASSETS = {
  light: {
    src: "/brand/beglow-logo-white-on-black.png",
    width: 3600,
    height: 1551
  },
  dark: {
    src: "/brand/beglow-logo-black-on-white.png",
    width: 3260,
    height: 824
  }
} as const;

type BrandLogoProps = {
  variant?: keyof typeof LOGO_ASSETS;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "light",
  className = "",
  priority = false
}: BrandLogoProps) {
  const asset = LOGO_ASSETS[variant];

  return (
    <Image
      src={asset.src}
      alt="Beglow"
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={`block h-auto max-w-full object-contain object-left align-top leading-[0] ${className}`}
    />
  );
}
