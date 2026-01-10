import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDashboard, AiOutlinePlus } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaPlus, FaAdversal } from "react-icons/fa"; // Ads ke liye better icon
import { MdOutlinePendingActions, MdUnpublished } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline, IoLogOutOutline } from "react-icons/io5";
import storeContext from "../../context/storeContext";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
    localStorage.removeItem("newsToken"); // Make sure your token name is correct
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };

  // Professional Navigation Grouping
  const navGroups = [
    {
      group: "Main",
      links: [
        { 
          title: "Dashboard", 
          icon: <AiFillDashboard />, 
          path: store.userInfo?.role === "admin" ? "/dashboard/admin" : "/dashboard/writer" 
        },
        { title: "Profile", icon: <ImProfile />, path: "/dashboard/profile" },
      ]
    },
    {
      group: "Content Management",
      links: [
        { title: "Add News", icon: <FaPlus />, path: store.userInfo?.role === "admin" ? "/dashboard/admin/news/create" : "/dashboard/news/create" },
        { title: "All News", icon: <BiNews />, path: "/dashboard/news" },
        { title: "Active News", icon: <IoCheckmarkDoneCircleOutline />, path: "/dashboard/news/active" },
        { title: "Pending News", icon: <MdOutlinePendingActions />, path: "/dashboard/news/pending" },
        { title: "Deactive News", icon: <MdUnpublished />, path: "/dashboard/news/deactive" },
      ]
    }
  ];

  // Admin Only Section
  if (store.userInfo?.role === "admin") {
    navGroups.push({
      group: "Administration",
      links: [
        { title: "Add Writer", icon: <AiOutlinePlus />, path: "/dashboard/writer/add" },
        { title: "Writers List", icon: <FiUsers />, path: "/dashboard/writers" },
        { title: "Ads Manager", icon: <FaAdversal />, path: "/dashboard/ads" },
      ]
    });
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity ${
          showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar Container */}
      <div
        className={`w-[270px] h-screen bg-white fixed top-0 z-50 transition-all duration-300 border-r border-slate-100 
                ${showSidebar ? "left-0" : "-left-[270px]"} lg:left-0 shadow-2xl lg:shadow-none`}
      >
        {/* Logo Section */}
        <div className="h-[80px] flex justify-center items-center px-6">
          <Link to='/dashboard' className='text-center uppercase leading-none group'>
            <span className='block text-[10px] text-slate-400 font-bold tracking-[0.3em] mb-1 group-hover:text-red-500 transition-colors'>The</span>
            <h1 className='text-3xl font-black text-red-600 tracking-tighter m-0'>LOCAL</h1>
            <span className='block text-[12px] text-slate-800 font-bold tracking-[0.5em] mt-[-2px] ml-[2px]'>MIRROR</span>
          </Link>
        </div>

        {/* Navigation Area */}
        <div className="px-4 py-4 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              {/* Group Title */}
              <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                {group.group}
              </p>
              
              <ul className="flex flex-col gap-y-1">
                {group.links.map((nav, i) => (
                  <li key={i}>
                    <Link
                      to={nav.path}
                      onClick={() => setShowSidebar(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                                ${pathname === nav.path
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                }`}
                    >
                      <span className={`text-xl ${pathname === nav.path ? "text-white" : "text-slate-400"}`}>
                        {nav.icon}
                      </span>
                      <span>{nav.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 bg-slate-50/50 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <IoLogOutOutline className="text-2xl" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;