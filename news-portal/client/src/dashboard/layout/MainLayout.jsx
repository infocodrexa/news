// import React from 'react'
// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'

// const MainLayout = () => {
//     return (
//         <div className='min-w-screen min-h-screen bg-slate-100'>
//             <Sidebar />
//             <div className='ml-[250px] w-[calc(100vw-268px)] min-h-[100vh]'>
//                 <Header />
//                 <div className='p-4'>
//                     <div className='pt-[85px]'>
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default MainLayout

import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const MainLayout = () => {
    // 1. Mobile Sidebar State Manage karne ke liye
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className='bg-gray-100 w-full min-h-screen'>
            
            {/* 2. Header ko props pass kiye taaki Hamburger button kaam kare */}
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            
            {/* 3. Sidebar ko props pass kiye taaki wo open/close ho sake */}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            {/* 4. Main Content Area */}
            <div className={`ml-0 lg:ml-[260px] pt-[70px] transition-all duration-300`}>
                <div className='p-4 md:p-6 min-h-[calc(100vh-70px)]'>
                    {/* Yahan dashboard ke pages render honge */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout