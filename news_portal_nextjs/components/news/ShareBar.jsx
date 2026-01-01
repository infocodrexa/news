"use client";

import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLink,
} from "react-icons/fa6";
import { base_api_url } from "@/config/config"; // ✅ config import

const BRAND_TEXT =
  "Welcome to The Local Mirror — reflecting the truth, every day.";

const ShareBar = ({ title, slug }) => {
  // ✅ env ki jagah config-based URL
  const url = `${base_api_url.replace("/api", "")}/news/${slug}`;

  return (
    <div className="mt-8 pt-4 border-t">
      <p className="text-sm font-semibold text-gray-700 mb-3">
        Share this news
      </p>

      <div className="flex gap-3 items-center flex-wrap">
        {/* ================= WhatsApp ================= */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `${title}\n\n${url}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-green-500 text-white hover:opacity-90"
          title="Share on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        {/* ================= Facebook ================= */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-600 text-white hover:opacity-90"
          title="Share on Facebook"
        >
          <FaFacebookF />
        </a>

        {/* ================= Twitter / X ================= */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black text-white hover:opacity-90"
          title="Share on X (Twitter)"
        >
          <FaXTwitter />
        </a>

        {/* ================= Instagram ================= */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${title}\n\n${url}`);
            window.open("https://www.instagram.com/", "_blank");
            alert("Link copied! Paste it on Instagram story, bio or DM.");
          }}
          className="p-2 rounded-full bg-pink-600 text-white hover:opacity-90"
          title="Share on Instagram"
        >
          <FaInstagram />
        </button>

        {/* ================= Copy Link ================= */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${BRAND_TEXT} ${url}`);
            alert("Link copied successfully");
          }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          title="Copy link"
        >
          <FaLink />
        </button>
      </div>
    </div>
  );
};

export default ShareBar;