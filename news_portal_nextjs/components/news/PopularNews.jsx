import React from 'react'
import Title from '../Title'
import SimpleDetailsNewCard from './items/SimpleDetailsNewCard'
import { base_api_url } from '../../config/config'

const PopularNews = async ({ type }) => {

    let popularNews = [];
    try {
        const res = await fetch(`${base_api_url}/api/popular/news`, {
            next: { revalidate: 1 }
        });
        const data = await res.json();
        popularNews = data.popularNews || [];
    } catch (error) {
        console.error("Popular News Error:", error);
    }

    // ✅ FIX 1: Strict Check. Agar news nahi hai, to NULL return karega.
    // Isse wo "Spacing" (White gap) puri tarah gayab ho jayegi.
    if (!popularNews || popularNews.length === 0) {
        return null;
    }
    
    return (
        <div className='w-full pb-8 mt-5'>
            <div className='flex flex-col w-full gap-y-[14px]'>
                <Title title="Popular news" />
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3'>
                    {
                        popularNews.map((item, i) => {
                            if (i < 4) {
                                // Image URL Fix
                                const fixedItem = {
                                    ...item,
                                    image: item.image 
                                        ? (item.image.startsWith('http') ? item.image : `${base_api_url}/uploads/${item.image}`) 
                                        : "https://via.placeholder.com/400x200"
                                };
                                return <SimpleDetailsNewCard news={fixedItem} type={type} item={fixedItem} key={i} height={230} />
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PopularNews
