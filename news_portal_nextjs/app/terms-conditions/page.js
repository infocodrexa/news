

import Link from "next/link";
import { FaGavel, FaHandshake, FaExclamationTriangle, FaCopyright, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Terms & Conditions - The Local Mirror | User Agreement & Legal Info",
  description: "Read the Terms and Conditions of The Local Mirror. By using our news portal, you agree to our policies regarding content usage, copyright, and user conduct.",
};

export default function TermsConditions() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#f9fafb] min-h-screen py-8 md:py-12 px-3 md:px-8 font-sans">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border-t-4 border-[#c80000]">
          
          {/* Header Section */}
          <div className="bg-white p-6 md:p-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#c80000]">
              <FaGavel className="text-2xl md:text-4xl" />
              <span className="uppercase tracking-widest font-bold text-xs md:text-sm">Legal Agreement</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Terms and Conditions
            </h1>
            <p className="text-gray-500 text-sm">
              Effective Date: <span className="font-semibold text-gray-700">01 January {currentYear}</span>
            </p>
          </div>

          {/* Content Section */}
          <div className="p-5 md:p-12 prose prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="lead text-lg md:text-xl text-gray-800 font-medium">
              Welcome to <strong>The Local Mirror</strong>! These terms and conditions outline the rules and regulations for the use of The Local Mirror's Website, located at <a href="https://thelocalmirror.in" className="text-[#c80000] no-underline hover:underline break-words">https://thelocalmirror.in</a>.
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use The Local Mirror if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <hr className="my-6 md:my-8 border-gray-200" />

            {/* 1. Intellectual Property */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaCopyright className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>1. Intellectual Property Rights</span>
              </h2>
              <p>
                Unless otherwise stated, <strong>The Local Mirror</strong> and/or its licensors own the intellectual property rights for all material on this website (including news articles, images, videos, and graphics). All intellectual property rights are reserved.
              </p>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg border-l-4 border-gray-300 mt-4">
                <strong className="block text-gray-900 mb-2">You must not:</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Republish material from The Local Mirror without proper credit/backlink.</li>
                  <li>Sell, rent, or sub-license material from The Local Mirror.</li>
                  <li>Reproduce, duplicate, or copy material from The Local Mirror for commercial use.</li>
                  <li>Redistribute content from The Local Mirror.</li>
                </ul>
              </div>
            </div>

            {/* 2. User Content & Comments */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaHandshake className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>2. User Comments & Content</span>
              </h2>
              <p>
                Parts of this website offer an opportunity for users to post and exchange opinions (e.g., Comments Section). The Local Mirror does not filter, edit, publish, or review Comments prior to their presence on the website.
              </p>
              <p>
                However, <strong>The Local Mirror</strong> reserves the right to monitor all Comments and to remove any that are inappropriate or offensive.
              </p>
            </div>

            {/* 3. News Accuracy Disclaimer */}
            <div className="mb-8 md:mb-10 bg-red-50 p-5 md:p-6 rounded-lg border-l-4 border-[#c80000]">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-0">
                <FaExclamationTriangle className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>3. News Content Disclaimer</span>
              </h2>
              <p className="mb-2 text-sm md:text-base">
                The news and information provided on <strong>The Local Mirror</strong> is for general informational purposes only. While we strive to provide up-to-date and accurate information (fact-checking), we make no representations or warranties about completeness or accuracy.
              </p>
              <p className="text-sm md:text-base font-medium">
                Any reliance you place on such information is strictly at your own risk.
              </p>
            </div>

            {/* 4. Hyperlinking */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">4. Hyperlinking to our Content</h2>
              <p>
                The following organizations may link to our Website without prior written approval:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
              </ul>
            </div>

            {/* 5. iFrames */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">5. iFrames</h2>
              <p>
                Without prior approval, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
              </p>
            </div>

            {/* 6. Governing Law */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaMapMarkerAlt className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>6. Governing Law & Jurisdiction</span>
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes will be subject to the exclusive jurisdiction of the courts of <strong>Bihar, India</strong>.
              </p>
            </div>

            {/* 7. Changes to Terms */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. By continuing to use our Service after revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            {/* Contact Section */}
            <div className="bg-[#1e1919] text-white p-6 md:p-8 rounded-lg text-center">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Contact Us regarding Legal Matters</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                If you have any questions about our Terms and Conditions, please contact us.
              </p>
              <a 
                href="mailto:thelocalmirror@gmail.com" 
                className="inline-block bg-[#c80000] text-white font-bold py-3 px-6 md:px-8 rounded-full hover:bg-red-700 transition-all shadow-lg text-sm md:text-base"
              >
                Email Us: thelocalmirror@gmail.com
              </a>
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
