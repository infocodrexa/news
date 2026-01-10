// seo implement
"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./items/SimpleDetailsNewCard";

const DetailsNews = ({ category, news }) => {
  // Browser ka URL nikalne ke liye state
  const [currentOrigin, setCurrentOrigin] = useState("https://thelocalmirror.in");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentOrigin(window.location.origin); // Ye automatic .com ya .in utha lega
    }
  }, []);

  if (!news || news.length === 0) {
    return null; 
  }

  // --- SEO Logic (Dynamic URL) ---
  const seoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${category} Section`,
    "itemListElement": news.slice(0, 2).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      // 👇 Yahan maine change kiya hai: ab ye .com ya .in automatic set karega
      "url": `${currentOrigin}/news/${item.slug || item._id}`,
      "name": item.title
    }))
  };

  return (
    <div className="w-full flex flex-col gap-[14px] pr-2 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />

      <Title title={category} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3">
        {news[0] && (
          <SimpleDetailsNewCard news={news[0]} type="details-news" height={300} />
        )}

        {news[1] && (
          <SimpleDetailsNewCard news={news[1]} type="details-news" height={300} />
        )}
      </div>
    </div>
  );
};

export default DetailsNews;
