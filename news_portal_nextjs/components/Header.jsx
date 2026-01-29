import React from "react";
import moment from "moment";
import { FaFacebookF } from "react-icons/fa";
import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { SiThreads } from "react-icons/si";
import bg_header from "../assets/header-bg.jpg";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link"; 
import Header_Category from "./Header_Category";

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="px-5 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc] py-0.5">
        <span className="text-[11px] sm:text-[12px] font-medium">
          {moment().format("LLLL")}
        </span>

        <div className="flex gap-x-1.5 py-0.5">
          <a className="w-[28px] h-[26px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm" target="_blank" href="https://www.facebook.com/share/1DAyfVm8Uo/">
            <FaFacebookF size={12} />
          </a>
          <a className="w-[28px] h-[26px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm" target="_blank" href="https://x.com/TheLocalMirror?s=20">
            <AiOutlineTwitter size={14} />
          </a>
          <a className="w-[28px] h-[26px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm" target="_blank" href="https://www.instagram.com/thelocalmirror">
            <AiFillInstagram size={14} />
          </a>
          <a className="w-[28px] h-[26px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm" target="_blank" href="https://www.threads.net/@thelocalmirror">
            <SiThreads size={12} />
          </a>
          <a className="w-[28px] h-[26px] flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm" target="_blank" href="https://www.youtube.com/@TheLocalMirror">
            <AiFillYoutube size={14} />
          </a>
        </div>
      </div>

      {/* Main Logo Section */}
      <div style={{ backgroundImage: `url(${bg_header.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="px-8 py-1.5"> 
          <div className='flex justify-center items-center'>
            <div className='w-full flex justify-center'>
              <Link href="/" aria-label="Go to Home">
                <Image
                  className="w-[140px] h-auto object-contain cursor-pointer"
                  alt="The Local Mirror Logo"
                  src={logo}
                  width={140}
                  height={140}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Header_Category />
    </header>
  );
};

export default Header;
