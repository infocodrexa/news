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
    const diffInSeconds = moment(news.updatedAt).diff(
      moment(news.createdAt),
      "seconds"
    );

    if (diffInSeconds > 60) {
      dateDisplay = (
        <span className="text-gray-500 font-medium text-xs flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3.5 h-3.5"
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
      <span className="text-gray-500 text-xs flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3.5 h-3.5"
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
  } else if (!dateDisplay && news?.date) {
    dateDisplay = moment(news.date).isValid()
      ? moment(news.date).format(timeFormat)
      : news.date;
  }

  return (
    <div>
      {/* ===== TOP ===== */}
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={news?.category} two={news?.title} />
        </div>
      </div>

      {/* 🟢 AD SPACE 1 */}
      {/* <div className="container mx-auto px-4 md:px-8">
         <GoogleAdPlaceholder type="banner" />
      </div> */}

      {/* ===== MAIN ===== */}
      <div className="bg-slate-200 w-full">
        {/* Adjusted padding here to make it slightly compact */}
        <div className="px-4 md:px-8 w-full py-6">
          <div className="flex flex-wrap">
            {/* ===== LEFT (NEWS CONTENT) ===== */}
            <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
              {/* Card Style: Rounded + Shadow + White BG */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Image: Natural Height */}
                <img
                  src={getImageUrl(news?.image)}
                  alt={news?.title}
                  className="w-full h-auto object-cover"
                />

                {/* Content Area: Reduced Padding (p-5 instead of p-6/8) */}
                <div className="p-5 mt-2">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-red-700 uppercase font-medium text-xl">
                      {formatCategory(news?.category)}
                    </h3>
                    {news?.subCategory && (
                      <span className="text-gray-500 font-bold text-lg uppercase">
                        - {news?.subCategory}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl text-gray-700 font-bold leading-[1.8] mb-4">
                    {news?.title}
                  </h2>

                  {/* 🔥 AUTHOR PROFILE + DATE SECTION (Fixed Slash & Added Profile Image) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Profile Image Circle */}
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg uppercase">
                        {news.writerName ? news.writerName.charAt(0) : "A"}
                      </div>

                      {/* Author Name */}
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                          Written By
                        </span>
                        <Link
                          href={`/writer/${
                            news.writerId?._id || news.writerId
                          }`}
                          className="font-bold text-gray-800 hover:text-red-600 transition-colors text-sm"
                        >
                          {news.writerName}
                        </Link>
                      </div>
                    </div>

                    {/* Date Display (No Slash) */}
                    <div>{dateDisplay}</div>
                  </div>

                  {/* 🟢 AD SPACE 2 */}
                  {/* <GoogleAdPlaceholder type="inContent" /> */}

                  {/* Description */}
                  <div className="text-[#333333] leading-relaxed news-content space-y-2">
                    {htmlParser(news?.description)}
                  </div>

                  {/* Tags */}
                  {news?.tags && news.tags.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <span className="text-sm font-bold text-gray-700 mb-2 block">
                        Tags:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {news?.tags &&
                          (() => {
                            let tagList = [];
                            if (Array.isArray(news.tags)) {
                              tagList = news.tags;
                            } else if (typeof news.tags === "string") {
                              tagList = news.tags.split(",");
                            }

                            return tagList.map((tag, i) => {
                              const cleanTag = tag?.toString().trim();
                              if (!cleanTag) return null;

                              return (
                                <Link
                                  key={i}
                                  href={`/tag/${cleanTag.replace(/\s+/g, "-")}`}
                                  className="bg-gray-100 border border-gray-200 text-gray-600 hover:bg-[#c80000] hover:text-white hover:border-[#c80000] px-4 py-1.5 rounded-full text-sm transition-all duration-200 font-medium capitalize"
                                >
                                  #{cleanTag.replace(/-/g, " ")}
                                </Link>
                              );
                            });
                          })()}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <ShareBar title={news?.title} slug={news?.slug} />
                  </div>
                </div>

                {/* 🟢 AD SPACE 3 */}
                <div className="px-5">
                  {/* <GoogleAdPlaceholder type="inContent" /> */}
                </div>

                <div className="pt-6 px-5 pb-6 border-t">
                  <RelatedNews news={relateNews} type="Related news" />
                </div>
              </div>
            </div>

            {/* ===== RIGHT (SIDEBAR) ===== */}
            <div className="w-full xl:w-4/12 pl-0 xl:pl-4 mt-8 xl:mt-0">
              <div className="flex flex-col gap-y-6 sticky top-4">
                <Search />
                {/* <GoogleAdPlaceholder type="sidebar" /> */}
                <RecentNews />
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
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
