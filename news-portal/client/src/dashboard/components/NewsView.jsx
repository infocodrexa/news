import React, { useEffect, useState, useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaHashtag } from "react-icons/fa"; // Tag icon
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import dateFormat from 'dateformat';
import { motion, AnimatePresence } from 'framer-motion';

const NewsView = ({ show, setShow, newsId }) => {
    const { store } = useContext(storeContext);
    const [news, setNews] = useState(null);

    // Formatter logic
    const formatCategory = (text) => {
        if (!text) return "";
        try {
            return decodeURIComponent(text).replace(/-/g, ' ');
        } catch (e) {
            return text.replace(/-/g, ' ');
        }
    };

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
                                    
                                    {/* Image Section */}
                                    <div className='w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md relative group'>
                                        <img 
                                            src={news.image} 
                                            alt={news.title} 
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                        />
                                        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 flex gap-2 flex-wrap'>
                                            
                                            {/* Category */}
                                            <span className='px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wide shadow-sm'>
                                                {formatCategory(news.category)}
                                            </span>

                                            {/* SubCategory */}
                                            {news.subCategory && (
                                                <span className='px-3 py-1 bg-pink-600 text-white rounded-full text-xs font-bold uppercase tracking-wide shadow-sm'>
                                                    {formatCategory(news.subCategory)}
                                                </span>
                                            )}
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

                                    {/* 👇 NEW: TAGS SECTION */}
                                    {news.tags && news.tags.length > 0 && (
                                        <div className='mt-6 pt-6 border-t border-gray-100'>
                                            <h3 className='text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2'>
                                                <FaHashtag /> Related Tags
                                            </h3>
                                            <div className='flex flex-wrap gap-2'>
                                                {/* Logic: Agar Array hai to direct map, agar String hai to split karke map */}
                                                {(Array.isArray(news.tags) ? news.tags : news.tags.split(',')).map((tag, index) => (
                                                    <span 
                                                        key={index} 
                                                        className='px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default'
                                                    >
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

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