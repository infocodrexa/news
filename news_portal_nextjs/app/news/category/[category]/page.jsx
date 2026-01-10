// //pagination 

// import Breadcrumb from "@/components/Breadcrumb";
// import Category from "@/components/Category";
// import Search from "@/components/Search";
// import PopularNews from "@/components/news/PopularNews";
// import RecentNews from "@/components/news/RecentNews";
// import SimpleDetailsNewCard from "@/components/news/items/SimpleDetailsNewCard";
// import React from "react";
// import { base_api_url } from "../../../../config/config";
// import Footer from "@/components/Footer";
// import Pagination from "@/components/Pagination"; // New Import

// const CategoryNews = async ({ params, searchParams }) => {
//   const { category } = params;

//   // 1. URL se page number nikala (Default = 1)
//   const page = parseInt(searchParams?.page) || 1;
//   const itemsPerPage = 9;

//   const res = await fetch(`${base_api_url}/api/category/news/${category}`, {
//     next: {
//       revalidate: 1,
//     },
//   });

//   const data = await res.json();
//   const allNews = data.news || [];

//   // 2. Pagination Logic (Total kitne page honge)
//   const totalNews = allNews.length;
//   const totalPages = Math.ceil(totalNews / itemsPerPage);

//   // 3. Data Slice (Sirf current page ka data nikala)
//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const displayNews = allNews.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div className="bg-white shadow-sm py-4">
//         <div className="px-4 md:px-8 w-full">
//           <Breadcrumb one="category" two={category} />
//         </div>
//       </div>
//       <div className="bg-slate-200 w-full min-h-screen">
//         <div className="px-4 md:px-8 w-full py-8">
//           <div className="flex flex-wrap">
//             {/* Left Side: News + Pagination */}
//             <div className="w-full xl:w-8/12">
//               <div className="w-full pr-0 xl:pr-4">
//                 {/* News Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {displayNews && displayNews.length > 0 ? (
//                     displayNews.map((item, i) => (
//                       <SimpleDetailsNewCard
//                         key={i}
//                         news={item}
//                         type="details-news"
//                         height={200}
//                       />
//                     ))
//                   ) : (
//                     <p className="text-gray-500">No news found.</p>
//                   )}
//                 </div>

//                 {/* Pagination Component - Sirf tab dikhega jab 1 se jyada page ho */}
//                 {totalNews > itemsPerPage && (
//                   <Pagination
//                     pageNumber={page}
//                     totalPages={totalPages}
//                     category={category}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Right Side: Sidebar */}
//             <div className="w-full xl:w-4/12 mt-8 xl:mt-0">
//               <div className="w-full pl-0 xl:pl-4">
//                 <div className="flex flex-col gap-y-8 sticky top-[20px]">
//                   <Search />
//                   <RecentNews />
//                   <div className="p-4 bg-white">
//                     <Category titleStyle={"text-gray-700 font-bold"} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="pt-8">
//             <PopularNews type="Popular news" />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CategoryNews;




//pagination 
import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import Search from "@/components/Search";
import PopularNews from "@/components/news/PopularNews";
import RecentNews from "@/components/news/RecentNews";
import SimpleDetailsNewCard from "@/components/news/items/SimpleDetailsNewCard";
import React from "react";
import { base_api_url } from "../../../../config/config";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination"; 
import GoogleAdPlaceholder from "@/components/ads/GoogleAdPlaceholder"; 

const CategoryNews = async ({ params, searchParams }) => {
  const { category } = params;

  // 1. URL se page number nikala (Default = 1)
  const page = parseInt(searchParams?.page) || 1;
  const itemsPerPage = 9;

  const res = await fetch(`${base_api_url}/api/category/news/${category}`, {
    next: {
      revalidate: 1,
    },
  });

  const data = await res.json();
  const allNews = data.news || [];

  // 2. Pagination Logic
  const totalNews = allNews.length;
  const totalPages = Math.ceil(totalNews / itemsPerPage);

  // 3. Data Slice
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayNews = allNews.slice(startIndex, endIndex);

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two={category} />
        </div>
      </div>

      {/* 🟢 AD SPACE 1: Category Name ke neeche (Agar future me chahiye ho) */}
       {/* <div className="w-full px-4 md:px-8 bg-slate-200 pt-4">
          <GoogleAdPlaceholder type="banner" />
      </div>  */}

      <div className="bg-slate-200 w-full min-h-screen">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            
            {/* Left Side: News + Pagination */}
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                
                {/* 🟢 AD SPACE 2: News Grid se pehle (Sahi hai ✅) */}
                <GoogleAdPlaceholder type="inContent" />

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {displayNews && displayNews.length > 0 ? (
                    displayNews.map((item, i) => (
                      <SimpleDetailsNewCard
                        key={i}
                        news={item}
                        type="details-news"
                        height={200}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No news found.</p>
                  )}
                </div>

                {/* Pagination Component */}
                {totalNews > itemsPerPage && (
                  <Pagination
                    pageNumber={page}
                    totalPages={totalPages}
                    category={category}
                  />
                )}
              </div>
            </div>

            {/* Right Side: Sidebar */}
            <div className="w-full xl:w-4/12 mt-8 xl:mt-0">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8 sticky top-[20px]">
                  <Search />

                  {/* 🟢 AD SPACE 3: Sidebar me (Sahi hai ✅) */}
                  <RecentNews />
                  
                  <div className="p-4 bg-white">
                    {/* Yahan aapne Category hata kar Ad lagaya hai - Good Strategy */}
                    <GoogleAdPlaceholder type="sidebar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <PopularNews type="Popular news" />
          </div>

          {/* 🟢 AD SPACE 4: Footer se pehle (Yahan Maine Change Kiya Hai) */}
          {/* Pehle 'sidebar' tha, ab 'banner' kiya taaki lamba aur accha dikhe */}
          <div className="mt-8">
             <GoogleAdPlaceholder type="banner" />
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryNews;