// Root layout for the entire website
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

// 👇 BADLAV 1: .in ko primary domain banaya taaki SEO power ek jagah rahe
const currentSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thelocalmirror.in";

export const metadata = {
  title: {
    // 👇 BADLAV 2: Title ko optimize kiya Begusarai aur Bihar keywords ke saath
    default: "The Local Mirror - Begusarai & Bihar News | Latest Updates & Breaking Stories",
    template: "%s | The Local Mirror - Begusarai News",
  },

  description:
    "The Local Mirror is your trusted source for Begusarai News and Bihar Breaking News. Get real-time updates on politics, crime, sports, and local events.",

  keywords: [
    "The Local Mirror",
    "Begusarai News",
    "Begusarai Samachar",
    "Begusarai Breaking News",
    "Bihar News",
    "Bihar Samachar",
    "Begusarai District News",
    "Barauni News",
    "Simaria News",
    "News in Hindi",
    "Bihar Politics",
    "Latest News Bihar",
  ],

  metadataBase: new URL(currentSiteUrl),

  // 👇 BADLAV 3: Canonical tag set kiya taaki Google .in ko hi "Asli" site maane
  alternates: {
    canonical: "/",
    languages: {
      "hi-IN": "https://thelocalmirror.in",
      "en-GLOBAL": "https://thelocalmirror.com",
    },
  },

  authors: [{ name: "The Local Mirror Team" }],
  creator: "The Local Mirror",
  publisher: "The Local Mirror Media",

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

  openGraph: {
    title: "The Local Mirror - Begusarai & Bihar Latest News",
    description: "Read the latest breaking news from Begusarai, Patna, and all over Bihar on The Local Mirror.",
    url: currentSiteUrl,
    siteName: "The Local Mirror",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Local Mirror - Begusarai News",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Local Mirror - Begusarai News",
    description: "Top source for Begusarai and Bihar News updates.",
    images: ["/assets/og-image.png"],
    creator: "@TheLocalMirror",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    // 👇 BADLAV 4: Aapka Google Search Console verification code yahan lga diya hai
    google: "XamL5bwoHrj3b_jm_DnHlyDeMmMxTaDdOZXWz_2VbeU",
  },
};  

export default function RootLayout({ children }) {
  // 👇 BADLAV 5: Organization Schema ko .in URL ke saath update kiya
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "The Local Mirror",
    url: currentSiteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${currentSiteUrl}/assets/logo.png`,
      width: 600,
      height: 60,
    },
    areaServed: {
      "@type": "Place",
      name: ["Begusarai", "Bihar", "India"],
    },
    sameAs: [
      "https://www.facebook.com/share/1DAyfVm8Uo/",
      "https://x.com/TheLocalMirror",
      "https://www.instagram.com/thelocalmirror",
      "https://www.threads.net/@thelocalmirror",
      "https://www.youtube.com/@TheLocalMirror",
    ],
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Is script se Google ko site ka structure samajh aata hai */}
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
