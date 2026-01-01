// import React from 'react'
// import LoadingSpinner from 'react-spinners-components'
// import Marquee from 'react-fast-marquee'
// import Link from 'next/link'

// const HeadLines = ({ news }) => {

//     // const head = [
//     //     {
//     //         title: 'OnePlus 11r Solar Red with 512 GB internal storage announced'
//     //     },
//     //     {
//     //         title: 'OnePlus 11r Solar Red with 512 GB internal storage announced'
//     //     },
//     //     {
//     //         title: 'OnePlus 11r Solar Red with 512 GB internal storage announced'
//     //     },
//     //     {
//     //         title: 'OnePlus 11r Solar Red with 512 GB internal storage announced'
//     //     },
//     //     {
//     //         title: 'OnePlus 11r Solar Red with 512 GB internal storage announced'
//     //     },
//     //     {
//     //         title: 'OnePlus 11r Solar Red with 512 GB internal storage announced'
//     //     }
//     // ]

//     return (
//         <div className='bg-white shadow flex flex-wrap'>
//             <div className='flex md:w-[170px] w-full bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30'>
//                 <div className='md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1'>
//                     <span><LoadingSpinner type='Ripple' colors={['#800000', '#c80000']} size={'30px'} /></span>
//                     <h2 className='text-[#333333] font-semibold text-lg'>Headlines</h2>
//                 </div>
//             </div>
//             <div className='flex md:w-[calc(100%-170px)] w-full'>
//                 <div className='flex w-full justify-start items-center'>
//                     <Marquee>
//                         {
//                             Object.keys(news).length > 0 &&
//                             Object.keys(news).map((c, i) => <>
//                                 {
//                                     news[c].length > 0 && news[c].map((n, j) => <Link className='py-3 block font-semibold hover:text-[#c80000] pr-12 text-sm ' href={`/news/${n.slug}`} >
//                                         {n.title}
//                                     </Link>)
//                                 }
//                             </>)
//                         }
//                     </Marquee>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeadLines

import React from 'react'
import LoadingSpinner from 'react-spinners-components'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'

const HeadLines = ({ news = {} }) => {

    // 1. Sabhi categories ki news ko ek single array mein mix karne ke liye
    // Isse agar aap kisi specific route par bhi honge, to saari headlines milengi
    const allNews = Object.values(news).flat();

    return (
        <div className='bg-white shadow flex flex-wrap'>
            <div className='flex md:w-[170px] w-full bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30'>
                <div className='md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1'>
                    <span><LoadingSpinner type='Ripple' colors={['#800000', '#c80000']} size={'30px'} /></span>
                    <h2 className='text-[#333333] font-semibold text-lg'>Headlines</h2>
                </div>
            </div>
            <div className='flex md:w-[calc(100%-170px)] w-full'>
                <div className='flex w-full justify-start items-center'>
                    {/* pauseOnHover={true} se user mouse rakh kar news padh sakta hai */}
                    <Marquee pauseOnHover={true} speed={50}>
                        {
                            allNews.length > 0 ? (
                                allNews.map((n, index) => (
                                    <Link 
                                        key={n._id || index} // Unique key add ki performance ke liye
                                        className='py-3 block font-semibold hover:text-[#c80000] pr-12 text-sm' 
                                        href={`/news/${n.slug}`}
                                    >
                                        {n.title}
                                    </Link>
                                ))
                            ) : (
                                <span className='pl-4 text-sm text-gray-500'>No news available</span>
                            )
                        }
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default HeadLines