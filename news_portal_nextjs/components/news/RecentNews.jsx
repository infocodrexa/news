import React from 'react'
import Title from '../Title'
import NewsCard from './items/NewsCard'
import { base_api_url } from '../../config/config'

const RecentNews = async () => {

    // Note: Agar API endpoint '/api/latest/news' hai to wahi use karein, 
    // maine apke code ke hisab se '/api/recent/news' rakha hai.
    const res = await fetch(`${base_api_url}/api/recent/news`, {
        next: {
            revalidate: 1
        }
    })
    
    // Safety check: Agar API fail hui to crash na ho
    let news = [];
    try {
        const data = await res.json();
        news = data.news || [];
    } catch (error) {
        console.log("Recent News Fetch Error:", error);
    }

    return (
        <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
            <div className="pl-4">
                <Title title="Recent news" />
            </div>
            <div className="grid grid-cols-1 gap-y-3">
                {
                    news && news.length > 0 && news.map((item, i) => {
                        // ✅ FIX: Image URL Correct kiya
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
