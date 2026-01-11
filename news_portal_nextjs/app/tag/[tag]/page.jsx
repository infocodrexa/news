import React from "react";
import { formatCategory } from "@/utils/format";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import RecentNews from "@/components/news/RecentNews";
import Category from "@/components/Category";
import { base_api_url } from "@/config/config";
import Link from "next/link";
import moment from "moment";

// 👇 1. Fetching Logic (Reference Code se liya gaya hai)
async function getTagNews(tag) {
  try {
    // 🔥 URL Fixed based on your reference: /api/news/tag/
    const res = await fetch(`${base_api_url}/api/news/tag/${tag}`, {
      cache: 'no-store', // Fresh data ke liye
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data.news || [];
  } catch (error) {
    console.log("Error fetching tag news:", error);
    return [];
  }
}

const TagPage = async ({ params }) => {
  const { tag } = params;

  // 👇 2. Data Fetch Call
  const news = await getTagNews(tag);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <div className="px-4 md:px-8 w-full py-8">
        <div className="flex flex-wrap">
          
          {/* ===== LEFT SIDE: TAG NEWS LIST ===== */}
          <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
            
            {/* 🔥 SCROLLER: Height fixed + Scrollbar */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto bg-white shadow-md rounded-sm p-6 md:p-10 
                            scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-100">
              
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-red-700 pl-3 uppercase">
                Tag: {tag} ({news.length})
              </h2>

              <div className="grid grid-cols-1 gap-y-6">
                {news && news.length > 0 ? (
                  news.map((item, i) => {
                      
                      // 🔥 Date Logic (Updated/Created Check)
                      const timeFormat = "D MMM YYYY, h:mm A";
                      let displayDate;
                      if (item?.updatedAt && item?.createdAt) {
                        const diffInSeconds = moment(item.updatedAt).diff(moment(item.createdAt), 'seconds');
                        if (diffInSeconds > 60) {
                          displayDate = <span className="text-red-700 font-medium">Updated: {moment(item.updatedAt).format(timeFormat)}</span>;
                        } else {
                          displayDate = <span>{moment(item.createdAt).format(timeFormat)}</span>;
                        }
                      } else if (item?.createdAt) {
                         displayDate = <span>{moment(item.createdAt).format(timeFormat)}</span>;
                      } else {
                         displayDate = <span>{item.date ? moment(item.date).format(timeFormat) : "Recent"}</span>;
                      }

                    return (
                      <div key={i} className="flex flex-col md:flex-row gap-5 border-b pb-8 last:border-0 group">
                        <div className="w-full md:w-1/3 h-44 overflow-hidden rounded-md shadow-sm">
                          <Link href={`/news/${item.slug}`}>
                            <img 
                              src={getImageUrl(item.image)} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
                              alt={item.title} 
                            />
                          </Link>
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-between">
                          <div>
                            <Link href={`/news/${item.slug}`} className="text-xl font-bold text-gray-800 hover:text-red-700 leading-tight transition-colors">
                              {item.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                               {item.description?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <span className="text-red-700">{formatCategory(item?.category)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">{displayDate}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20 text-gray-500 font-semibold">
                    No news found for this tag.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== RIGHT (SIDEBAR) ===== */}
          <div className="w-full xl:w-4/12 pl-0 xl:pl-4 mt-8 xl:mt-0">
            
            {/* 🔥 SCROLLER: Height fixed + Scrollbar */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide flex flex-col gap-y-8">
              <Search />
              <RecentNews />
              <div className="p-4 bg-white shadow-sm rounded-sm">
                <Category titleStyle="text-gray-700 font-bold mb-4" />
              </div>
            </div>
            
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TagPage;
