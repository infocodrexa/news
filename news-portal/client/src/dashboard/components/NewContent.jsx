// import React, { useContext, useState, useEffect } from 'react'
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
// import axios from 'axios'
// import { base_url } from '../../config/config'
// import storeContext from '../../context/storeContext'
// import { convert } from 'html-to-text'
// import toast from 'react-hot-toast'
// import NewsView from './NewsView'

// const NewContent = () => {

//     // 👇 'searchPar' add kiya yahan
//     const { store, searchPar } = useContext(storeContext)
    
//     const [news, setNews] = useState([])
//     const [all_news, set_all_news] = useState([])

//     const [parPage, setParPage] = useState(5)
//     const [pages, setPages] = useState(0)
//     const [page, setPage] = useState(1)

//     const [show, setShow] = useState(false)
//     const [newsId, setNewsId] = useState('')

//     const get_news = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/news`, {
//                 headers: {
//                     'Authorization': `Bearer ${store.token}`
//                 }
//             })
//             set_all_news(data.news)
//             setNews(data.news)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         get_news()
//     }, [])

//     useEffect(() => {
//         if (news.length > 0) {
//             const calculate_page = Math.ceil(news.length / parPage)
//             setPages(calculate_page)
//         }
//     }, [news, parPage])

//     const type_filter = (e) => {
//         if (e.target.value === '') {
//             setNews(all_news)
//             setPage(1)
//             setParPage(5)
//         } else {
//             const tempNews = all_news.filter(n => n.status === e.target.value)
//             setNews(tempNews)
//             setPage(1)
//             setParPage(5)
//         }
//     }

//     // Ye purana local search tha, iski ab zarurat nahi hai par rehne de sakte ho
//     const serach_news = (e) => {
//         const tempNews = all_news.filter(n => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
//         setNews(tempNews)
//         setPage(1)
//         setParPage(5)
//     }

//     const [res, set_res] = useState({
//         id: '',
//         loader: false
//     })

//     const update_status = async (status, news_id) => {
//         try {
//             set_res({ id: news_id, loader: true })
//             const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, { status }, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             })
//             set_res({ id: '', loader: false })
//             toast.success(data.message)
//             get_news()
//         } catch (error) {
//             set_res({ id: '', loader: false })
//             console.log(error)
//             toast.error(error.response.data.message)
//         }
//     }

//     const deleteNews = async (id) => {
//         if (window.confirm('Are you sure you want to delete this news?')) {
//             try {
//                 const { data } = await axios.delete(`${base_url}/api/news/delete/${id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${store.token}`
//                     }
//                 })
//                 toast.success(data.message)
//                 get_news()
//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.response?.data?.message || 'Delete failed')
//             }
//         }
//     }

//     return (
//         <div>
//             <div className='px-4 py-3 flex gap-x-3'>
//                 <select onChange={type_filter} className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'>
//                     <option value="">---select type---</option>
//                     <option value="pending">Pending</option>
//                     <option value="active">Active</option>
//                     <option value="deactive">Deactive</option>
//                 </select>
//                 {/* Local search input abhi bhi kaam karega agar chaho to */}
//                 <input onChange={serach_news} type="text" placeholder='search news locally' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />
//             </div>
//             <div className='relative overflow-x-auto p-4'>
//                 <table className='w-full text-sm text-left text-slate-600'>
//                     <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
//                         <tr>
//                             <th className='px-7 py-3'>No</th>
//                             <th className='px-7 py-3'>Title</th>
//                             <th className='px-7 py-3'>Image</th>
//                             <th className='px-7 py-3'>Category</th>
//                             <th className='px-7 py-3'>Description</th>
//                             <th className='px-7 py-3'>Date</th>
//                             <th className='px-7 py-3'>Status</th>
//                             <th className='px-7 py-3'>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             news.length > 0 && news
//                             // 👇 HEADER SEARCH FILTER LOGIC ADDED HERE
//                             .filter(n => 
//                                 n.title.toLowerCase().includes(searchPar.toLowerCase())
//                             )
//                             .slice((page - 1) * parPage, page * parPage).map((n, i) => 
//                             <tr key={n._id} className='bg-white border-b'>
//                                 <td className='px-6 py-4'>{i + 1 + ((page - 1) * parPage)}</td>
//                                 <td className='px-6 py-4'>{n.title.slice(0, 15)}...</td>
//                                 <td className='px-6 py-4'>
//                                     <img className='w-[40px] h-[40px] object-cover rounded' src={n.image} alt="" />
//                                 </td>
//                                 <td className='px-6 py-4'>{n.category}</td>
//                                 <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
//                                 <td className='px-6 py-4'>{n.date}</td>
                                
//                                 {
//                                     store?.userInfo?.role === 'admin' ? 
//                                     <td className='px-6 py-4'>
//                                         {n.status === 'pending' && <span onClick={() => update_status('active', n._id)} className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>}
//                                         {n.status === 'active' && <span onClick={() => update_status('deactive', n._id)} className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>}
//                                         {n.status === 'deactive' && <span onClick={() => update_status('active', n._id)} className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>}
//                                     </td> : 
//                                     <td className='px-6 py-4'>
//                                         {n.status === 'pending' && <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>}
//                                         {n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>}
//                                         {n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>}
//                                     </td>
//                                 }

//                                 <td className='px-6 py-4'>
//                                     <div className='flex justify-start items-center gap-x-4 text-white'>
                                        
//                                         <div onClick={() => { setNewsId(n._id); setShow(true) }} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 cursor-pointer'>
//                                             <FaEye />
//                                         </div>

//                                         {
//                                             store?.userInfo?.role === 'writer' && 
//                                             <>
//                                                 <Link to={`/dashboard/news/edit/${n._id}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
//                                                 <div onClick={() => deleteNews(n._id)} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer'><FaTrash /></div>
//                                             </>
//                                         }
//                                     </div>
//                                 </td>
//                             </tr>)
//                         }
//                     </tbody>
//                 </table>
//             </div>
            
//             {/* Pagination UI */}
//             <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600'>
//                 <div className='flex gap-x-3 justify-center items-center'>
//                     <p className='px-4 py-3 font-semibold text-sm'>News per Page</p>
//                     <select value={parPage} onChange={(e) => {
//                         setParPage(parseInt(e.target.value))
//                         setPage(1)
//                     }} className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'>
//                         <option value="5">5</option>
//                         <option value="10">10</option>
//                         <option value="15">15</option>
//                         <option value="20">20</option>
//                     </select>
//                 </div>
//                 <p className='px-6 py-3 font-semibold text-sm'>
//                     {(page - 1) * parPage + 1}/{Math.min(page * parPage, news.length)} - of {news.length}
//                 </p>
//                 <div className='flex items-center gap-x-3'>
//                     <IoIosArrowBack onClick={() => { if (page > 1) setPage(page - 1) }} className='w-5 h-5 cursor-pointer' />
//                     <IoIosArrowForward onClick={() => { if (page < pages) setPage(page + 1) }} className='w-5 h-5 cursor-pointer' />
//                 </div>
//             </div>

//             {
//                 show && <NewsView show={show} setShow={setShow} newsId={newsId} />
//             }

//         </div>
//     )
// }

// export default NewContent


// import React, { useContext, useState, useEffect } from 'react';
// import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { base_url } from '../../config/config';
// import storeContext from '../../context/storeContext';
// import { convert } from 'html-to-text';
// import toast from 'react-hot-toast';
// import NewsView from './NewsView';
// import { motion } from 'framer-motion';

// const NewContent = () => {
//     const { store, searchPar } = useContext(storeContext);
    
//     const [news, setNews] = useState([]);
//     const [all_news, set_all_news] = useState([]);
//     const [parPage, setParPage] = useState(5);
//     const [pages, setPages] = useState(0);
//     const [page, setPage] = useState(1);

//     const [show, setShow] = useState(false);
//     const [newsId, setNewsId] = useState('');
//     const [res, set_res] = useState({ id: '', loader: false });

//     // Fetch News
//     const get_news = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/news`, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             });
//             set_all_news(data.news);
//             setNews(data.news);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => { get_news() }, []);

//     // Pagination Calculation
//     useEffect(() => {
//         if (news.length > 0) {
//             const calculate_page = Math.ceil(news.length / parPage);
//             setPages(calculate_page);
//         }
//     }, [news, parPage]);

//     // Status Filter
//     const type_filter = (e) => {
//         if (e.target.value === '') {
//             setNews(all_news);
//         } else {
//             const tempNews = all_news.filter(n => n.status === e.target.value);
//             setNews(tempNews);
//         }
//         setPage(1);
//     };

//     // Update Status
//     const update_status = async (status, news_id) => {
//         try {
//             set_res({ id: news_id, loader: true });
//             const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, { status }, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             });
//             set_res({ id: '', loader: false });
//             toast.success(data.message);
//             get_news();
//         } catch (error) {
//             set_res({ id: '', loader: false });
//             toast.error(error.response.data.message);
//         }
//     };

//     // Delete News
//     const deleteNews = async (id) => {
//         if (window.confirm('Are you sure you want to delete this news?')) {
//             try {
//                 const { data } = await axios.delete(`${base_url}/api/news/delete/${id}`, {
//                     headers: { 'Authorization': `Bearer ${store.token}` }
//                 });
//                 toast.success(data.message);
//                 get_news();
//             } catch (error) {
//                 toast.error(error.response?.data?.message || 'Delete failed');
//             }
//         }
//     };

//     // Filtered Data based on Search
//     const filteredNews = news.filter(n => 
//         n.title.toLowerCase().includes(searchPar.toLowerCase())
//     ).slice((page - 1) * parPage, page * parPage);

//     return (
//         <div className='w-full'>
            
//             {/* Filter Bar */}
//             <div className='flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200'>
//                 <div className='flex items-center gap-3'>
//                     <span className='text-sm font-medium text-gray-600'>Filter By Status:</span>
//                     <select onChange={type_filter} className='px-3 py-2 rounded-md outline-none border border-gray-300 focus:border-indigo-500 text-sm bg-white'>
//                         <option value="">All News</option>
//                         <option value="pending">Pending</option>
//                         <option value="active">Active</option>
//                         <option value="deactive">Deactive</option>
//                     </select>
//                 </div>
                
//                 <div className='flex items-center gap-3'>
//                     <span className='text-sm font-medium text-gray-600'>Rows:</span>
//                     <select value={parPage} onChange={(e) => { setParPage(parseInt(e.target.value)); setPage(1); }} className='px-3 py-2 rounded-md outline-none border border-gray-300 focus:border-indigo-500 text-sm bg-white'>
//                         <option value="5">5</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                     </select>
//                 </div>
//             </div>

//             {/* News Table */}
//             <div className='relative overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
//                 <table className='w-full text-sm text-left text-gray-600'>
//                     <thead className='text-xs text-gray-700 uppercase bg-gray-100 border-b'>
//                         <tr>
//                             <th className='px-6 py-4'>No</th>
//                             <th className='px-6 py-4'>Title</th>
//                             <th className='px-6 py-4'>Image</th>
//                             <th className='px-6 py-4'>Category</th>
//                             <th className='px-6 py-4'>Description</th>
//                             <th className='px-6 py-4'>Date</th>
//                             <th className='px-6 py-4'>Status</th>
//                             <th className='px-6 py-4 text-center'>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredNews.length > 0 ? filteredNews.map((n, i) => (
//                             <motion.tr 
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 0.3, delay: i * 0.05 }}
//                                 key={n._id} 
//                                 className='bg-white border-b hover:bg-gray-50 transition-colors'
//                             >
//                                 <td className='px-6 py-4 font-medium'>{i + 1 + ((page - 1) * parPage)}</td>
//                                 <td className='px-6 py-4 font-semibold text-gray-800'>{n.title.slice(0, 20)}...</td>
//                                 <td className='px-6 py-4'>
//                                     <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm'>
//                                         <img className='w-full h-full object-cover' src={n.image} alt="" />
//                                     </div>
//                                 </td>
//                                 <td className='px-6 py-4'>{n.category}</td>
//                                 <td className='px-6 py-4 text-gray-500'>{convert(n.description).slice(0, 20)}...</td>
//                                 <td className='px-6 py-4 whitespace-nowrap'>{n.date}</td>
                                
//                                 {/* Status Logic */}
//                                 <td className='px-6 py-4'>
//                                     {store?.userInfo?.role === 'admin' ? (
//                                         // Admin can change status (Clickable badges)
//                                         <>
//                                             {n.status === 'pending' && <span onClick={() => update_status('active', n._id)} className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold cursor-pointer hover:bg-blue-200 transition-colors'>{res.loader && res.id === n._id ? '...' : 'Pending'}</span>}
//                                             {n.status === 'active' && <span onClick={() => update_status('deactive', n._id)} className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold cursor-pointer hover:bg-green-200 transition-colors'>{res.loader && res.id === n._id ? '...' : 'Active'}</span>}
//                                             {n.status === 'deactive' && <span onClick={() => update_status('active', n._id)} className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold cursor-pointer hover:bg-red-200 transition-colors'>{res.loader && res.id === n._id ? '...' : 'Deactive'}</span>}
//                                         </>
//                                     ) : (
//                                         // Writer sees status only (Non-clickable)
//                                         <>
//                                             {n.status === 'pending' && <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>Pending</span>}
//                                             {n.status === 'active' && <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold'>Active</span>}
//                                             {n.status === 'deactive' && <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold'>Deactive</span>}
//                                         </>
//                                     )}
//                                 </td>

//                                 {/* Actions */}
//                                 <td className='px-6 py-4'>
//                                     <div className='flex justify-center items-center gap-2'>
//                                         <button onClick={() => { setNewsId(n._id); setShow(true) }} className='p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all' title="View">
//                                             <FaEye />
//                                         </button>
                                        
//                                         {store?.userInfo?.role === 'writer' && (
//                                             <>
//                                                 <Link to={`/dashboard/news/edit/${n._id}`} className='p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition-all' title="Edit">
//                                                     <FaEdit />
//                                                 </Link>
//                                                 <button onClick={() => deleteNews(n._id)} className='p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all' title="Delete">
//                                                     <FaTrash />
//                                                 </button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </td>
//                             </motion.tr>
//                         )) : (
//                             <tr>
//                                 <td colSpan="8" className='text-center py-8 text-gray-400'>No news found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination Controls */}
//             {news.length > parPage && (
//                 <div className='flex items-center justify-end mt-6 gap-4'>
//                     <span className='text-sm text-gray-500'>
//                         Showing {(page - 1) * parPage + 1} to {Math.min(page * parPage, news.length)} of {news.length} entries
//                     </span>
//                     <div className='flex items-center gap-2'>
//                         <button 
//                             onClick={() => { if (page > 1) setPage(page - 1) }} 
//                             disabled={page === 1}
//                             className={`p-2 rounded-lg border ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600 cursor-pointer'} transition-all`}
//                         >
//                             <FaChevronLeft />
//                         </button>
//                         <span className='px-4 py-1 bg-indigo-50 text-indigo-600 font-semibold rounded-lg text-sm'>
//                             {page} / {pages}
//                         </span>
//                         <button 
//                             onClick={() => { if (page < pages) setPage(page + 1) }} 
//                             disabled={page === pages}
//                             className={`p-2 rounded-lg border ${page === pages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600 cursor-pointer'} transition-all`}
//                         >
//                             <FaChevronRight />
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Popup */}
//             {show && <NewsView show={show} setShow={setShow} newsId={newsId} />}
//         </div>
//     );
// };

// export default NewContent;




import React, { useContext, useState, useEffect } from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { convert } from 'html-to-text'
import toast from 'react-hot-toast'
import NewsView from './NewsView'

const NewContent = ({ newsStatus }) => {

    const { store, searchPar } = useContext(storeContext)
    
    const [news, setNews] = useState([])
    const [all_news, set_all_news] = useState([])

    const [parPage, setParPage] = useState(5)
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)

    const [show, setShow] = useState(false)
    const [newsId, setNewsId] = useState('')

    const [res, set_res] = useState({
        id: '',
        loader: false
    })

    const get_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            set_all_news(data.news)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_news()
    }, [])

    useEffect(() => {
        if (all_news.length > 0) {
            if (newsStatus) {
                const tempNews = all_news.filter(n => n.status === newsStatus)
                setNews(tempNews)
            } else {
                setNews(all_news)
            }
        }
    }, [all_news, newsStatus])


    useEffect(() => {
        if (news.length > 0) {
            const calculate_page = Math.ceil(news.length / parPage)
            setPages(calculate_page)
        }
    }, [news, parPage])


    const update_status = async (status, news_id) => {
        try {
            set_res({ id: news_id, loader: true })
            const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, { status }, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            })
            set_res({ id: '', loader: false })
            toast.success(data.message)
            get_news()
        } catch (error) {
            set_res({ id: '', loader: false })
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const deleteNews = async (id) => {
        if (window.confirm('Are you sure you want to delete this news?')) {
            try {
                const { data } = await axios.delete(`${base_url}/api/news/delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                })
                toast.success(data.message)
                get_news()
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data?.message || 'Delete failed')
            }
        }
    }

    return (
        <div className='bg-white rounded-md shadow-sm w-full'>
            
            {/* Header */}
            <div className='px-4 py-4 flex gap-x-3 border-b border-gray-100'>
                 <h2 className='text-lg font-semibold text-gray-700 capitalize'>
                    {newsStatus ? `${newsStatus} News` : 'All News'}
                 </h2>
            </div>

            {/* Responsive Table Container */}
            <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left text-slate-600 min-w-[900px]'> 
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200'>
                        <tr>
                            <th className='px-6 py-3 whitespace-nowrap'>No</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Title</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Image</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Category</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Description</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Date</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Status</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            news.length > 0 && news
                            .filter(n => n.title.toLowerCase().includes(searchPar.toLowerCase()))
                            .slice((page - 1) * parPage, page * parPage).map((n, i) => 
                            <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition-colors'>
                                <td className='px-6 py-4 font-medium whitespace-nowrap'>{i + 1 + ((page - 1) * parPage)}</td>
                                <td className='px-6 py-4 min-w-[200px]'>
                                    <span className='line-clamp-1'>{n.title.slice(0, 15)}...</span>
                                </td>
                                <td className='px-6 py-4'>
                                    <img className='w-10 h-10 object-cover rounded border border-gray-200' src={n.image} alt="news" />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{n.category}</td>
                                <td className='px-6 py-4 min-w-[250px]'>
                                    <span className='line-clamp-1'>{convert(n.description).slice(0, 15)}...</span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{n.date}</td>
                                
                                <td className='px-6 py-4 whitespace-nowrap'>
                                {
                                    store?.userInfo?.role === 'admin' ? 
                                    <div className='flex items-center'>
                                        {n.status === 'pending' && <span onClick={() => update_status('active', n._id)} className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold cursor-pointer hover:bg-blue-200 transition-colors'>{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>}
                                        {n.status === 'active' && <span onClick={() => update_status('deactive', n._id)} className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold cursor-pointer hover:bg-green-200 transition-colors'>{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>}
                                        {n.status === 'deactive' && <span onClick={() => update_status('active', n._id)} className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold cursor-pointer hover:bg-red-200 transition-colors'>{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>}
                                    </div> : 
                                    <div className='flex items-center'>
                                        {n.status === 'pending' && <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>{n.status}</span>}
                                        {n.status === 'active' && <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold'>{n.status}</span>}
                                        {n.status === 'deactive' && <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold'>{n.status}</span>}
                                    </div>
                                }
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-x-3'>
                                        <div onClick={() => { setNewsId(n._id); setShow(true) }} className='p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors cursor-pointer'>
                                            <FaEye size={16} />
                                        </div>
                                        {
                                            store?.userInfo?.id === n.writerId &&
                                            <>
                                                <Link to={`/dashboard/news/edit/${n._id}`} className='p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition-colors cursor-pointer'><FaEdit size={16} /></Link>
                                                <div onClick={() => deleteNews(n._id)} className='p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors cursor-pointer'><FaTrash size={16} /></div>
                                            </>
                                        }
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Responsive Pagination */}
            <div className='flex flex-col sm:flex-row items-center justify-between p-4 gap-4 text-slate-600 border-t border-gray-100'>
                
                {/* Rows per page */}
                <div className='flex items-center gap-3'>
                    <span className='font-medium text-sm'>Rows:</span>
                    <select value={parPage} onChange={(e) => {
                        setParPage(parseInt(e.target.value))
                        setPage(1)
                    }} className='px-2 py-1 border border-gray-300 rounded focus:border-indigo-500 outline-none text-sm'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                
                {/* Page Info & Controls */}
                <div className='flex items-center gap-4'>
                    <p className='text-sm font-medium'>
                        {(page - 1) * parPage + 1} - {Math.min(page * parPage, news.length)} of {news.length}
                    </p>
                    <div className='flex items-center gap-2'>
                        <button disabled={page <= 1} onClick={() => { if (page > 1) setPage(page - 1) }} className={`p-2 rounded hover:bg-gray-100 transition-colors ${page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}>
                            <IoIosArrowBack size={18} />
                        </button>
                        <button disabled={page >= pages} onClick={() => { if (page < pages) setPage(page + 1) }} className={`p-2 rounded hover:bg-gray-100 transition-colors ${page >= pages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}>
                            <IoIosArrowForward size={18} />
                        </button>
                    </div>
                </div>
            </div>

            { show && <NewsView show={show} setShow={setShow} newsId={newsId} /> }
        </div>
    )
}

export default NewContent
