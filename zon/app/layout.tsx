import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZON - Zero Overhead Notation",
    template: "%s | ZON"
  },
  description: "A human-readable, efficient data format for the modern web. 30-40% leaner than JSON for LLMs.",
  metadataBase: new URL('https://zon.ronibhakta.in'),
  keywords: ["ZON", "Data Format", "JSON Alternative", "LLM Optimization", "Token Efficiency", "Zero Overhead Notation", "TOON vs ZON", "TOON alternative", "Better than TOON", "ZON Format GitHub"],
  authors: [{ name: "Roni Bhakta" }],
  creator: "Roni Bhakta",
  publisher: "Roni Bhakta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zon.ronibhakta.in",
    title: "ZON - Zero Overhead Notation",
    description: "A human-readable, efficient data format for the modern web. Optimized for LLMs.",
    siteName: "ZON",
    images: [
      {
        url: "/og-image.png", // We might need to create this later if it doesn't exist, but good to have the ref
        width: 1200,
        height: 630,
        alt: "ZON - Zero Overhead Notation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZON - Zero Overhead Notation",
    description: "A human-readable, efficient data format for the modern web. Optimized for LLMs.",
    creator: "@ronibhakta", // Assuming this handle, can be updated
    images: ["/og-image.png"],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Assuming existence or fallback
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
