import React from "react";
import moment from "moment";
import { FaFacebookF } from "react-icons/fa";
// AiFillInstagram add kiya gaya
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
// SiThreads add kiya gaya
import { SiThreads } from "react-icons/si";
import bg_header from "../assets/header-bg.jpg";
import logo from "../assets/logo.png";
import adver_image from "../assets/sample-add.jpg";
import Image from "next/image";
import Header_Category from "./Header_Category";

const Header = () => {
  return (
    <div>
      <div className="px-5 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc] py-1">
        <span className="text-[13px] font-medium">
          {moment().format("LLLL")}
        </span>

        {/* gap-x-2 se icons ke beech me barabar gap aa jayega */}
        <div className="flex gap-x-2 py-1">
          {/* Facebook */}
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm"
            target="_blank"
            href="https://www.facebook.com/share/1DAyfVm8Uo/"
          >
            <FaFacebookF />
          </a>

          {/* Twitter */}
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm"
            target="_blank"
            href="https://x.com/TheLocalMirror?s=20"
          >
            <AiOutlineTwitter />
          </a>

          {/* Instagram */}
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm"
            target="_blank"
            href="https://www.instagram.com/thelocalmirror"
          >
            <AiFillInstagram />
          </a>

          {/* Threads */}
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm"
            target="_blank"
            href="https://www.threads.net/@thelocalmirror"
          >
            <SiThreads size={14} />
          </a>

          {/* Youtube */}
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm"
            target="_blank"
            href="https://www.youtube.com/@TheLocalMirror"
          >
            <AiFillYoutube />
          </a>
        </div>
      </div>
      {/* <div
        style={{
          backgroundImage: `url(${bg_header.src})`,
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 py-14">
          <div className="flex justify-center items-center flex-wrap">
            <div className="md:w-4/12 w-full">
              <div className="flex flex-col justify-center items-center md:items-start">
                <Image className="w-[200px] h-[100px]" alt="logo" src={logo} />
              </div>
            </div>
            <div className="md:w-8/12 w-full hidden md:block">
              <div className="w-full flex justify-end">
                <Image src={adver_image} alt="advertisement" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ backgroundImage: `url(${bg_header.src})`, backgroundSize: 'cover' }}>
    <div className="px-8 py-10">
        <div className='flex justify-center items-center flex-wrap gap-y-4'>
            
            {/* Logo Section: SEO Optimized */}
            <div className='md:w-4/12 w-full'>
                <div className='flex flex-col justify-center items-center md:items-start'>
                    <Image 
                        className='w-[200px] h-auto' 
                        alt='Codrexa AI Resume Analyzer Logo' 
                        src={logo} 
                        priority 
                    />
                </div>
            </div>

            {/* Advertisement Section: Balanced & Controlled */}
            <div className='md:w-8/12 w-full hidden md:flex justify-end'>
                <div className='max-w-[680px] w-full overflow-hidden'>
                    <Image 
                        src={adver_image} 
                        alt="advertisement placement" 
                        className='w-full h-auto object-contain'
                        placeholder="blur" 
                        blurDataURL={adver_image.src}
                    />
                </div>
            </div>

        </div>
    </div>
</div>
      <Header_Category />
    </div>
  );
};

export default Header;
