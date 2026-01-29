
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
import Title from "@/components/Title";
import { base_api_url } from "@/config/config";
import ModalAd from "@/components/ads/ModalAd";
import SlideInAd from "@/components/ads/SlideInAd";
import SlideAd from "@/components/ads/SlideAd.jsx";

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

  const getCat = (cat) => news[cat] || [];

  // 🔥 STEP 1: Fully Dynamic Category List
  // Hum database se aane wali saari keys (categories) nikal rahe hain.
  // "Latest" ko hata diya kyunki wo hero section me hai.
  const allCategories = Object.keys(news).filter(
    (cat) => cat !== "Latest" && news[cat].length > 0
  );

  // 🔥 STEP 2: Fallback Logic
  // Agar "Technology" ya "Political" database me nahi hui, to website toote nahi,
  // isliye hum dynamic fallback lagayenge.
  const topRightCategory = news["Technology"] ? "Technology" : allCategories[0]; // Default Tech or First Avail
  const popularCategory = news["Political"] ? "Political" : allCategories[1]; // Default Political or Second Avail

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <main>
        <ModalAd />
        {Object.keys(news).length > 0 && (
          <div className="bg-white shadow-sm border-b border-gray-100">
            <HeadLines news={news} />
          </div>
        )}

        <TrendingTags news={news} />

        <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
          {/* 🔒 TOP SECTION (Latest + One Specific Category) */}
          <div className="flex flex-wrap -mx-2 mb-10 mt-6">
            {/* Left: Latest News */}
            <div className="w-full lg:w-6/12 px-2 mb-6 lg:mb-0">
              <LatestNews news={getCat("Latest")} />
            </div>

            {/* Right: Technology (or Dynamic) */}
            <div className="w-full lg:w-6/12 px-2">
              <div className="flex w-full flex-col gap-y-[14px]">
                {/* Agar topRightCategory exist karti hai tabhi dikhao */}
                {topRightCategory && (
                  <>
                    <Title title={topRightCategory} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                      {getCat(topRightCategory)
                        .slice(0, 4)
                        .map((item, i) => (
                          <SimpleNewsCard key={i} item={item} />
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 🔒 MIDDLE SECTION (Popular News) */}
          {popularCategory && (
            <PopularNews type="Most Popular" news={getCat(popularCategory)} />
          )}

          {/* ✅ MAIN DYNAMIC SECTION */}
          <div className="flex flex-col lg:flex-row gap-6 pb-8 mt-6">
            {/* LEFT SIDE: ALL DYNAMIC CATEGORIES */}
            <div className="w-full lg:w-8/12 flex flex-col gap-y-6">
              {allCategories.map((category, index) => {
                // Humne upar Tech aur Political dikha diya hai, agar unhe repeat nahi karna
                // to yahan condition laga sakte ho. Filhal sab dikha rahe hain.

                return (
                  <div
                    key={category}
                    className="bg-white p-4 rounded-xl shadow-sm border"
                  >
                    {/* Even/Odd Logic for Design Variety */}
                    {index % 2 === 0 ? (
                      <DetailsNewsRow
                        news={getCat(category)}
                        category={category}
                      />
                    ) : (
                      <DetailsNews
                        news={getCat(category)}
                        category={category}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE: SIDEBAR (Recent + Extra) */}
            <div className="w-full lg:w-4/12">
              <div className="lg:sticky lg:top-4 flex flex-col gap-y-6">
                <SlideInAd position="sidebar" />
                {/* 1. Recent News Box */}
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <Title title="Recent Updates" />
                  <div className="flex flex-col gap-y-4 mt-4">
                    {recentNews.slice(0, 6).map((item, i) => (
                      <NewsCard key={i} item={item} />
                    ))}
                  </div>
                </div>

                {/* 2. Specific Category Box (Crime/Law or any other) */}
                {/* Yahan hum check karenge agar Crime category hai to wo dikhaye, 
                    nahi to Sports ya koi aur dikha de */}
                {news["Crime-&-Law"] ? (
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <DetailsNewsCol
                      news={getCat("Crime-&-Law")}
                      category="Crime-&-Law"
                    />
                  </div>
                ) : news["Sports"] ? (
                  // Fallback agar Crime nahi hai to Sports dikha do sidebar me
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <DetailsNewsCol news={getCat("Sports")} category="Sports" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        className="
    fixed z-[9999]
    bottom-4 left-1/2 -translate-x-1/2
    sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0
    w-[92%] sm:w-auto
  "
      >
        <SlideAd position="home" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
