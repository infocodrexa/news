// import React, { useContext } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { AiFillDashboard, AiOutlinePlus } from 'react-icons/ai'
// import { ImProfile } from 'react-icons/im'
// import { BiNews } from 'react-icons/bi'
// import { FiUsers } from 'react-icons/fi'
// import { FaPlus } from "react-icons/fa";
// import storeContext from '../../context/storeContext'
// import { IoLogOutOutline } from "react-icons/io5";

// const Sidebar = () => {

//     const navigate = useNavigate()
//     const { pathname } = useLocation()

//     const { store, dispatch } = useContext(storeContext)

//     const logout = () => {
//         localStorage.removeItem('newsToken')
//         dispatch({ type: 'logout', payload: '' })
//         navigate('/login')
//     }
//     return (
//         <div className='w-[250px] h-screen fixed left-0 top-0 bg-white'>
//             <div className='h-[70px] flex justify-center items-center'>
//                 <Link to='/'>
//                     <img className='w-[190px] h-[35px]' src="https://news-portal-mern.onrender.com/assets/logo-00ebaab6.png" alt="" />
//                 </Link>
//             </div>
//             <ul className='px-3 flex flex-col gap-y-1 font-medium'>
//                 {
//                     store.userInfo?.role === 'admin' ? <>
//                         <li>
//                             <Link to='/dashboard/admin' className={`px-3 ${pathname === '/dashboard/admin' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                                 <span className='text-xl'><AiFillDashboard /></span>
//                                 <span>Dashboard</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/dashboard/writer/add' className={`px-3 ${pathname === '/dashboard/writer/add' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                                 <span className='text-xl'><AiOutlinePlus /></span>
//                                 <span>Add Writer</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/dashboard/writers' className={`px-3 ${pathname === '/dashboard/writers' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                                 <span className='text-xl'><FiUsers /></span>
//                                 <span>Writers</span>
//                             </Link>
//                         </li>
//                     </> : <>
//                         <li>
//                             <Link to='/dashboard/writer' className={`px-3 ${pathname === '/dashboard/writer' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                                 <span className='text-xl'><AiFillDashboard /></span>
//                                 <span>Dashboard</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/dashboard/news/create' className={`px-3 ${pathname === '/dashboard/news/create' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                                 <span className='text-xl'><FaPlus /></span>
//                                 <span>Add News</span>
//                             </Link>
//                         </li>
//                     </>
//                 }

//                 <li>
//                     <Link to='/dashboard/news' className={`px-3 ${pathname === '/dashboard/news' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                         <span className='text-xl'><BiNews /></span>
//                         <span>News</span>
//                     </Link>
//                 </li>

//                 <li>
//                     <Link to='/dashboard/profile' className={`px-3 ${pathname === '/dashboard/profile' ? 'bg-indigo-500 text-white' : 'bg-white text-[#404040f6]'} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
//                         <span className='text-xl'><ImProfile /></span>
//                         <span>Profile</span>
//                     </Link>
//                 </li>

//                 <li>
//                     <div onClick={logout} className={`px-3  py-2 hover:shadow-lg hover:shadow-red-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-red-500 hover:text-white cursor-pointer`}>
//                         <span className='text-xl'><IoLogOutOutline /></span>
//                         <span>Logout</span>
//                     </div>
//                 </li>

//             </ul>
//         </div>
//     )
// }

// export default Sidebar

// import React, { useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiFillDashboard, AiOutlinePlus, AiOutlineLogout } from 'react-icons/ai';
// import { ImProfile } from 'react-icons/im';
// import { BiNews } from 'react-icons/bi';
// import { FiUsers } from 'react-icons/fi';
// import storeContext from '../../context/storeContext';

// const Sidebar = ({ showSidebar, setShowSidebar }) => {
//     const { pathname } = useLocation();
//     const navigate = useNavigate();
//     const { store, dispatch } = useContext(storeContext);

//     const logout = () => {
//         localStorage.removeItem('newsToken');
//         dispatch({ type: 'logout', payload: '' });
//         navigate('/login');
//     };

//     const adminNavs = [
//         { title: 'Dashboard', icon: <AiFillDashboard />, path: '/dashboard/admin' },
//         { title: 'Add Writer', icon: <AiOutlinePlus />, path: '/dashboard/writer/add' },
//         { title: 'Writers', icon: <FiUsers />, path: '/dashboard/writers' },
//         { title: 'News', icon: <BiNews />, path: '/dashboard/news' },
//         { title: 'Profile', icon: <ImProfile />, path: '/dashboard/profile' },
//     ];

//     const writerNavs = [
//         { title: 'Dashboard', icon: <AiFillDashboard />, path: '/dashboard/writer' },
//         { title: 'Add News', icon: <AiOutlinePlus />, path: '/dashboard/news/create' },
//         { title: 'News', icon: <BiNews />, path: '/dashboard/news' },
//         { title: 'Profile', icon: <ImProfile />, path: '/dashboard/profile' },
//     ];

//     const navs = store.userInfo?.role === 'admin' ? adminNavs : writerNavs;

//     return (
//         <>
//             {/* Mobile Overlay */}
//             <div
//                 onClick={() => setShowSidebar(false)}
//                 className={`fixed top-0 left-0 w-full h-screen bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
//             ></div>

//             {/* Sidebar Container */}
//             <div className={`w-[260px] h-screen bg-white fixed top-0 z-50 transition-all duration-300 shadow-xl
//                 ${showSidebar ? 'left-0' : '-left-[260px]'} lg:left-0`}>

//                 {/* Logo Section */}
//                 <div className='h-[70px] flex justify-center items-center border-b border-gray-100'>
//                     <Link to='/' className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
//                         News<span className='text-gray-700'>Portal</span>
//                     </Link>
//                 </div>

//                 {/* Navigation Links */}
//                 <ul className='px-4 flex flex-col gap-y-2 mt-6'>
//                     {navs.map((nav, i) => (
//                         <li key={i}>
//                             <Link
//                                 to={nav.path}
//                                 onClick={() => setShowSidebar(false)}
//                                 className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
//                                 ${pathname === nav.path
//                                     ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
//                                     : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
//                                 }`}
//                             >
//                                 <span className='text-xl'>{nav.icon}</span>
//                                 <span>{nav.title}</span>
//                             </Link>
//                         </li>
//                     ))}

//                     {/* Logout Button */}
//                     <li className='mt-auto pt-8 pb-4'>
//                         <div
//                             onClick={logout}
//                             className='flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all duration-200'
//                         >
//                             <span className='text-xl'><AiOutlineLogout /></span>
//                             <span>Logout</span>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </>
//     );
// };

// export default Sidebar;

// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   AiFillDashboard,
//   AiOutlinePlus,
//   AiOutlineLogout,
// } from "react-icons/ai";
// import { ImProfile } from "react-icons/im";
// import { BiNews } from "react-icons/bi";
// import { FiUsers } from "react-icons/fi";
// import { FaPlus } from "react-icons/fa";
// import { MdOutlinePendingActions, MdUnpublished } from "react-icons/md";
// import { IoCheckmarkDoneCircleOutline, IoLogOutOutline } from "react-icons/io5";
// import storeContext from "../../context/storeContext";
// import logo from "../../assets/logo.png";

// const Sidebar = ({ showSidebar, setShowSidebar }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { store, dispatch } = useContext(storeContext);

//   const logout = () => {
//     localStorage.removeItem("newsToken");
//     dispatch({ type: "logout", payload: "" });
//     navigate("/login");
//   };

//   // 👇 Admin ke liye saare links ek array mein
//   const adminNavs = [
//     { title: "Dashboard", icon: <AiFillDashboard />, path: "/dashboard/admin" },
//     {
//       title: "Add Writer",
//       icon: <AiOutlinePlus />,
//       path: "/dashboard/writer/add",
//     },
//     { title: "Writers", icon: <FiUsers />, path: "/dashboard/writers" },
//     {
//       title: "Add News",
//       icon: <FaPlus />,
//       path: "/dashboard/admin/news/create",
//     },
//     { title: "All News", icon: <BiNews />, path: "/dashboard/news" },
//     {
//       title: "Active News",
//       icon: <IoCheckmarkDoneCircleOutline />,
//       path: "/dashboard/news/active",
//     },
//     {
//       title: "Pending News",
//       icon: <MdOutlinePendingActions />,
//       path: "/dashboard/news/pending",
//     },
//     {
//       title: "Deactive News",
//       icon: <MdUnpublished />,
//       path: "/dashboard/news/deactive",
//     },
//     { title: "Profile", icon: <ImProfile />, path: "/dashboard/profile" },
//   ];

//   // 👇 Writer ke liye saare links
//   const writerNavs = [
//     {
//       title: "Dashboard",
//       icon: <AiFillDashboard />,
//       path: "/dashboard/writer",
//     },
//     { title: "Add News", icon: <FaPlus />, path: "/dashboard/news/create" },
//     { title: "All News", icon: <BiNews />, path: "/dashboard/news" },
//     {
//       title: "Active News",
//       icon: <IoCheckmarkDoneCircleOutline />,
//       path: "/dashboard/news/active",
//     },
//     {
//       title: "Pending News",
//       icon: <MdOutlinePendingActions />,
//       path: "/dashboard/news/pending",
//     },
//     {
//       title: "Deactive News",
//       icon: <MdUnpublished />,
//       path: "/dashboard/news/deactive",
//     },
//     { title: "Profile", icon: <ImProfile />, path: "/dashboard/profile" },
//   ];

//   // Role ke hisab se menu decide karo
//   const navs = store.userInfo?.role === "admin" ? adminNavs : writerNavs;

//   return (
//     <>
//       {/* Mobile Overlay (Background dhundhla karne ke liye jab sidebar khule) */}
//       <div
//         onClick={() => setShowSidebar(false)}
//         className={`fixed top-0 left-0 w-full h-screen bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
//           showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       ></div>

//       {/* Sidebar Container */}
//       <div
//         className={`w-[260px] h-screen bg-white fixed top-0 z-50 transition-all duration-300 shadow-xl 
//                 ${showSidebar ? "left-0" : "-left-[260px]"} lg:left-0`}
//       >
//         {/* Logo Section */}
//         <div className="h-[70px] flex justify-center items-center border-b border-gray-100">
//           <Link to="/" className="text-center uppercase leading-none">
//             {/* 'The' chota sa upar */}
//             <span className="block text-[9px] text-black font-bold tracking-[0.2em] mb-[-2px]">
//               The
//             </span>

//             {/* 'LOCAL' Red Color mein */}
//             <h1 className="text-2xl font-black text-red-600 tracking-tighter m-0">
//               LOCAL
//             </h1>

//             {/* 'Mirror' letter spaced */}
//             <span className="block text-[11px] text-gray-800 font-bold tracking-[0.4em] mt-[-4px] ml-[2px]">
//               MIRROR
//             </span>
//           </Link>
//         </div>

//         {/* Navigation Links (Scrollable area) */}
//         <ul className="px-4 flex flex-col gap-y-2 mt-6 h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
//           {navs.map((nav, i) => (
//             <li key={i}>
//               <Link
//                 to={nav.path}
//                 onClick={() => setShowSidebar(false)}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
//                                 ${
//                                   pathname === nav.path
//                                     ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
//                                     : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
//                                 }`}
//               >
//                 <span className="text-xl">{nav.icon}</span>
//                 <span>{nav.title}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Logout Button (Fixed at Bottom) */}
//         <div className="absolute bottom-0 w-full p-4 border-t bg-white">
//           <div
//             onClick={logout}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all duration-200"
//           >
//             <span className="text-xl">
//               <IoLogOutOutline />
//             </span>
//             <span>Logout</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlinePlus,
  // AiOutlineLogout, // Hata diya kyunki niche IoLogOutOutline use ho rha hai
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { MdOutlinePendingActions, MdUnpublished } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline, IoLogOutOutline } from "react-icons/io5";
import storeContext from "../../context/storeContext";
// import logo from "../../assets/logo.png"; // Image URL direct use karenge

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
    // 🔴 Edited: Token ka naam 'mewsToken' kiya (Purane code ke hisab se)
    localStorage.removeItem("mewsToken"); 
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };

  // 👇 Admin ke liye saare links ek array mein
  const adminNavs = [
    // 🔴 Edited: 'Ads' link add kiya jo naye design mein miss ho gaya tha
    { 
      title: "Ads", 
      icon: <FaPlus />, 
      path: "/dashboard/ads" 
    },
    { title: "Dashboard", icon: <AiFillDashboard />, path: "/dashboard/admin" },
    {
      title: "Add Writer",
      icon: <AiOutlinePlus />,
      path: "/dashboard/writer/add",
    },
    { title: "Writers", icon: <FiUsers />, path: "/dashboard/writers" },
    {
      title: "Add News",
      icon: <FaPlus />,
      path: "/dashboard/admin/news/create",
    },
    { title: "All News", icon: <BiNews />, path: "/dashboard/news" },
    {
      title: "Active News",
      icon: <IoCheckmarkDoneCircleOutline />,
      path: "/dashboard/news/active",
    },
    {
      title: "Pending News",
      icon: <MdOutlinePendingActions />,
      path: "/dashboard/news/pending",
    },
    {
      title: "Deactive News",
      icon: <MdUnpublished />,
      path: "/dashboard/news/deactive",
    },
    { title: "Profile", icon: <ImProfile />, path: "/dashboard/profile" },
  ];

  // 👇 Writer ke liye saare links
  const writerNavs = [
    {
      title: "Dashboard",
      icon: <AiFillDashboard />,
      path: "/dashboard/writer",
    },
    { title: "Add News", icon: <FaPlus />, path: "/dashboard/news/create" },
    { title: "All News", icon: <BiNews />, path: "/dashboard/news" },
    {
      title: "Active News",
      icon: <IoCheckmarkDoneCircleOutline />,
      path: "/dashboard/news/active",
    },
    {
      title: "Pending News",
      icon: <MdOutlinePendingActions />,
      path: "/dashboard/news/pending",
    },
    {
      title: "Deactive News",
      icon: <MdUnpublished />,
      path: "/dashboard/news/deactive",
    },
    { title: "Profile", icon: <ImProfile />, path: "/dashboard/profile" },
  ];

  // Role ke hisab se menu decide karo
  const navs = store.userInfo?.role === "admin" ? adminNavs : writerNavs;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed top-0 left-0 w-full h-screen bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar Container */}
      <div
        className={`w-[260px] h-screen bg-white fixed top-0 z-50 transition-all duration-300 shadow-xl 
                ${showSidebar ? "left-0" : "-left-[260px]"} lg:left-0`}
      >
        {/* Logo Section */}
        <div className="h-[70px] flex justify-center items-center border-b border-gray-100">
          <Link to="/" className="text-center uppercase leading-none">
            
            {/* 🔴 Edited: Yahan Text wala Logo hata kar Purana Image Logo lagaya hai */}
            <img
                className="w-[190px] h-[35px] object-contain"
                src="https://news-portal-mern.onrender.com/assets/logo-00ebaab6.png"
                alt="Logo"
            />

          </Link>
        </div>

        {/* Navigation Links (Scrollable area) */}
        <ul className="px-4 flex flex-col gap-y-2 mt-6 h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
          {navs.map((nav, i) => (
            <li key={i}>
              <Link
                to={nav.path}
                onClick={() => setShowSidebar(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                                ${
                                  pathname === nav.path
                                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                                }`}
              >
                <span className="text-xl">{nav.icon}</span>
                <span>{nav.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button (Fixed at Bottom) */}
        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <div
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all duration-200"
          >
            <span className="text-xl">
              <IoLogOutOutline />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;