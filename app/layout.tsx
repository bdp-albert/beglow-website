import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beglow.vercel.app"),
  title: "BEGLOW | Space That Glow",
  description:
    "BEGLOW is a high-end architectural lighting design and supply studio for luminous spatial experiences.",
  openGraph: {
    title: "BEGLOW | Space That Glow",
    description:
      "High-end architectural lighting design and supply for refined spatial experiences.",
    images: ["/beglow-architectural-lighting.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
