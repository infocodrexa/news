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

          {/* 🔒 TOP SECTION — UNCHANGED */}
          <div className="flex flex-wrap -mx-2 mb-10">
            <div className="w-full lg:w-6/12 px-2 mb-6 lg:mb-0">
              <LatestNews news={getCat("Latest")} />
            </div>

            <div className="w-full lg:w-6/12 px-2">
              <div className="flex w-full flex-col gap-y-[14px]">
                <Title title="Technology" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {getCat("Technology").slice(0, 4).map((item, i) => (
                    <SimpleNewsCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <PopularNews type="Most Popular" news={getCat("Political")} />

          {/* ✅ FIX ONLY HERE (below PopularNews) */}
          <div className="flex flex-col lg:flex-row gap-6 pb-8 mt-6">

            {/* LEFT — thoda space kam */}
            <div className="w-full lg:w-8/12 flex flex-col gap-y-6">
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

            {/* RIGHT — thoda space zyada */}
            <div className="w-full lg:w-4/12">
              <div className="lg:sticky lg:top-4 flex flex-col gap-y-6">

                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  {recentNews.slice(0, 6).map((item, i) => (
                    <NewsCard key={i} item={item} />
                  ))}
                </div>

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
