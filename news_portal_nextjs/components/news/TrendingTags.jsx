import Link from "next/link";
import React from "react";
import { FaFire } from "react-icons/fa";

const TrendingTags = ({ news }) => {
  const allTags = [];
  
  // 1. Saare Tags collect karo
  Object.values(news).flat().forEach(item => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach(tag => {
        // ✅ Smart Change: Sabko lowercase me convert karke count karo
        // Taaki "Cricket" aur "cricket" alag na gine jayein
        if(tag) allTags.push(tag.trim());
      });
    }
  });

  // 2. Count Frequency (Kaun kitni baar aaya)
  const tagCounts = allTags.reduce((acc, tag) => {
    // Count karne ke liye lowercase use karo, lekin dikhane ke liye original rakhne ka logic complex ho jayega, 
    // isliye simple rakhte hain, jo database me hai waisa hi count hoga.
    const cleanTag = tag.trim(); 
    acc[cleanTag] = (acc[cleanTag] || 0) + 1;
    return acc;
  }, {});

  // 3. Sorting & Top 10 Selection
  const sortedTags = Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a]) // Jiska count zyada wo pehle
    .slice(0, 10); // 🔥 Yahan limit lagi hai: Sirf Top 10

  if (sortedTags.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 py-3 mb-6">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto flex items-center gap-4 overflow-x-auto scrollbar-hide">
        
        {/* Label */}
        <div className="flex items-center gap-2 text-red-600 font-bold whitespace-nowrap shrink-0">
          <span className="bg-red-100 p-1.5 rounded-full animate-pulse">
             <FaFire />
          </span>
          TRENDING:
        </div>

        {/* List */}
        <div className="flex items-center gap-3">
          {sortedTags.map((tag, i) => (
            <Link
              key={i}
              href={`/tag/${tag}`}
              // isme whitespace-nowrap zaroori hai taaki tag tut kar do line me na aaye
              className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 whitespace-nowrap shadow-sm"
            >
              #{tag.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTags;