import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddWriter = () => {
    const navigate = useNavigate();
    const { store } = useContext(storeContext);

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        category: ""
    });
    const [loader, setLoader] = useState(false);

    const inputHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const { data } = await axios.post(`${base_url}/api/news/writer/add`, state, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            });
            setLoader(false);
            toast.success(data.message);
            navigate('/dashboard/writers');
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto'
        >
            <div className='flex justify-between items-center mb-8 pb-4 border-b border-gray-100'>
                <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                    <FaUserPlus className='text-indigo-600'/> Add New Writer
                </h2>
                <Link to='/dashboard/writers' className='flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors'>
                    <FaArrowLeft /> Back to Writers
                </Link>
            </div>

            <form onSubmit={submit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Name Input */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="name">Full Name</label>
                        <input 
                            onChange={inputHandler} 
                            value={state.name} 
                            required 
                            type="text" 
                            placeholder='Enter writer name' 
                            name='name' 
                            id='name' 
                            className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all' 
                        />
                    </div>

                    {/* Category Selection */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="category">Category</label>
                        <select 
                            onChange={inputHandler} 
                            value={state.category} 
                            required 
                            name='category' 
                            id='category' 
                            className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white'
                        >
                            <option value="">-- Select Category --</option>
                            <option value="All">All</option>
                            <option value="Education">Education</option>
                            <option value="Travel">Travel</option>
                            <option value="Health">Health</option>
                            <option value="International">International</option>
                            <option value="Sports">Sports</option>
                            <option value="Politics">Politics</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Technology">Technology</option>
                            <option value="The-Begusarai">The-Begusarai</option>
                        </select>
                    </div>

                    {/* Email Input */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="email">Email Address</label>
                        <input 
                            onChange={inputHandler} 
                            value={state.email} 
                            required 
                            type="email" 
                            placeholder='writer@example.com' 
                            name='email' 
                            id='email' 
                            className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all' 
                        />
                    </div>

                    {/* Password Input */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="password">Password</label>
                        <input 
                            onChange={inputHandler} 
                            value={state.password} 
                            required 
                            type="password" 
                            placeholder='••••••••' 
                            name='password' 
                            id='password' 
                            className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all' 
                        />
                    </div>
                </div>

                <div className='pt-4'>
                    <button 
                        disabled={loader} 
                        className='w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {loader ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Adding...
                            </>
                        ) : 'Add Writer'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddWriter;