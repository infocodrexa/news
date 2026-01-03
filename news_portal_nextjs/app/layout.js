// Root layout for the entire website (global font, CSS, header & SEO metadata)
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// Optional: Google Analytics ya AdSense script yahan import kar sakte hain

const inter = Inter({ subsets: ["latin"] });

// 👇 APNI WEBSITE KA ASLI DOMAIN YAHAN LIKHO (Zaruri hai)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thelocalmirror.com"; 

export const metadata = {
  // 1. Dynamic Title (Har page par automatic " | The Local Mirror" jud jayega)
  title: {
    default: "The Local Mirror - Latest News, Breaking Stories & Updates",
    template: "%s | The Local Mirror", // Example: "Sports | The Local Mirror"
  },
  
  // 2. Strong Description (Google Search me ye dikhega)
  description: "Stay updated with The Local Mirror. Your trusted source for breaking news, politics, sports, entertainment, and local updates in Hindi and English.",
  
  // 3. Keywords (Search terms)
  keywords: ["The Local Mirror", "News Portal", "Breaking News", "Hindi News", "Local Updates", "Politics", "Sports", "India News"],

  // 4. Base URL (Images aur Links ke liye zaruri)
  metadataBase: new URL(siteUrl),

  // 5. Authors & Creator
  authors: [{ name: "The Local Mirror Team" }],
  creator: "The Local Mirror",
  publisher: "The Local Mirror Media",

  // 6. Robots (Google ko allow karne ke liye)
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

  // 7. Open Graph (Facebook/WhatsApp par link share karne par kaisa dikhega)
  openGraph: {
    title: "The Local Mirror - Latest News & Updates",
    description: "Read the latest breaking news and local stories on The Local Mirror.",
    url: siteUrl,
    siteName: "The Local Mirror",
    images: [
      {
        url: "/assets/og-image.png", // 👈 Make sure public folder me ye image ho
        width: 1200,
        height: 630,
        alt: "The Local Mirror News",
      },
    ],
    locale: "en_IN", // Ya 'hi_IN' agar Hindi main hai
    type: "website",
  },

  // 8. Twitter Card (Twitter par kaisa dikhega)
  twitter: {
    card: "summary_large_image",
    title: "The Local Mirror",
    description: "Your daily dose of local and national news.",
    images: ["/assets/og-image.png"], // Same image
    creator: "@TheLocalMirror", // Apna Twitter handle dalein
  },

  // 9. Icons (Favicon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  
  // 10. Verification (Google Search Console)
  verification: {
    google: "google-site-verification-code-here", // Search console se code leke yahan dalein
  },
};

export default function RootLayout({ children }) {
  // 👇 Organization Schema (Google ko batane ke liye ki ye ek News Company hai)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "The Local Mirror",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/assets/logo.png`, // Apna logo path sahi karein
      "width": 600,
      "height": 60
    },
    "sameAs": [
      "https://www.facebook.com/yourpage",
      "https://twitter.com/yourhandle",
      "https://www.instagram.com/yourhandle"
    ]
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Schema Script Inject */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Header />
        {children}
      </body>
    </html>
  );
}