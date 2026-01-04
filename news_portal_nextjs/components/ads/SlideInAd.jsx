"use client";
import { useEffect, useState } from "react";
import { base_api_url } from "@/config/config"; // ✅ config se URL

const ROTATE_TIME = 3 * 60 * 1000; // 3 minutes

export default function SlideInAd({ position = "home" }) {
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // 🔹 Fetch ads logic
  useEffect(() => {
    setVisible(true);

    const fetchAds = async () => {
      try {
        // ✅ CONFIG BASED API URL
        const res = await fetch(
          `${base_api_url}/api/ads/active?position=${position}`
        );
        const data = await res.json();

        console.log(`Ad Data for ${position}:`, data);

        if (Array.isArray(data) && data.length > 0) {
          setAds(data);
        } else if (data && data._id) {
          setAds([data]);
        } else {
          setAds([]);
        }
      } catch (err) {
        console.error("Ad fetch failed", err);
      }
    };

    fetchAds();
  }, [position]);

  // 🔹 Rotate ads logic
  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
      setVisible(true);
    }, ROTATE_TIME);

    return () => clearInterval(interval);
  }, [ads]);

  const closeAd = () => {
    setVisible(false);
  };

  // ❌ No ad or closed
  if (!visible || ads.length === 0) return null;

  const ad = ads[index];

  return (
    <div className="relative w-full max-w-[1200px] mx-auto my-4 animate-fadeIn px-4 md:px-0 z-10">
      {/* Close Button */}
      <button
        onClick={closeAd}
        className="absolute top-2 right-4 z-20 bg-black/70 text-white px-2 py-1 text-xs rounded hover:bg-black"
      >
        ✕
      </button>
           <a
     href={
    ad.redirectLink.startsWith('http') 
    ? ad.redirectLink 
    : `https://${ad.redirectLink}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 py-2 rounded-full bg-blue-500 text-white text-sm text-center"
  >
  Open
  </a>            

        {/* Image */}
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-[130px] md:h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            console.log("Image failed:", ad.imageUrl);
            e.target.style.display = "none";
            e.target.parentElement.style.display = "none";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
          <span className="text-xs uppercase tracking-widest text-gray-200">
            Sponsored
          </span>

          <h3 className="text-white text-lg md:text-xl font-bold mt-1">
            {ad.title}
          </h3>

          {ad.description && (
            <p className="text-gray-200 text-sm mt-1 max-w-[70%] line-clamp-2">
              {ad.description}
            </p>
          )}
        </div>
      </a>
    </div>
  );
}
