import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
const currentSiteUrl = "https://thelocalmirror.in";

export const metadata = {
  // Brand Name (Isse search results mein .in ki jagah naam dikhega)
  applicationName: 'The Local Mirror',

  title: {
    default: "The Local Mirror - Bihar News | Political News & Breaking News",
    template: "%s | The Local Mirror",
  },

  description: "The Local Mirror - Bihar News | Political News & Breaking News. Stay updated with the latest political analysis and breaking stories from Bihar and India.",

  metadataBase: new URL(currentSiteUrl),

  keywords: [
    "The Local Mirror",
    "Latest News India",
    "Bihar News",
    "Political News",
    "Breaking News Today",
    "Begusarai News Today",
    "India Politics Update",
    "Crime News Bihar",
    "Today News Headlines",
    "Live News India",
    "Bihar Breaking News",
    "Local Mirror Bihar",
    "Top News Today",
    "Bihar Viral News",
    "Begusarai Latest Khabar"
  ],

  // 👇 Public folder ki files ka path (Aapke screenshot ke hisaab se)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '40x40' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  verification: {
    google: "XamL5bwoHrj3b_jm_DnHlyDeMmMxTaDdOZXWz_2VbeU",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "The Local Mirror - Bihar News | Political News & Breaking News",
    description: "Bihar and India's leading portal for political and breaking news.",
    url: currentSiteUrl,
    siteName: 'The Local Mirror',
    images: [
      {
        url: '/og-image.png', // Public folder mein rakhi file
        width: 1200,
        height: 630,
        alt: 'The Local Mirror News',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  // 👇 Organization Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "The Local Mirror",
    "url": currentSiteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${currentSiteUrl}/icon.png`, // Icon file for high quality logo search
      "width": 512,
      "height": 512,
    },
    "areaServed": {
      "@type": "Place",
      "name": ["Bihar", "India", "Begusarai"],
    },
    "sameAs": [
      "https://www.facebook.com/share/1DAyfVm8Uo/",
      "https://x.com/TheLocalMirror",
      "https://www.instagram.com/thelocalmirror",
      "https://www.youtube.com/@TheLocalMirror",
    ],
  };

  return (
    <html lang="en">
      <body className={inter.className}>
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
