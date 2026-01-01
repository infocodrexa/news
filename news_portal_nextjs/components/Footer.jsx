import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import Category from "./Category";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { SiThreads } from "react-icons/si"; 
import Gallery from "./news/Gallery";
import RecentNewsFooter from "./news/RecentNewsFooter";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-[#1e1919]">
        <div className="px-4 md:px-8 py-10 w-full gap-12 grid lg:grid-cols-4 grid-cols-1">
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-[20px]">
              {/* Logo Container */}
              <div className="relative w-[200px] h-[60px] md:w-[250px] md:h-[80px]">
                <Image
                  src={logo}
                  alt="logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>

              {/* About Text */}
              <div className="flex flex-col gap-y-4">
                <p className="text-slate-300 text-sm leading-relaxed text-justify">
                  The Local Mirror is a premier news portal dedicated to delivering accurate, timely, and unbiased information. We focus on ground-level reporting from Bihar covering Begusarai, Patna, and Samastipur while bringing you significant national and international updates.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed text-justify">
                  Our platform spans diverse categories, including Education, Technology, Sports, and Health, ensuring our readers stay informed about every vital trend. Committed to transparency, we serve as a clear mirror to society.
                </p>
              </div>
            </div>
          </div>

          <Gallery />

          <div>
            <Category categories={[]} titleStyle="text-white" />
          </div>

          <RecentNewsFooter />
        </div>
      </div>

      <div className="bg-[#262323]">
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Left Side: Copyright & Developer Link */}
          <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-1 items-center md:items-start text-gray-400 text-sm">
            <div className="flex gap-x-1">
              <span>Copyright © 2026</span>
              <Link href={"/"} className="hover:text-white transition-all">
                The Local Mirror
              </Link>
            </div>
            <span className="hidden md:block text-gray-600">|</span>
            <div className="flex gap-x-1">
              <span>Developed by</span>
              <a 
                href="https://codrexa.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-red-500 hover:text-white transition-all font-medium"
              >
                Codrexa
              </a>
            </div>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex gap-x-2 flex-wrap justify-center">
            <SocialLink href="https://www.facebook.com/share/1DAyfVm8Uo/" icon={<FaFacebookF />} />
            <SocialLink href="https://x.com/TheLocalMirror?s=20" icon={<AiOutlineTwitter />} />
            <SocialLink href="https://www.instagram.com/thelocalmirror" icon={<AiFillInstagram className="text-xl" />} />
            <SocialLink href="https://www.threads.net/@thelocalmirror" icon={<SiThreads className="text-lg" />} />
            <SocialLink href="https://www.youtube.com/@TheLocalMirror" icon={<AiFillYoutube />} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b] hover:bg-[#c80000] transition-all rounded-sm"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

export default Footer;