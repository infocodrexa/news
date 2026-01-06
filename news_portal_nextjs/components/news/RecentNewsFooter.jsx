import React from 'react'
import Link from "next/link";
import { base_api_url } from '../../config/config'

const RecentNewsFooter = async () => {

    // Simple Data Fetching (No complex error handling that crashes site)
    let news = [];
    try {
        const res = await fetch(`${base_api_url}/api/recent/news`, {
            next: { revalidate: 1 }
        })
        const data = await res.json()
        news = data.news || []
    } catch (error) {
        console.log("News fetch error, skipping...");
        news = [];
    }

    return (
        <div className="w-full flex flex-col gap-y-[14px]">
            <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
                Recent news
            </div>
            <div className="grid grid-cols-1 gap-y-4 pt-3">
                {
                    news && news.length > 0 && news.map((r, i) => {
                        if (i < 4) {
                            return <Link key={i} href={`/news/${r.slug}`} className="flex w-full gap-x-2 group">
                                <div className="group relative overflow-hidden w-[90px] h-[75px] block shrink-0 bg-gray-800 rounded-md">
                                    {/* Simple IMG tag wapas laga diya hai */}
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
                                            <span>{r?.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default RecentNewsFooter
