import React from 'react';
import { Link } from 'react-router-dom';
import { BiShieldX } from "react-icons/bi";
import { motion } from 'framer-motion';

const Unable = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex justify-center items-center h-[85vh] w-full bg-gray-100 rounded-xl'
        >
            <div className='flex flex-col items-center text-center p-8 bg-white shadow-lg rounded-2xl max-w-md w-full border border-gray-100'>
                
                {/* Icon */}
                <div className='w-24 h-24 bg-red-50 rounded-full flex justify-center items-center mb-6'>
                    <BiShieldX className='text-6xl text-red-500' />
                </div>

                {/* Heading */}
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Access Denied</h1>
                
                {/* Description */}
                <p className='text-gray-500 mb-8'>
                    You do not have permission to view this page. <br />
                    Please contact your administrator if you believe this is a mistake.
                </p>

                {/* Back Button */}
                <Link 
                    to='/dashboard/news' 
                    className='px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-1'
                >
                    Back to Dashboard
                </Link>

                {/* Error Code Footer */}
                <div className='mt-8 pt-6 border-t border-gray-100 w-full'>
                    <p className='text-xs text-gray-400 font-mono'>ERROR CODE: 403_FORBIDDEN</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Unable;