import { headers } from "next/headers";

export default function robots() {
  // 1. Current host (domain) detect karna
  const headersList = headers();
  const host = headersList.get("host") || "thelocalmirror.in"; 
  
  // 2. Protocol check (Localhost pe http, live pe https)
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: "*", // Sabhi search engines ke liye
        allow: "/",     // Puri site crawl karne ki permission
        disallow: [
          "/admin",     // Admin panel ko hide kiya
          "/api",       // Backend routes ko hide kiya
          "/login",     // Login page ko hide kiya
        ],
      },
    ],
    // 3. Dynamic Sitemap Link (Ye automatic domain change kar lega)
    sitemap: `${baseUrl}/sitemap.xml`, 
  };
}
