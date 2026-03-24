import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mkppackersmovers.com'),
  title: {
    default: "MKP Packers & Movers | Professional Relocation Services",
    template: "%s | MKP Packers & Movers"
  },
  description: "Top-rated corporate and residential relocation services by MKP Packers & Movers. Get a free quote for local and long-distance moving.",
  keywords: ["packers and movers", "relocation services", "movers and packers", "corporate relocation", "residential moving", "MKP packers"],
  authors: [{ name: "MKP Packers & Movers" }],
  creator: "MKP Packers & Movers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MKP Packers & Movers",
    title: "MKP Packers & Movers | Professional Relocation Services",
    description: "Top-rated corporate and residential relocation services by MKP Packers & Movers. Get a free quote for local and long-distance moving.",
    images: [
      {
        url: "/mkp-packers-movers-logo.webp",
        width: 800,
        height: 600,
        alt: "MKP Packers & Movers Professional Relocation Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MKP Packers & Movers | Professional Relocation Services",
    description: "Top-rated corporate and residential relocation services by MKP Packers & Movers. Get a free quote for local and long-distance moving.",
    creator: "@mkppackersmovers",
    images: ["/mkp-packers-movers-logo.webp"],
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
  icons: {
    icon: '/mkp-packers-movers-logo.webp',
    apple: '/mkp-packers-movers-logo.webp',
  },
};

import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5S3DKXP');`
          }}
        />
        {/* End Google Tag Manager */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5S3DKXP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
        <Navbar />
        <Analytics />
        <div className="flex-1 pt-18 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
