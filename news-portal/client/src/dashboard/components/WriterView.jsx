// import React from 'react'
// import { IoMdClose } from "react-icons/io";

// const WriterView = ({ show, setShow, writer }) => {
//     if (!show || !writer) return null

//     return (
//         <div className='fixed top-0 left-0 w-full h-screen z-[9999] bg-black/50 flex justify-center items-center'>
//             <div className='bg-white w-[500px] rounded-md shadow-lg p-6 relative'>
//                 <button onClick={() => setShow(false)} className='absolute top-3 right-3 text-2xl hover:text-red-500'><IoMdClose /></button>
//                 <div className='flex flex-col items-center gap-4'>
//                     <img className='w-24 h-24 rounded-full object-cover border-2 border-green-500' src={writer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
//                     <div className='w-full space-y-2 mt-2 text-slate-600'>
//                         <div className='flex justify-between border-b pb-2'><span className='font-semibold'>Name:</span><span>{writer.name}</span></div>
//                         <div className='flex justify-between border-b pb-2'><span className='font-semibold'>Email:</span><span>{writer.email}</span></div>
//                         <div className='flex justify-between border-b pb-2'><span className='font-semibold'>Role:</span><span className='capitalize'>{writer.role}</span></div>
//                         <div className='flex justify-between border-b pb-2'><span className='font-semibold'>Category:</span><span>{writer.category}</span></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default WriterView


// import React from 'react';
// import { IoMdClose } from "react-icons/io";
// import { FaEnvelope, FaUserTag, FaLayerGroup } from "react-icons/fa";
// import { motion, AnimatePresence } from 'framer-motion';

// const WriterView = ({ show, setShow, writer }) => {
    
//     // Close modal when clicking outside
//     const handleBackdropClick = (e) => {
//         if (e.target === e.currentTarget) {
//             setShow(false);
//         }
//     };

//     return (
//         <AnimatePresence>
//             {show && writer && (
//                 <div 
//                     onClick={handleBackdropClick} 
//                     className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4'
//                 >
//                     <motion.div 
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.3 }}
//                         className='bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative'
//                     >
//                         {/* Header with Close Button */}
//                         <div className='flex justify-end p-4 absolute top-0 right-0 w-full z-10'>
//                             <button 
//                                 onClick={() => setShow(false)} 
//                                 className='p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm'
//                             >
//                                 <IoMdClose size={22} />
//                             </button>
//                         </div>

//                         {/* Profile Section */}
//                         <div className='flex flex-col items-center pt-10 px-6 pb-8'>
                            
//                             {/* Profile Image */}
//                             <div className='w-28 h-28 rounded-full border-4 border-indigo-50 shadow-lg overflow-hidden mb-4 p-1 bg-white'>
//                                 <img 
//                                     className='w-full h-full rounded-full object-cover' 
//                                     src={writer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
//                                     alt="writer" 
//                                 />
//                             </div>
                            
//                             {/* Name & Role */}
//                             <h2 className='text-2xl font-bold text-gray-800'>{writer.name}</h2>
//                             <span className='text-sm text-indigo-600 font-semibold uppercase tracking-wider mt-1 bg-indigo-50 px-3 py-1 rounded-full'>
//                                 {writer.role}
//                             </span>

//                             {/* Details List */}
//                             <div className='w-full mt-8 space-y-3'>
                                
//                                 {/* Email */}
//                                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow'>
//                                     <div className='w-10 h-10 flex justify-center items-center bg-white text-indigo-500 rounded-full shadow-sm text-lg'>
//                                         <FaEnvelope />
//                                     </div>
//                                     <div>
//                                         <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Email</p>
//                                         <p className='text-sm font-semibold text-gray-700'>{writer.email}</p>
//                                     </div>
//                                 </div>

//                                 {/* Category */}
//                                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow'>
//                                     <div className='w-10 h-10 flex justify-center items-center bg-white text-purple-500 rounded-full shadow-sm text-lg'>
//                                         <FaLayerGroup />
//                                     </div>
//                                     <div>
//                                         <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Category</p>
//                                         <p className='text-sm font-semibold text-gray-700'>{writer.category || "General"}</p>
//                                     </div>
//                                 </div>

//                                 {/* Access Level */}
//                                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow'>
//                                     <div className='w-10 h-10 flex justify-center items-center bg-white text-green-500 rounded-full shadow-sm text-lg'>
//                                         <FaUserTag />
//                                     </div>
//                                     <div>
//                                         <p className='text-xs text-gray-400 uppercase font-bold tracking-wider'>Status</p>
//                                         <p className='text-sm font-semibold text-gray-700 capitalize'>Active</p>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default WriterView;



import React from 'react'
import { IoMdClose } from "react-icons/io";

const WriterView = ({ show, setShow, writer }) => {
    if (!show || !writer) return null

    return (
        // 👇 Overlay me 'px-4' add kiya taaki mobile me corners chipke nahi
        <div className='fixed top-0 left-0 w-full h-screen z-[9999] bg-black/50 flex justify-center items-center px-4'>
            
            {/* 👇 Responsive Width Logic: w-full aur max-w-md lagaya */}
            <div className='bg-white w-full max-w-[500px] rounded-lg shadow-xl p-4 md:p-6 relative animate-fade-in'>
                
                {/* Close Button Position Adjustment */}
                <button 
                    onClick={() => setShow(false)} 
                    className='absolute top-2 right-2 md:top-3 md:right-3 text-xl md:text-2xl text-gray-500 hover:text-red-500 transition-colors'
                >
                    <IoMdClose />
                </button>

                <div className='flex flex-col items-center gap-4'>
                    {/* Image Size Responsive: Mobile pe chhota, Desktop pe bada */}
                    <img 
                        className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-green-500 shadow-sm' 
                        src={writer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                        alt={writer.name} 
                    />
                    
                    {/* Content Section */}
                    <div className='w-full space-y-3 mt-2 text-slate-600 text-sm md:text-base'>
                        
                        <div className='flex justify-between items-center border-b border-slate-100 pb-2'>
                            <span className='font-bold text-slate-700'>Name:</span>
                            <span>{writer.name}</span>
                        </div>
                        
                        <div className='flex justify-between items-center border-b border-slate-100 pb-2'>
                            <span className='font-bold text-slate-700'>Email:</span>
                            {/* 👇 'break-all' lagaya taaki lamba email mobile screen se bahar na jaye */}
                            <span className='break-all text-right'>{writer.email}</span>
                        </div>
                        
                        <div className='flex justify-between items-center border-b border-slate-100 pb-2'>
                            <span className='font-bold text-slate-700'>Role:</span>
                            <span className='capitalize px-2 py-0.5 bg-gray-100 rounded text-xs md:text-sm border'>
                                {writer.role}
                            </span>
                        </div>
                        
                        <div className='flex justify-between items-center border-b border-slate-100 pb-2'>
                            <span className='font-bold text-slate-700'>Category:</span>
                            <span>{writer.category}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WriterView