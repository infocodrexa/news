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