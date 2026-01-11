import React from 'react';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload, MdContentCopy, MdDelete } from "react-icons/md";
import copy from 'copy-text-to-clipboard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Galler = ({ setShow, images, deleteImage }) => {

    const copy_url = (url) => {
        copy(url);
        toast.success('Image URL Copied!');
    };

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    };

    return (
        <div 
            onClick={handleBackdropClick} 
            className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4'
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className='bg-white w-full md:w-[900px] h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col'
            >
                
                {/* Header (Sticky) */}
                <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white z-10'>
                    <h2 className='text-xl font-bold text-gray-800'>Image Gallery</h2>
                    <button 
                        onClick={() => setShow(false)} 
                        className='p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors'
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Content Body (Scrollable) */}
                <div className='flex-1 overflow-y-auto p-6 custom-scrollbar'>
                    
                    {/* Upload Area */}
                    {/* Note: htmlFor="images" triggers the hidden input in Parent Component */}
                    <label 
                        htmlFor="images" 
                        className='w-full h-[180px] flex flex-col justify-center items-center rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 cursor-pointer hover:bg-indigo-100 hover:border-indigo-500 transition-all mb-8 group'
                    >
                        <div className='flex flex-col items-center gap-2 text-indigo-500 group-hover:scale-110 transition-transform duration-300'>
                            <MdCloudUpload className='text-5xl' />
                            <span className='font-semibold text-lg'>Upload Images</span>
                        </div>
                        <span className='text-sm text-indigo-400 mt-2'>Click to browse files</span>
                    </label>

                    {/* Image Grid */}
                    {images.length > 0 ? (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {images.map((img, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => copy_url(img.url)} 
                                    className='relative group w-full h-[150px] rounded-lg overflow-hidden cursor-pointer shadow-sm border border-gray-200'
                                >
                                    <img 
                                        src={img.url} 
                                        alt="gallery" 
                                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                                    />
                                    
                                    {/* Overlay on Hover */}
                                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white'>
                                        <MdContentCopy className='text-2xl mb-1' />
                                        <span className='text-xs font-bold uppercase tracking-wide'>Copy URL</span>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Copy URL को ट्रिगर होने से रोकता है
                                            deleteImage(img._id);
                                        }}
                                        className='absolute top-2 right-2 z-20 bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-700 shadow-lg translate-y-[-10px] group-hover:translate-y-0'
                                        title="Delete this image"
                                    >
                                        <MdDelete size={18} />
                                    </button>


                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-10 text-gray-400'>
                            <p>No images found in gallery.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Galler;