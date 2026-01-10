"use client";

import React from "react";
import Link from "next/link";
import { base_api_url } from "@/config/config";
import moment from "moment";
import { formatCategory } from "@/utils/format";

const SimpleNewsCard = ({ item, type }) => {
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  const timeFormat = "D MMM YYYY, h:mm A";

  // 🔥 Final Fixed Date Logic
  const displayDate = () => {
    // 1. Updated Check
    if (item?.updatedAt && item?.createdAt) {
      // 60 seconds check
      const diffInSeconds = moment(item.updatedAt).diff(
        moment(item.createdAt),
        "seconds"
      );

      if (diffInSeconds > 60) {
        return (
          <span className="font-medium text-white">
            Updated: {moment(item.updatedAt).format(timeFormat)}
          </span>
        );
      }
    }

    // 2. Created Check
    if (item?.createdAt) {
      return <span>{moment(item.createdAt).format(timeFormat)}</span>;
    }

    // 3. Fallback Date
    if (item?.date && moment(item.date).isValid()) {
      return <span>{moment(item.date).format(timeFormat)}</span>;
    }

    return <span>{item?.date || "Recent"}</span>;
  };

  return (
    <div className="group relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className={`${type ? "h-[270px] sm:h-[470px]" : "h-[228px]"}
          w-full group-hover:scale-[1.1] transition-all duration-[1s] relative`}
        >
          <img
            src={getImageUrl(item?.image)}
            alt={item?.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <Link
            href={`/news/${item?.slug}`}
            aria-label={`Read full news: ${item?.title}`}
            className="absolute inset-0 z-10"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none rounded-lg"></div>

      <div className="left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2 z-20">
        <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
          {formatCategory(item?.category)}
        </div>

        <Link
          href={`/news/${item?.slug}`}
          aria-label={`Read news article: ${item?.title}`}
          className="text-xl line-clamp-2 hover:text-[#c80000] transition-colors"
        >
          {item?.title}
        </Link>

        <div className="flex gap-x-2 text-sm font-normal text-slate-200">
          {/* Date Logic Call */}
          {displayDate()}
          <span>
            <Link
              href={`/writer/${item.writerId?._id || item.writerId}`}
              className="font-semibold !text-red-600 hover:!text-blue-700 hover:underline"
            >
              {item.writerName}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimpleNewsCard;
