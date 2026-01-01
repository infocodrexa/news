// import React, { useEffect, useState, useContext } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import axios from 'axios'
// import { base_url } from '../../config/config'
// import storeContext from '../../context/storeContext'
// import { FaEye } from 'react-icons/fa'
// import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io' // 👇 Icons Add kiye
// import { convert } from 'html-to-text'
// import NewsView from '../components/NewsView'

// const WriterProfile = () => {

//     const { id } = useParams()
//     const { store } = useContext(storeContext)

//     const [writer, setWriter] = useState(null)
//     const [news, setNews] = useState([])

//     // 👇 Pagination States
//     const [page, setPage] = useState(1)
//     const [parPage, setParPage] = useState(5)
//     const [pages, setPages] = useState(0)
    
//     // Popup States
//     const [show, setShow] = useState(false)
//     const [newsId, setNewsId] = useState('')

//     const get_writer_and_news = async () => {
//         try {
//             const { data: writerData } = await axios.get(`${base_url}/api/writer/get/${id}`, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             })
//             setWriter(writerData.writer)

//             const { data: newsData } = await axios.get(`${base_url}/api/news`, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             })
            
//             const writerNews = newsData.news.filter(n => n.writerId == id)
//             setNews(writerNews)

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         get_writer_and_news()
//     }, [id])

//     // 👇 Page Calculation Logic
//     useEffect(() => {
//         if (news.length > 0) {
//             const calculate_page = Math.ceil(news.length / parPage)
//             setPages(calculate_page)
//         }
//     }, [news, parPage])

//     return (
//         <div className='bg-white rounded-md p-4'>
            
//             {/* --- Writer Profile Header --- */}
//             {writer && (
//                 <div className='flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-lg mb-8'>
//                     <img 
//                         src={writer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
//                         alt={writer.name} 
//                         className='w-[100px] h-[100px] rounded-full object-cover border-4 border-indigo-500' 
//                     />
//                     <div className='text-center md:text-left'>
//                         <h2 className='text-2xl font-bold text-gray-800'>{writer.name}</h2>
//                         <p className='text-gray-500'>{writer.email}</p>
//                         <p className='text-indigo-600 font-medium mt-1 uppercase'>{writer.role}</p>
//                         <div className='mt-3 flex gap-4 text-sm'>
//                             <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
//                                 Total News: <b>{news.length}</b>
//                             </span>
//                             <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full'>
//                                 Status: <b>Active</b>
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* --- NEWS TABLE SECTION --- */}
//             <h3 className='text-xl font-bold text-gray-700 mb-4 border-b pb-2'>Published News List</h3>
            
//             <div className='relative overflow-x-auto'>
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
//                         {news.length > 0 ? 
//                             // 👇 Slice Logic Added for Pagination
//                             news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
//                             <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition'>
//                                 {/* Serial No Calculation */}
//                                 <td className='px-6 py-4'>{i + 1 + ((page - 1) * parPage)}</td>
//                                 <td className='px-6 py-4 font-medium text-gray-900'>{n.title.slice(0, 15)}...</td>
//                                 <td className='px-6 py-4'>
//                                     <img className='w-[40px] h-[40px] object-cover rounded' src={n.image} alt="" />
//                                 </td>
//                                 <td className='px-6 py-4'>{n.category}</td>
//                                 <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
//                                 <td className='px-6 py-4'>{n.date}</td>
//                                 <td className='px-6 py-4'>
//                                     {n.status === 'pending' && <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs'>Pending</span>}
//                                     {n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs'>Active</span>}
//                                     {n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs'>Deactive</span>}
//                                 </td>
//                                 <td className='px-6 py-4'>
//                                     <div className='flex justify-start items-center gap-x-4 text-white'>
//                                         <div 
//                                             onClick={() => { setNewsId(n._id); setShow(true) }} 
//                                             className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 cursor-pointer'
//                                             title="View Details"
//                                         >
//                                             <FaEye />
//                                         </div>
//                                     </div>
//                                 </td>
//                             </tr>
//                         )) : (
//                             <tr>
//                                 <td colSpan="8" className="text-center py-10 text-gray-500">
//                                     No news found for this writer.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* 👇 PAGINATION FOOTER */}
//             {news.length > 0 && (
//                 <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600 py-4'>
//                     <div className='flex gap-x-3 justify-center items-center'>
//                         <p className='px-4 py-3 font-semibold text-sm'>Rows per Page</p>
//                         <select value={parPage} onChange={(e) => {
//                             setParPage(parseInt(e.target.value))
//                             setPage(1)
//                         }} className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'>
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="15">15</option>
//                             <option value="20">20</option>
//                         </select>
//                     </div>
//                     <p className='px-6 py-3 font-semibold text-sm'>
//                         {(page - 1) * parPage + 1}/{Math.min(page * parPage, news.length)} - of {news.length}
//                     </p>
//                     <div className='flex items-center gap-x-3'>
//                         <IoIosArrowBack onClick={() => { if (page > 1) setPage(page - 1) }} className='w-5 h-5 cursor-pointer hover:text-indigo-500' />
//                         <IoIosArrowForward onClick={() => { if (page < pages) setPage(page + 1) }} className='w-5 h-5 cursor-pointer hover:text-indigo-500' />
//                     </div>
//                 </div>
//             )}

//             {/* Popup Component */}
//             { show && <NewsView show={show} setShow={setShow} newsId={newsId} /> }

//         </div>
//     )
// }

// export default WriterProfile





import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { FaEye } from 'react-icons/fa'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { convert } from 'html-to-text'
import NewsView from '../components/NewsView'

const WriterProfile = () => {

    const { id } = useParams()
    const { store } = useContext(storeContext)

    const [writer, setWriter] = useState(null)
    const [news, setNews] = useState([])

    // 👇 Pagination States
    const [page, setPage] = useState(1)
    const [parPage, setParPage] = useState(5)
    const [pages, setPages] = useState(0)
    
    // Popup States
    const [show, setShow] = useState(false)
    const [newsId, setNewsId] = useState('')

    const get_writer_and_news = async () => {
        try {
            const { data: writerData } = await axios.get(`${base_url}/api/writer/get/${id}`, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            })
            setWriter(writerData.writer)

            const { data: newsData } = await axios.get(`${base_url}/api/news`, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            })
            
            const writerNews = newsData.news.filter(n => n.writerId == id)
            setNews(writerNews)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_writer_and_news()
    }, [id])

    // 👇 Page Calculation Logic
    useEffect(() => {
        if (news.length > 0) {
            const calculate_page = Math.ceil(news.length / parPage)
            setPages(calculate_page)
        }
    }, [news, parPage])

    return (
        <div className='bg-white rounded-md p-4 w-full'>
            
            {/* --- Writer Profile Header (Responsive) --- */}
            {writer && (
                <div className='flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-lg mb-8'>
                    <img 
                        src={writer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                        alt={writer.name} 
                        className='w-[100px] h-[100px] rounded-full object-cover border-4 border-indigo-500' 
                    />
                    <div className='text-center md:text-left w-full'>
                        <h2 className='text-2xl font-bold text-gray-800'>{writer.name}</h2>
                        <p className='text-gray-500'>{writer.email}</p>
                        <p className='text-indigo-600 font-medium mt-1 uppercase'>{writer.role}</p>
                        <div className='mt-3 flex flex-wrap justify-center md:justify-start gap-4 text-sm'>
                            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
                                Total News: <b>{news.length}</b>
                            </span>
                            <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full'>
                                Status: <b>Active</b>
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* --- NEWS TABLE SECTION --- */}
            <h3 className='text-xl font-bold text-gray-700 mb-4 border-b pb-2'>Published News List</h3>
            
            {/* Table wrapper for horizontal scroll */}
            <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left text-slate-600 min-w-[900px]'> 
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
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
                        {news.length > 0 ? 
                            news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                            <tr key={n._id} className='bg-white border-b hover:bg-gray-50 transition'>
                                <td className='px-6 py-4 whitespace-nowrap'>{i + 1 + ((page - 1) * parPage)}</td>
                                <td className='px-6 py-4 font-medium text-gray-900 min-w-[200px]'>
                                    {n.title.slice(0, 15)}...
                                </td>
                                <td className='px-6 py-4'>
                                    <img className='w-[40px] h-[40px] object-cover rounded border' src={n.image} alt="" />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{n.category}</td>
                                <td className='px-6 py-4 min-w-[250px]'>
                                    {convert(n.description).slice(0, 15)}...
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{n.date}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {n.status === 'pending' && <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs'>Pending</span>}
                                    {n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs'>Active</span>}
                                    {n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs'>Deactive</span>}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-x-4 text-white'>
                                        <div 
                                            onClick={() => { setNewsId(n._id); setShow(true) }} 
                                            className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 cursor-pointer'
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-gray-500">
                                    No news found for this writer.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 👇 PAGINATION FOOTER (Responsive) */}
            {news.length > 0 && (
                <div className='flex flex-col sm:flex-row items-center justify-between p-4 gap-4 text-slate-600 border-t mt-4'>
                    <div className='flex gap-x-3 justify-center items-center'>
                        <p className='font-semibold text-sm'>Rows per Page</p>
                        <select value={parPage} onChange={(e) => {
                            setParPage(parseInt(e.target.value))
                            setPage(1)
                        }} className='px-3 py-1 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-9 bg-white'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    
                    <div className='flex items-center gap-4'>
                        <p className='font-semibold text-sm'>
                            {(page - 1) * parPage + 1} - {Math.min(page * parPage, news.length)} of {news.length}
                        </p>
                        <div className='flex items-center gap-x-3'>
                            <button disabled={page <= 1} onClick={() => { if (page > 1) setPage(page - 1) }} className={`p-1.5 rounded transition-colors ${page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer text-slate-600'}`}>
                                <IoIosArrowBack size={20} />
                            </button>
                            <button disabled={page >= pages} onClick={() => { if (page < pages) setPage(page + 1) }} className={`p-1.5 rounded transition-colors ${page >= pages ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer text-slate-600'}`}>
                                <IoIosArrowForward size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup Component */}
            { show && <NewsView show={show} setShow={setShow} newsId={newsId} /> }

        </div>
    )
}

export default WriterProfile