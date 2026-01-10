

export const dynamic = "force-dynamic";

import React from 'react'
import LoadingSpinner from 'react-spinners-components'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'

const HeadLines = ({ news = {} }) => {

    const allNews = Object.values(news).flat();

    return (
        <div className='bg-white shadow flex flex-wrap'>
            <div className='flex md:w-[170px] w-full bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30'>
                <div className='md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1'>
                    
                    {/* Decorative spinner */}
                    <span aria-hidden="true">
                        <LoadingSpinner
                          type='Ripple'
                          colors={['#800000', '#c80000']}
                          size={'30px'}
                        />
                    </span>

                    <h2 className='text-[#333333] font-semibold text-lg'>
                        Headlines
                    </h2>
                </div>
            </div>

            <div className='flex md:w-[calc(100%-170px)] w-full'>
                <div
                  className='flex w-full justify-start items-center'
                  role="region"
                  aria-label="Latest news headlines"
                >
                    <Marquee pauseOnHover={true} speed={50}>
                        {
                            allNews.length > 0 ? (
                                allNews.map((n, index) => (
                                    <Link 
                                        key={n._id || index}
                                        className='py-3 block font-semibold hover:text-[#c80000] pr-12 text-sm' 
                                        href={`/news/${n.slug}`}
                                    >
                                        {n.title}
                                    </Link>
                                ))
                            ) : (
                                <span className='pl-4 text-sm text-gray-500'>
                                    No news available
                                </span>
                            )
                        }
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default HeadLines
