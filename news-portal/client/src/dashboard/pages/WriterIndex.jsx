// import React, { useEffect, useState, useContext } from 'react'
// import { FaEye } from 'react-icons/fa'
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
//                 // Backend khud filter kar lega token ke basis par
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
//             {/* Statistics Cards - (Writers wala card hata diya hai) */}
//             <div className='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4'>
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

//             {/* Popup */}
//             {
//                 show && <NewsView show={show} setShow={setShow} newsId={newsId} />
//             }
//         </div>
//     )
// }

// export default WriterIndex


// import React, { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { FaEye, FaRegNewspaper, FaClock, FaCheckCircle, FaTimesCircle, FaList } from 'react-icons/fa';
// import storeContext from '../../context/storeContext';
// import { base_url } from '../../config/config';
// import axios from 'axios';
// import { convert } from 'html-to-text';
// import dateFormat from 'dateformat';
// import NewsView from '../components/NewsView';
// import { motion } from 'framer-motion';

// const WriterIndex = () => {
//     const { store } = useContext(storeContext);
    
//     const [stats, setStats] = useState({
//         totalNews: 0,
//         pendingNews: 0,
//         activeNews: 0,
//         deactiveNews: 0,
//         recentNews: []
//     });

//     const [show, setShow] = useState(false);
//     const [newsId, setNewsId] = useState('');

//     useEffect(() => {
//         const get_dashboard_data = async () => {
//             try {
//                 const { data } = await axios.get(`${base_url}/api/dashboard/data`, {
//                     headers: { 'Authorization': `Bearer ${store.token}` }
//                 });
//                 setStats(data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         get_dashboard_data();
//     }, [store.token]);

//     // Cards Configuration
//     const cards = [
//         { title: "Total News", value: stats.totalNews, icon: <FaRegNewspaper />, color: "bg-blue-500" },
//         { title: "Pending News", value: stats.pendingNews, icon: <FaClock />, color: "bg-yellow-500" },
//         { title: "Active News", value: stats.activeNews, icon: <FaCheckCircle />, color: "bg-green-500" },
//         { title: "Deactive News", value: stats.deactiveNews, icon: <FaTimesCircle />, color: "bg-red-500" },
//     ];

//     return (
//         <div className='w-full'>
            
//             {/* --- Stats Cards --- */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//                 {cards.map((card, i) => (
//                     <motion.div 
//                         key={i}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3, delay: i * 0.1 }}
//                         className={`p-6 rounded-xl shadow-lg text-white flex flex-col justify-between items-start h-[120px] ${card.color} hover:scale-105 transition-transform duration-300`}
//                     >
//                         <div className='flex justify-between w-full items-center'>
//                             <h2 className='text-3xl font-bold'>{card.value}</h2>
//                             <div className='text-3xl opacity-50'>{card.icon}</div>
//                         </div>
//                         <span className='font-medium text-sm uppercase tracking-wide opacity-90'>{card.title}</span>
//                     </motion.div>
//                 ))}
//             </div>

//             {/* --- Recent News Table --- */}
//             <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 className='bg-white p-6 mt-8 rounded-xl shadow-sm border border-gray-100'
//             >
//                 <div className='flex justify-between items-center mb-6'>
//                     <div className='flex items-center gap-2'>
//                         <div className='p-2 bg-indigo-100 text-indigo-600 rounded-lg'><FaList /></div>
//                         <h2 className='text-lg font-bold text-gray-800'>Recent News</h2>
//                     </div>
//                     <Link to="/dashboard/news" className='text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors'>View All &rarr;</Link>
//                 </div>

//                 <div className='relative overflow-x-auto rounded-lg border border-gray-100'>
//                     <table className='w-full text-sm text-left text-gray-600'>
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
//                             {stats.recentNews.length > 0 ? stats.recentNews.map((n, i) => (
//                                 <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition-colors'>
//                                     <td className='px-6 py-4 font-medium'>{i + 1}</td>
//                                     <td className='px-6 py-4 font-semibold text-gray-800'>{n.title.slice(0, 15)}...</td>
//                                     <td className='px-6 py-4'>
//                                         <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-200'>
//                                             <img className='w-full h-full object-cover' src={n.image} alt="" />
//                                         </div>
//                                     </td>
//                                     <td className='px-6 py-4'>{n.category}</td>
//                                     <td className='px-6 py-4 text-gray-500'>{convert(n.description).slice(0, 15)}...</td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>{dateFormat(n.date, "dd mmm yyyy")}</td>
//                                     <td className='px-6 py-4'>
//                                         <span className={`px-3 py-1 rounded-full text-xs font-semibold
//                                             ${n.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
//                                             ${n.status === 'active' ? 'bg-green-100 text-green-700' : ''}
//                                             ${n.status === 'deactive' ? 'bg-red-100 text-red-700' : ''}
//                                         `}>
//                                             {n.status}
//                                         </span>
//                                     </td>
//                                     <td className='px-6 py-4'>
//                                         <button 
//                                             onClick={() => { setNewsId(n._id); setShow(true) }} 
//                                             className='p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm'
//                                             title="View Details"
//                                         >
//                                             <FaEye />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )) : (
//                                 <tr>
//                                     <td colSpan="8" className='text-center py-8 text-gray-400'>No recent news found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </motion.div>

//             {/* Popup Logic */}
//             {show && <NewsView show={show} setShow={setShow} newsId={newsId} />}
//         </div>
//     );
// };

// export default WriterIndex;



// import React, { useEffect, useState, useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
// import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io' // 👇 Icons Import kiye
// import axios from 'axios'
// import { base_url } from '../../config/config'
// import storeContext from '../../context/storeContext'
// import toast from 'react-hot-toast'
// import WriterView from '../components/WriterView'
// import WriterEdit from '../components/WriterEdit'

// const Writers = () => {

//     const { store, searchPar } = useContext(storeContext)
//     const [writers, setWriters] = useState([])
    
//     // 👇 Pagination States Add kiye
//     const [page, setPage] = useState(1)
//     const [parPage, setParPage] = useState(5)
//     const [pages, setPages] = useState(0)

//     // States for Popups
//     const [showView, setShowView] = useState(false)
//     const [selectedWriter, setSelectedWriter] = useState(null)
//     const [showEdit, setShowEdit] = useState(false)
//     const [editId, setEditId] = useState('')

//     const get_writers = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/news/writers`, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             })
//             setWriters(data.writers)
//         } catch (error) { console.log(error) }
//     }

//     useEffect(() => { get_writers() }, [])

//     // 👇 Page Calculation Logic
//     useEffect(() => {
//         if (writers.length > 0) {
//             const calculate_page = Math.ceil(writers.length / parPage)
//             setPages(calculate_page)
//         }
//     }, [writers, parPage])

//     const deleteWriter = async (id) => {
//         if (window.confirm("Are you sure?")) {
//             try {
//                 const { data } = await axios.delete(`${base_url}/api/writer/delete/${id}`, {
//                     headers: { 'Authorization': `Bearer ${store.token}` }
//                 })
//                 toast.success(data.message)
//                 get_writers()
//             } catch (error) { toast.error(error.response.data.message) }
//         }
//     }

//     return (
//         <div className='bg-white rounded-md'>
//             <div className='flex justify-between p-4'>
//                 <h2 className='text-xl font-medium'>Writers</h2>
//                 <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/writer/add'>Add Writer</Link>
//             </div>
            
//             <div className='relative overflow-x-auto p-4'>
//                 <table className='w-full text-sm text-left text-slate-600'>
//                     <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
//                         <tr>
//                             <th className='px-7 py-3'>No</th><th className='px-7 py-3'>Name</th><th className='px-7 py-3'>Category</th>
//                             <th className='px-7 py-3'>Role</th><th className='px-7 py-3'>Image</th><th className='px-7 py-3'>Email</th><th className='px-7 py-3'>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {writers
//                         // 👇 Search Filter
//                         .filter(w => 
//                             (w.name && w.name.toLowerCase().includes(searchPar.toLowerCase())) || 
//                             (w.email && w.email.toLowerCase().includes(searchPar.toLowerCase()))
//                         )
//                         // 👇 Pagination Slice Logic (Ye data ko todta hai pages me)
//                         .slice((page - 1) * parPage, page * parPage)
//                         .map((r, i) => <tr key={i} className='bg-white border-b' >
//                             {/* Serial No Logic: Page ke hisab se badhega (e.g. 1,2..5 fir next page pe 6,7..) */}
//                             <td className='px-6 py-4'>{i + 1 + ((page - 1) * parPage)}</td>
//                             <td className='px-6 py-4'>{r.name}</td>
//                             <td className='px-6 py-4'>{r.category}</td>
//                             <td className='px-6 py-4 capitalize'>{r.role}</td>
//                             <td className='px-6 py-4'><img className='w-[40px] h-[40px] rounded-full object-cover' src={r.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" /></td>
//                             <td className='px-6 py-4'>{r.email}</td>
//                             <td className='px-6 py-4'>
//                                 <div className='flex justify-start items-center gap-x-4 text-white'>
//                                     <Link to={`/dashboard/writer/${r._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 cursor-pointer text-white'>
//                                         <FaEye />
//                                     </Link>
//                                     <div onClick={() => { setEditId(r._id); setShowEdit(true) }} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer'><FaEdit /></div>
//                                     <div onClick={() => deleteWriter(r._id)} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer'><FaTrash /></div>
//                                 </div>
//                             </td>
//                         </tr>)}
//                     </tbody>
//                 </table>
//             </div>

//             {/* 👇 PAGINATION FOOTER SECTION ADDED */}
//             <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600 pb-4'>
//                 <div className='flex gap-x-3 justify-center items-center'>
//                     <p className='px-4 py-3 font-semibold text-sm'>Rows per Page</p>
//                     <select value={parPage} onChange={(e) => {
//                         setParPage(parseInt(e.target.value))
//                         setPage(1) // Reset to page 1 on change
//                     }} className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'>
//                         <option value="5">5</option>
//                         <option value="10">10</option>
//                         <option value="15">15</option>
//                         <option value="20">20</option>
//                     </select>
//                 </div>
//                 <p className='px-6 py-3 font-semibold text-sm'>
//                     {(page - 1) * parPage + 1}/{Math.min(page * parPage, writers.length)} - of {writers.length}
//                 </p>
//                 <div className='flex items-center gap-x-3'>
//                     <IoIosArrowBack onClick={() => { if (page > 1) setPage(page - 1) }} className='w-5 h-5 cursor-pointer hover:text-indigo-500' />
//                     <IoIosArrowForward onClick={() => { if (page < pages) setPage(page + 1) }} className='w-5 h-5 cursor-pointer hover:text-indigo-500' />
//                 </div>
//             </div>

//             {/* Popups Render */}
//             <WriterView show={showView} setShow={setShowView} writer={selectedWriter} />
//             <WriterEdit show={showEdit} setShow={setShowEdit} writerId={editId} refreshWriters={get_writers} />
//         </div>
//     )
// }
// export default Writers



// import React, { useEffect, useState, useContext } from 'react'
// import { FaEye } from 'react-icons/fa'
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
//                 // Backend khud filter kar lega token ke basis par
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
//             {/* Statistics Cards - (Writers wala card hata diya hai) */}
//             <div className='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4'>
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

//             {/* Popup */}
//             {
//                 show && <NewsView show={show} setShow={setShow} newsId={newsId} />
//             }
//         </div>
//     )
// }

// export default WriterIndex



// import React, { useEffect, useState, useContext } from 'react'
// import { FaEye } from 'react-icons/fa'
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
//                 // Backend khud filter kar lega token ke basis par
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
//             {/* Statistics Cards - Responsive Grid */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
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
//             </div>

//             {/* Recent News Table */}
//             <div className='bg-white p-4 mt-5 rounded-md shadow-sm'>
//                 <div className='flex justify-between items-center pb-4 border-b mb-4'>
//                     <h2 className='text-lg font-semibold text-gray-700'>Recent News</h2>
//                     <Link to="/dashboard/news" className='text-blue-500 text-sm hover:underline'>View all</Link>
//                 </div>
                
//                 {/* Responsive Table Wrapper */}
//                 <div className='relative overflow-x-auto'>
//                     <table className='w-full text-sm text-left text-slate-600 min-w-[800px]'> {/* min-w forces horizontal scroll on mobile */}
//                         <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
//                             <tr>
//                                 <th className='px-6 py-3 whitespace-nowrap'>No</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Title</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Image</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Category</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Description</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Date</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Status</th>
//                                 <th className='px-6 py-3 whitespace-nowrap'>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 stats.recentNews.length > 0 ? stats.recentNews.map((n, i) => 
//                                 <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition'>
//                                     <td className='px-6 py-4 whitespace-nowrap'>{i + 1}</td>
//                                     <td className='px-6 py-4 font-medium whitespace-nowrap'>{n.title.slice(0, 15)}...</td>
//                                     <td className='px-6 py-4'>
//                                         <img className='w-[40px] h-[40px] rounded object-cover border' src={n.image} alt="" />
//                                     </td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>{n.category}</td>
//                                     <td className='px-6 py-4 text-gray-500 min-w-[200px]'>
//                                         {convert(n.description).slice(0, 15)}...
//                                     </td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>{dateFormat(n.date, "dd mmm yyyy")}</td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>
//                                         {n.status === 'pending' && <span className='px-2 py-[2px] bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold'>Pending</span>}
//                                         {n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs font-semibold'>Active</span>}
//                                         {n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs font-semibold'>Deactive</span>}
//                                     </td>
//                                     <td className='px-6 py-4 whitespace-nowrap'>
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

//             {/* Popup */}
//             {
//                 show && <NewsView show={show} setShow={setShow} newsId={newsId} />
//             }
//         </div>
//     )
// }

// export default WriterIndex



import React, { useEffect, useState, useContext } from 'react'
import { FaEye, FaNewspaper, FaClock, FaCheckCircle, FaBan, FaRegCalendarAlt, FaList } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import storeContext from '../../context/storeContext'
import { base_url } from '../../config/config'
import axios from 'axios'
import dateFormat from 'dateformat'
import NewsView from '../components/NewsView'
import { motion } from 'framer-motion'

const WriterIndex = () => {

    const { store } = useContext(storeContext)
    
    // Stats State
    const [stats, setStats] = useState({
        totalNews: 0,
        pendingNews: 0,
        activeNews: 0,
        deactiveNews: 0,
        recentNews: [],
        categoryStats: [] 
    })

    const [show, setShow] = useState(false)
    const [newsId, setNewsId] = useState('')

    // Data Fetching
    useEffect(() => {
        const get_dashboard_data = async () => {
            try {
                const { data } = await axios.get(`${base_url}/api/dashboard/data`, {
                    headers: { 'Authorization': `Bearer ${store.token}` }
                })
                setStats(data)
            } catch (error) {
                console.log(error)
            }
        }
        get_dashboard_data()
    }, [store.token])

    // Stat Card Component
    const StatCard = ({ title, value, icon, color, delay }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className='bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 flex items-center justify-between group cursor-default'
        >
            <div>
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
            
            {/* --- HEADER --- */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Writer Dashboard</h2>
                    <p className='text-gray-500 text-sm'>Hello <span className='font-bold text-indigo-600'>{store.userInfo?.name}</span>, here is your daily activity.</p>
                </div>
                <div className='bg-white text-gray-600 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 flex items-center gap-2 shadow-sm'>
                    <FaRegCalendarAlt className='text-indigo-500'/> {dateFormat(new Date(), "dddd, mmmm dS, yyyy")}
                </div>
            </div>

            {/* --- 1. STATISTICS CARDS (4 Cards) --- */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <StatCard title="Total News" value={stats.totalNews} icon={<FaNewspaper />} color="text-blue-600 bg-blue-100" delay={0.1} />
                <StatCard title="Pending" value={stats.pendingNews} icon={<FaClock />} color="text-yellow-600 bg-yellow-100" delay={0.2} />
                <StatCard title="Active" value={stats.activeNews} icon={<FaCheckCircle />} color="text-green-600 bg-green-100" delay={0.3} />
                <StatCard title="Deactive" value={stats.deactiveNews} icon={<FaBan />} color="text-red-600 bg-red-100" delay={0.4} />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                
                {/* --- 2. LEFT: RECENT NEWS TABLE (2/3 Width) --- */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
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
                                            No news uploaded yet. <Link to="/dashboard/news/create" className='text-indigo-500 underline'>Create New</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* --- 3. RIGHT: CONTENT STATS ONLY (1/3 Width) --- */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='flex flex-col gap-6'
                >
                    
                    {/* Content Overview (Progress Bars) */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 min-h-[300px]'>
                        <h3 className='font-bold text-gray-800 mb-4'>Your Content Stats</h3>
                        <div className='space-y-6'>
                            
                            {/* Check data */}
                            {stats.categoryStats && stats.categoryStats.length > 0 ? (
                                stats.categoryStats.slice(0, 5).map((item, index) => {
                                    // Colors Cycle
                                    const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
                                    const barColor = colors[index % colors.length];

                                    return (
                                        <div key={index}>
                                            <div className='flex justify-between text-xs font-bold mb-1.5 text-gray-700'>
                                                <span className='capitalize'>{item.category}</span> 
                                                <span>{item.percent}% <span className='text-gray-400 font-normal'>({item.count})</span></span>
                                            </div>
                                            <div className='w-full bg-gray-100 rounded-full h-2.5 overflow-hidden'>
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
                                <div className='flex flex-col items-center justify-center h-full text-gray-400 mt-5'>
                                    <FaList className='text-4xl mb-3 text-gray-200'/>
                                    <p className='text-sm font-medium'>No active content.</p>
                                    <p className='text-xs text-center px-4 mt-1'>Stats will show up once you publish news.</p>
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

export default WriterIndex