import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdCloudUpload, MdArrowBack, MdImage } from "react-icons/md";
import JoditEditor from 'jodit-react';
import Galler from '../components/Galler';
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const CreateNews = () => {
    const { store } = useContext(storeContext);
    const [show, setShow] = useState(false);
    const editor = useRef(null);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState(''); 
    const [image, setImage] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loader, setLoader] = useState(false);
    
    // Gallery States
    const [images, setImages] = useState([]);
    const [imagesLoader, setImagesLoader] = useState(false);

    // Static Categories (Tum chaho to API se fetch kar sakte ho)
    const categories = [
      'All' , 'Sports', 'Politics', 'Entertainment', 'Technology', 'Health', 'Education', 'Travel' , 'The-Begusarai' , 'International'
    ];

    // Fetch Gallery Images
    const get_images = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/images`, {
                headers: { "Authorization": `Bearer ${store.token}` }
            });
            setImages(data.images);
        } catch (error) { console.log(error) }
    };

    useEffect(() => { get_images() }, []);

    // Handle Local Image Select
    const imageHandle = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0]));
            setImage(files[0]);
        }
    };

    // --- SLUG GENERATOR ---
    const generateSlug = (text) => {
        return text
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "") 
            .replace(/\s+/g, "-") 
            .replace(/-+/g, "-"); 
    };

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        setSlug(generateSlug(val));
    };

    const handleSlugChange = (e) => {
        const val = e.target.value;
        setSlug(generateSlug(val));
    };

    // Handle Gallery Image Upload
    const imageHandler = async (e) => {
        const files = e.target.files;
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            setImagesLoader(true);
            const { data } = await axios.post(`${base_url}/api/images/add`, formData, {
                headers: { "Authorization": `Bearer ${store.token}` }
            });
            setImagesLoader(false);
            
            if (Array.isArray(data.images)) {
                setImages([...images, ...data.images]);
            } else {
                setImages([...images, data.images]);
            }
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            setImagesLoader(false);
            toast.error(error.response?.data?.message || "Error uploading images");
        }
    };

    // Submit News
    const added = async (e) => {
        e.preventDefault();
        
        if (!title || !description || !image || !category) {
            toast.error("Please fill all required fields (Title, Content, Image, Category)");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug); 
        formData.append('description', description);
        formData.append('image', image);
        formData.append('category', category);

        try {
            setLoader(true);
            const { data } = await axios.post(`${base_url}/api/news/add`, formData, {
                headers: { "Authorization": `Bearer ${store.token}` }
            });
            setLoader(false);
            toast.success(data.message);
            
            setTitle('');
            setSlug('');
            setDescription('');
            setImage('');
            setImg('');
            setCategory('');

        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Error creating news");
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 min-h-screen'
        >
            {/* Header */}
            <div className='flex justify-between items-center mb-6 border-b border-gray-100 pb-4'>
                <h2 className='text-2xl font-bold text-gray-800'>Create News</h2>
                <Link className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium' to='/dashboard/news'>
                    <MdArrowBack /> Back to List
                </Link>
            </div>

            <form onSubmit={added} className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                
                {/* --- LEFT SIDE: MAIN CONTENT (Title, Slug, Editor) --- */}
                <div className='lg:col-span-8 space-y-6'>
                    
                    {/* Title Input */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="title">News Title</label>
                        <input 
                            required 
                            value={title} 
                            onChange={handleTitleChange} 
                            type="text" 
                            placeholder='Enter a catchy title...' 
                            className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full text-lg' 
                        />
                    </div>

                    {/* Slug Input */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700' htmlFor="slug">Custom URL (Slug)</label>
                        <input 
                            required 
                            value={slug} 
                            onChange={handleSlugChange} 
                            type="text" 
                            placeholder='url-will-look-like-this' 
                            className='px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full font-mono text-sm' 
                        />
                        <p className='text-xs text-gray-400'>Preview: {base_url}/news/{slug}</p>
                    </div>

                    {/* Editor */}
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <label className='text-sm font-semibold text-gray-700'>Content</label>
                            <div onClick={() => setShow(true)} className='flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer'>
                                <MdCloudUpload /> Use Gallery Image
                            </div>
                        </div>
                        <div className='jodit-container rounded-lg overflow-hidden border border-gray-300 shadow-sm'>
                            <JoditEditor
                                ref={editor}
                                value={description}
                                tabIndex={1}
                                onBlur={value => setDescription(value)}
                                onChange={() => {}}
                                config={{ height: 500 }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: SETTINGS (Publish, Category, Image) --- */}
                <div className='lg:col-span-4 space-y-6'>

                    {/* 1. Publish Card */}
                    <div className='bg-gray-50 p-5 rounded-xl border border-gray-200'>
                        <h3 className='font-bold text-gray-700 mb-4 border-b pb-2'>Publish</h3>
                        <div className='text-sm text-gray-600 flex flex-col gap-3'>
                            <div className='flex justify-between'>
                                <span>Status:</span><span className='font-bold text-red-500'>Draft</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Visibility:</span><span className='font-bold text-green-600'>Public</span>
                            </div>
                        </div>
                        <button 
                            disabled={loader} 
                            onClick={added}
                            className='w-full mt-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md disabled:opacity-70 flex justify-center items-center gap-2'
                        >
                            {loader ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Publish Now'}
                        </button>
                    </div>

                    {/* 2. Category Card (From Code 1) */}
                    <div className='bg-gray-50 p-5 rounded-xl border border-gray-200'>
                        <h3 className='font-bold text-gray-700 mb-4 border-b pb-2'>Category</h3>
                        <div className='flex flex-col gap-2 h-48 overflow-y-auto custom-scrollbar pr-2'>
                            {categories.map((c, i) => (
                                <label key={i} className='flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition-colors border border-transparent hover:border-gray-200'>
                                    <input 
                                        type="radio" 
                                        name="category" 
                                        value={c}
                                        checked={category === c}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='accent-indigo-600 w-4 h-4'
                                    />
                                    <span className='text-sm text-gray-700'>{c}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 3. Image Upload Card */}
                    <div className='bg-gray-50 p-5 rounded-xl border border-gray-200'>
                        <h3 className='font-bold text-gray-700 mb-4 border-b pb-2'>Featured Image</h3>
                        <label htmlFor="img" className={`w-full h-[200px] flex flex-col justify-center items-center rounded-lg border-2 border-dashed ${img ? 'border-indigo-500' : 'border-gray-300'} cursor-pointer hover:bg-white transition-colors overflow-hidden relative group bg-white`}>
                            {img ? (
                                <>
                                    <img src={img} className='w-full h-full object-cover' alt='Selected' />
                                    <div className='absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <span className='text-white font-medium text-sm'><MdCloudUpload className='inline mr-1'/> Change</span>
                                    </div>
                                </>
                            ) : (
                                <div className='flex flex-col items-center gap-2 text-gray-400'>
                                    <span className='text-4xl'><MdImage /></span>
                                    <span className='text-xs font-medium'>Upload Cover</span>
                                </div>
                            )}
                        </label>
                        <input required onChange={imageHandle} className='hidden' type="file" id='img' accept="image/*" />
                    </div>

                </div>

            </form>
            
            {/* Hidden Gallery Input & Modal */}
            <input onChange={imageHandler} type="file" multiple id='images' className='hidden' />
            {show && <Galler setShow={setShow} images={images} />}
        </motion.div>
    );
};

export default CreateNews;