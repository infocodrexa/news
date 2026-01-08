import React from 'react'
import Link from 'next/link'
import { base_api_url } from '@/config/config'

const SimpleNewsCard = ({ item, type }) => {

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400";
    if (img.startsWith("http")) return img;
    return `${base_api_url}/uploads/${img}`;
  };

  return (
    <div className='group relative'>
      <div className='overflow-hidden'>

        {/* ✅ IMAGE AREA ONLY */}
        <div
          className={`${type ? 'h-[270px] sm:h-[470px]' : 'h-[228px]'}
          w-full group-hover:scale-[1.1] transition-all duration-[1s] relative`}
        >
          <img
            src={getImageUrl(item?.image)}
            alt="images"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* ✅ ONLY IMAGE CLICKABLE (no layout effect) */}
          <Link
            href={`/news/${item?.slug}`}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* overlay – hover ke liye, click block nahi karega */}
      <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white opacity-5 transition-all duration-300 pointer-events-none'></div>

      {/* ✅ BADGES & TEXT – UNCHANGED */}
      <div className='left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2'>
        <div className='px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]'>
          {item?.category}
        </div>

        <Link href={`/news/${item?.slug}`} className='text-xl'>
          {item?.title}
        </Link>

        <div className='flex gap-x-2 text-sm font-normal'>
          <span>{item?.date}</span>
          <span>{item?.writerName}</span>
        </div>
      </div>
    </div>
  )
}

export default SimpleNewsCard;
