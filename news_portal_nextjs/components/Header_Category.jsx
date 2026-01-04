
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { BsList } from 'react-icons/bs'
import { base_api_url } from '../config/config'

const Header_Category = () => {
    const router = useRouter()
    const path = usePathname()
    const [state, setState] = useState('')
    const [categories, set_categories] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [mobileMenuShow, setMobileMenuShow] = useState(false)

    const get_categories = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/category/all`)
            const data = await res.json()
            set_categories(data.categories || [])
        } catch (error) {
            console.log("Fetch Error:", error)
        }
    }

    useEffect(() => {
        get_categories()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (state.trim()) {
            router.push(`/search/news?value=${state}`)
            setState('')
            setShowSearch(false)
        }
    }

    return (
        <div className='w-full font-sans sticky top-0 z-[100]'>
            {/* 🔴 Headline Bar - Yeh hamesha RED rahega */}
            <div className='bg-[#c80000] w-full text-white uppercase font-semibold relative shadow-md'>
                <div className='px-4 md:px-8 flex justify-between items-center h-[52px]'>
                    
                    {/* 📱 Mobile Menu Icon */}
                    <div 
                        onClick={() => {
                            setMobileMenuShow(!mobileMenuShow)
                            setShowSearch(false)
                        }} 
                        className='lg:hidden flex items-center gap-1 cursor-pointer p-2 rounded-md active:bg-black/20'
                    >
                        {mobileMenuShow ? <IoClose size={24} /> : <BsList size={24} />}
                        <span className='text-[10px]'>Menu</span>
                    </div>

                    {/* 💻 Desktop Menu */}
                    <div className='hidden lg:flex items-center flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide'>
                        <Link 
                            className={`px-5 py-[15px] border-b-4 border-transparent hover:bg-black/10 transition-all ${path === '/' ? 'border-white bg-black/10' : ''}`} 
                            href={'/'}
                        >
                            Home
                        </Link>
                        {categories?.length > 0 && categories.map((c, i) => (
                            <Link 
                                key={i} 
                                className={`px-5 py-[15px] border-b-4 border-transparent hover:bg-black/10 transition-all ${decodeURIComponent(path).includes(c.category) ? 'border-white bg-black/10' : ''}`} 
                                href={`/news/category/${c.category}`}
                            >
                                {c.category}
                            </Link>
                        ))}
                    </div>

                    {/* 🔍 Search Icon */}
                    <div className='flex items-center'>
                        <div 
                            onClick={() => {
                                setShowSearch(!showSearch)
                                setMobileMenuShow(false)
                            }} 
                            className={`text-xl p-4 cursor-pointer hover:bg-black/10 rounded-md transition-all`}
                        >
                            {showSearch ? <IoClose /> : <AiOutlineSearch />}
                        </div>
                    </div>
                </div>

                {/* 🔎 Search Bar Dropdown (White Background for clarity) */}
                <div className={`absolute left-0 right-0 top-[52px] w-full bg-white shadow-2xl z-[60] p-4 transition-all duration-300 ${showSearch ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}`}>
                    <form onSubmit={handleSearch} className='max-w-[800px] mx-auto flex border-2 border-[#c80000] rounded-lg overflow-hidden shadow-sm'>
                        <input 
                            value={state} 
                            required 
                            onChange={(e) => setState(e.target.value)} 
                            type="text" 
                            placeholder='Search news...' 
                            className='flex-1 p-3 text-slate-800 outline-none bg-transparent' 
                        />
                        <button className='px-6 bg-[#c80000] text-white hover:bg-red-700 transition-all'>
                            <AiOutlineSearch size={24} />
                        </button>
                    </form>
                </div>

                {/* ⚪ Mobile Categories - Niche khulne par WHITE Background */}
                <div className={`absolute left-0 right-0 top-[52px] w-full bg-white z-[55] shadow-2xl lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuShow ? 'max-h-[60vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
                    <div className='flex flex-col border-t border-slate-100 overflow-y-auto max-h-[55vh]'>
                        <Link 
                            onClick={() => setMobileMenuShow(false)} 
                            className={`p-4 text-sm font-bold border-b border-slate-50 transition-colors active:bg-slate-100 ${path === '/' ? 'text-[#c80000] bg-slate-50' : 'text-slate-700'}`} 
                            href={'/'}
                        >
                            Home
                        </Link>
                        {categories.map((c, i) => (
                            <Link 
                                key={i}
                                onClick={() => setMobileMenuShow(false)} 
                                className={`p-4 text-sm font-bold border-b border-slate-50 transition-colors active:bg-slate-100 ${decodeURIComponent(path).includes(c.category) ? 'text-[#c80000] bg-slate-50' : 'text-slate-700'}`} 
                                href={`/news/category/${c.category}`}
                            >
                                {c.category}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header_Category;