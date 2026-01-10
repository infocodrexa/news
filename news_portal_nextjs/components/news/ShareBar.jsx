"use client";

import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLink,
} from "react-icons/fa6";

const FRONTEND_URL = "https://thelocalmirror.in";
const BRAND_TEXT = "Read this on The Local Mirror:";

const ShareBar = ({ title, slug }) => {
  // ✅ Ye Link har device par sahi chalega
  const url = `${FRONTEND_URL}/news/${slug}`;

  // Twitter Share URL
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="mt-8 pt-4 border-t">
      <p className="text-sm font-semibold text-gray-700 mb-3">
        Share this news
      </p>

      <div className="flex gap-3 items-center flex-wrap">
        {/* 1. WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-green-500 text-white hover:opacity-90"
          title="Share on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        {/* 2. Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-600 text-white hover:opacity-90"
          title="Share on Facebook"
        >
          <FaFacebookF />
        </a>

        {/* 3. Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black text-white hover:opacity-90"
          title="Share on X"
        >
          <FaXTwitter />
        </a>

        {/* 4. Copy Link (Instagram hata diya) */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${BRAND_TEXT} ${url}`);
            alert("Link copied successfully");
          }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          title="Copy Link"
        >
          <FaLink />
        </button>
      </div>
    </div>
  );
};

export default ShareBar;
