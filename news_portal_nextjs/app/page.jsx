export const dynamic = "force-dynamic";
import HeadLines from "@/components/HeadLines";
import Title from "@/components/Title";
import DetailsNews from "@/components/news/DetailsNews";
import DetailsNewsCol from "@/components/news/DetailsNewsCol";
import DetailsNewsRow from "@/components/news/DetailsNewsRow";
import LatestNews from "@/components/news/LatestNews";
import PopularNews from "@/components/news/PopularNews";
import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
import NewsCard from "@/components/news/items/NewsCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/config";
import SlideInAd from "@/components/ads/SlideInAd";
import ModalAd from "@/components/ads/ModalAd";
import SlideAd from "@/components/ads/SlideAd.jsx";

async function getData() {
  try {
    const [allNewsRes, recentNewsRes] = await Promise.all([
      fetch(`${base_api_url}/api/all/news`, { next: { revalidate: 5 } }),
      fetch(`${base_api_url}/api/latest/news`, { next: { revalidate: 5 } })
    ]);

    const allNewsData = await allNewsRes.json();
    const recentNewsData = await recentNewsRes.json();

    return {
      news: allNewsData?.news || {},
      recentNews: recentNewsData?.news || []
    };
  } catch (error) {
    console.error("Data fetching error:", error);
    return { news: {}, recentNews: [] };
  }
}

const Home = async () => {
  const { news, recentNews } = await getData();

  // Helper: Check if category has news
  const hasNews = (cat) => news[cat] && news[cat].length > 0;
  const getCat = (cat) => news[cat] || [];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        <ModalAd />

        {/* Headlines */}
        {Object.keys(news).length > 0 && <HeadLines news={news} />}

        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">

            {/* ===================== TOP FEATURE SECTION (Fixed Layout) ===================== */}
            <div className="flex flex-wrap -mx-2 mb-10">
              {/* Left: Latest News (Education) */}
              <div className="w-full lg:w-6/12 px-2 mb-6 lg:mb-0">
                <LatestNews news={getCat("Education")} />
              </div>

              {/* Right: Technology Grid */}
              <div className="w-full lg:w-6/12 px-2">
                <div className="flex w-full flex-col gap-y-[14px]">
                  <Title title="Technology" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    {getCat("Technology").slice(0, 4).map((item, i) => (
                      <SimpleNewsCard key={i} item={item} />
                    ))}
                    {!hasNews("Technology") && <p className="text-sm text-gray-500">News coming soon...</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* ===================== POPULAR STRIP ===================== */}
            <div className="mb-10">
              <PopularNews type="Popular News" news={getCat("Travel")} />
            </div>

            {/* ===================== MAIN CONTENT AREA (Split Layout) ===================== */}
            {/* 🔥 CHANGE: Yahan maine "Flex Wrap" ke bajaye alag columns banaye hain.
                Left side (Main Content) aur Right side (Sidebar) alag-alag flow karenge.
                Isse blank space nahi aayega.
            */}
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* ✅ LEFT COLUMN (Primary News - 70%) */}
              <div className="w-full lg:w-8/12 flex flex-col gap-y-10">
                
                {/* 1. Sports */}
                {hasNews("Sports") && (
                  <DetailsNewsRow
                    news={getCat("Sports")}
                    category="Sports"
                    type="details-news"
                  />
                )}

                {/* 2. Health */}
                {hasNews("Health") && (
                  <DetailsNews
                    news={getCat("Health")}
                    category="Health"
                  />
                )}

                {/* 3. Travel */}
                {hasNews("Travel") && (
                  <DetailsNewsRow
                    news={getCat("Travel")}
                    category="Travel"
                    type="details-news"
                  />
                )}

                {/* 4. International */}
                {hasNews("International") && (
                  <DetailsNews
                    news={getCat("International")}
                    category="International"
                  />
                )}

                {/* 5. Technology (More) */}
                {hasNews("Technology") && (
                   <DetailsNewsRow
                   news={getCat("Technology")}
                   category="Technology"
                   type="details-news"
                 />
                )}
              </div>

              {/* ✅ RIGHT COLUMN (Sidebar - 30%) */}
              <div className="w-full lg:w-4/12 flex flex-col gap-y-8 h-fit sticky top-4">
                
                {/* 1. Education Sidebar */}
                {hasNews("Education") && (
                  <DetailsNewsCol
                    news={getCat("Education")}
                    category="Education"
                  />
                )}

                {/* 2. Advertisement */}
                <SlideInAd position="sidebar" />

                {/* 3. Politics */}
                {hasNews("Politics") && (
                  <DetailsNewsCol
                    news={getCat("Politics")}
                    category="Politics"
                  />
                )}

                {/* 4. Recent News Widget */}
                <div className="pl-0 lg:pl-2">
                  <Title title="Recent News" />
                  <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                    {recentNews && recentNews.length > 0 ? (
                      recentNews.slice(0, 5).map((item, i) => (
                        <NewsCard key={i} item={item} />
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No recent news found</p>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>
            

       {/* 🔥 FLOATING RESPONSIVE AD (FINAL) */}

      <div
        className="
    fixed z-[9999]   
    bottom-4 left-1/2 -translate-x-1/2
    sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 
    w-[92%] sm:w-auto">
        {/* Ab Saara Design SlideAd ke andar hai */}
        <SlideAd position="home" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
