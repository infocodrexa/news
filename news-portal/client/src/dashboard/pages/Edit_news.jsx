// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { MdCloudUpload } from "react-icons/md";
// import JoditEditor from 'jodit-react'
// import Galler from '../components/Galler';
// import { base_url } from '../../config/config'
// import axios from 'axios'
// import storeContext from '../../context/storeContext'
// import toast from 'react-hot-toast'

// const Edit_news = () => {

//     const { news_id } = useParams()

//     const { store } = useContext(storeContext)
//     const [show, setShow] = useState(false)
//     const editor = useRef(null)

//     const [old_image, set_old_image] = useState('')
//     const [title, setTitle] = useState('')
//     const [image, setImage] = useState('')
//     const [img, setImg] = useState('')
//     const [description, setDescription] = useState('')


//     const imageHandle = (e) => {

//         const { files } = e.target

//         if (files.length > 0) {
//             setImg(URL.createObjectURL(files[0]))
//             setImage(files[0])
//         }
//     }
//     const [loader, setLoader] = useState(false)

//     const added = async (e) => {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append('title', title)
//         formData.append('description', description)
//         formData.append('new_image', image)
//         formData.append('old_image', old_image)

//         try {
//             setLoader(true)
//             const { data } = await axios.put(`${base_url}/api/news/update/${news_id}`, formData, {
//                 headers: {
//                     "Authorization": `Bearer ${store.token}`
//                 }
//             })
//             setLoader(false)
//             console.log(data)
//             toast.success(data.message)
//         } catch (error) {
//             setLoader(false)
//             toast.success(error.response.data.message)
//         }
//     }
//     const [images, setImages] = useState([])

//     const get_images = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/images`, {
//                 headers: {
//                     "Authorization": `Bearer ${store.token}`
//                 }
//             })
//             console.log(data.images)
//             setImages(data.images)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         get_images()
//     }, [])

//     const [imagesLoader, setImagesLoader] = useState(false)

//     const imageHandler = async (e) => {
//         const files = e.target.files
//         try {
//             const formData = new FormData()
//             for (let i = 0; i < files.length; i++) {
//                 formData.append('images', files[i])

//             }

//             setImagesLoader(true)

//             const { data } = await axios.post(`${base_url}/api/images/add`, formData, {
//                 headers: {
//                     "Authorization": `Bearer ${store.token}`
//                 }
//             })
//             setImagesLoader(false)
//             setImages([...images, data.images])
//             toast.success(data.message)

//         } catch (error) {
//             console.log(error)
//             setImagesLoader(false)
//             toast.error(error.response.data.message)
//         }
//     }

//     const get_news = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
//                 headers: {
//                     "Authorization": `Bearer ${store.token}`
//                 }
//             })
//             setTitle(data?.news?.title)
//             setDescription(data?.news?.description)
//             setImg(data?.news?.image)
//             set_old_image(data?.news?.image)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         get_news()
//     }, [news_id])


//     return (
//         <div className='bg-white rounded-md'>
//             <div className='flex justify-between p-4'>
//                 <h2 className='text-xl font-medium'>Add News</h2>
//                 <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/news'>News</Link>

//             </div>

//             <div className='p-4'>
//                 <form onSubmit={added} >
//                     <div className='flex flex-col gap-y-2 mb-6'>
//                         <label className='text-md font-medium text-gray-600' htmlFor="title">Title</label>
//                         <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' name='title' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='title' />
//                     </div>
//                     <div className='mb-6'>
//                         <div>
//                             <label htmlFor="img" className={`w-full h-[240px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed`}>
//                                 {
//                                     img ? <img src={img} className='w-full h-full' alt='image' /> : <div className='flex justify-center items-center flex-col gap-y-2'>
//                                         <span className='text-2xl'><MdCloudUpload /></span>
//                                         <span>Select Image</span>
//                                     </div>
//                                 }
//                             </label>
//                             <input onChange={imageHandle} className='hidden' type="file" id='img' />
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-y-2 mb-6'>
//                         <div className='flex justify-start items-center gap-x-2'>
//                             <h2>Description</h2>
//                             <div onClick={() => setShow(true)}>
//                                 <span className='text-2xl cursor-pointer'><MdCloudUpload /></span>
//                             </div>
//                         </div>
//                         <div>
//                             <JoditEditor
//                                 ref={editor}
//                                 value={description}
//                                 tabIndex={1}
//                                 onBlur={value => setDescription(value)}
//                                 onChange={() => { }}
//                             />
//                         </div>
//                     </div>

//                     <div className='mt-4'>
//                         <button disabled={loader} className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' > {loader ? 'loading...' : 'Update News'}</button>
//                     </div>

//                 </form>
//             </div>
//             <input onChange={imageHandler} type="file" multiple id='images' className='hidden' />
//             {
//                 show && <Galler setShow={setShow} images={images} />
//             }
//         </div>
//     )
// }

// export default Edit_news



// import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { MdCloudUpload, MdArrowBack, MdImage } from "react-icons/md";
// import JoditEditor from 'jodit-react';
// import Galler from '../components/Galler';
// import { base_url } from '../../config/config';
// import axios from 'axios';
// import storeContext from '../../context/storeContext';
// import toast from 'react-hot-toast';
// import { motion } from 'framer-motion';

// const Edit_news = () => {
//     const { news_id } = useParams();
//     const { store } = useContext(storeContext);
//     const [show, setShow] = useState(false);
//     const editor = useRef(null);

//     const [old_image, set_old_image] = useState('');
//     const [title, setTitle] = useState('');
//     const [image, setImage] = useState('');
//     const [img, setImg] = useState('');
//     const [description, setDescription] = useState('');
//     const [loader, setLoader] = useState(false);

//     // Gallery States
//     const [images, setImages] = useState([]);
//     const [imagesLoader, setImagesLoader] = useState(false);

//     // Jodit Config (Optional: You can remove this if you prefer defaults)
//     const config = useMemo(() => ({
//         readonly: false,
//         placeholder: 'Update your news content...',
//         height: 450,
//         toolbarSticky: false
//     }), []);

//     // Fetch News Data
//     const get_news = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
//                 headers: { "Authorization": `Bearer ${store.token}` }
//             });
//             setTitle(data?.news?.title);
//             setDescription(data?.news?.description);
//             setImg(data?.news?.image);
//             set_old_image(data?.news?.image);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         get_news();
//     }, [news_id]);

//     // Fetch Gallery Images
//     const get_images = async () => {
//         try {
//             const { data } = await axios.get(`${base_url}/api/images`, {
//                 headers: { "Authorization": `Bearer ${store.token}` }
//             });
//             setImages(data.images);
//         } catch (error) { console.log(error) }
//     };

//     useEffect(() => { get_images() }, []);

//     // Handle Local Image Select
//     const imageHandle = (e) => {
//         const { files } = e.target;
//         if (files.length > 0) {
//             setImg(URL.createObjectURL(files[0]));
//             setImage(files[0]);
//         }
//     };

//     // Handle Gallery Image Upload
//     const imageHandler = async (e) => {
//         const files = e.target.files;
//         try {
//             const formData = new FormData();
//             for (let i = 0; i < files.length; i++) {
//                 formData.append('images', files[i]);
//             }
//             setImagesLoader(true);
//             const { data } = await axios.post(`${base_url}/api/images/add`, formData, {
//                 headers: { "Authorization": `Bearer ${store.token}` }
//             });
//             setImagesLoader(false);
            
//             if (Array.isArray(data.images)) {
//                 setImages([...images, ...data.images]);
//             } else {
//                 setImages([...images, data.images]);
//             }
//             toast.success(data.message);
//         } catch (error) {
//             console.log(error);
//             setImagesLoader(false);
//             toast.error(error.response?.data?.message || "Error uploading images");
//         }
//     };

//     // Submit Update
//     const update = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('new_image', image);
//         formData.append('old_image', old_image);

//         try {
//             setLoader(true);
//             const { data } = await axios.put(`${base_url}/api/news/update/${news_id}`, formData, {
//                 headers: { "Authorization": `Bearer ${store.token}` }
//             });
//             setLoader(false);
//             console.log(data);
//             toast.success(data.message);
//         } catch (error) {
//             setLoader(false);
//             toast.error(error.response?.data?.message || "Update failed");
//         }
//     };

//     return (
//         <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8'
//         >
//             {/* Header */}
//             <div className='flex justify-between items-center mb-8 border-b border-gray-100 pb-4'>
//                 <h2 className='text-2xl font-bold text-gray-800'>Edit News</h2>
//                 <Link className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium' to='/dashboard/news'>
//                     <MdArrowBack /> Back to List
//                 </Link>
//             </div>

//             <form onSubmit={update} className='space-y-8'>
                
//                 <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    
//                     {/* --- LEFT COLUMN (Title & Image) --- */}
//                     <div className='lg:col-span-4 space-y-6'>
                        
//                         {/* Title Input */}
//                         <div className='flex flex-col gap-2'>
//                             <label className='text-sm font-semibold text-gray-700' htmlFor="title">News Title</label>
//                             <input 
//                                 required 
//                                 value={title} 
//                                 onChange={(e) => setTitle(e.target.value)} 
//                                 type="text" 
//                                 placeholder='News Title' 
//                                 name='title' 
//                                 id='title' 
//                                 className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full' 
//                             />
//                         </div>

//                         {/* Image Upload Area */}
//                         <div className='flex flex-col gap-2'>
//                             <label className='text-sm font-semibold text-gray-700'>Featured Image</label>
//                             <div>
//                                 <label htmlFor="img" className={`w-full h-[280px] flex flex-col justify-center items-center rounded-xl border-2 border-dashed ${img ? 'border-indigo-500' : 'border-gray-300'} cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative group`}>
//                                     {img ? (
//                                         <>
//                                             <img src={img} className='w-full h-full object-cover' alt='Selected' />
//                                             <div className='absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity'>
//                                                 <span className='text-white font-medium'><MdCloudUpload className='inline mr-1'/> Change Image</span>
//                                             </div>
//                                         </>
//                                     ) : (
//                                         <div className='flex flex-col items-center gap-3 text-gray-400'>
//                                             <span className='text-5xl'><MdImage /></span>
//                                             <span className='text-sm font-medium'>Click to upload cover image</span>
//                                         </div>
//                                     )}
//                                 </label>
//                                 <input onChange={imageHandle} className='hidden' type="file" id='img' accept="image/*" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- RIGHT COLUMN (Editor) --- */}
//                     <div className='lg:col-span-8 flex flex-col gap-2'>
//                         <div className='flex justify-between items-center'>
//                             <label className='text-sm font-semibold text-gray-700'>Content</label>
//                             <div onClick={() => setShow(true)} className='flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer'>
//                                 <MdCloudUpload /> Use Gallery Image
//                             </div>
//                         </div>
                        
//                         {/* Jodit Editor Wrapper */}
//                         <div className='jodit-container rounded-lg overflow-hidden border border-gray-300 shadow-sm'>
//                             <JoditEditor
//                                 ref={editor}
//                                 value={description}
//                                 tabIndex={1}
//                                 onBlur={value => setDescription(value)}
//                                 onChange={() => {}}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className='pt-6 border-t border-gray-100 flex justify-end'>
//                     <button 
//                         disabled={loader} 
//                         className='px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95 duration-150'
//                     >
//                         {loader ? (
//                             <>
//                                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                                 Updating...
//                             </>
//                         ) : 'Update News'}
//                     </button>
//                 </div>

//             </form>
            
//             {/* Hidden Input for Gallery Bulk Upload */}
//             <input onChange={imageHandler} type="file" multiple id='images' className='hidden' />
            
//             {/* Gallery Modal */}
//             {show && <Galler setShow={setShow} images={images} />}
//         </motion.div>
//     );
// };

// export default Edit_news;







import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdCloudUpload, MdArrowBack, MdImage } from "react-icons/md";
import JoditEditor from 'jodit-react';
import Galler from '../components/Galler';
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Edit_news = () => {
    const { news_id } = useParams();
    const { store } = useContext(storeContext);
    const [show, setShow] = useState(false);
    const editor = useRef(null);

    const [old_image, set_old_image] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState(''); // NEW STATE FOR SLUG
    const [image, setImage] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);

    // Gallery States
    const [images, setImages] = useState([]);
    const [imagesLoader, setImagesLoader] = useState(false);

    // --- NEW: SLUG GENERATOR FUNCTION ---
    const generateSlug = (text) => {
        return text
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "") // Special chars hatao
            .replace(/\s+/g, "-") // Space ko Dash me badlo
            .replace(/-+/g, "-"); // Double Dash hatao
    };

    // --- NEW: HANDLE TITLE CHANGE ---
    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        // Title update hone par slug bhi update karo (User convenience ke liye)
        setSlug(generateSlug(val));
    };

    // --- NEW: HANDLE MANUAL SLUG CHANGE ---
    const handleSlugChange = (e) => {
        const val = e.target.value;
        setSlug(generateSlug(val));
    };

    // Jodit Config (Optional)
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Update your news content...',
        height: 450,
        toolbarSticky: false
    }), []);

    // Fetch News Data
    const get_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
                headers: { "Authorization": `Bearer ${store.token}` }
            });
            setTitle(data?.news?.title);
            setSlug(data?.news?.slug); // Set Existing Slug
            setDescription(data?.news?.description);
            setImg(data?.news?.image);
            set_old_image(data?.news?.image);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        get_news();
    }, [news_id]);

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

    // Submit Update
    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug); // Send Updated Slug
        formData.append('description', description);
        formData.append('new_image', image);
        formData.append('old_image', old_image);

        try {
            setLoader(true);
            const { data } = await axios.put(`${base_url}/api/news/update/${news_id}`, formData, {
                headers: { "Authorization": `Bearer ${store.token}` }
            });
            setLoader(false);
            console.log(data);
            toast.success(data.message);
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8'
        >
            {/* Header */}
            <div className='flex justify-between items-center mb-8 border-b border-gray-100 pb-4'>
                <h2 className='text-2xl font-bold text-gray-800'>Edit News</h2>
                <Link className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium' to='/dashboard/news'>
                    <MdArrowBack /> Back to List
                </Link>
            </div>

            <form onSubmit={update} className='space-y-8'>
                
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    
                    {/* --- LEFT COLUMN (Title, Slug & Image) --- */}
                    <div className='lg:col-span-4 space-y-6'>
                        
                        {/* Title Input */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700' htmlFor="title">News Title</label>
                            <input 
                                required 
                                value={title} 
                                onChange={handleTitleChange} // UPDATED Handler
                                type="text" 
                                placeholder='News Title' 
                                name='title' 
                                id='title' 
                                className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full' 
                            />
                        </div>

                        {/* --- NEW: Slug Input (URL) --- */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700' htmlFor="slug">Custom URL (Slug)</label>
                            <input 
                                required 
                                value={slug} 
                                onChange={handleSlugChange} 
                                type="text" 
                                placeholder='url-will-look-like-this' 
                                name='slug' 
                                id='slug' 
                                className='px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full font-mono text-sm' 
                            />
                            <p className='text-xs text-gray-400'>Preview: {base_url}/news/{slug}</p>
                        </div>

                        {/* Image Upload Area */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700'>Featured Image</label>
                            <div>
                                <label htmlFor="img" className={`w-full h-[280px] flex flex-col justify-center items-center rounded-xl border-2 border-dashed ${img ? 'border-indigo-500' : 'border-gray-300'} cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative group`}>
                                    {img ? (
                                        <>
                                            <img src={img} className='w-full h-full object-cover' alt='Selected' />
                                            <div className='absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                                <span className='text-white font-medium'><MdCloudUpload className='inline mr-1'/> Change Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex flex-col items-center gap-3 text-gray-400'>
                                            <span className='text-5xl'><MdImage /></span>
                                            <span className='text-sm font-medium'>Click to upload cover image</span>
                                        </div>
                                    )}
                                </label>
                                <input onChange={imageHandle} className='hidden' type="file" id='img' accept="image/*" />
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (Editor) --- */}
                    <div className='lg:col-span-8 flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <label className='text-sm font-semibold text-gray-700'>Content</label>
                            <div onClick={() => setShow(true)} className='flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer'>
                                <MdCloudUpload /> Use Gallery Image
                            </div>
                        </div>
                        
                        {/* Jodit Editor Wrapper */}
                        <div className='jodit-container rounded-lg overflow-hidden border border-gray-300 shadow-sm'>
                            <JoditEditor
                                ref={editor}
                                value={description}
                                tabIndex={1}
                                onBlur={value => setDescription(value)}
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className='pt-6 border-t border-gray-100 flex justify-end'>
                    <button 
                        disabled={loader} 
                        className='px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95 duration-150'
                    >
                        {loader ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Updating...
                            </>
                        ) : 'Update News'}
                    </button>
                </div>

            </form>
            
            {/* Hidden Input for Gallery Bulk Upload */}
            <input onChange={imageHandler} type="file" multiple id='images' className='hidden' />
            
            {/* Gallery Modal */}
            {show && <Galler setShow={setShow} images={images} />}
        </motion.div>
    );
};

export default Edit_news;