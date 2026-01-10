export const dynamic = "force-dynamic";

import React from "react";
import { formatCategory } from "@/utils/format";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import RecentNews from "@/components/news/RecentNews";
import Category from "@/components/Category";
import { base_api_url } from "@/config/config";
import Link from "next/link";
import moment from "moment";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const WriterProfile = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${base_api_url}/api/public/writer/${id}`, {
    next: { revalidate: 1 },
  });

  const { writer, news } = await res.json();

  if (!writer) {
    return <div className="text-center py-20 font-bold text-gray-600">Writer not found</div>;
  }

  const getImageUrl = (img) => {
    if (!img) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <div className="px-4 md:px-8 w-full py-8">
        <div className="flex flex-wrap">
          
          {/* --- LEFT SIDE: WRITER INFO & NEWS LIST --- */}
          <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
            
            {/* स्क्रॉलर के लिए Tailwind की क्लासेस इस्तेमाल की हैं */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto bg-white shadow-md rounded-sm p-6 md:p-10 
                            scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-100">
              
              {/* Writer Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm shrink-0">
                  <img 
                    src={getImageUrl(writer.image)} 
                    alt={writer.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
                  />
                </div>

                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">{writer.name}</h1>
                  <p className="text-red-700 font-medium uppercase text-sm mt-1">Professional Writer</p>
                  
                  <p className="text-gray-600 mt-4 leading-relaxed italic">
                    {writer.description || "Building the future of digital media at The Local Mirror."}
                  </p>

                  <div className="flex justify-center md:justify-start gap-4 mt-6">
                    {writer.social?.facebook && (
                      <a href={writer.social.facebook} target="_blank" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                        <FaFacebook size={20} />
                      </a>
                    )}
                    {writer.social?.twitter && (
                      <a href={writer.social.twitter} target="_blank" className="p-2 bg-sky-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all">
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {writer.social?.instagram && (
                      <a href={writer.social.instagram} target="_blank" className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                        <FaInstagram size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* News Articles List */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-red-700 pl-3">
                  Latest Articles ({news?.length || 0})
                </h2>

                <div className="flex flex-col gap-y-8">
                  {news && news.length > 0 ? (
                    news.map((item, i) => (
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
                            <span className="flex items-center gap-1">{moment(item.date).format('LL')}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-400">No news published yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: SIDEBAR --- */}
          <div className="w-full xl:w-4/12 pl-0 xl:pl-4 mt-8 xl:mt-0">
            {/* Sidebar with hidden scrollbar */}
            <div className="flex flex-col gap-y-8 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
              <Search />
              <RecentNews />
              <div className="p-4 bg-white shadow-sm rounded-sm">
                <Category titleStyle={"text-gray-700 font-bold mb-4"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WriterProfile;