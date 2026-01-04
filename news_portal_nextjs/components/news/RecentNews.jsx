import React from 'react'
import Title from '../Title'
import NewsCard from './items/NewsCard'
import { base_api_url } from '../../config/config'

const RecentNews = async () => {

    let news = [];
    try {
        const res = await fetch(`${base_api_url}/api/recent/news`, {
            next: { revalidate: 1 }
        });
        const data = await res.json();
        news = data.news || [];
    } catch (error) {
        console.log("Recent News Error:", error);
    }

    return (
        // ✅ FIX 2: 'pt-4' hata diya gaya hai.
        // Ab ye section upar se chipak ke aayega aur Slider ke barabar dikhega.
        <div className="w-full flex flex-col gap-y-[14px] bg-white">
            <div className="pl-4 pt-4"> 
                <Title title="Recent news" />
            </div>
            <div className="grid grid-cols-1 gap-y-3">
                {
                    news && news.length > 0 && news.map((item, i) => {
                        // Image URL Fix
                        const fixedItem = {
                            ...item,
                            image: item.image 
                                ? (item.image.startsWith('http') ? item.image : `${base_api_url}/uploads/${item.image}`) 
                                : "https://via.placeholder.com/400x200"
                        };

                        return <NewsCard key={i} item={fixedItem} />
                    })
                }
            </div>
        </div>
    )
}

export default RecentNews
