import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import toast from 'react-hot-toast'
import WriterView from '../components/WriterView'
import WriterEdit from '../components/WriterEdit'

const Writers = () => {

    const { store, searchPar } = useContext(storeContext)
    const [writers, setWriters] = useState([])
    
    // Pagination States
    const [page, setPage] = useState(1)
    const [parPage, setParPage] = useState(5)
    const [pages, setPages] = useState(0)

    // States for Popups
    const [showView, setShowView] = useState(false)
    const [selectedWriter, setSelectedWriter] = useState(null)
    const [showEdit, setShowEdit] = useState(false)
    const [editId, setEditId] = useState('')

    const get_writers = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news/writers`, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            })
            setWriters(data.writers)
        } catch (error) { console.log(error) }
    }

    useEffect(() => { get_writers() }, [])

    useEffect(() => {
        if (writers.length > 0) {
            const calculate_page = Math.ceil(writers.length / parPage)
            setPages(calculate_page)
        }
    }, [writers, parPage])

    const deleteWriter = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                const { data } = await axios.delete(`${base_url}/api/writer/delete/${id}`, {
                    headers: { 'Authorization': `Bearer ${store.token}` }
                })
                toast.success(data.message)
                get_writers()
            } catch (error) { toast.error(error.response.data.message) }
        }
    }

    return (
        <div className='bg-white rounded-md shadow-sm'>
            
            {/* 👇 Responsive Header (Stack on mobile, Row on desktop) */}
            <div className='flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-0 border-b'>
                <h2 className='text-xl font-medium text-gray-700'>Writers</h2>
                <Link className='px-4 py-2 bg-purple-600 rounded-md text-white hover:bg-purple-700 transition shadow-md text-sm font-medium w-full md:w-auto text-center' to='/dashboard/writer/add'>
                    Add Writer
                </Link>
            </div>
            
            {/* Table Container with Horizontal Scroll */}
            <div className='relative overflow-x-auto p-4'>
                <table className='w-full text-sm text-left text-slate-600'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b'>
                        <tr>
                            {/* whitespace-nowrap prevents line breaking */}
                            <th className='px-6 py-3 whitespace-nowrap'>No</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Name</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Category</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Role</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Image</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Email</th>
                            <th className='px-6 py-3 whitespace-nowrap'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {writers
                        .filter(w => 
                            (w.name && w.name.toLowerCase().includes(searchPar.toLowerCase())) || 
                            (w.email && w.email.toLowerCase().includes(searchPar.toLowerCase()))
                        )
                        .slice((page - 1) * parPage, page * parPage)
                        .map((r, i) => <tr key={i} className='bg-white border-b hover:bg-gray-50 transition' >
                            <td className='px-6 py-4 whitespace-nowrap font-medium'>{i + 1 + ((page - 1) * parPage)}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{r.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{r.category}</td>
                            <td className='px-6 py-4 capitalize whitespace-nowrap'>
                                <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>{r.role}</span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <img className='w-[40px] h-[40px] rounded-full object-cover border' src={r.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>{r.email}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex justify-start items-center gap-x-3'>
                                    <Link to={`/dashboard/writer/${r._id}`} className='p-2 bg-green-100 text-green-600 rounded hover:bg-green-600 hover:text-white transition'>
                                        <FaEye />
                                    </Link>
                                    <button onClick={() => { setEditId(r._id); setShowEdit(true) }} className='p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-600 hover:text-white transition'>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => deleteWriter(r._id)} className='p-2 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition'>
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

            {/* 👇 Responsive Pagination Footer */}
            <div className='flex flex-col md:flex-row items-center justify-between md:justify-end px-4 md:px-10 gap-4 text-slate-600 pb-6 pt-2'>
                
                {/* Rows per page */}
                <div className='flex gap-x-3 justify-center items-center'>
                    <p className='font-semibold text-sm'>Rows per Page</p>
                    <select value={parPage} onChange={(e) => {
                        setParPage(parseInt(e.target.value))
                        setPage(1) 
                    }} className='px-3 py-1 rounded-md outline-0 border border-gray-300 focus:border-purple-500 h-9 bg-white'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

                {/* Page Count */}
                <p className='font-semibold text-sm'>
                    {(page - 1) * parPage + 1}-{Math.min(page * parPage, writers.length)} of {writers.length}
                </p>

                {/* Arrow Controls */}
                <div className='flex items-center gap-x-3'>
                    <button 
                        onClick={() => { if (page > 1) setPage(page - 1) }} 
                        disabled={page <= 1}
                        className={`p-2 rounded-full hover:bg-gray-200 transition ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <IoIosArrowBack />
                    </button>
                    <button 
                        onClick={() => { if (page < pages) setPage(page + 1) }} 
                        disabled={page >= pages}
                        className={`p-2 rounded-full hover:bg-gray-200 transition ${page >= pages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

            {/* Popups Render */}
            <WriterView show={showView} setShow={setShowView} writer={selectedWriter} />
            <WriterEdit show={showEdit} setShow={setShowEdit} writerId={editId} refreshWriters={get_writers} />
        </div>
    )
}
export default Writers