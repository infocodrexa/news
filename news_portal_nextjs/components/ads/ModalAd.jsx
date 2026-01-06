"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { base_api_url } from "@/config/config";

const SHOW_DELAY = 3 * 60 * 1000; // 3 Minutes
const COOLDOWN = 3 * 60 * 1000;

export default function ModalAd() {
  const pathname = usePathname();
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(false);

  // 1. Fetch Ad
  useEffect(() => {
    // Console mein check karo ki request ja rahi hai ya nahi
    console.log("Fetching Modal Ad...");
    fetch(`${base_api_url}/api/ads/active?position=home`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Modal Ad Data:", data); // Data aaya ya nahi yahan dikhega
        if (Array.isArray(data) && data.length > 0) {
          const randomAd = data[Math.floor(Math.random() * data.length)];
          setAd(randomAd);
        }
      })
      .catch((err) => console.error("Modal Ad Error:", err));
  }, []);

  // 2. Timer Logic
  useEffect(() => {
    // LocalStorage wala check abhi hata diya hai
    const t = setTimeout(() => setVisible(true), SHOW_DELAY);
    return () => clearTimeout(t);
  }, []);

  // 3. Route Change Logic
  useEffect(() => {
    setVisible(true); 
  }, [pathname]);

  const closeAd = () => {
    setVisible(false);
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http") || img.startsWith("https")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  if (!visible || !ad) return null;

  const imageUrl = getImageUrl(ad.imageUrl);
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[360px] shadow-xl overflow-hidden relative animate-fadeIn">
        <span className="absolute top-2 left-4 text-[10px] uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          Sponsored
        </span>

        {/* Ad Image */}
        <div className="p-0">
          <img
            src={imageUrl}
            alt={ad.title}
            className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-4 bg-gray-50">
          <button
            onClick={closeAd}
            className="flex-1 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>

          <a
            href={ad.redirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-colors"
          >
            Open Link
          </a>
        </div>
      </div>
    </div>
  );
}
