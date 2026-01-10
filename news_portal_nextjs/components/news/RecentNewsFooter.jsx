

import React from "react";
import Link from "next/link";
import { base_api_url } from "../../config/config";
import moment from "moment";

const RecentNewsFooter = async () => {
  let news = [];
  try {
    const res = await fetch(`${base_api_url}/api/recent/news`, {
      next: { revalidate: 1 },
    });
    const data = await res.json();
    news = data.news || [];
  } catch (error) {
    news = [];
  }

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
        Recent news
      </div>
      <div className="grid grid-cols-1 gap-y-4 pt-3">
        {news &&
          news.length > 0 &&
          news.map((r, i) => {
            if (i < 4) {
              
              // 🔥 Fixed Logic Here
              const timeFormat = "D MMM YYYY, h:mm A";
              let dateDisplay = null;

              // 1. Check Updated First (With Strict Minute Check)
              if (r.updatedAt && r.createdAt) {
                 const isSameTime = moment(r.updatedAt).isSame(moment(r.createdAt), 'minute');
                 
                 if (!isSameTime) {
                    dateDisplay = (
                        <span className="text-red-800">
                          Updated: {moment(r.updatedAt).format(timeFormat)}
                        </span>
                      );
                 }
              }

              // 2. If Not Updated, Show Created
              if (!dateDisplay && r.createdAt) {
                dateDisplay = moment(r.createdAt).format(timeFormat);
              }
              
              // 3. Fallback to Date String
              else if (!dateDisplay && r.date) {
                dateDisplay = moment(r.date).isValid()
                  ? moment(r.date).format(timeFormat)
                  : r.date;
              } 
              
              // 4. Last Resort
              if (!dateDisplay) {
                  dateDisplay = "Recent";
              }

              return (
                <Link
                  key={i}
                  href={`/news/${r.slug}`}
                  className="flex w-full gap-x-2 group"
                >
                  <div className="group relative overflow-hidden w-[90px] h-[75px] block shrink-0 bg-gray-800 rounded-md">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      src={r.image}
                      alt={r.title}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                  </div>
                  <div className="w-[calc(100%-90px)] pl-2">
                    <div className="flex flex-col gap-y-1">
                      <h2 className="text-sm font-semibold text-slate-300 group-hover:text-[#c80000] transition-colors line-clamp-2 leading-tight">
                        {r.title}
                      </h2>
                      <div className="flex gap-x-2 text-xs text-slate-500">
                        <span>{dateDisplay}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};
export default RecentNewsFooter;
