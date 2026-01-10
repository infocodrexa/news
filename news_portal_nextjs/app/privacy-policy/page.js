
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaShieldAlt, FaCookieBite, FaUserSecret, FaLock } from "react-icons/fa";

export const metadata = {
  title: "Privacy Policy - The Local Mirror | Data Protection & AdSense Compliance",
  description: "Official Privacy Policy of The Local Mirror. Learn how we handle your data, cookies, Google AdSense advertising, and user rights.",
};

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#f9fafb] min-h-screen py-8 md:py-12 px-3 md:px-8 font-sans">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border-t-4 border-[#c80000]">
          
          {/* Header Section */}
          <div className="bg-white p-6 md:p-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#c80000]">
              <FaShieldAlt className="text-2xl md:text-4xl" />
              <span className="uppercase tracking-widest font-bold text-xs md:text-sm">Legal & Compliance</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: <span className="font-semibold text-gray-700">01 January {currentYear}</span>
            </p>
          </div>

          {/* Content Section */}
          <div className="p-5 md:p-12 prose prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="lead text-lg md:text-xl text-gray-800 font-medium">
              At <strong>The Local Mirror</strong> (accessible from <a href="https://thelocalmirror.in" className="text-[#c80000] no-underline hover:underline break-words">https://thelocalmirror.in</a>), the privacy of our visitors is of extreme importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by The Local Mirror and how it is used.
            </p>

            <hr className="my-6 md:my-8 border-gray-200" />

            {/* 1. Consent */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaLock className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>1. Consent</span>
              </h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you do not agree with our policies, please do not use our services.
              </p>
            </div>

            {/* 2. Information Collection */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <p>
                We collect information in the following ways:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#c80000]">
                <li><strong>Voluntary Information:</strong> Name, Email address, and Phone number when you subscribe to our newsletter, fill out a form, or contact us.</li>
                <li><strong>Automatic Information (Logs):</strong> IP address, browser type, ISP, date/time stamp, referring/exit pages, and number of clicks. This data is used to analyze trends and administer the site.</li>
              </ul>
            </div>

            {/* 3. Cookies & Web Beacons */}
            <div className="mb-8 md:mb-10 bg-gray-50 p-5 md:p-6 rounded-lg border-l-4 border-[#c80000]">
              <h2 className="flex items-start md:items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-0">
                <FaCookieBite className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>3. Cookies and Web Beacons</span>
              </h2>
              <p className="mb-4 text-sm md:text-base">
                Like any other professional media website, <strong>The Local Mirror</strong> uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
              </p>
              <p className="text-sm md:text-base">
                The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </div>

            {/* 4. Google AdSense & DART Cookies */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">4. Google DoubleClick DART Cookie</h2>
              <p>
                Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <em>thelocalmirror.in</em> and other sites on the internet.
              </p>
              <p className="mt-4">
                However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#c80000] font-bold hover:underline break-words block mt-1">
                  https://policies.google.com/technologies/ads
                </a>
              </p>
            </div>

            {/* 5. Our Advertising Partners */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">5. Advertising Partners Privacy Policies</h2>
              <p>
                You may consult this list to find the Privacy Policy for each of the advertising partners of The Local Mirror. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on The Local Mirror.
              </p>
              <p className="mt-2 text-sm text-gray-500 italic">
                Note: The Local Mirror has no access to or control over these cookies that are used by third-party advertisers.
              </p>
            </div>

            {/* 6. GDPR & User Rights */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaUserSecret className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>6. GDPR & CCPA Data Protection Rights</span>
              </h2>
              <p>
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <li className="bg-gray-50 p-3 rounded"><strong>Right to Access</strong> – Request copies of your personal data.</li>
                <li className="bg-gray-50 p-3 rounded"><strong>Right to Rectification</strong> – Request correction of inaccurate information.</li>
                <li className="bg-gray-50 p-3 rounded"><strong>Right to Erasure</strong> – Request deletion of your personal data.</li>
                <li className="bg-gray-50 p-3 rounded"><strong>Right to Restrict Processing</strong> – Limit how we use your data.</li>
              </ul>
            </div>

            {/* 7. Children's Information */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">7. Children's Information</h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. The Local Mirror does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, please contact us immediately.
              </p>
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            {/* Contact Section */}
            <div className="bg-[#1e1919] text-white p-6 md:p-8 rounded-lg text-center overflow-hidden">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Have Questions?</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
              <a 
                href="mailto:thelocalmirror@gmail.com" 
                className="inline-block w-full md:w-auto bg-[#c80000] text-white font-bold py-3 px-4 md:px-8 rounded-full hover:bg-red-700 transition-all shadow-lg text-sm md:text-base break-words"
              >
                Email: thelocalmirror@gmail.com
              </a>
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
