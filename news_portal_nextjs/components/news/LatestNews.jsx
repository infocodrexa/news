'use client'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SimpleNewsCard from './items/SimpleNewsCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { base_api_url } from '@/config/config';

const LatestNews = () => {

    const [news, setNews] = useState([])

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const latest_news_get = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/latest/news`)
            const data = await res.json()
            setNews(data.news || [])
        } catch (error) {
            console.log("Fetch Error:", error)
        }
    }

    useEffect(() => {
        latest_news_get()
    }, [])

    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className='flex justify-between items-center mb-2'>
                <div className='text-xl font-bold text-[#333333] relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:left-0 pl-3'>
                    Latest news
                </div>
                <div className='flex justify-center items-center gap-x-3'>
                    <button
                        onClick={() => previous()}
                        aria-label="Previous latest news"
                        className='w-[30px] h-[30px] flex justify-center items-center bg-white border border-slate-200 rounded-sm hover:bg-slate-50'
                    >
                        <span><FiChevronLeft /></span>
                    </button>
                    <button
                        onClick={() => next()}
                        aria-label="Next latest news"
                        className='w-[30px] h-[30px] flex justify-center items-center bg-white border border-slate-200 rounded-sm hover:bg-slate-50'
                    >
                        <span><FiChevronRight /></span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col-reverse gap-3 pr-0 lg:pr-2'>
            {news && news.length > 0 ? (
                <Carousel
                    autoPlay={true}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                    responsive={responsive}
                    infinite={true}
                    transitionDuration={500}
                >
                    {news.map((item, i) => {
                        const fixedItem = {
                            ...item,
                            image: item.image
                                ? (item.image.startsWith('http')
                                    ? item.image
                                    : `${base_api_url}/uploads/${item.image}`)
                                : "https://via.placeholder.com/400x200"
                        };

                        return <SimpleNewsCard item={fixedItem} key={i} type='latest' />
                    })}
                </Carousel>
            ) : (
                <div className="w-full h-[200px] flex items-center justify-center text-slate-400 border border-dashed rounded-md">
                    Loading latest news...
                </div>
            )}
        </div>
    )
}

export default LatestNews
