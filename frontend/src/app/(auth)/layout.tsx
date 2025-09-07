import "~/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AI Song Generator | Free AI Music Generator Online",
  description:
    "AI Song Generator lets you create original songs instantly. Generate lyrics, melodies, and full tracks in multiple genres using cutting-edge AI technology. Free, fast, and beginner-friendly.",
  keywords: [
    "AI song generator",
    "AI music generator",
    "AI lyrics creator",
    "AI song creator free",
    "generate music with AI",
    "AI songwriting tool",
    "AI music software",
    "text to song",
    "AI beat maker"
  ],
  alternates: {
    canonical: "https://aisonggenerator.dev",
  },
  openGraph: {
    type: "website",
    url: "https://aisonggenerator.dev",
    title: "AI Song Generator | Free AI Music Generator Online",
    description:
      "Turn your ideas into music. Generate lyrics, beats, and full songs with AI Song Generator. Explore multiple genres and create music instantly.",
    images: [
      {
        url: "https://aisonggenerator.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Song Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aisonggenerator",
    title: "AI Song Generator | Free AI Music Generator Online",
    description:
      "Generate lyrics, beats, and full songs with AI Song Generator. Free, fast, and beginner-friendly.",
    images: ["https://aisonggenerator.dev/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://aisonggenerator.dev"),
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>

        {/* JSON-LD: SoftwareApplication */}
        <Script
          id="ld-software-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Song Generator",
              "url": "https://aisonggenerator.dev",
              "description":
                "AI Song Generator lets you create original songs instantly. Generate lyrics, melodies, and full tracks in multiple genres with cutting-edge AI music technology.",
              "applicationCategory": "Music, AI",
              "operatingSystem": "Web",
              "creator": {
                "@type": "Organization",
                "name": "AI Song Generator",
                "url": "https://aisonggenerator.dev",
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "keywords": [
                "AI song generator",
                "AI music generator",
                "AI lyrics creator",
                "AI songwriting tool",
                "generate music with AI",
                "text to song",
                "AI music software"
              ],
              "potentialAction": {
                "@type": "CreateAction",
                "target": "https://aisonggenerator.dev",
                "name": "Generate AI Music",
              },
            }),
          }}
        />

        {/* JSON-LD: WebSite + SearchAction */}
        <Script
          id="ld-website-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://aisonggenerator.dev",
              "name": "AI Song Generator",
              "description":
                "AI Song Generator is the easiest way to generate songs, lyrics, and full tracks with AI. Free, fast, and supports multiple genres.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aisonggenerator.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
