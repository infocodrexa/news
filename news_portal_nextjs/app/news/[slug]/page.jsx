
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
import moment from "moment"; 

/* =====================================================
   ✅ METADATA
   ===================================================== */
export async function generateMetadata({ params }) {
  const { slug } = params;
  const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
  const { news } = await res.json();
  const siteUrl = base_api_url.replace("/api", "");
  const imageUrl = news?.image
    ? (news.image.startsWith("http") ? news.image : `${siteUrl}/uploads/${news.image}`)
    : `${siteUrl}/assets/og-image.png`;
  const plainDescription = news?.description
    ? news.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : news?.title;

  return {
    title: news?.title,
    description: plainDescription,
    openGraph: {
      title: news?.title,
      description: plainDescription,
      url: `${siteUrl}/news/${slug}`,
      siteName: "The Local Mirror",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: news?.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news?.title,
      description: plainDescription,
      images: [imageUrl],
    },
  };
}

const Details = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
    next: { revalidate: 1 },
  });
  const { news, relateNews } = await res.json();

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/800x400";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  // 🔥 FINAL FIXED DATE LOGIC (60 Seconds Threshold)
  const timeFormat = "D MMM YYYY, h:mm A";
  let dateDisplay = null;

  if (news?.updatedAt && news?.createdAt) {
      // Calculate difference in seconds
      const diffInSeconds = moment(news.updatedAt).diff(moment(news.createdAt), 'seconds');
      
      // Agar 60 seconds se zyada ka fark hai, tabhi Update maano
      if (diffInSeconds > 60) {
          dateDisplay = <span className="text-gray-800 font-semibold">Updated: {moment(news.updatedAt).format(timeFormat)}</span>;
      }
  } 
  
  // Agar upar wala check fail hua (matlab naya hai), toh Created date dikhao
  if (!dateDisplay && news?.createdAt) {
      dateDisplay = moment(news.createdAt).format(timeFormat);
  }
  
  // Fallback
  else if (!dateDisplay && news?.date) {
      dateDisplay = moment(news.date).isValid() ? moment(news.date).format(timeFormat) : news.date;
  }

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
            
            {/* ===== LEFT (NEWS CONTENT) ===== */}
            <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
              <div className="bg-white"> 
                <img
                  src={getImageUrl(news?.image)}
                  alt={news?.title}
                  className="w-full h-auto object-cover"
                />

                <div className="flex flex-col gap-y-4 px-6 pb-6 mt-6">
                  <h3 className="text-red-700 uppercase font-medium text-xl">
                    {news?.category}
                  </h3>

                  <h2 className="text-3xl text-gray-700 font-bold">
                    {news?.title}
                  </h2>

                  <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                    <span>{dateDisplay} /</span>
                    <span>{news?.writerName}</span>
                  </div>

                  <div className="text-[#333333] leading-relaxed news-content">
                    {htmlParser(news?.description)}
                  </div>

                  <ShareBar title={news?.title} slug={news?.slug} />
                </div>

                <div className="pt-8 px-6 pb-8 border-t">
                  <RelatedNews news={relateNews} type="Related news" />
                </div>
              </div>
            </div>

            {/* ===== RIGHT (SIDEBAR) ===== */}
            <div className="w-full xl:w-4/12 pl-0 xl:pl-4 mt-8 xl:mt-0">
              <div className="flex flex-col gap-y-8 sticky top-4">
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
