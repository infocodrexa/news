"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { base_api_url } from "@/config/config";

const COOLDOWN_TIME = 3 * 60 * 1000; // 3 Minutes (Kaatne ke baad)
const INITIAL_DELAY = 60 * 1000;     // 1 Minute (Website khulne ke baad wait)

export default function ModalAd() {
  const pathname = usePathname();
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(false);

  // 1. Fetch Ad Data
  useEffect(() => {
    fetch(`${base_api_url}/api/ads/active?position=home`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAd(data[Math.floor(Math.random() * data.length)]);
        }
      })
      .catch((err) => console.error("Modal Ad Error:", err));
  }, []);

  // 2. Timer Logic (1 Minute Wait + 3 Min Cooldown)
  useEffect(() => {
    // Check LocalStorage: Kya user ne abhi close kiya tha?
    const lastClosedTime = localStorage.getItem("modalAd_closed_time");
    const now = Date.now();

    // Agar Cooldown active hai (3 min nahi hue), to return karo
    if (lastClosedTime && now - parseInt(lastClosedTime) < COOLDOWN_TIME) {
      console.log("ModalAd: Cooldown active. Hidden.");
      setVisible(false);
      return;
    }

    // 🔥 1 Minute Wait Logic
    const timer = setTimeout(() => {
      setVisible(true);
    }, INITIAL_DELAY);

    // Agar user 1 min se pehle nikal jaye to timer rok do
    return () => clearTimeout(timer);

  }, [pathname]); // Route change pe bhi logic check hoga

  // 3. Close Handler
  const closeAd = () => {
    setVisible(false);
    // Jab user kaatega, tabhi time note karenge
    localStorage.setItem("modalAd_closed_time", Date.now().toString());
  };

  if (!visible || !ad) return null;

  // Image Helper
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  const imageUrl = getImageUrl(ad.imageUrl);
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl w-[360px] shadow-xl overflow-hidden relative">
        <span className="absolute top-2 left-4 text-[10px] uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          Sponsored
        </span>
        <div className="p-0">
          <img src={imageUrl} alt={ad.title} className="w-full h-auto max-h-[400px] object-contain bg-gray-50" />
        </div>
        <div className="flex gap-3 p-4 bg-gray-50">
          <button onClick={closeAd} className="flex-1 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">Close</button>
          <a href={ad.redirectLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700">Open Link</a>
        </div>
      </div>
    </div>
  );
}
