// import React from 'react';
// import { base_api_url } from '@/config/config'; // Path check karlena
// import SimpleDetailsNewCard from '@/components/news/items/SimpleDetailsNewCard';
// import Footer from '@/components/Footer';

// // 👇 1. Data Fetching Function (Server Side)
// async function getTagNews(tag) {
//   try {
//     // API Call (No-Store matlab har baar naya data layega, cache nahi karega)
//     const res = await fetch(`${base_api_url}/api/news/tag/${tag}`, { cache: 'no-store' });
    
//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }
    
//     const data = await res.json();
//     return data.news || [];
//   } catch (error) {
//     console.log("Error fetching tag news:", error);
//     return [];
//   }
// }

// // 👇 2. Metadata (SEO ke liye Title change karega)
// export async function generateMetadata({ params }) {
//   const { tag } = params;
//   return {
//     title: `News about #${tag} - The Local Mirror`,
//   };
// }

// // 👇 3. Main Page Component
// const TagPage = async ({ params }) => {
//   const { tag } = params; // URL se tag nikala (e.g. Cricket)
//   const news = await getTagNews(tag); // Data fetch kiya

//   return (
//     <div className="w-full bg-slate-50 min-h-screen py-10">
//       <div className="w-full max-w-7xl mx-auto px-4">
        
//         {/* Header Section */}
//         <div className="mb-8 border-b border-gray-200 pb-4">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Top News for <span className="text-[#c80000]">#{tag}</span>
//           </h1>
//           <p className="text-gray-500 mt-2 font-medium">
//             Found {news.length} articles
//           </p>
//         </div>

//         {/* News Grid */}
//         {news.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {news.map((item, i) => (
//               <SimpleDetailsNewCard
//                 key={i} 
//                 news={item} 
//                 type="details-news" 
//                 height={250} 
//               />
//             ))}
//           </div>
//         ) : (
//           /* Empty State */
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">No news found for this tag.</h3>
//             <p className="text-gray-400 text-sm">Try searching for something else.</p>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TagPage;


import React from 'react';
import { base_api_url } from '@/config/config';
import SimpleDetailsNewCard from '@/components/news/items/SimpleDetailsNewCard';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import RecentNews from '@/components/news/RecentNews'; // ✅ extra (same as Details page)

// 👇 1. Data Fetching Function
async function getTagNews(tag) {
  try {
    const res = await fetch(`${base_api_url}/api/news/tag/${tag}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data.news || [];
  } catch (error) {
    console.log("Error fetching tag news:", error);
    return [];
  }
}

// 👇 2. Metadata
export async function generateMetadata({ params }) {
  const { tag } = params;
  return {
    title: `News about #${tag} - The Local Mirror`,
  };
}

// 👇 3. Main Page Component
const TagPage = async ({ params, searchParams }) => {
  const { tag } = params;

  // Pagination logic
  const page = parseInt(searchParams?.page) || 1;
  const itemsPerPage = 9;

  const news = await getTagNews(tag);

  const totalNews = news.length;
  const totalPages = Math.ceil(totalNews / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayNews = news.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Top News for <span className="text-[#c80000]">#{tag}</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Found {totalNews} articles
          </p>
        </div>

        <div className="flex flex-wrap">
          {/* LEFT: News + Pagination */}
          <div className="w-full xl:w-8/12 pr-0 xl:pr-4">
            {displayNews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayNews.map((item, i) => (
                    <SimpleDetailsNewCard
                      key={i}
                      news={item}
                      type="details-news"
                      height={250}
                    />
                  ))}
                </div>

                {totalNews > itemsPerPage && (
                  <Pagination
                    pageNumber={page}
                    totalPages={totalPages}
                    category={tag}
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No news found for this tag.
                </h3>
                <p className="text-gray-400 text-sm">
                  Try searching for something else.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar (same pattern as Details page) */}
          <div className="w-full xl:w-4/12 pl-0 xl:pl-4 mt-8 xl:mt-0">
            <div className="sticky top-4">
              <RecentNews />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TagPage;
