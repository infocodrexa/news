import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NewContent from '../components/NewContent'
import storeContext from '../../context/storeContext'

// 👇 1. Yahan ({ newsStatus }) likhna zaroori hai
const News = ({ newsStatus }) => {

    const { store } = useContext(storeContext)
    
    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium capitalize'>
                    {/* 👇 2. Title ko dynamic bana diya (Pending News / Active News) */}
                    {newsStatus ? `${newsStatus} News` : 'All News'} 
                </h2>
                
                {
                    store.userInfo?.role === 'admin' ? 
                    <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/admin/news/create'>Create News</Link>
                    :
                    <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/news/create'>Create News</Link>
                }

            </div>

            {/* 👇 3. SABSE ZAROORI: Prop ko aage pass karo */}
            <NewContent newsStatus={newsStatus} />
            
        </div>
    )
}

export default News