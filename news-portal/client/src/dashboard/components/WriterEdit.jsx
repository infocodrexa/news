import React, { useState, useEffect, useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const WriterEdit = ({ show, setShow, writerId, refreshWriters }) => {
    
    const { store } = useContext(storeContext);
    const [loader, setLoader] = useState(false);
    
    const [state, setState] = useState({ 
        name: '', 
        email: '', 
        category: '' 
    });

    // Fetch Writer Data
    useEffect(() => {
        if (writerId) {
            const get_writer = async () => {
                try {
                    const { data } = await axios.get(`${base_url}/api/writer/${writerId}`, { 
                        headers: { 'Authorization': `Bearer ${store.token}` } 
                    });
                    setState({ 
                        name: data.writer.name, 
                        email: data.writer.email, 
                        category: data.writer.category 
                    });
                } catch (error) { 
                    console.log(error); 
                }
            };
            get_writer();
        }
    }, [writerId, store.token]);

    // Update Writer
    const update_writer = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const { data } = await axios.put(`${base_url}/api/writer/update/${writerId}`, state, { 
                headers: { 'Authorization': `Bearer ${store.token}` } 
            });
            setLoader(false);
            toast.success(data.message);
            setShow(false);
            refreshWriters();
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Update Failed");
        }
    };

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <div 
                    onClick={handleBackdropClick} 
                    className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className='bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative'
                    >
                        
                        {/* Header */}
                        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50'>
                            <h2 className='text-lg font-bold text-gray-800'>Edit Writer Profile</h2>
                            <button 
                                onClick={() => setShow(false)} 
                                className='p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500 transition-colors'
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className='p-6'>
                            <form onSubmit={update_writer} className='space-y-4'>
                                
                                {/* Name Input */}
                                <div className='space-y-1'>
                                    <label className='text-sm font-semibold text-gray-600'>Full Name</label>
                                    <input 
                                        value={state.name} 
                                        onChange={(e) => setState({...state, name: e.target.value})} 
                                        type="text" 
                                        placeholder='Writer Name'
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' 
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className='space-y-1'>
                                    <label className='text-sm font-semibold text-gray-600'>Email Address</label>
                                    <input 
                                        value={state.email} 
                                        onChange={(e) => setState({...state, email: e.target.value})} 
                                        type="email" 
                                        placeholder='Writer Email'
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' 
                                        required
                                    />
                                </div>

                                {/* Category Select */}
                                <div className='space-y-1'>
                                    <label className='text-sm font-semibold text-gray-600'>Category</label>
                                    <div className='relative'>
                                        <select 
                                            value={state.category} 
                                            onChange={(e) => setState({...state, category: e.target.value})} 
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none bg-white cursor-pointer'
                                            required
                                        >
                                            <option value="">-- Select Category --</option>
                                            <option value="Political">Political</option>
                                            <option value="Sports">Sports</option>
                                            <option value="World">World</option>
                                            <option value="Business-&-Economy">Business-&-Economy</option>
                                            <option value="Crime-&-Law">Crime-&-Law</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Health">Health</option>
                                            <option value="Education-&-Jobs">Education-&-Jobs</option>
                                            <option value="Latest">Latest</option>
                                            <option value="National-News">National-News</option>
                                            <option value="State">State</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='pt-4 flex gap-3'>
                                    <button 
                                        type="button" 
                                        onClick={() => setShow(false)}
                                        className='flex-1 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors'
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        disabled={loader} 
                                        className='flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center gap-2'
                                    >
                                        {loader ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Updating...
                                            </>
                                        ) : 'Save Changes'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WriterEdit;