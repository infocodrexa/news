import Footer from "../../components/Footer";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie,
  FaNewspaper,
  FaBullhorn,
  FaHandshake,
} from "react-icons/fa";

export const metadata = {
  title:
    "Contact Us - The Local Mirror | Editorial, Advertising & Grievance Redressal",
  description:
    "Contact The Local Mirror team. Reach out for news tips, advertising inquiries, or grievance redressal. Head office in Begusarai, Bihar.",
};

export default function Contact() {
  return (
    <>
      <div className="bg-[#f9fafb] min-h-screen font-sans">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 py-12 md:py-16 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Thank you for your interest in <strong>The Local Mirror</strong>.
            Whether you have a breaking news tip, a correction, or an
            advertising inquiry, our team is ready to assist you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Primary Contact Cards (Top Row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Head Office */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border-t-4 border-[#c80000] hover:shadow-lg transition-all text-center group">
              <div className="bg-red-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-[#c80000] group-hover:bg-[#c80000] group-hover:text-white transition-colors">
                <FaMapMarkerAlt size={24} className="md:text-[28px]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Head Office
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                The Local Mirror
                <br />
                NH 31, Harpur Chowk, Near Toyota Showroom
                <br />
                Begusarai, Bihar - 851101
              </p>
            </div>

            {/* Card 2: Phone & WhatsApp - Fixed for Single Line */}
            {/* Card 2: Phone & WhatsApp */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border-t-4 border-[#c80000] hover:shadow-lg transition-all text-center group flex flex-col items-center">
              <div className="bg-red-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-[#c80000] group-hover:bg-[#c80000] group-hover:text-white transition-colors shrink-0">
                <FaPhoneAlt size={24} className="md:text-[28px]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Phone & WhatsApp
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Available: Mon-Sat, 10am - 8pm
              </p>

              {/* Container with extra protection for tablet 768px */}
              <div className="w-full flex justify-center overflow-hidden">
                <a
                  href="tel:+919117541137"
                  className="text-[17px] xs:text-[19px] sm:text-[20px] md:text-[21px] lg:text-3xl font-bold text-gray-800 hover:text-[#c80000] transition-colors block whitespace-nowrap tracking-tighter"
                >
                  +91 9117541137
                </a>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                (News Tips & Business)
              </p>
            </div>

            {/* Card 3: General Email */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border-t-4 border-[#c80000] hover:shadow-lg transition-all text-center group">
              <div className="bg-red-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-[#c80000] group-hover:bg-[#c80000] group-hover:text-white transition-colors">
                <FaEnvelope size={24} className="md:text-[28px]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Email Us
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Response time: Within 24 hours
              </p>
              <a
                href="mailto:thelocalmirror@gmail.com"
                className="text-lg md:text-xl font-bold text-gray-800 hover:text-[#c80000] transition-colors break-all"
              >
                thelocalmirror@gmail.com
              </a>
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="h-1 flex-1 bg-gray-200 rounded"></div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide text-center">
              Departments
            </h2>
            <div className="h-1 flex-1 bg-gray-200 rounded"></div>
          </div>

          {/* Secondary Grid (Departments) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Grievance Officer */}
            <div className="bg-red-50 p-5 md:p-8 rounded-xl border border-red-100 flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
              <div className="bg-white p-3 md:p-4 rounded-lg text-[#c80000] shadow-sm mt-1 shrink-0">
                <FaUserTie size={24} className="md:text-[32px]" />
              </div>
              <div className="w-full">
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Grievance Officer
                </h4>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  In compliance with the IT Rules 2021, if you have any
                  complaints regarding content, copyright, or fake news, please
                  contact our designated officer.
                </p>
                <div className="bg-white bg-opacity-60 p-3 rounded-lg w-full">
                  <p className="font-bold text-gray-800 text-sm md:text-base">
                    Designation: Compliance Head
                  </p>
                  <p className="font-medium text-[#c80000] break-all text-sm md:text-base">
                    Email: thelocalmirror@gmail.com
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Subject: "Grievance Complaint"
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Team */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 md:gap-6 items-start hover:border-gray-300 transition">
              <div className="bg-gray-100 p-3 md:p-4 rounded-lg text-gray-700 mt-1 shrink-0">
                <FaNewspaper size={24} className="md:text-[32px]" />
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Editorial Team
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  For sharing press releases, submitting news tips, requesting
                  fact-checks, or reporting corrections.
                </p>
                <a
                  href="mailto:thelocalmirror@gmail.com"
                  className="text-[#c80000] font-bold hover:underline text-sm md:text-base break-all"
                >
                  thelocalmirror@gmail.com
                </a>
              </div>
            </div>

            {/* Advertising */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 md:gap-6 items-start hover:border-gray-300 transition">
              <div className="bg-gray-100 p-3 md:p-4 rounded-lg text-gray-700 mt-1 shrink-0">
                <FaBullhorn size={24} className="md:text-[32px]" />
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Advertising & Sales
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Grow your brand with us. For website banner ads, sponsored
                  articles, and election campaigns.
                </p>
                <a
                  href="mailto:thelocalmirror@gmail.com"
                  className="text-[#c80000] font-bold hover:underline text-sm md:text-base break-all"
                >
                  thelocalmirror@gmail.com
                </a>
              </div>
            </div>

            {/* Partnerships */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 md:gap-6 items-start hover:border-gray-300 transition">
              <div className="bg-gray-100 p-3 md:p-4 rounded-lg text-gray-700 mt-1 shrink-0">
                <FaHandshake size={24} className="md:text-[32px]" />
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Careers & Partners
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Want to join The Local Mirror as a reporter or stringer? Or
                  looking for media partnerships?
                </p>
                <a
                  href="mailto:thelocalmirror@gmail.com"
                  className="text-[#c80000] font-bold hover:underline text-sm md:text-base break-all"
                >
                  thelocalmirror@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-xs md:text-sm">
              For immediate assistance, we recommend using WhatsApp or Email. We
              usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
