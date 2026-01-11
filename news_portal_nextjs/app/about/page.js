import Link from "next/link";
import { FaUserTie, FaBuilding, FaCheckCircle, FaBalanceScale, FaMapMarkedAlt } from "react-icons/fa";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us - The Local Mirror | National & Regional News Network",
  description: "The Local Mirror is a leading digital news platform covering Bihar and National news. We provide unbiased, ground-level reporting from every district of Bihar to New Delhi.",
  keywords: "The Local Mirror, About Us, Bihar News, National News India, Independent Journalism, Media House",
};

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      
      {/* Hero Section */}
      <div className="bg-[#1e1919] text-white py-16 px-6 text-center border-b-4 border-[#c80000]">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">About Us</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto italic leading-relaxed">
          "Connecting the grassroots of Bihar to the heartbeat of the Nation."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Area (Left) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Who We Are */}
          <section>
            <div className="flex items-center gap-3 mb-4">
               <FaBuilding className="text-[#c80000] text-2xl" />
               <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
            </div>
            <div className="text-lg leading-relaxed text-gray-700 space-y-4 text-justify">
              <p>
                <strong>The Local Mirror</strong> is a fast-growing digital news media platform committed to delivering the truth. Founded with a vision to become the voice of Bihar, we have evolved into a trusted source for stories that impact the entire nation.
              </p>
              <p>
                From the local lanes of <strong>Bihar</strong> to the corridors of <strong>Parliament in New Delhi</strong>, our dedicated team of journalists and stringers works tirelessly to ensure that no important story goes unreported. We firmly believe in <strong>"Journalism of Courage"</strong>—unbiased, fearless, and strictly rooted in facts.
              </p>
            </div>
          </section>

          {/* Coverage Area */}
          <section className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
               <FaMapMarkedAlt className="text-blue-600 text-2xl" />
               <h3 className="text-2xl font-bold text-gray-900">Our Reach & Coverage</h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We are not limited to a single city. Our reporting network has a strong presence across multiple regions:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Pan-Bihar Coverage:</strong> Ground-level reporting from Patna, Begusarai, Samastipur, and Muzaffarpur to the most remote districts of the state.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>National Affairs:</strong> In-depth coverage of major political, social, and economic developments from across India.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Hyper-Local Issues:</strong> Bringing to light the everyday problems of common citizens that mainstream media often overlooks.</span>
              </li>
            </ul>
          </section>

          {/* Ownership & Funding */}
          <section className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#c80000] shadow-sm">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaUserTie /> Ownership & Funding Disclosure
            </h3>
            <div className="text-gray-700 space-y-4 leading-relaxed">
              <p>
                <strong>The Local Mirror</strong> is an independent media organization owned and operated by <strong>The Local Mirror Media Group</strong>. 
              </p>
              <p>
                We maintain complete editorial independence, free from affiliations with any political party or corporate house. Our sustainability relies on digital advertising and monetization, allowing us to keep our journalism accessible and transparent.
              </p>
            </div>
          </section>

          {/* Editorial Standards */}
          <section>
            <div className="flex items-center gap-3 mb-4">
               <FaBalanceScale className="text-[#c80000] text-2xl" />
               <h3 className="text-2xl font-bold text-gray-900">Editorial Standards & Ethics</h3>
            </div>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="mt-1"><FaCheckCircle className="text-green-600 text-xl" /></div>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">Fact-Checking Policy</h4>
                        <p className="text-gray-600 text-sm">Accuracy is our priority. Every story is cross-verified by our editorial desk before publication.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mt-1"><FaCheckCircle className="text-green-600 text-xl" /></div>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">Unbiased Reporting</h4>
                        <p className="text-gray-600 text-sm">We maintain strict neutrality, reporting events exactly as they happen without any added bias.</p>
                    </div>
                </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white shadow-xl rounded-xl p-6 border-t-8 border-[#c80000]">
            <h3 className="text-xl font-bold mb-6 border-b pb-2">Fast Facts</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex justify-between items-center">
                <span>Ownership:</span> <span className="font-semibold text-gray-900">The Local Mirror Media</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Founded:</span> <span className="font-semibold text-gray-900">2023</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Base:</span> <span className="font-semibold text-gray-900 text-right">Begusarai, Bihar</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Focus:</span> <span className="font-semibold text-gray-900">Regional & National</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#f8f9fa] p-8 rounded-xl border border-gray-200 text-center">
            <h3 className="text-lg font-bold mb-3">Join Our Network</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you a journalist or a stringer? Join us in bringing stories from your area to the world.
            </p>
            <Link href="/contact" className="inline-block w-full bg-[#c80000] text-white font-bold py-3 rounded-lg hover:bg-red-800 transition shadow-md">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
}
