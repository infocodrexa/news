import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { convert } from 'html-to-text' // Agar HTML tags hatane hain
import dateFormat from 'dateformat' // Agar date format karni hai (npm install dateformat)

const Details = () => {

    const { id } = useParams() // URL se ID nikali
    const { store } = useContext(storeContext)
    const [news, setNews] = useState(null)
    const [loader, setLoader] = useState(true)

    const get_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news/${id}`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            setNews(data.news)
            setLoader(false)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    useEffect(() => {
        get_news()
    }, [id])

    return (
        <div className='bg-slate-100 min-h-screen p-4 md:p-8'>
            {
                loader ? <div className='text-center text-2xl font-bold mt-10'>Loading...</div> : 
                (news ? (
                    <div className='bg-white p-5 rounded-md shadow-md max-w-4xl mx-auto'>
                        {/* Category & Date */}
                        <div className='flex justify-between items-center mb-4'>
                            <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold'>
                                {news.category}
                            </span>
                            <span className='text-gray-500 text-sm'>
                                {dateFormat(news.date, "mmmm dS, yyyy")}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                            {news.title}
                        </h1>

                        {/* Image */}
                        <div className='w-full h-[400px] mb-6 overflow-hidden rounded-md'>
                            <img 
                                src={news.image} 
                                alt={news.title} 
                                className='w-full h-full object-cover' 
                            />
                        </div>

                        {/* Author Info */}
                        <div className='flex items-center gap-x-3 mb-6 border-b pb-4'>
                            <div className='w-10 h-10 rounded-full bg-gray-300 overflow-hidden'>
                                {/* Agar writer ki image backend se aa rahi hai to wo lagao */}
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="author" />
                            </div>
                            <div>
                                <p className='text-gray-800 font-medium'>{news.writerName}</p>
                                <p className='text-gray-500 text-xs'>Writer</p>
                            </div>
                        </div>

                        {/* Description (Rich Text Content) */}
                        <div className='text-gray-700 leading-relaxed text-lg content-area' 
                             dangerouslySetInnerHTML={{__html: news.description}}>
                             {/* dangerouslySetInnerHTML isliye use kiya taaki Jodit Editor ka HTML style ke saath dikhe */}
                        </div>
                    </div>
                ) : <div className='text-center text-red-500'>News not found!</div>)
            }
        </div>
    )
}

export default Details