
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
// Icons
import { FaFacebookF, FaChevronRight, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { SiThreads } from "react-icons/si";
// Components
import RecentNewsFooter from "./news/RecentNewsFooter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="w-full bg-[#1e1919] text-[#d0d2d6] font-sans">
      
      {/* Top Footer Section */}
      <div className="px-4 md:px-8 py-12 w-full gap-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        
        {/* Column 1: Brand & Contact Info */}
        <div className="w-full flex flex-col gap-y-6">
          <div className="relative w-[220px] h-[70px]">
            <Link href="/" aria-label="Go to Homepage">
              <Image
                src={logo}
                alt="The Local Mirror - Bihar's Trusted News Portal"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 220px"
                className="object-contain object-left"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-y-4">
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              <strong>The Local Mirror</strong> brings you the latest breaking news from Bihar, India, and the world. We stand for unbiased journalism and ground-level reporting.
            </p>
            
            <div className="flex flex-col gap-y-2 text-sm mt-2">
               <div className="flex items-start gap-3">
                 <FaMapMarkerAlt className="text-[#c80000] mt-1 shrink-0" aria-hidden="true" />
                 <span>NH 31, Begusarai, Bihar - 851101</span>
               </div>
               <div className="flex items-center gap-3">
                 <FaEnvelope className="text-[#c80000] shrink-0" aria-hidden="true" />
                 <a href="mailto:thelocalmirror@gmail.com" className="hover:text-white transition-colors">thelocalmirror@gmail.com</a>
               </div>
               <div className="flex items-center gap-3">
                 <FaPhoneAlt className="text-[#c80000] shrink-0" aria-hidden="true" />
                 <a href="tel:+919117541137" className="hover:text-white transition-colors">+91 91175 41137</a>
               </div>
            </div>
          </div>
        </div>

        {/* Column 2: Legal & Important Links (Shifted here) */}
        <div className="w-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white relative pl-3 border-l-4 border-[#c80000]">
                Company & Legal
            </h3>
          </div>
          <ul className="flex flex-col gap-y-3 text-sm text-gray-400">
                    <li>
              <Link href="/" className="hover:text-[#c80000] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <FaChevronRight size={10} aria-hidden="true" /> Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#c80000] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <FaChevronRight size={10} aria-hidden="true" /> About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#c80000] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <FaChevronRight size={10} aria-hidden="true" /> Contact & Grievance
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[#c80000] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <FaChevronRight size={10} aria-hidden="true" /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-[#c80000] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <FaChevronRight size={10} aria-hidden="true" /> Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-[#c80000] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                <FaChevronRight size={10} aria-hidden="true" /> Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Recent News (Now in 3rd column) */}
        <div className="w-full">
           <RecentNewsFooter />
        </div>

      </div>

      {/* Bottom Bar */}
 {/* Bottom Bar */}
<div className="bg-[#262323] border-t border-gray-800">
  <div className="px-4 md:px-8 py-6 flex flex-col items-center gap-6 justify-between lg:flex-row">
    
    {/* Copyright Text Section */}
    <div className="flex flex-col items-center gap-y-3 text-gray-500 text-sm text-center lg:flex-row lg:gap-x-4 lg:text-left">
      <p>
        Copyright © {currentYear} <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">The Local Mirror</Link>. All Rights Reserved.
      </p>
      <span className="hidden lg:block text-gray-600">|</span>
      <p className="flex gap-1 justify-center">
        Developed by
        <a href="https://codrexa.in/" target="_blank" rel="noopener noreferrer" className="text-[#c80000] hover:text-white transition-colors font-bold">
          Codrexa
        </a>
      </p>
    </div>

    {/* Social Icons Section - Fix for Overlap */}
    <div className="flex gap-3 flex-wrap justify-center items-center max-w-full">
      <SocialLink href="https://www.facebook.com/share/1DAyfVm8Uo/" icon={<FaFacebookF />} label="Follow us on Facebook" />
      <SocialLink href="https://x.com/TheLocalMirror" icon={<AiOutlineTwitter />} label="Follow us on X (Twitter)" />
      <SocialLink href="https://www.instagram.com/thelocalmirror" icon={<AiFillInstagram />} label="Follow us on Instagram" />
      <SocialLink href="https://www.threads.net/@thelocalmirror" icon={<SiThreads />} label="Follow us on Threads" />
      <SocialLink href="https://www.youtube.com/@TheLocalMirror" icon={<AiFillYoutube />} label="Subscribe to our YouTube Channel" />
    </div>

  </div>
</div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    className="w-[36px] h-[36px] text-white flex justify-center items-center bg-gray-700 hover:bg-[#c80000] rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-md"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;
