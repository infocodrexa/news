"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { base_api_url } from "@/config/config";

const SHOW_DELAY = 3 * 60 * 1000; // 3 min
const COOLDOWN = 3 * 60 * 1000; // close ke baad 3 min

export default function ModalAd() {
  const pathname = usePathname();
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(false);

  // fetch ad
  useEffect(() => {
    fetch(`${base_api_url}/api/ads/active?position=home`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const randomAd = data[Math.floor(Math.random() * data.length)];
          setAd(randomAd);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // page open → 3 min
  useEffect(() => {
    const lastClosed = localStorage.getItem("modal_ad_closed");
    if (lastClosed && Date.now() - Number(lastClosed) < COOLDOWN) return;

    const t = setTimeout(() => setVisible(true), SHOW_DELAY);
    return () => clearTimeout(t);
  }, []);

  // route change → 50% chance
  useEffect(() => {
    const lastClosed = localStorage.getItem("modal_ad_closed");
    if (lastClosed && Date.now() - Number(lastClosed) < COOLDOWN) return;

    if (Math.random() < 0.5) setVisible(true);
  }, [pathname]);

  const closeAd = () => {
    setVisible(false);
    localStorage.setItem("modal_ad_closed", Date.now().toString());
  };

  // ✅ HELPER: Image URL sahi karne ke liye
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
      <div className="bg-white rounded-2xl w-[360px] shadow-xl overflow-hidden">
        <span className="ml-4 text-xs uppercase tracking-widest text-black">
          Sponsored
        </span>

        {/* Ad Image */}
        <div className="p-3">
          <img
            src={imageUrl}
            alt={ad.title}
            className="w-full h-[90px] object-cover rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-4 pb-4">
          <button
            onClick={closeAd}
            className="flex-1 py-2 rounded-full bg-gray-200 text-gray-700 text-sm"
          >
            Close
          </button>

          <a
            href={ad.redirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-full bg-blue-500 text-white text-sm text-center"
          >
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
