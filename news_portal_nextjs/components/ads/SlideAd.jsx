"use client";
import { useEffect, useState } from "react";
import { base_api_url } from "@/config/config";

const ROTATE_TIME = 3 * 60 * 1000;
const COOLDOWN_TIME = 3 * 60 * 1000; // 3 Min Cooldown (Kaatne ke baad)
const INITIAL_DELAY = 30 * 1000;     // 30 Seconds (Website khulne ke baad wait)

export default function SlideAd({ position = "home" }) {
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check LocalStorage Cooldown
    const lastClosedTime = localStorage.getItem(`slideAd_closed_${position}`);
    const now = Date.now();

    if (lastClosedTime && now - parseInt(lastClosedTime) < COOLDOWN_TIME) {
      console.log("SlideAd: Cooldown active. Hidden.");
      setVisible(false);
      return;
    }

    // 🔥 30 Second Wait Logic
    const timer = setTimeout(() => {
        // 30 Sec baad hi fetch aur show hoga
        const fetchAds = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/ads/active?position=${position}`);
            const data = await res.json();
            let validAds = [];
            
            if (Array.isArray(data) && data.length > 0) validAds = data;
            else if (data && data._id) validAds = [data];

            if (validAds.length > 0) {
            setAds(validAds.sort(() => 0.5 - Math.random()));
            setIndex(0);
            setVisible(true); // Data aane ke baad hi show karo
            }
        } catch (err) { console.error(err); }
        };
        fetchAds();
    }, INITIAL_DELAY);

    return () => clearTimeout(timer);

  }, [position]);

  // Rotation Logic
  useEffect(() => {
    if (!visible || ads.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, ROTATE_TIME);
    return () => clearInterval(interval);
  }, [ads, visible]);

  // Close Handler
  const closeAd = () => {
    setVisible(false);
    // Jab user kaatega, tab cooldown shuru hoga
    localStorage.setItem(`slideAd_closed_${position}`, Date.now().toString());
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  if (!visible || ads.length === 0) return null;

  const ad = ads[index];
  const imageUrl = getImageUrl(ad.imageUrl);
  if (!imageUrl) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 w-full h-[140px] sm:w-[300px] sm:h-[150px] lg:w-[340px] lg:h-[170px] animate-slide-up">
      <button onClick={closeAd} className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-black text-white text-[10px] px-2 py-1 rounded transition">✕</button>
      <a href={ad.redirectLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
        <img src={imageUrl} alt={ad.title} className="absolute inset-0 w-full h-full object-cover" />
      </a>
    </div>
  );
}
