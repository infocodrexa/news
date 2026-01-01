// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import NewContent from '../components/NewContent'
// import storeContext from '../../context/storeContext'

// const News = () => {

//     const { store } = useContext(storeContext)
//     return (
//         <div className='bg-white rounded-md'>
//             <div className='flex justify-between p-4'>
//                 <h2 className='text-xl font-medium'>News</h2>
//                 {
//                     store.userInfo && store.userInfo.role !== 'admin' && <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/news/create'>Create News</Link>
//                 }

//             </div>
//             <NewContent />
//         </div>
//     )
// }

// export default News


// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import NewContent from '../components/NewContent';
// import storeContext from '../../context/storeContext';
// import { FaPlus } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const News = () => {
//     const { store } = useContext(storeContext);
    
//     return (
//         <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'
//         >
//             <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
//                 <h2 className='text-2xl font-bold text-gray-800'>News Articles</h2>
                
//                 {/* Create News Button (Only for Writers) */}
//                 {store.userInfo && store.userInfo.role !== 'admin' && (
//                     <Link 
//                         className='flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md font-medium text-sm' 
//                         to='/dashboard/news/create'
//                     >
//                         <FaPlus /> Create News
//                     </Link>
//                 )}
//             </div>

//             {/* Content Component */}
//             <div className='w-full'>
//                 <NewContent />
//             </div>
//         </motion.div>
//     );
// };

// export default News;


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NewContent from '../components/NewContent'
import storeContext from '../../context/storeContext'

// 👇 1. Yahan ({ newsStatus }) likhna zaroori hai
const News = ({ newsStatus }) => {

    const { store } = useContext(storeContext)
    
    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium capitalize'>
                    {/* 👇 2. Title ko dynamic bana diya (Pending News / Active News) */}
                    {newsStatus ? `${newsStatus} News` : 'All News'} 
                </h2>
                
                {
                    store.userInfo?.role === 'admin' ? 
                    <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/admin/news/create'>Create News</Link>
                    :
                    <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/news/create'>Create News</Link>
                }

            </div>

            {/* 👇 3. SABSE ZAROORI: Prop ko aage pass karo */}
            <NewContent newsStatus={newsStatus} />
            
        </div>
    )
}

export default News