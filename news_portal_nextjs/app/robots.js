// app/robots.js

export default function robots() {
  const baseUrl = "https://thelocalmirror.in";

  return {
    rules: [
      {
        userAgent: "*", // Sabhi search engines (Google, Bing, etc.) ke liye
        allow: "/",     // Puri website crawl karne ki permission
        disallow: [
          "/admin",     // Admin panel ko search se chhupaya
          "/api",       // Backend routes ko chhupaya
          "/login",     // Login page ko index nahi karna
          "/private",   // Private files ko hide kiya
        ],
      },
    ],
    // Sitemap hamesha primary domain (.in) ka hi rahega
    sitemap: `${baseUrl}/sitemap.xml`, 
  };
}
