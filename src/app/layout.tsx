import type { Metadata } from "next";
import { Inter, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "aatomate — AI Automation Agency",
  description: "Automate customer support, sales, WhatsApp, voice calls, and business workflows — so your team focuses on what actually matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${plexMono.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-action-green selection:text-midnight-ink relative bg-canvas-ice text-midnight-ink">
        {/* Global Noise Texture */}
        <div 
          className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} 
        />
        {children}
      </body>
    </html>
  );
}
