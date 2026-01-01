// import React, { useEffect, useState, useContext } from 'react'
// import { IoMdClose } from "react-icons/io";
// import { base_url } from '../../config/config'
// import axios from 'axios'
// import storeContext from '../../context/storeContext'
// import dateFormat from 'dateformat'

// const NewsView = ({ show, setShow, newsId }) => {

//     const { store } = useContext(storeContext)
//     const [news, setNews] = useState(null)

//     useEffect(() => {
//         const get_news = async () => {
//             try {
//                 const { data } = await axios.get(`${base_url}/api/news/${newsId}`, {
//                     headers: {
//                         'Authorization': `Bearer ${store.token}`
//                     }
//                 })
//                 setNews(data.news)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         if (newsId) {
//             get_news()
//         }
//     }, [newsId, store.token])

//     if (!show) return null

//     // Stop click propagation to prevent closing when clicking inside modal
//     const handleContentClick = (e) => {
//         e.stopPropagation();
//     }

//     return (
//         // Overlay - Click outside to close
//         <div onClick={() => setShow(false)} className='fixed top-0 left-0 w-full h-screen z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 transition-all duration-300'>
            
//             {/* Modal Box */}
//             <div onClick={handleContentClick} className='bg-white w-full md:w-[750px] max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn'>
                
//                 {/* Header Section (Sticky Top) */}
//                 <div className='flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50'>
//                     <h2 className='text-lg font-semibold text-gray-700'>News Preview</h2>
//                     <button onClick={() => setShow(false)} className='text-2xl text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200'>
//                         <IoMdClose />
//                     </button>
//                 </div>

//                 {/* Content Section (Scrollable) */}
//                 <div className='overflow-y-auto p-6 md:p-8 custom-scrollbar'>
//                     {
//                         news ? (
//                             <div className='flex flex-col gap-y-5'>
//                                 {/* Meta Data (Date & Category) */}
//                                 <div className='flex items-center gap-x-3'>
//                                     <span className='px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold uppercase tracking-wide'>
//                                         {news.category}
//                                     </span>
//                                     <span className='text-gray-500 text-sm font-medium'>
//                                         {dateFormat(news.date, "mmmm dS, yyyy")}
//                                     </span>
//                                 </div>

//                                 {/* Title */}
//                                 <h1 className='text-2xl md:text-3xl font-bold text-gray-900 leading-tight'>
//                                     {news.title}
//                                 </h1>

//                                 {/* Image */}
//                                 <div className='w-full h-[350px] rounded-lg overflow-hidden shadow-md'>
//                                     <img src={news.image} alt={news.title} className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'/>
//                                 </div>

//                                 {/* Writer Info */}
//                                 <div className='flex items-center gap-x-2 mt-2 border-l-4 border-purple-500 pl-3'>
//                                     <span className='text-gray-600 text-sm'>By</span>
//                                     <span className='font-semibold text-gray-800'>{news.writerName}</span>
//                                 </div>

//                                 {/* Description (HTML Content) */}
//                                 <div className='mt-2 text-gray-700 leading-7 text-lg space-y-4' dangerouslySetInnerHTML={{__html: news.description}}></div>
//                             </div>
//                         ) : (
//                             // Loader
//                             <div className='flex flex-col items-center justify-center py-20'>
//                                 <div className='w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin'></div>
//                                 <p className='mt-3 text-gray-500'>Loading News...</p>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NewsView


import React, { useEffect, useState, useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import dateFormat from 'dateformat';
import { motion, AnimatePresence } from 'framer-motion';

const NewsView = ({ show, setShow, newsId }) => {
    const { store } = useContext(storeContext);
    const [news, setNews] = useState(null);

    useEffect(() => {
        const get_news = async () => {
            try {
                const { data } = await axios.get(`${base_url}/api/news/${newsId}`, {
                    headers: { 'Authorization': `Bearer ${store.token}` }
                });
                setNews(data.news);
            } catch (error) {
                console.log(error);
            }
        };
        if (newsId) {
            get_news();
        }
    }, [newsId, store.token]);

    // Handle click outside to close
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <div 
                    onClick={handleBackdropClick} 
                    className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className='bg-white w-full md:w-[800px] max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative'
                    >
                        
                        {/* Header (Sticky) */}
                        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10'>
                            <h2 className='text-lg font-bold text-gray-700 uppercase tracking-wide'>News Preview</h2>
                            <button 
                                onClick={() => setShow(false)} 
                                className='p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors'
                            >
                                <IoMdClose size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className='overflow-y-auto p-6 md:p-8 custom-scrollbar'>
                            {news ? (
                                <div className='flex flex-col gap-6'>
                                    
                                    {/* Image */}
                                    <div className='w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md relative group'>
                                        <img 
                                            src={news.image} 
                                            alt={news.title} 
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                        />
                                        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-10'>
                                            <span className='px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wide shadow-sm'>
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title & Meta */}
                                    <div>
                                        <h1 className='text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3'>
                                            {news.title}
                                        </h1>
                                        <div className='flex items-center justify-between text-gray-500 text-sm border-b border-gray-100 pb-4 mb-4'>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-medium text-gray-900'>By {news.writerName}</span>
                                            </div>
                                            <span>{dateFormat(news.date, "mmmm dS, yyyy")}</span>
                                        </div>
                                    </div>

                                    {/* Description (HTML) */}
                                    <div 
                                        className='prose prose-indigo max-w-none text-gray-700 leading-relaxed' 
                                        dangerouslySetInnerHTML={{__html: news.description}}
                                    ></div>

                                </div>
                            ) : (
                                // Skeleton Loader
                                <div className='flex flex-col items-center justify-center h-[300px] space-y-4'>
                                    <div className='w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin'></div>
                                    <p className='text-gray-400 font-medium'>Loading news details...</p>
                                </div>
                            )}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NewsView;