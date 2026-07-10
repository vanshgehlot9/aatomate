import type { Metadata } from "next";
import { Inter, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Chatbot from "@/components/Chatbot";

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

const siteUrl = "https://aatomate.com";
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aatomate — AI Automation Agency in India",
    template: "%s | Aatomate",
  },
  description:
    "Top Business Automation Company providing AI Consulting Services, Workflow Automation, HR AI Software, and Enterprise AI Solutions. Scale with AI.",
  keywords: [
    "AI Automation India",
    "Business Automation Company",
    "AI Consulting Services",
    "Workflow Automation",
    "HR AI Software",
    "Recruitment AI Platform",
    "Enterprise AI Solutions",
    "WhatsApp Bot",
    "AI Agent",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Aatomate",
    title: "Aatomate — AI Automation Agency in India",
    description:
      "Top Business Automation Company providing AI Consulting Services, Workflow Automation, WhatsApp Bots, and Enterprise AI Solutions. Scale with AI.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Aatomate — AI Automation Agency in India: WhatsApp bots, AI agents, and enterprise workflow automation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aatomate — AI Automation Agency in India",
    description:
      "Top Business Automation Company providing AI Consulting, Workflow Automation, and Enterprise AI Solutions.",
    images: [
      {
        url: ogImage,
        alt: "Aatomate — AI Automation Agency in India",
      },
    ],
    creator: "@aatomate",
    site: "@aatomate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aatomate",
    legalName: "Aatomate LLP",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      "Enterprise AI Solutions and Business Automation Company in India. We build WhatsApp bots, AI agents, and agentic workflows for healthcare, retail, manufacturing, and more.",
    foundingDate: "2024",
    areaServed: ["IN", "US", "GB", "AE", "SG"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
        url: `${siteUrl}/contact`,
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/aatomate",
      "https://g.page/r/CeQcd3mmoRVfEBM",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${plexMono.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external resource origins for faster loading */}
        <link rel="preconnect" href="https://www.transparenttextures.com" />
        <link rel="preconnect" href="https://grainy-gradients.vercel.app" />
        <link rel="dns-prefetch" href="https://i.pravatar.cc" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K3V7ZRE28P"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-K3V7ZRE28P');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-action-green selection:text-midnight-ink relative bg-canvas-ice text-midnight-ink">
        <Preloader />
        {/* Global Noise Texture */}
        <div
          className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.02]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/cubes.png')",
          }}
        />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
