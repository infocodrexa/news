//scroller 

// export const dynamic = "force-dynamic";

// import Breadcrumb from "@/components/Breadcrumb";
// import Category from "@/components/Category";
// import Footer from "@/components/Footer";
// import Search from "@/components/Search";
// import React from "react";
// import htmlParser from "react-html-parser";
// import { base_api_url } from "../../../config/config";
// import RelatedNews from "@/components/news/RelatedNews";
// import RecentNews from "@/components/news/RecentNews";
// import ShareBar from "@/components/news/ShareBar";

// const Details = async ({ params }) => {
//   const { slug } = params;

//   const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
//     next: { revalidate: 1 },
//   });

//   const { news, relateNews } = await res.json();

//   return (
//     <div>
//       {/* ===== TOP ===== */}
//       <div className="bg-white shadow-sm py-4">
//         <div className="px-4 md:px-8 w-full">
//           <Breadcrumb one={news?.category} two={news?.title} />
//         </div>
//       </div>

//       {/* ===== MAIN ===== */}
//       <div className="bg-slate-200 w-full">
//         <div className="px-4 md:px-8 w-full py-8">
//           <div className="flex flex-wrap">
//             {/* ===== LEFT ===== */}
//             <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
//               {/* ⚠️ Scroll logic SAME */}
//               <div className="h-[calc(100vh-4px)] overflow-y-auto bg-white scrollbar-hide">
                
//                 <img src={news?.image} alt={news?.title} />

//                 {/* ✅ CONTENT — same spacing & look as upper */}
//                 <div className="flex flex-col gap-y-4 px-6 pb-6">
//                   <h3 className="text-red-700 uppercase font-medium text-xl">
//                     {news?.category}
//                   </h3>

//                   <h2 className="text-3xl text-gray-700 font-bold">
//                     {news?.title}
//                   </h2>

//                   <div className="flex gap-x-2 text-xs font-normal text-slate-600">
//                     <span>{news?.date}/</span>
//                     <span>{news?.writerName}</span>
//                   </div>

//                   {/* ✅ description styling same as upper */}
//                   <div className="text-gray-800 leading-relaxed news-content">
//                     {htmlParser(news?.description)}
//                   </div>

//                   <ShareBar title={news?.title} slug={news?.slug} />

//                 </div>

//                 {/* ===== RELATED NEWS (logic same) ===== */}
//                 <div className="pt-8 px-6 pb-8 border-t">
//                   <RelatedNews news={relateNews} type="Related news" />
//                 </div>
//               </div>
//             </div>

//             {/* ===== RIGHT ===== */}
//             <div className="w-full xl:w-4/12 pl-0 xl:pl-4">
//               <div className="flex flex-col gap-y-8 h-[calc(100vh-4px)] overflow-y-auto no-scrollbar">
//                 <Search />
//                 <RecentNews />
//                 <div className="p-4 bg-white">
//                   <Category titleStyle={"text-gray-700 font-bold"} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===== FOOTER ===== */}
//       <Footer />
//     </div>
//   );
// };

// export default Details;



export const dynamic = "force-dynamic";

import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import React from "react";
import htmlParser from "react-html-parser";
import { base_api_url } from "../../../config/config";
import RelatedNews from "@/components/news/RelatedNews";
import RecentNews from "@/components/news/RecentNews";
import ShareBar from "@/components/news/ShareBar";

const Details = async ({ params }) => {
  const { slug } = params;

  const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
    next: { revalidate: 1 },
  });

  const { news, relateNews } = await res.json();

  // Helper function to get correct Image URL
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/800x400"; // Fallback image
    // Agar image link 'http' ya 'https' se shuru hota hai (jaise Google image), toh wahi rakho
    if (img.startsWith("http")) return img;
    // Agar image local upload hai, toh uske aage API ka URL lagao
    return `${base_api_url}/uploads/${img}`; // Agar DB me 'uploads/' pehle se hai to bas `${base_api_url}/${img}` likhna
  };

  return (
    <div>
      {/* ===== TOP ===== */}
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={news?.category} two={news?.title} />
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            {/* ===== LEFT ===== */}
            <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
              <div className="h-[calc(100vh-4px)] overflow-y-auto bg-white scrollbar-hide">
                
                {/* ✅ UPDATED IMAGE LOGIC */}
                <img 
                    src={getImageUrl(news?.image)} 
                    alt={news?.title} 
                    className="w-full h-auto object-cover"
                />

                {/* ✅ CONTENT */}
                <div className="flex flex-col gap-y-4 px-6 pb-6 mt-6">
                  <h3 className="text-red-700 uppercase font-medium text-xl">
                    {news?.category}
                  </h3>

                  <h2 className="text-3xl text-gray-700 font-bold">
                    {news?.title}
                  </h2>

                  <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                    <span>{news?.date} /</span>
                    <span>{news?.writerName}</span>
                  </div>

                  <div className="text-gray-800 leading-relaxed news-content">
                    {htmlParser(news?.description)}
                  </div>

                  <ShareBar title={news?.title} slug={news?.slug} />
                </div>

                {/* ===== RELATED NEWS ===== */}
                <div className="pt-8 px-6 pb-8 border-t">
                  <RelatedNews news={relateNews} type="Related news" />
                </div>
              </div>
            </div>

            {/* ===== RIGHT ===== */}
            <div className="w-full xl:w-4/12 pl-0 xl:pl-4">
              <div className="flex flex-col gap-y-8 h-[calc(100vh-4px)] overflow-y-auto no-scrollbar">
                <Search />
                <RecentNews />
                <div className="p-4 bg-white">
                  <Category titleStyle={"text-gray-700 font-bold"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default Details;