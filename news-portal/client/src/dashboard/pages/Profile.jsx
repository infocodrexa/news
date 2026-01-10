import React, { useContext, useState, useEffect } from 'react';
import { FaImage, FaCloudUploadAlt, FaLock, FaUser, FaEnvelope, FaTag, FaUserShield, FaCog, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaSave } from "react-icons/fa"; 
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Profile = () => {
    const { store, dispatch } = useContext(storeContext);
    const user = store.userInfo;

    // --- STATES ---
    const [editMode, setEditMode] = useState(false); // Toggle Edit Mode
    const [loader, setLoader] = useState(false);
    
    // Password State
    const [pwState, setPwState] = useState({
        old_password: '',
        new_password: ''
    });

    // Profile Data State (For Edit Mode)
    const [userInfoState, setUserInfoState] = useState({
        name: '',
        description: '',
        facebook: '',
        twitter: '',
        instagram: ''
    });

    const [image, setImage] = useState('');
    const [imgPreview, setImgPreview] = useState('');

    // --- EFFECTS ---
    useEffect(() => {
        if (user) {
            setUserInfoState({
                name: user.name || '',
                description: user.description || '',
                facebook: user.social?.facebook || '',
                twitter: user.social?.twitter || '',
                instagram: user.social?.instagram || ''
            });
        }
    }, [user]);

    // --- HANDLERS ---
    const inputHandle = (e) => {
        setUserInfoState({ ...userInfoState, [e.target.name]: e.target.value });
    };

    const pwInputHandle = (e) => {
        setPwState({ ...pwState, [e.target.name]: e.target.value });
    };

    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            setImage(e.target.files[0]);
            setImgPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    // --- API CALLS ---

    // 1. Update Profile (ALL IN ONE ROUTE)
    const update_profile = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const formData = new FormData();
            formData.append('name', userInfoState.name);
            formData.append('description', userInfoState.description);
            formData.append('facebook', userInfoState.facebook);
            formData.append('twitter', userInfoState.twitter);
            formData.append('instagram', userInfoState.instagram);
            
            // Agar Image select ki hai, tabhi bhejo, nahi to mat bhejo
            if (image) {
                formData.append('image', image);
                formData.append('old_image', user.image); // Purani delete karne ke liye
            }

            // 👇 Ye wahi naya route hai jo humne banaya tha
            const { data } = await axios.post(`${base_url}/api/profile/update`, formData, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            });

            setLoader(false);
            toast.success(data.message);
            setEditMode(false); // Edit mode band
            
            // Context Update (Token me naya data hai)
            localStorage.setItem('newsToken', data.token);
            dispatch({ type: "login_success", payload: { token: data.token } });

        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Profile Update Failed");
        }
    };

    // 2. Change Password
    const change_password = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const { data } = await axios.post(`${base_url}/api/change-password`, pwState, {
                headers: { 'Authorization': `Bearer ${store.token}` }
            });
            setLoader(false);
            toast.success(data.message);
            setPwState({ old_password: '', new_password: '' });
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
                
                {/* --- 1. PROFILE CARD (View & Edit Logic) --- */}
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-8 relative'>
                    
                    {/* SETTINGS ICON */}
                    <div className='absolute top-4 right-4'>
                        <button 
                            onClick={() => setEditMode(!editMode)} 
                            className={`p-2 rounded-full transition-all shadow-sm ${editMode ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'}`}
                            title={editMode ? "Cancel Editing" : "Edit Profile"}
                        >
                            {editMode ? <FaTimes /> : <FaCog />}
                        </button>
                    </div>

                    <div className='flex flex-col items-center text-center'>
                        
                        {/* Image Logic */}
                        <div className='relative group w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-indigo-50 shadow-md mb-4'>
                            <img 
                                src={imgPreview || user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                alt="profile" 
                                className='w-full h-full object-cover' 
                            />
                            {/* Edit Mode me Image Upload Button Dikhega */}
                            {editMode && (
                                <>
                                    <label htmlFor="img" className='absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-black/60 transition-all'>
                                        <FaCloudUploadAlt className='text-2xl mb-1' />
                                        <span className='text-xs'>Change</span>
                                    </label>
                                    <input onChange={imageHandle} className='hidden' type="file" id='img' accept="image/*" />
                                </>
                            )}
                        </div>

                        {/* --- VIEW MODE --- */}
                        {!editMode ? (
                            <>
                                <h2 className='text-2xl font-bold text-gray-800'>{user?.name}</h2>
                                <span className='text-sm text-gray-500 mb-4 block'>{user?.email}</span>
                                
                                <div className='w-full text-left mt-4 space-y-4'>
                                    {/* Bio */}
                                    <div className='bg-gray-50 p-3 rounded-lg'>
                                        <p className='text-xs text-gray-400 font-bold uppercase'>Bio / Description</p>
                                        <p className='text-sm text-gray-700 mt-1 italic'>
                                            {user?.description || "No description added yet."}
                                        </p>
                                    </div>

                                    {/* Social Links Display */}
                                    <div className='flex gap-4 justify-center py-2'>
                                        {user?.social?.facebook ? <a href={user.social.facebook} target='_blank' rel="noreferrer" className='text-blue-600 text-xl hover:scale-110 transition-transform'><FaFacebook/></a> : <FaFacebook className='text-gray-300 text-xl'/>}
                                        {user?.social?.twitter ? <a href={user.social.twitter} target='_blank' rel="noreferrer" className='text-sky-500 text-xl hover:scale-110 transition-transform'><FaTwitter/></a> : <FaTwitter className='text-gray-300 text-xl'/>}
                                        {user?.social?.instagram ? <a href={user.social.instagram} target='_blank' rel="noreferrer" className='text-pink-600 text-xl hover:scale-110 transition-transform'><FaInstagram/></a> : <FaInstagram className='text-gray-300 text-xl'/>}
                                    </div>

                                    {/* Role & Category */}
                                    <div className='flex justify-between items-center border-t pt-4'>
                                        <div className='text-center w-1/2 border-r'>
                                            <p className='text-xs text-gray-400 font-bold uppercase'>Role</p>
                                            <p className='text-indigo-600 font-semibold capitalize'>{user?.role}</p>
                                        </div>
                                        <div className='text-center w-1/2'>
                                            <p className='text-xs text-gray-400 font-bold uppercase'>Category</p>
                                            <p className='text-indigo-600 font-semibold'>{user?.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // --- EDIT MODE (Form) ---
                            <form onSubmit={update_profile} className='w-full text-left mt-2 space-y-4 animate-fade-in'>
                                
                                {/* Name Input */}
                                <div>
                                    <label className='text-xs font-bold text-gray-500'>Name</label>
                                    <input onChange={inputHandle} value={userInfoState.name} name="name" type="text" className='w-full border rounded-md px-3 py-2 text-sm focus:outline-indigo-500 mt-1' />
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label className='text-xs font-bold text-gray-500'>Bio / Description</label>
                                    <textarea onChange={inputHandle} value={userInfoState.description} name="description" rows="3" className='w-full border rounded-md px-3 py-2 text-sm focus:outline-indigo-500 mt-1' placeholder="Tell us about yourself..."></textarea>
                                </div>

                                {/* Social Inputs */}
                                <div>
                                    <label className='text-xs font-bold text-gray-500 mb-1 block'>Social Links</label>
                                    <div className='space-y-2'>
                                        <div className='flex items-center gap-2'>
                                            <FaFacebook className='text-blue-600'/>
                                            <input onChange={inputHandle} value={userInfoState.facebook} name="facebook" type="text" placeholder="Facebook URL" className='w-full border rounded-md px-2 py-1 text-sm focus:outline-indigo-500' />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaTwitter className='text-sky-500'/>
                                            <input onChange={inputHandle} value={userInfoState.twitter} name="twitter" type="text" placeholder="Twitter URL" className='w-full border rounded-md px-2 py-1 text-sm focus:outline-indigo-500' />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaInstagram className='text-pink-600'/>
                                            <input onChange={inputHandle} value={userInfoState.instagram} name="instagram" type="text" placeholder="Instagram URL" className='w-full border rounded-md px-2 py-1 text-sm focus:outline-indigo-500' />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <button disabled={loader} className='w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 flex justify-center items-center gap-2'>
                                    {loader ? 'Saving...' : <><FaSave/> Save Changes</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* --- 2. CHANGE PASSWORD CARD (As it is) --- */}
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
                            <label className='text-sm font-semibold text-gray-700'>Current Password</label>
                            <input onChange={pwInputHandle} value={pwState.old_password} required type="password" name='old_password' className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none w-full' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700'>New Password</label>
                            <input onChange={pwInputHandle} value={pwState.new_password} required type="password" name='new_password' className='px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none w-full' />
                        </div>

                        <div className='pt-2'>
                            <button disabled={loader} className='w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md'>
                                {loader ? 'Updating...' : 'Change Password'}
                            </button>
                        </div>
                    </form>
                </div>

            </motion.div>
        </div>
    );
};

export default Profile;