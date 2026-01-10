import React from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const GoogleAdPlaceholder = ({ type = "banner" }) => {
  // Styles based on type
  const containerStyles = {
    banner: "w-full h-auto py-4 md:h-[120px] flex-row", // Horizontal
    inContent: "w-full h-auto py-6 md:h-[200px] flex-col", // Box style
    sidebar: "w-full h-auto py-8 flex-col", // Square/Vertical
    vertical: "w-full h-[600px] flex-col",
  };

  return (
    <div
      className={`relative group overflow-hidden my-6 flex items-center justify-center gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md rounded-xl transition-all duration-300 ${
        containerStyles[type] || containerStyles.banner
      }`}
    >
      {/* Decorative Background Blur (Optional for premium look) */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-50 rounded-full blur-3xl -z-10 opacity-50"></div>

      {/* --- Text Content --- */}
      <div className={`text-center z-10 ${type === 'banner' ? 'md:text-left md:mr-4' : 'mb-4'}`}>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Don't Miss Out
        </p>
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          Join Our Community
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Get latest news updates on your phone.
        </p>
      </div>

      {/* --- Buttons Container --- */}
      <div className={`flex items-center gap-3 z-10 ${type === 'banner' ? 'flex-row' : 'flex-col w-full px-6'}`}>
        
        {/* WhatsApp Button */}
        <a
          href="YOUR_WHATSAPP_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full md:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaWhatsapp size={20} />
          <span>WhatsApp</span>
        </a>

        {/* Telegram Button */}
        <a
          href="YOUR_TELEGRAM_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full md:w-auto bg-[#0088cc] hover:bg-[#0077b5] text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaTelegramPlane size={20} />
          <span>Telegram</span>
        </a>
      </div>
    </div>
  );
};

export default GoogleAdPlaceholder;