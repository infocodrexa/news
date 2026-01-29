//slider


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
import { formatCategory } from "@/utils/format";
import Link from "next/link";
// import GoogleAdPlaceholder from "@/components/ads/GoogleAdPlaceholder";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
  const { news } = await res.json();
  const siteUrl = base_api_url.replace("/api", "");
  const imageUrl = news?.image
    ? news.image.startsWith("http")
      ? news.image
      : `${siteUrl}/uploads/${news.image}`
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
    const diffInSeconds = moment(news.updatedAt).diff(
      moment(news.createdAt),
      "seconds"
    );

    // Agar 60 seconds se zyada ka fark hai, tabhi Update maano
    if (diffInSeconds > 60) {
      dateDisplay = (
        <span className="text-gray-600 font-medium text-sm flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Updated: {moment(news.updatedAt).format(timeFormat)}
        </span>
      );
    }
  }

  if (!dateDisplay && news?.createdAt) {
    dateDisplay = (
      <span className="text-gray-600 text-sm flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        {moment(news.createdAt).format(timeFormat)}
      </span>
    );
  }

  // Fallback
  else if (!dateDisplay && news?.date) {
    dateDisplay = moment(news.date).isValid()
      ? moment(news.date).format(timeFormat)
      : news.date;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== TOP ===== */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 md:px-8 w-full py-4">
          <Breadcrumb one={news?.category} two={news?.title} />
        </div>
      </div>

      {/* 🟢 AD SPACE 1: Title se pehle bada banner */}
      {/* <div className="container mx-auto px-4 md:px-8 mt-6">
         <GoogleAdPlaceholder type="banner" />
      </div> */}

      {/* ===== MAIN ===== */}
      <div className="w-full py-8 md:py-10">
        <div className="px-4 md:px-8 w-full max-w-[1440px] mx-auto">
          <div className="flex flex-wrap gap-y-8">
            {/* ===== LEFT (NEWS CONTENT) ===== */}
            <div className="w-full xl:w-8/12 pr-0 xl:pr-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Image Section */}
                <div className="relative w-full h-[300px] md:h-[500px]">
                  <img
                    src={getImageUrl(news?.image)}
                    alt={news?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* 🔥 Padding reduced here (p-5 md:p-8) */}
                <div className="p-5 md:p-8">
                  {/* Category & Badges */}
                  <div className="flex items-center flex-wrap gap-3 mb-4">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {formatCategory(news?.category)}
                    </span>

                    {/* SubCategory agar available ho tabhi dikhega */}
                    {news?.subCategory && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase border border-gray-200">
                        {news?.subCategory}
                      </span>
                    )}
                  </div>

                  {/* Title (🔥 Line height fixed: leading-snug) */}

                  <h1
                    className="news-title text-2xl md:text-3xl lg:text-[32px] 
                       text-gray-900 font-extrabold mb-3"
                  >
                    {news?.title}
                  </h1>

                  {/* Author & Date Meta Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
                    {/* <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg uppercase">
                        {news.writerName ? news.writerName.charAt(0) : "A"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-semibold">
                          Written By
                        </span>
                        <Link
                          href={`/writer/${
                            news.writerId?._id || news.writerId
                          }`}
                          className="font-bold text-gray-800 hover:text-red-600 transition-colors"
                        >
                          {news.writerName}
                        </Link>
                      </div>
                    </div> */}

                    <div className="flex items-center gap-3">
                      {news?.writerId?.image ? (
                        <img
                          src={news.writerId.image}
                          alt={news.writerName}
                          className="w-10 h-10 rounded-full object-cover border border-red-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg uppercase">
                          {news?.writerName ? news.writerName.charAt(0) : "A"}
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-semibold">
                          Written By
                        </span>
                        <Link
                          href={`/writer/${
                            news.writerId?._id || news.writerId
                          }`}
                          className="font-bold text-gray-800 hover:text-red-600 transition-colors"
                        >
                          {news.writerName}
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">{dateDisplay}</div>
                  </div>

                  {/* 🟢 AD SPACE 2: Content shuru hone se pehle */}
                  {/* <GoogleAdPlaceholder type="inContent" /> */}

                  <div className="news-content">
                    {htmlParser(news?.description)}
                  </div>

                  {/* Tags Section */}
                  {news?.tags && news.tags.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.593l6.002-2.002c.762-.255 1.144-1.056.894-1.802l-1.92-5.76a2.25 2.25 0 0 0-1.76-1.52l-5.625-1.875a1.714 1.714 0 0 0-.583-.106Zm1.84 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                          />
                        </svg>
                        <span className="text-base font-bold text-gray-900">
                          Related Topics:
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {news.tags
                          .toString()
                          .split(",")
                          .map((tag, i) => (
                            <Link
                              key={i}
                              href={`/tag/${tag.trim()}`}
                              className="bg-gray-100 border border-transparent text-gray-600 hover:bg-red-600 hover:text-white hover:shadow-md px-4 py-2 rounded-full text-sm transition-all duration-300 font-medium"
                            >
                              #{tag.trim()}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <ShareBar title={news?.title} slug={news?.slug} />
                  </div>
                </div>

                {/* 🟢 AD SPACE 3: Article khatam hone ke baad */}
                <div className="px-6 md:px-10 pb-6">
                  {/* <GoogleAdPlaceholder type="inContent" /> */}
                </div>

                <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
                  <RelatedNews news={relateNews} />
                </div>
              </div>
            </div>

            {/* ===== RIGHT (SIDEBAR) ===== */}
            <div className="w-full xl:w-4/12 pl-0 xl:pl-4">
              <div className="flex flex-col gap-y-8 sticky top-4">
                {/* Search Box Container */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <Search />
                </div>

                {/* 🟢 AD SPACE 4: Sidebar Top */}
                {/* <GoogleAdPlaceholder type="sidebar" /> */}

                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <RecentNews />
                </div>

                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
                  <Category
                    titleStyle={
                      "text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2"
                    }
                  />
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
