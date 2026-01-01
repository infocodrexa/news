// import React, { useContext, useState } from 'react'
// import { FaImage } from "react-icons/fa6";
// import { FaCloudUploadAlt } from "react-icons/fa"; // Upload Icon
// import storeContext from '../../context/storeContext'
// import { base_url } from '../../config/config'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// const Profile = () => {

//     const { store, dispatch } = useContext(storeContext) // Dispatch bhi chahiye
//     const user = store.userInfo

//     const [state, setState] = useState({
//         old_password: '',
//         new_password: ''
//     })

//     const inputHandle = (e) => {
//         setState({
//             ...state,
//             [e.target.name]: e.target.value
//         })
//     }

//     const [loader, setLoader] = useState(false)
//     const [imageLoader, setImageLoader] = useState(false) // Image ke liye alag loader

//     // Password Update
//     const change_password = async (e) => {
//         e.preventDefault()
//         try {
//             setLoader(true)
//             const { data } = await axios.post(`${base_url}/api/change-password`, state, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             })
//             setLoader(false)
//             toast.success(data.message)
//             setState({ old_password: '', new_password: '' }) 
//         } catch (error) {
//             setLoader(false)
//             toast.error(error.response.data.message)
//         }
//     }

//     // Image Handle States
//     const [image, setImage] = useState('')
//     const [imgPreview, setImgPreview] = useState('')

//     // Image Select Handle
//     const imageHandle = (e) => {
//         if (e.target.files.length !== 0) {
//             setImage(e.target.files[0])
//             setImgPreview(URL.createObjectURL(e.target.files[0]))
//         }
//     }

//     // Image Upload Function
//     const update_image = async () => {
//         if(!image) return
        
//         const formData = new FormData()
//         formData.append('image', image)

//         try {
//             setImageLoader(true)
//             const { data } = await axios.post(`${base_url}/api/profile-image-upload`, formData, {
//                 headers: { 'Authorization': `Bearer ${store.token}` }
//             })
//             setImageLoader(false)
//             toast.success(data.message)
            
//             // Naya Token LocalStorage me save karo
//             localStorage.setItem('newsToken', data.token)
            
//             // Context ko update karo taaki image turant badal jaye
//             dispatch({
//                 type: "login_success",
//                 payload: { token: data.token }
//             })

//             setImgPreview('') // Preview reset
//             setImage('')      // File reset
//         } catch (error) {
//             setImageLoader(false)
//             toast.error(error.response.data.message)
//         }
//     }

//     return (
//         <div className='w-full grid grid-cols-2 gap-x-6 mt-5'>
//             <div className='bg-white gap-x-3 p-6 rounded flex justify-center items-center relative'>
//                 <div>
//                     <label htmlFor="img" className={`w-[150px] h-[150px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed overflow-hidden relative`}>
//                         {
//                             // Agar preview hai to wo dikhao, nahi to user ki purani image
//                             imgPreview ? <img src={imgPreview} alt="preview" className='w-full h-full object-cover' /> :
//                             (user?.image ? 
//                             <img src={user.image} alt="profile" className='w-full h-full object-cover' /> : 
//                             <div className='flex justify-center items-center flex-col gap-y-2'>
//                                 <span className='text-2xl'><FaImage /></span>
//                                 <span>Select Image</span>
//                             </div>)
//                         }
//                         {/* Loading Overlay */}
//                         {imageLoader && <div className='absolute bg-slate-100/80 w-full h-full flex justify-center items-center z-20'>Loading...</div>}
//                     </label>
//                     <input onChange={imageHandle} className='hidden' type="file" id='img' />
                    
//                     {/* Upload Button sirf tab dikhega jab nayi image select hogi */}
//                     {
//                         imgPreview && <div onClick={update_image} className='bg-green-500 text-white cursor-pointer py-1 px-2 rounded mt-2 text-center text-sm hover:bg-green-600'>Update Image</div>
//                     }
//                 </div>
                
//                 <div className='text-[#404040] flex flex-col gap-y-1 justify-center items-start'>
//                     <span>Name : {user?.name}</span>
//                     <span>Email : {user?.email}</span>
//                     <span>Role : {user?.role}</span>
//                     { user?.role === 'writer' && <span>Category : {user?.category}</span> }
//                 </div>
//             </div>
            
//             <div className='bg-white px-6 py-4 text-[#404040]'>
//                 <h2 className='pb-3 text-center'>Change Password</h2>
//                 <form onSubmit={change_password}>
//                     <div className='grid grid-cols-1 gap-y-5 mb-3'>
//                         <div className='flex flex-col gap-y-2'>
//                             <div className='flex flex-col gap-y-2'>
//                                 <label className='text-md font-medium text-gray-600' htmlFor="old_password">Old Password</label>
//                                 <input onChange={inputHandle} value={state.old_password} required type="password" placeholder='old password' name='old_password' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='old_password' />
//                             </div>
//                         </div>
//                         <div className='flex flex-col gap-y-2'>
//                             <div className='flex flex-col gap-y-2'>
//                                 <label className='text-md font-medium text-gray-600' htmlFor="new_password">New Password</label>
//                                 <input onChange={inputHandle} value={state.new_password} required type="password" placeholder='new password' name='new_password' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='new_password' />
//                             </div>
//                         </div>
//                     </div>
//                     <div className='mt-4'>
//                         <button disabled={loader} className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600'>
//                             {loader ? 'Loading...' : 'Change Password'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Profile




import React, { useContext, useState } from 'react';
import { FaImage, FaCloudUploadAlt, FaLock, FaUser, FaEnvelope, FaTag, FaUserShield } from "react-icons/fa"; 
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Profile = () => {
    const { store, dispatch } = useContext(storeContext);
    const user = store.userInfo;

    const [state, setState] = useState({
        old_password: '',
        new_password: ''
    });

    const [loader, setLoader] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [image, setImage] = useState('');
    const [imgPreview, setImgPreview] = useState('');

    const inputHandle = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            setImage(e.target.files[0]);
            setImgPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const update_image = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append('image', image);

        try {
            setImageLoader(true);
            const { data } = await axios.post(`${base_url}/api/profile-image-upload`, formData, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            });
            setImageLoader(false);
            toast.success(data.message);
            localStorage.setItem('newsToken', data.token);
            dispatch({ type: "login_success", payload: { token: data.token } });
            setImgPreview('');
            setImage('');
        } catch (error) {
            setImageLoader(false);
            toast.error(error.response?.data?.message || "Upload Failed");
        }
    };

    const change_password = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const { data } = await axios.post(`${base_url}/api/change-password`, state, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            });
            setLoader(false);
            toast.success(data.message);
            setState({ old_password: '', new_password: '' });
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Failed to update password");
        }
    };

    return (
        <div className='w-full'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='grid grid-cols-1 md:grid-cols-2 gap-6'
            >
                
                {/* --- Profile Card --- */}
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col items-center text-center'>
                    
                    {/* Image Container */}
                    <div className='relative group w-[160px] h-[160px] rounded-full overflow-hidden border-4 border-indigo-50 shadow-md mb-6'>
                        {/* Image Preview or User Image */}
                        <img 
                            src={imgPreview || user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                            alt="profile" 
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
                        />
                        
                        {/* Overlay for Upload */}
                        <label htmlFor="img" className='absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
                            <FaCloudUploadAlt className='text-3xl mb-1' />
                            <span className='text-xs font-semibold'>Change Photo</span>
                        </label>
                        <input onChange={imageHandle} className='hidden' type="file" id='img' accept="image/*" />

                        {/* Loader Overlay */}
                        {imageLoader && (
                            <div className='absolute inset-0 bg-white/80 flex justify-center items-center z-20'>
                                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    {/* Update Button (Only visible when new image selected) */}
                    {imgPreview && (
                        <button 
                            onClick={update_image} 
                            disabled={imageLoader}
                            className='mb-6 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70'
                        >
                            {imageLoader ? 'Uploading...' : 'Save New Photo'}
                        </button>
                    )}

                    {/* User Details */}
                    <h2 className='text-2xl font-bold text-gray-800 mb-1'>{user?.name}</h2>
                    <span className='px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wide mb-6'>
                        {user?.role}
                    </span>

                    <div className='w-full space-y-4 text-left'>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <div className='p-2 bg-white rounded-full text-indigo-500 shadow-sm'><FaEnvelope /></div>
                            <div>
                                <p className='text-xs text-gray-500 font-medium'>Email Address</p>
                                <p className='text-sm font-semibold text-gray-700'>{user?.email}</p>
                            </div>
                        </div>
                        {user?.role === 'writer' && (
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                <div className='p-2 bg-white rounded-full text-purple-500 shadow-sm'><FaTag /></div>
                                <div>
                                    <p className='text-xs text-gray-500 font-medium'>Category</p>
                                    <p className='text-sm font-semibold text-gray-700'>{user?.category}</p>
                                </div>
                            </div>
                        )}
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <div className='p-2 bg-white rounded-full text-green-500 shadow-sm'><FaUserShield /></div>
                            <div>
                                <p className='text-xs text-gray-500 font-medium'>Account Status</p>
                                <p className='text-sm font-semibold text-green-600'>Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Change Password Form --- */}
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-8'>
                    <div className='flex items-center gap-3 mb-6 pb-4 border-b border-gray-100'>
                        <div className='p-3 bg-indigo-100 text-indigo-600 rounded-lg'>
                            <FaLock className='text-xl' />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold text-gray-800'>Security</h2>
                            <p className='text-sm text-gray-500'>Update your password</p>
                        </div>
                    </div>

                    <form onSubmit={change_password} className='space-y-6'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700' htmlFor="old_password">Current Password</label>
                            <input 
                                onChange={inputHandle} 
                                value={state.old_password} 
                                required 
                                type="password" 
                                placeholder='Enter current password' 
                                name='old_password' 
                                id='old_password' 
                                className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full' 
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700' htmlFor="new_password">New Password</label>
                            <input 
                                onChange={inputHandle} 
                                value={state.new_password} 
                                required 
                                type="password" 
                                placeholder='Enter new password' 
                                name='new_password' 
                                id='new_password' 
                                className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-full' 
                            />
                        </div>

                        <div className='pt-2'>
                            <button 
                                disabled={loader} 
                                className='w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2'
                            >
                                {loader ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Updating...
                                    </>
                                ) : 'Change Password'}
                            </button>
                        </div>
                    </form>
                </div>

            </motion.div>
        </div>
    );
};

export default Profile;