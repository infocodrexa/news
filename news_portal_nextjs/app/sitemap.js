// 🔥 CRITICAL FIX: Ye line error hatane ke liye zaroori hai
export const dynamic = 'force-dynamic';

import { base_api_url } from "@/config/config";

export default async function sitemap() {
  // Apni Website ka domain yahan check kar lena
  const baseUrl = "https://thelocalmirror.in"; 

  let categoryEntries = [];
  let newsEntries = [];

  try {
    // API se news fetch karo
    const res = await fetch(`${base_api_url}/api/all/news`, {
       cache: 'no-store' // Ensure fresh data
    });
    const data = await res.json();
    const allNews = data.news || {};

    // Categories aur News ko loop karo
    if (allNews) {
      Object.keys(allNews).forEach((category) => {
        
        // 1. Category Page Entry
        categoryEntries.push({
          url: `${baseUrl}/news/category/${category}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.7,
        });

        // 2. News Articles Entry (Aapka Logic)
        if (Array.isArray(allNews[category])) {
          allNews[category].forEach((item) => {
            newsEntries.push({
              url: `${baseUrl}/news/${item.slug || item._id}`,
              lastModified: new Date(item.updatedAt || item.createdAt || new Date()),
              changeFrequency: 'hourly',
              priority: 0.8,
            });
          });
        }
      });
    }

  } catch (error) {
    console.error("Sitemap Error:", error);
  }

  // Final List Return karo
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...categoryEntries,
    ...newsEntries,
  ];
}
