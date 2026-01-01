
// import React, { useContext } from 'react'
// import profile from '../../assets/profile.png'
// import storeContext from '../../context/storeContext'

// const Header = () => {
//   // 👇 searchPar aur setSearchPar nikalo
//   const { store, searchPar, setSearchPar } = useContext(storeContext)

//   return (
//     <div className='pl-4 fixed w-[calc(100vw-250px)] top-4 z-50'>
//       <div className='w-full rounded h-[70px] flex justify-between items-center p-4 bg-white shadow-sm'>
        
//         {/* 👇 Input par onChange lagaya */}
//         <input 
//             onChange={(e) => setSearchPar(e.target.value)} 
//             value={searchPar}
//             type="text" 
//             placeholder='Search name, email or title...' 
//             className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 w-[300px]' 
//         />

//         <div className='mr-4'>
//           <div className='flex gap-x-2'>
//             <div className='flex flex-col justify-center items-end'>
//               <span className='font-bold text-gray-700'>{store.userInfo?.name}</span>
//               <span className='text-sm text-gray-500 capitalize'>{store.userInfo?.role}</span>
//             </div>
//             <img className='w-10 h-10 rounded-full object-cover border' src={store.userInfo?.image || profile} alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Header

// import React, { useContext } from 'react'
// import { FaBars } from 'react-icons/fa' // Mobile menu icon
// import profile from '../../assets/profile.png'
// import storeContext from '../../context/storeContext'

// const Header = ({ showSidebar, setShowSidebar }) => {
//   // 👇 Yahan Search aur Store dono context se nikala
//   const { store, searchPar, setSearchPar } = useContext(storeContext)

//   return (
//     <div className='fixed top-0 left-0 w-full h-[70px] bg-white z-20 shadow-sm flex justify-between items-center px-4 lg:px-8 transition-all duration-300 lg:pl-[280px]'>
      
//       {/* --- LEFT SIDE: Mobile Menu & Search --- */}
//       <div className='flex items-center gap-4'>
        
//         {/* Mobile Menu Toggle (Sirf mobile pe dikhega) */}
//         <div 
//           onClick={() => setShowSidebar(!showSidebar)} 
//           className='w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 text-gray-600 lg:hidden transition-colors'
//         >
//           <FaBars className='text-lg' />
//         </div>

//         {/* Search Bar (Updated with your search logic) */}
//         <input 
//           onChange={(e) => setSearchPar(e.target.value)} 
//           value={searchPar}
//           type="text" 
//           placeholder='Search name, email or title...' 
//           className='px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 text-sm w-[180px] sm:w-[300px] transition-all' 
//         />
//       </div>

//       {/* --- RIGHT SIDE: Profile Section --- */}
//       <div className='flex items-center gap-4'>
        
//         {/* User Info */}
//         <div className='text-right hidden sm:block'>
//           <h3 className='text-sm font-bold text-gray-800 leading-tight'>
//             {store.userInfo?.name || "User Name"}
//           </h3>
//           <span className='text-xs text-gray-500 font-medium capitalize'>
//             {store.userInfo?.role || "Role"}
//           </span>
//         </div>
        
//         {/* Profile Image */}
//         <div className='w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-purple-100 p-[2px] cursor-pointer'>
//           <img 
//             className='w-full h-full rounded-full object-cover' 
//             src={store.userInfo?.image ? store.userInfo.image : profile} 
//             alt="profile" 
//           />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Header



import React, { useContext } from 'react'
import { FaBars } from 'react-icons/fa' // Mobile Menu Icon
import profile from '../../assets/profile.png'
import storeContext from '../../context/storeContext'

const Header = ({ showSidebar, setShowSidebar }) => {
  // Context se data nikala
  const { store, searchPar, setSearchPar } = useContext(storeContext)

  return (
    <div className='fixed top-0 left-0 w-full h-[70px] bg-white z-20 shadow-sm flex justify-between items-center px-4 lg:px-8 transition-all duration-300 lg:pl-[280px]'>
      
      {/* --- LEFT SECTION: Toggle + Search --- */}
      <div className='flex items-center gap-4 flex-1'>
        
        {/* Mobile Menu Toggle (Sirf Mobile Pe Dikhega) */}
        <div 
          onClick={() => setShowSidebar(!showSidebar)} 
          className='w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 text-gray-600 lg:hidden transition-colors flex-shrink-0'
        >
          <FaBars className='text-lg' />
        </div>

        {/* Search Input (Responsive Width) */}
        <input 
          onChange={(e) => setSearchPar(e.target.value)} 
          value={searchPar}
          type="text" 
          placeholder='Search...' 
          className='px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 text-sm w-full max-w-[300px] transition-all' 
        />
      </div>

      {/* --- RIGHT SECTION: Profile Info --- */}
      <div className='flex items-center gap-4 flex-shrink-0'>
        
        {/* Text Info (Name & Role) - Hidden on extra small screens if needed */}
        <div className='text-right hidden sm:block'>
          <h3 className='text-sm font-bold text-gray-800 leading-tight'>
            {store.userInfo?.name || "User"}
          </h3>
          <span className='text-xs text-gray-500 font-medium capitalize'>
            {store.userInfo?.role || "Guest"}
          </span>
        </div>
        
        {/* Profile Image with Border */}
        <div className='w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full overflow-hidden border-2 border-purple-100 p-[2px] cursor-pointer'>
          <img 
            className='w-full h-full rounded-full object-cover' 
            src={store.userInfo?.image || profile} 
            alt="profile" 
          />
        </div>

      </div>
    </div>
  )
}

export default Header