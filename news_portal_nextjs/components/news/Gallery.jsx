import React from 'react'
import Link from 'next/link'
import { base_api_url } from '../../config/config'

const Gallery = async () => {

    const res = await fetch(`${base_api_url}/api/images/news`, {
        next: {
            revalidate: 1
        }
    })

    const { images } = await res.json()

    // ✅ Image URL Helper Function
    const getImageUrl = (img) => {
        if (!img) return "https://via.placeholder.com/150";
        if (img.startsWith("http") || img.startsWith("https")) return img;
        return `${base_api_url}/uploads/${img}`;
    };

    return (
        <div className="w-full flex flex-col gap-y-[14px]">
            <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
                Gallery
            </div>
            <div className="grid grid-cols-3 gap-2">
                {images && images.length > 0 && images.map((item, i) => (
                    <div key={i} className="w-full h-[85px] relative">
                        {/* ✅ Style Fix: 'absolute w-full h-full' lagaya taaki layout="fill" jaisa hi dikhe */}
                        <img
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={getImageUrl(item.image)}
                            alt="images"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery
