"use client";
import { useEffect, useState } from "react";
import { base_api_url } from "@/config/config";

const ROTATE_TIME = 3 * 60 * 1000;

export default function SlideAd({ position = "home" }) {
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
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
        }
      } catch (err) { console.error(err); }
    };
    fetchAds();
  }, [position]);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
      setVisible(true);
    }, ROTATE_TIME);
    return () => clearInterval(interval);
  }, [ads]);

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
    // Box Design
    <div className="
      relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100
      w-full h-[140px]
      sm:w-[300px] sm:h-[150px]
      lg:w-[340px] lg:h-[170px]
    ">
      
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-black text-white text-[10px] px-2 py-1 rounded transition"
      >
        ✕
      </button>

      {/* Image Fix: Absolute + Object Cover */}
      <a href={ad.redirectLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
        <img
          src={imageUrl}
          alt={ad.title}
          className="absolute inset-0  w-full h-full object-cover"
        />
      </a>
    </div>
  );
}
