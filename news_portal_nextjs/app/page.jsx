// export const dynamic = "force-dynamic";
// import HeadLines from "@/components/HeadLines";
// import Title from "@/components/Title";
// import DetailsNews from "@/components/news/DetailsNews";
// import DetailsNewsCol from "@/components/news/DetailsNewsCol";
// import DetailsNewsRow from "@/components/news/DetailsNewsRow";
// import LatestNews from "@/components/news/LatestNews";
// import PopularNews from "@/components/news/PopularNews";
// import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
// import NewsCard from "@/components/news/items/NewsCard";
// import Footer from "@/components/Footer";
// import { base_api_url } from "@/config/config";
// import SlideInAd from "@/components/ads/SlideInAd";
// import ModalAd from "@/components/ads/ModalAd";
// import SlideAd from "@/components/ads/SlideAd.jsx";
// import GoogleAdPlaceholder from "@/components/ads/GoogleAdPlaceholder";

// async function getData() {
//   try {
//     const [allNewsRes, recentNewsRes] = await Promise.all([
//       fetch(`${base_api_url}/api/all/news`, { next: { revalidate: 5 } }),
//       fetch(`${base_api_url}/api/latest/news`, { next: { revalidate: 5 } })
//     ]);

//     const allNewsData = await allNewsRes.json();
//     const recentNewsData = await recentNewsRes.json();

//     return {
//       news: allNewsData?.news || {},
//       recentNews: recentNewsData?.news || []
//     };
//   } catch (error) {
//     console.error("Data fetching error:", error);
//     return { news: {}, recentNews: [] };
//   }
// }

// const Home = async () => {
//   const { news, recentNews } = await getData();

//   // Helper: Check if category has news
//   const hasNews = (cat) => news[cat] && news[cat].length > 0;
//   const getCat = (cat) => news[cat] || [];

//   return (
//     <div className="min-h-screen flex flex-col justify-between">
//       <main>
//         <ModalAd />

//         {/* Headlines */}
//         {Object.keys(news).length > 0 && <HeadLines news={news} />}

//         {/* 🟢 AD SPACE 1: Headlines ke turant neeche (Top Banner) */}
//         <div className="px-4 md:px-8">
//            <GoogleAdPlaceholder type="banner" />
//         </div>


//         <div className="bg-slate-100">
//           <div className="px-4 md:px-8 py-8">

//             {/* ===================== TOP FEATURE SECTION (Fixed Layout) ===================== */}
//             <div className="flex flex-wrap -mx-2 mb-10">
//               {/* Left: Latest News (Education) */}
//               <div className="w-full lg:w-6/12 px-2 mb-6 lg:mb-0">
//                 <LatestNews news={getCat("Education")} />
//               </div>

//               {/* Right: Technology Grid */}
//               <div className="w-full lg:w-6/12 px-2">
//                 <div className="flex w-full flex-col gap-y-[14px]">
//                   <Title title="Technology" />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
//                     {getCat("Technology").slice(0, 4).map((item, i) => (
//                       <SimpleNewsCard key={i} item={item} />
//                     ))}
//                     {!hasNews("Technology") && <p className="text-sm text-gray-500">News coming soon...</p>}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ===================== POPULAR STRIP ===================== */}
//             <div className="mb-10">
//               <PopularNews type="Popular News" news={getCat("Travel")} />
//             </div>
//            {/* 🟢 AD SPACE 2: Sports aur Health ke beech me */}
//            <GoogleAdPlaceholder type="inContent" />
//             {/* ===================== MAIN CONTENT AREA (Split Layout) ===================== */}
//             <div className="flex flex-col lg:flex-row gap-8">
              
//               {/* ✅ LEFT COLUMN (Primary News - 70%) */}
//               <div className="w-full lg:w-8/12 flex flex-col gap-y-10">
                
//                 {/* 1. Sports */}
//                 {hasNews("Sports") && (
//                   <DetailsNewsRow
//                     news={getCat("Sports")}
//                     category="Sports"
//                     type="details-news"
//                   />
//                 )}
//                {/* 🟢 AD SPACE 3: Sports aur Health ke beech me */}
//              <GoogleAdPlaceholder type="inContent" />

//                 {/* 2. Health */}
//                 {hasNews("Health") && (
//                   <DetailsNews
//                     news={getCat("Health")}
//                     category="Health"
//                   />
//                 )}

//                 {/* 3. Travel */}
//                 {hasNews("Travel") && (
//                   <DetailsNewsRow
//                     news={getCat("Travel")}
//                     category="Travel"
//                     type="details-news"
//                   />
//                 )}

//                 {/* 4. International */}
//                 {hasNews("International") && (
//                   <DetailsNews
//                     news={getCat("International")}
//                     category="International"
//                   />
//                 )}

//                 {/* 5. Technology (More) */}
//                 {hasNews("Technology") && (
//                    <DetailsNewsRow
//                    news={getCat("Technology")}
//                    category="Technology"
//                    type="details-news"
//                  />
//                 )}
//               </div>

//               {/* ✅ RIGHT COLUMN (Sidebar - 30%) */}
//               <div className="w-full lg:w-4/12 flex flex-col gap-y-8 h-fit sticky top-4">
                
//                 {/* 1. Education Sidebar */}
//                 {hasNews("Education") && (
//                   <DetailsNewsCol
//                     news={getCat("Education")}
//                     category="Education"
//                   />
//                 )}

//                 {/* 2. Advertisement */}
//                 <SlideInAd position="sidebar" />

//                 {/* 🟢 AD SPACE 4: Sidebar me extra box */}
//                 <GoogleAdPlaceholder type="sidebar" />

//                 {/* 3. Politics */}
//                 {hasNews("Politics") && (
//                   <DetailsNewsCol
//                     news={getCat("Politics")}
//                     category="Politics"
//                   />
//                 )}

//                 {/* 4. Recent News Widget */}
//                 <div className="pl-0 lg:pl-2">
//                   <Title title="Recent News" />
//                   <div className="grid grid-cols-1 gap-y-[14px] mt-4">
//                     {recentNews && recentNews.length > 0 ? (
//                       recentNews.slice(0, 5).map((item, i) => (
//                         <NewsCard key={i} item={item} />
//                       ))
//                     ) : (
//                       <p className="text-gray-500 text-sm">No recent news found</p>
//                     )}
//                   </div>
//                 </div>

//               </div>

//             </div>

//           </div>
//         </div>
//       </main>
            

//        {/* 🔥 FLOATING RESPONSIVE AD (FINAL) */}

//       <div
//         className="
//     fixed z-[9999]   
//     bottom-4 left-1/2 -translate-x-1/2
//     sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 
//     w-[92%] sm:w-auto">
//         {/* Ab Saara Design SlideAd ke andar hai */}
//         <SlideAd position="home" />
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;

export const dynamic = "force-dynamic";

import React from "react";
import HeadLines from "@/components/HeadLines";
import TrendingTags from "@/components/news/TrendingTags";
import DetailsNews from "@/components/news/DetailsNews";
import DetailsNewsCol from "@/components/news/DetailsNewsCol";
import DetailsNewsRow from "@/components/news/DetailsNewsRow";
import LatestNews from "@/components/news/LatestNews";
import PopularNews from "@/components/news/PopularNews";
import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
import NewsCard from "@/components/news/items/NewsCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/config";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

async function getData() {
  try {
    const [allNewsRes, recentNewsRes] = await Promise.all([
      fetch(`${base_api_url}/api/all/news`, { next: { revalidate: 60 } }),
      fetch(`${base_api_url}/api/latest/news`, { next: { revalidate: 60 } }),
    ]);

    const allNewsData = await allNewsRes.json();
    const recentNewsData = await recentNewsRes.json();

    return {
      news: allNewsData?.news || {},
      recentNews: recentNewsData?.news || [],
    };
  } catch (error) {
    console.error("Data fetching error:", error);
    return { news: {}, recentNews: [] };
  }
}

const Home = async () => {
  const { news, recentNews } = await getData();

  const hasNews = (cat) => news[cat] && news[cat].length > 0;
  const getCat = (cat) => news[cat] || [];

  const mainCategories = [
    "National-News",
    "Political",
    "State",
    "Crime-&-Law",
    "Sports",
    "Business-&-Economy",
    "International",
    "Health",
    "Education-&-Jobs",
    "Technology",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <main>
        {Object.keys(news).length > 0 && (
          <div className="bg-white shadow-sm border-b border-gray-100">
            <HeadLines news={news} />
          </div>
        )}

        <TrendingTags news={news} />

        <div className="px-4 md:px-8 max-w-[1400px] mx-auto">

          {/* TOP FOLD */}
          <div className="flex flex-wrap -mx-2 mb-8">
            <div className="w-full lg:w-8/12 px-2 mb-6 lg:mb-0">
              <LatestNews news={getCat("Latest")} />
            </div>

            <div className="w-full lg:w-4/12 px-2">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex flex-col gap-4">
                  {getCat("Technology").slice(0, 4).map((item, i) => (
                    <SimpleNewsCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <PopularNews type="Most Popular" news={getCat("Political")} />

          <div className="flex flex-col lg:flex-row gap-8 pb-12 mt-8">

            {/* LEFT */}
            <div className="w-full lg:w-9/12 flex flex-col gap-y-12">
              {mainCategories.map((category, index) => {
                if (!hasNews(category)) return null;

                return (
                  <div
                    key={category}
                    className="bg-white p-4 rounded-xl shadow-sm border"
                  >
                    {index % 2 === 0 ? (
                      <DetailsNewsRow
                        news={getCat(category)}
                        category={category}
                        type="details-news"
                      />
                    ) : (
                      <DetailsNews
                        news={getCat(category)}
                        category={category}
                      />
                    )}

                    {(index + 1) % 3 === 0 && (
                      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-green-800">Stay Updated!</h4>
                          <p className="text-sm text-green-700">
                            Get latest {category.replace(/-/g, " ")} news on WhatsApp.
                          </p>
                        </div>
                        <a className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700">
                          <FaWhatsapp size={18} /> Join
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-3/12">
              <div className="sticky top-4 flex flex-col gap-y-8">

                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  {recentNews.slice(0, 6).map((item, i) => (
                    <NewsCard key={i} item={item} />
                  ))}
                </div>

                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <FaTelegramPlane size={40} className="mx-auto text-blue-500 mb-3" />
                  <h4 className="font-bold">Join Telegram</h4>
                  <p className="text-xs">Fastest news alerts</p>
                </div> */}

                {hasNews("Crime-&-Law") && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <DetailsNewsCol
                      news={getCat("Crime-&-Law")}
                      category="Crime-&-Law"
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
