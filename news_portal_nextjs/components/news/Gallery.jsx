
import React from 'react'
import { base_api_url } from '../../config/config'

const Gallery = async () => {

    const res = await fetch(`${base_api_url}/api/images/news`, {
        next: { revalidate: 1 }
    })
    const { images } = await res.json()

    return (
        <div className="w-full flex flex-col gap-y-[14px]">
            <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
                Gallery
            </div>
            <div className="grid grid-cols-3 gap-2">
                {images && images.length > 0 && images.map((item, i) => {
                    const imgUrl = item.image.startsWith("http") 
                        ? item.image 
                        : `${base_api_url}/uploads/${item.image}`;

                    return (
                        <div key={i} className="w-full h-[85px] relative rounded-md overflow-hidden bg-gray-700">
                            <img
                                className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                                src={imgUrl}
                                alt={item.title || `News gallery image ${i + 1}`}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Gallery
