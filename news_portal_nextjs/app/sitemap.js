import { base_api_url } from "@/config/config";
import { headers } from "next/headers";

// Simple Sitemap - No complex indexing for now
export default async function sitemap() {
  const headersList = headers();
  const host = headersList.get("host") || "thelocalmirror.in";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  let newsEntries = [];
  let categoryEntries = [];

  try {
    const res = await fetch(`${base_api_url}/api/all/news`, { cache: 'no-store' });
    if (!res.ok) throw new Error("API Connection Failed");
    
    const data = await res.json();
    const allNews = data.news || data;

    if (allNews && typeof allNews === 'object') {
      Object.keys(allNews).forEach((category) => {
        // Categories entry
        categoryEntries.push({
          url: `${baseUrl}/category/${category}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.7,
        });

        // News articles entry
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

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...categoryEntries,
    ...newsEntries,
  ];
}
