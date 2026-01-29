"use client";

import React from "react";
import Link from "next/link";
import { base_api_url } from "@/config/config";
import moment from "moment";
import { formatCategory } from "@/utils/format";

const NewsCard = ({ item }) => {
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  const displayDate = () => {
    const timeFormat = "D MMM YYYY, h:mm A";

    if (item?.updatedAt && item?.createdAt) {
      const diffInSeconds = moment(item.updatedAt).diff(
        moment(item.createdAt),
        "seconds"
      );

      if (diffInSeconds > 60) {
        return (
          <span className="text-red-600 font-medium">
            Updated: {moment(item.updatedAt).format(timeFormat)}
          </span>
        );
      }
    }

    if (item?.createdAt) {
      return <span>{moment(item.createdAt).format(timeFormat)}</span>;
    }

    if (item?.date) {
      return <span>{moment(item.date).format(timeFormat)}</span>;
    }

    return <span>Recent</span>;
  };

  return (
    <div className="bg-white shadow flex p-4 h-full">
      <div className="relative group overflow-hidden h-full shrink-0">
        <Link href={`/news/${item?.slug}`}>
          <div className="group-hover:scale-[1.1] transition-all duration-[1s] w-[100px] md:w-[160px] h-[93px] lg:w-[100px] relative cursor-pointer overflow-hidden rounded-md">
            <img
              src={getImageUrl(item?.image)}
              alt={item?.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-y-1 w-[calc(100%-100px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-100px)] pl-3">
        <Link
          href={`/news/category/${item?.category}`}
          className="text-sm font-semibold text-[#c80000] uppercase"
        >
          {formatCategory(item?.category)}
        </Link>


        <Link
          href={`/${item?.category}`}
          className="text-sm font-bold text-[#333333] hover:text-[#c80000] line-clamp-2 leading-tight"
        >
          {item?.title}
        </Link>


        <div className="flex flex-wrap gap-x-2 text-[11px] font-normal text-slate-500 mt-1 items-center">
          {displayDate()}
          {item.writerName && (
            <>
              <span className="hidden xs:inline">/</span>
              {/* 👇 YAHAN FIX KIYA HAI: text-red-700 wapas laga diya */}
              <Link
                href={`/writer/${item.writerId?._id || item.writerId}`}
                className="font-semibold text-red-700 hover:text-blue-700 hover:underline"
              >
                {item.writerName}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
