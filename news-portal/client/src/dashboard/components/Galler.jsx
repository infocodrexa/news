// import React from 'react'
// import { Link } from 'react-router-dom'
// import { AiOutlineClose } from "react-icons/ai";
// import { MdCloudUpload } from "react-icons/md";
// import copy from 'copy-text-to-clipboard'
// import toast from 'react-hot-toast';

// const Galler = ({ setShow, images }) => {

//     const copy_url = (url)=>{
//         copy(url)
//         toast.success('copu success')
//     }
//     return (
//         <div className='w-screen h-screen fixed left-0 top-0 z-[9999]'>
//             <div className='w-full h-full relative'>
//                 <div className='bg-gray-400 opacity-80 w-full h-full absolute top-0 left-0 z-[998]'></div>
//                 <div className='absolute bg-white w-[50%] p-3 rounded-sm h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%]'>
//                     <div className='pb-3 flex justify-between items-center w-full'>
//                         <h2>Gallery</h2>
//                         <div onClick={() => setShow(false)} className='text-xl cursor-pointer'>
//                             <AiOutlineClose />
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor="images" className={`w-full h-[180px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed`}>
//                             <div className='flex justify-center items-center flex-col gap-y-2'>
//                                 <span className='text-2xl'><MdCloudUpload /></span>
//                                 <span>Select Image</span>
//                             </div>
//                         </label>
                        
//                     </div>
//                     <div className='grid grid-cols-4 gap-x-2 mt-3'>
//                         {
//                             images.length>0 && images.map((img,i)=><div className=' cursor-pointer' onClick={()=>copy_url(img.url)} key={i}  >
//                                 <img src={img.url} alt="image" className='w-full h-[100px]' />
//                             </div>)
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Galler





import React from 'react';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload, MdContentCopy } from "react-icons/md";
import copy from 'copy-text-to-clipboard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Galler = ({ setShow, images }) => {

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