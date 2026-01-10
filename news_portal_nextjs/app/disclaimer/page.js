import Footer from "@/components/Footer";
import Link from "next/link";
import { FaExclamationCircle, FaExternalLinkAlt, FaUserMd, FaMoneyBillWave, FaBalanceScale } from "react-icons/fa";

export const metadata = {
  title: "Disclaimer - The Local Mirror | AdSense & Content Liability",
  description: "Read the Disclaimer of The Local Mirror. Information regarding content accuracy, external links, and Google AdSense advertisements.",
};

export default function Disclaimer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#f9fafb] min-h-screen py-8 md:py-12 px-3 md:px-8 font-sans">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border-t-4 border-[#c80000]">
          
          {/* Header Section */}
          <div className="bg-white p-6 md:p-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#c80000]">
              <FaExclamationCircle className="text-2xl md:text-4xl" />
              <span className="uppercase tracking-widest font-bold text-xs md:text-sm">Legal Notice</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Disclaimer
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: <span className="font-semibold text-gray-700">01 January 2026</span>
            </p>
          </div>

          {/* Content Section */}
          <div className="p-5 md:p-12 prose prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="lead text-lg md:text-xl text-gray-800 font-medium">
              If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at <a href="mailto:thelocalmirror@gmail.com" className="text-[#c80000] no-underline hover:underline break-words">thelocalmirror@gmail.com</a>.
            </p>

            <hr className="my-6 md:my-8 border-gray-200" />

            {/* 1. General Info */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaBalanceScale className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>1. Disclaimers for The Local Mirror</span>
              </h2>
              <p>
                All the information on this website – <a href="https://thelocalmirror.in" className="text-[#c80000] break-words">https://thelocalmirror.in</a> – is published in good faith and for general information purpose only.
              </p>
              <p>
                <strong>The Local Mirror</strong> does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk. We will not be liable for any losses and/or damages in connection with the use of our website.
              </p>
            </div>

            {/* 2. External Links */}
            <div className="mb-8 md:mb-10 bg-gray-50 p-5 md:p-6 rounded-lg border-l-4 border-[#c80000]">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-0">
                <FaExternalLinkAlt className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>2. External Links Disclaimer</span>
              </h2>
              <p className="mb-2 text-sm md:text-base">
                From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites.
              </p>
              <p className="text-sm md:text-base">
                These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice.
              </p>
            </div>

            {/* 3. Professional Advice */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaUserMd className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>3. Not Professional Advice</span>
              </h2>
              <p>
                The information available on The Local Mirror (including political analysis, health news, or legal updates) is for general news reporting purposes only and should not be taken as professional advice.
              </p>
              <p>
                Always consult with a qualified professional (Doctor, Lawyer, or Financial Advisor) before making decisions based on news reports.
              </p>
            </div>

            {/* 4. Advertisement (AdSense) */}
            <div className="mb-8 md:mb-10">
              <h2 className="flex items-start md:items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <FaMoneyBillWave className="text-[#c80000] text-xl mt-1 md:mt-0 flex-shrink-0" /> 
                <span>4. Advertisement Disclosure</span>
              </h2>
              <p>
                This website uses <strong>Google AdSense</strong> to display advertisements. Google uses cookies to serve ads based on a user's prior visits to your website or other websites.
              </p>
              <p>
                We do not endorse the products or services advertised in these third-party ads. The Local Mirror is not responsible for the claims made in advertisements appearing on the website.
              </p>
            </div>

            {/* 5. Opinions */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">5. Opinions & Views</h2>
              <p>
                The views and opinions expressed in "Opinion" or "Op-Ed" articles are those of the authors and do not necessarily reflect the official policy or position of The Local Mirror.
              </p>
            </div>

            {/* 6. Consent */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">6. Consent</h2>
              <p>
                By using our website, you hereby consent to our disclaimer and agree to its terms.
              </p>
            </div>

            {/* 7. Update */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">7. Update</h2>
              <p>
                Should we update, amend or make any changes to this document, those changes will be prominently posted here.
              </p>
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            {/* Contact Section */}
            <div className="bg-[#1e1919] text-white p-6 md:p-8 rounded-lg text-center overflow-hidden">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Contact Us</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                If you have any questions regarding this Disclaimer, please contact us.
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
