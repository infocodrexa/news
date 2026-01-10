
"use client";
import React from "react";
import Link from "next/link";
import { base_api_url } from "@/config/config";
import moment from "moment"; 
const { convert } = require("html-to-text");

const SimpleDetailsNewCard = ({ news, type, height }) => {

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  // 🔥 Final Fixed Date Logic
  const displayDate = () => {
    const timeFormat = "D MMM YYYY, h:mm A";

    if (news?.updatedAt && news?.createdAt) {
       // 60 seconds check
       const diffInSeconds = moment(news.updatedAt).diff(moment(news.createdAt), 'seconds');
       
       if (diffInSeconds > 60) {
          return <span>Updated: {moment(news.updatedAt).format(timeFormat)}</span>;
       }
    }

    if (news?.createdAt) {
       return <span>{moment(news.createdAt).format(timeFormat)}</span>;
    }

    if (news?.date) {
       const isValidDate = moment(news.date).isValid();
       return <span>{isValidDate ? moment(news.date).format(timeFormat) : news.date}</span>;
    }

    return <span>Recent</span>;
  };

  return (
    <div className="bg-white shadow h-full flex flex-col">
      <div className="group relative overflow-hidden shrink-0">
        <Link
          href={`/news/${news?.slug}`}
          aria-label={`Read full news: ${news?.title}`}
        >
          <div
            style={{ height: `${height}px` }}
            className="w-full group-hover:scale-[1.1] transition-all duration-[1s] relative cursor-pointer"
          >
            <img
              src={getImageUrl(news?.image)}
              alt={news?.title || "News"}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </Link>
        
        <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300 pointer-events-none"></div>

        <div className="left-5 absolute bottom-4 flex justify-start items-start gap-x-2 text-white font-semibold gap-y-2">
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000] uppercase shadow-md">
            {news?.category || "News"}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link
          href={`/news/${news?.slug}`}
          aria-label={`Read news article: ${news?.title}`}
          className="text-[15px] font-semibold text-[#333333] hover:text-[#c80000] line-clamp-2"
        >
          {news?.title}
        </Link>

        <div className="flex gap-x-2 text-xs font-normal text-slate-600 mt-2 mb-2">
           {displayDate()}
          <span>{news?.writerName}</span>
        </div>

        {type === "details-news" && (
          <div className="text-sm text-slate-600 pt-2 line-clamp-3">
             {news?.description ? convert(news?.description) : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleDetailsNewCard;
