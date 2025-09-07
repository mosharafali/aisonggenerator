import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import BreadcrumbPageClient from "~/components/sidebar/breadcrumb-page-client";
import SoundBar from "~/components/sound-bar";

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
      <body>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex h-screen flex-col">
              <header className="bg-background sticky-top z-10 border-b px-4 py-2">
                <div className="flex shrink-0 grow items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPageClient />
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto">{children}</main>
              <SoundBar />
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
