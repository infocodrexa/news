// import React, { useEffect, useState, useContext } from 'react'
// import { FaEye } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import storeContext from '../../context/storeContext'
// import { base_url } from '../../config/config'
// import axios from 'axios'
// import { convert } from 'html-to-text'
// import dateFormat from 'dateformat'
// import NewsView from '../components/NewsView' // Popup component import kiya

// const AdminIndex = () => {

//     const { store } = useContext(storeContext)
    
//     // Stats State
//     const [stats, setStats] = useState({
//         totalNews: 0,
//         pendingNews: 0,
//         activeNews: 0,
//         deactiveNews: 0,
//         writers: 0,
//         recentNews: []
//     })

//     // Popup State
//     const [show, setShow] = useState(false)
//     const [newsId, setNewsId] = useState('')

//     // Data Fetching
//     useEffect(() => {
//         const get_dashboard_data = async () => {
//             try {
//                 const { data } = await axios.get(`${base_url}/api/dashboard/data`, {
//                     headers: {
//                         'Authorization': `Bearer ${store.token}`
//                     }
//                 })
//                 setStats(data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         get_dashboard_data()
//     }, [store.token])

//     return (
//         <div className='mt-2'>
//             {/* Statistics Cards */}
//             <div className='grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-4'>
//                 <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-sm'>
//                     <span className='text-3xl font-bold text-blue-600'>{stats.totalNews}</span>
//                     <span className='text-md font-medium'>Total News</span>
//                 </div>
//                 <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-sm'>
//                     <span className='text-3xl font-bold text-yellow-500'>{stats.pendingNews}</span>
//                     <span className='text-md font-medium'>Pending News</span>
//                 </div>
//                 <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-sm'>
//                     <span className='text-3xl font-bold text-green-500'>{stats.activeNews}</span>
//                     <span className='text-md font-medium'>Active News</span>
//                 </div>
//                 <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-sm'>
//                     <span className='text-3xl font-bold text-red-500'>{stats.deactiveNews}</span>
//                     <span className='text-md font-medium'>Deactive News</span>
//                 </div>
//                 <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-sm'>
//                     <span className='text-3xl font-bold text-purple-600'>{stats.writers}</span>
//                     <span className='text-md font-medium'>Writers</span>
//                 </div>
//             </div>

//             {/* Recent News Table */}
//             <div className='bg-white p-4 mt-5 rounded-md shadow-sm'>
//                 <div className='flex justify-between items-center pb-4 border-b mb-4'>
//                     <h2 className='text-lg font-semibold text-gray-700'>Recent News</h2>
//                     <Link to="/dashboard/news" className='text-blue-500 text-sm hover:underline'>View all</Link>
//                 </div>
//                 <div className='relative overflow-x-auto'>
//                     <table className='w-full text-sm text-left text-slate-600'>
//                         <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
//                             <tr>
//                                 <th className='px-7 py-3'>No</th>
//                                 <th className='px-7 py-3'>Title</th>
//                                 <th className='px-7 py-3'>Image</th>
//                                 <th className='px-7 py-3'>Category</th>
//                                 <th className='px-7 py-3'>Description</th>
//                                 <th className='px-7 py-3'>Date</th>
//                                 <th className='px-7 py-3'>Status</th>
//                                 <th className='px-7 py-3'>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 stats.recentNews.length > 0 ? stats.recentNews.map((n, i) => 
//                                 <tr key={n._id} className='bg-white border-b hover:bg-gray-50'>
//                                     <td className='px-6 py-4'>{i + 1}</td>
//                                     <td className='px-6 py-4 font-medium'>{n.title.slice(0, 15)}...</td>
//                                     <td className='px-6 py-4'>
//                                         <img className='w-[40px] h-[40px] rounded object-cover' src={n.image} alt="" />
//                                     </td>
//                                     <td className='px-6 py-4'>{n.category}</td>
//                                     <td className='px-6 py-4 text-gray-500'>{convert(n.description).slice(0, 15)}...</td>
//                                     <td className='px-6 py-4'>{dateFormat(n.date, "dd mmm yyyy")}</td>
//                                     <td className='px-6 py-4'>
//                                         {n.status === 'pending' && <span className='px-2 py-[2px] bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold'>Pending</span>}
//                                         {n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs font-semibold'>Active</span>}
//                                         {n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs font-semibold'>Deactive</span>}
//                                     </td>
//                                     <td className='px-6 py-4'>
//                                         <div onClick={() => { setNewsId(n._id); setShow(true) }} className='p-[6px] bg-green-500 text-white rounded hover:shadow-lg hover:shadow-green-500/50 cursor-pointer w-fit'>
//                                             <FaEye />
//                                         </div>
//                                     </td>
//                                 </tr>) : 
//                                 <tr>
//                                     <td colSpan="8" className='text-center py-5 text-gray-500'>No recent news found</td>
//                                 </tr>
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Popup Logic */}
//             {
//                 show && <NewsView show={show} setShow={setShow} newsId={newsId} />
//             }
//         </div>
//     )
// }

// // export default AdminIndex
// import React, { useEffect, useState, useContext } from 'react'
// import { FaEye, FaRegNewspaper, FaClock, FaCheckCircle, FaTimesCircle, FaList } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import storeContext from '../../context/storeContext'
// import { base_url } from '../../config/config'
// import axios from 'axios'
// import { convert } from 'html-to-text'
// import dateFormat from 'dateformat'
// import NewsView from '../components/NewsView'

// const WriterIndex = () => {

//     const { store } = useContext(storeContext)
    
//     const [stats, setStats] = useState({
//         totalNews: 0,
//         pendingNews: 0,
//         activeNews: 0,
//         deactiveNews: 0,
//         recentNews: []
//     })

//     // Popup State
//     const [show, setShow] = useState(false)
//     const [newsId, setNewsId] = useState('')

//     // Data Fetching
//     useEffect(() => {
//         const get_dashboard_data = async () => {
//             try {
//                 const { data } = await axios.get(`${base_url}/api/dashboard/data`, {
//                     headers: {
//                         'Authorization': `Bearer ${store.token}`
//                     }
//                 })
//                 setStats(data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         get_dashboard_data()
//     }, [store.token])

//     // Cards Configuration for UI Mapping (Matches AdminIndex Style)
//     const cards = [
//         { title: "Total News", value: stats.totalNews, icon: <FaRegNewspaper />, color: "bg-blue-500" },
//         { title: "Pending News", value: stats.pendingNews, icon: <FaClock />, color: "bg-yellow-500" },
//         { title: "Active News", value: stats.activeNews, icon: <FaCheckCircle />, color: "bg-green-500" },
//         { title: "Deactive News", value: stats.deactiveNews, icon: <FaTimesCircle />, color: "bg-red-500" },
//     ]

//     return (
//         <div className='w-full'>
            
//             {/* --- Stats Section (Admin Style) --- */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//                 {cards.map((card, i) => (
//                     <div key={i} className={`p-6 rounded-xl shadow-lg text-white flex flex-col justify-between items-start h-[120px] ${card.color} hover:scale-105 transition-transform duration-300 cursor-pointer`}>
//                         <div className='flex justify-between w-full items-center'>
//                             <h2 className='text-3xl font-bold'>{card.value}</h2>
//                             <div className='text-3xl opacity-50'>{card.icon}</div>
//                         </div>
//                         <span className='font-medium text-sm uppercase tracking-wide opacity-90'>{card.title}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* --- Recent News Table Section (Admin Style) --- */}
//             <div className='bg-white p-6 mt-8 rounded-xl shadow-sm border border-gray-100'>
//                 <div className='flex justify-between items-center mb-6'>
//                     <div className='flex items-center gap-2'>
//                         <div className='p-2 bg-indigo-100 text-indigo-600 rounded-lg'><FaList /></div>
//                         <h2 className='text-lg font-bold text-gray-800'>Recent News</h2>
//                     </div>
//                     <Link to="/dashboard/news" className='text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors'>View All &rarr;</Link>
//                 </div>

//                 <div className='relative overflow-x-auto rounded-lg border border-gray-100'>
//                     <table className='w-full text-sm text-left text-gray-600 min-w-[800px]'>
//                         <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b'>
//                             <tr>
//                                 <th className='px-6 py-4'>No</th>
//                                 <th className='px-6 py-4'>Title</th>
//                                 <th className='px-6 py-4'>Image</th>
//                                 <th className='px-6 py-4'>Category</th>
//                                 <th className='px-6 py-4'>Description</th>
//                                 <th className='px-6 py-4'>Date</th>
//                                 <th className='px-6 py-4'>Status</th>
//                                 <th className='px-6 py-4'>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 stats.recentNews.length > 0 ? stats.recentNews.map((n, i) => 
//                                 <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition-colors'>
//                                     <td className='px-6 py-4 font-medium'>{i + 1}</td>
//                                     <td className='px-6 py-4 font-semibold text-gray-800'>{n.title.slice(0, 15)}...</td>
//                                     <td className='px-6 py-4'>
//                                         <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-200'>
//                                             <img className='w-full h-full object-cover' src={n.image} alt="news" />
//                                         </div>
//                                     </td>
//                                     <td className='px-6 py-4'>{n.category}</td>
//                                     <td className='px-6 py-4 text-gray-500 min-w-[200px]'>
//                                         {convert(n.description).slice(0, 15)}...
//                                     </td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>{dateFormat(n.date, "dd mmm yyyy")}</td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>
//                                         <span className={`px-3 py-1 rounded-full text-xs font-semibold
//                                             ${n.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
//                                             ${n.status === 'active' ? 'bg-green-100 text-green-700' : ''}
//                                             ${n.status === 'deactive' ? 'bg-red-100 text-red-700' : ''}
//                                         `}>
//                                             {n.status}
//                                         </span>
//                                     </td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>
//                                         <div onClick={() => { setNewsId(n._id); setShow(true) }} className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm cursor-pointer w-fit'>
//                                             <FaEye />
//                                         </div>
//                                     </td>
//                                 </tr>) : 
//                                 <tr>
//                                     <td colSpan="8" className='text-center py-8 text-gray-400'>No recent news found</td>
//                                 </tr>
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Popup */}
//             { show && <NewsView show={show} setShow={setShow} newsId={newsId} /> }
//         </div>
//     )
// }

// export default WriterIndex




import React, { useEffect, useState, useContext } from 'react'
import { FaEye, FaNewspaper, FaUserEdit, FaBan, FaCheckCircle, FaClock, FaPlus, FaList, FaBolt, FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import storeContext from '../../context/storeContext'
import { base_url } from '../../config/config'
import axios from 'axios'
import dateFormat from 'dateformat'
import NewsView from '../components/NewsView'
import { motion } from 'framer-motion'

const AdminIndex = () => {

    const { store } = useContext(storeContext)
    
    // Stats State - Sab kuch 0 ya empty se start hoga
    const [stats, setStats] = useState({
        totalNews: 0, pendingNews: 0, activeNews: 0, deactiveNews: 0, writers: 0,
        recentNews: [],
        categoryStats: [] 
    })

    const [show, setShow] = useState(false)
    const [newsId, setNewsId] = useState('')

    // Real Data Fetching Function
    useEffect(() => {
        const get_dashboard_data = async () => {
            try {
                const { data } = await axios.get(`${base_url}/api/dashboard/data`, {
                    headers: { 'Authorization': `Bearer ${store.token}` }
                })
                setStats(data) // Backend ka data state me set ho gaya
            } catch (error) {
                console.log("Error fetching stats:", error)
            }
        }
        get_dashboard_data()
    }, [store.token])

    // Card Component
    const StatCard = ({ title, value, icon, color, delay }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: delay }}
            className='bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 flex items-center justify-between group'
        >
            <div>
                {/* Dynamic Value */}
                <h3 className='text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors'>{value}</h3>
                <p className='text-sm text-gray-500 font-medium mt-1'>{title}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${color} bg-opacity-20`}>
                {icon}
            </div>
        </motion.div>
    )

    return (
        <div className='w-full'>
            
            {/* Header Date & Title */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Dashboard Overview</h2>
                    <p className='text-gray-500 text-sm'>Welcome back, <span className='font-bold text-indigo-600'>{store.userInfo?.name}</span>!</p>
                </div>
                <div className='bg-white text-gray-600 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 flex items-center gap-2 shadow-sm'>
                    <FaRegCalendarAlt className='text-indigo-500'/> {dateFormat(new Date(), "dddd, mmmm dS, yyyy")}
                </div>
            </div>

            {/* --- 1. DYNAMIC STATISTICS CARDS --- */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
                <StatCard title="Total News" value={stats.totalNews} icon={<FaNewspaper />} color="text-blue-600 bg-blue-100" delay={0.1} />
                <StatCard title="Pending" value={stats.pendingNews} icon={<FaClock />} color="text-yellow-600 bg-yellow-100" delay={0.2} />
                <StatCard title="Active" value={stats.activeNews} icon={<FaCheckCircle />} color="text-green-600 bg-green-100" delay={0.3} />
                <StatCard title="Deactive" value={stats.deactiveNews} icon={<FaBan />} color="text-red-600 bg-red-100" delay={0.4} />
                <StatCard title="Writers" value={stats.writers} icon={<FaUserEdit />} color="text-purple-600 bg-purple-100" delay={0.5} />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                
                {/* --- 2. LEFT: RECENT NEWS TABLE (Dynamic) --- */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col'
                >
                    <div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
                        <h2 className='text-lg font-bold text-gray-800'>Recent News</h2>
                        <Link to="/dashboard/news" className='text-indigo-600 text-sm font-medium hover:underline'>View All</Link>
                    </div>
                    
                    <div className='overflow-x-auto flex-1'>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b'>
                                <tr>
                                    <th className='px-6 py-3'>Title</th>
                                    <th className='px-6 py-3'>Category</th>
                                    <th className='px-6 py-3'>Status</th>
                                    <th className='px-6 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Loop through Real Data */}
                                {stats.recentNews.length > 0 ? stats.recentNews.map((n, i) => (
                                    <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition'>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-3'>
                                                <img className='w-10 h-10 rounded-lg object-cover shadow-sm border border-gray-200' src={n.image} alt="" />
                                                <span className='font-medium text-gray-800 line-clamp-1 max-w-[180px]' title={n.title}>{n.title}</span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span className='px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-semibold text-gray-600'>{n.category}</span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            {n.status === 'pending' && <span className='px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-xs font-bold'>Pending</span>}
                                            {n.status === 'active' && <span className='px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-bold'>Active</span>}
                                            {n.status === 'deactive' && <span className='px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-bold'>Deactive</span>}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div onClick={() => { setNewsId(n._id); setShow(true) }} className='p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition cursor-pointer w-fit shadow-sm'>
                                                <FaEye />
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className='text-center py-10 text-gray-400 italic'>
                                            No news available. <Link to="/dashboard/news/create" className='text-indigo-500 underline'>Add News</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* --- 3. RIGHT: WIDGETS --- */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                    className='flex flex-col gap-6'
                >
                    
                    {/* A. Quick Actions (Static Links) */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='font-bold text-gray-800 mb-4 flex items-center gap-2'><FaBolt className='text-yellow-500'/> Quick Actions</h3>
                        <div className='grid grid-cols-2 gap-3'>
                            <Link to="/dashboard/admin/news/create" className='flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white transition text-indigo-700 border border-indigo-100 group'>
                                <FaPlus className='text-xl mb-1 group-hover:scale-110 transition-transform'/>
                                <span className='text-xs font-bold'>Add News</span>
                            </Link>
                            <Link to="/dashboard/writer/add" className='flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-600 hover:text-white transition text-green-700 border border-green-100 group'>
                                <FaUserEdit className='text-xl mb-1 group-hover:scale-110 transition-transform'/>
                                <span className='text-xs font-bold'>Add Writer</span>
                            </Link>
                            <Link to="/dashboard/news" className='flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition text-blue-700 border border-blue-100 group'>
                                <FaList className='text-xl mb-1 group-hover:scale-110 transition-transform'/>
                                <span className='text-xs font-bold'>All News</span>
                            </Link>
                            <Link to="/dashboard/profile" className='flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-600 hover:text-white transition text-orange-700 border border-orange-100 group'>
                                <FaCheckCircle className='text-xl mb-1 group-hover:scale-110 transition-transform'/>
                                <span className='text-xs font-bold'>Profile</span>
                            </Link>
                        </div>
                    </div>

                    {/* B. Content Overview (Dynamic Progress Bars) */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 min-h-[300px]'>
                        <h3 className='font-bold text-gray-800 mb-4'>Content Overview</h3>
                        <div className='space-y-6'>
                            
                            {/* Check karo data hai ya nahi */}
                            {stats.categoryStats && stats.categoryStats.length > 0 ? (
                                stats.categoryStats.slice(0, 5).map((item, index) => {
                                    // Colors Cycle logic
                                    const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
                                    const barColor = colors[index % colors.length];

                                    return (
                                        <div key={index}>
                                            <div className='flex justify-between text-xs font-bold mb-1.5 text-gray-700'>
                                                <span className='capitalize'>{item.category}</span> 
                                                <span>{item.percent}% <span className='text-gray-400 font-normal'>({item.count})</span></span>
                                            </div>
                                            <div className='w-full bg-gray-100 rounded-full h-2.5 overflow-hidden'>
                                                {/* Animation: 0 se Real Width tak */}
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.percent}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                                                    className={`${barColor} h-2.5 rounded-full shadow-sm`} 
                                                ></motion.div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='flex flex-col items-center justify-center h-full text-gray-400 mt-10'>
                                    <FaList className='text-4xl mb-3 text-gray-200'/>
                                    <p className='text-sm font-medium'>No category data yet.</p>
                                    <p className='text-xs text-center px-4 mt-1'>Add 'Active' news in different categories to see analytics here.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* Popup Logic */}
            { show && <NewsView show={show} setShow={setShow} newsId={newsId} /> }
        </div>
    )
}

export default AdminIndex