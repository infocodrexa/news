// import HeadLines from "@/components/HeadLines";
// import Title from "@/components/Title";
// import DetailsNews from "@/components/news/DetailsNews";
// import DetailsNewsCol from "@/components/news/DetailsNewsCOl";
// import DetailsNewsRow from "@/components/news/DetailsNewsRow";
// import LatestNews from "@/components/news/LatestNews";
// import PopularNews from "@/components/news/PopularNews";
// import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
// import NewsCard from "@/components/news/items/NewsCard";
// import Footer from "@/components/Footer";
// import { base_api_url } from "@/config/config";
// import SlideInAd from "@/components/ads/SlideInAd";
// import ModalAd from "@/components/ads/ModalAd";

// const Home = async () => {
//   const news_data = await fetch(`${base_api_url}/api/all/news`, {
//     next: {
//       revalidate: 5,
//     },
//   });

//   // ✅ SAME SAFETY AS UPPER CODE
//   const res = await news_data?.json();
//   const news = res?.news || {};

//   return (
//     <div>
//       <main>
//         {/* 🔥 MODAL + TOP AD (NO CHANGE) */}
//         <ModalAd />
//         <SlideInAd position="home" />

//         <HeadLines news={news} />

//         <div className="bg-slate-100">
//           <div className="px-4 md:px-8 py-8">

//             {/* ===================== TOP SECTION ===================== */}
//             <div className="flex flex-wrap">
//               <div className="w-full lg:w-6/12">
//                 <LatestNews news={news["Education"] || []} />
//               </div>

//               <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
//                 <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
//                   <Title title="Technology" />

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
//                     {(news["Technology"] || []).slice(0, 4).map((item, i) => (
//                       <SimpleNewsCard key={i} item={item} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ===================== POPULAR ===================== */}
//             <div className="mt-10">
//               <PopularNews type="Popular news" news={news["Travel"] || []} />
//             </div>

//             {/* ===================== FIRST SECTION ===================== */}
//             <div className="w-full mt-10">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <DetailsNewsRow
//                     news={news["Sports"] || []}
//                     category="Sports"
//                     type="details-news"
//                   />

//                   <div className="mt-6">
//                     <DetailsNews
//                       news={news["Health"] || []}
//                       category="Health"
//                     />
//                   </div>
//                 </div>

//                 <div className="w-full lg:w-4/12">
//                   <DetailsNewsCol
//                     news={news["Education"] || []}
//                     category="Education"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* ===================== SECOND SECTION ===================== */}
//             <div className="w-full mt-10">
//               <div className="flex flex-wrap">

//                 <div className="w-full lg:w-4/12">
//                   <SlideInAd position="sidebar" />

//                   <div className="pr-0 lg:pr-2 mt-6">
//                     <DetailsNewsCol
//                       news={news["Politics"] || []}
//                       category="Politics"
//                     />
//                   </div>
//                 </div>

//                 <div className="w-full lg:w-8/12">
//                   <div className="pl-0 lg:pl-2">
//                     <DetailsNewsRow
//                       news={news["Travel"] || []}
//                       category="Travel"
//                       type="details-news"
//                     />

//                     <div className="mt-6">
//                       <DetailsNews
//                         news={news["International"] || []}
//                         category="International"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ===================== THIRD SECTION ===================== */}
//             <div className="w-full mt-10">
//               <div className="flex flex-wrap">

//                 <div className="w-full lg:w-8/12">
//                   <DetailsNewsRow
//                     news={news["Technology"] || []}
//                     category="Technology"
//                     type="details-news"
//                   />
//                 </div>

//                 <div className="w-full lg:w-4/12">
//                   <div className="pl-0 lg:pl-2">
//                     <Title title="Recent news" />

//                     <div className="grid grid-cols-1 gap-y-[14px] mt-4">
//                       {(news["Sports"] || []).slice(0, 4).map((item, i) => (
//                         <NewsCard key={i} item={item} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Home;


export const dynamic = "force-dynamic";


import HeadLines from "@/components/HeadLines";
import Title from "@/components/Title";
import DetailsNews from "@/components/news/DetailsNews";
import DetailsNewsCol from "@/components/news/DetailsNewsCol";
import DetailsNewsRow from "@/components/news/DetailsNewsRow";
import LatestNews from "@/components/news/LatestNews";
import PopularNews from "@/components/news/PopularNews";
import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
import NewsCard from "@/components/news/items/NewsCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/config";
import SlideInAd from "@/components/ads/SlideInAd";
import ModalAd from "@/components/ads/ModalAd";

const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 5,
    },
  });

  const res = await news_data?.json();
  const news = res?.news || {};

  return (
    <div>
      <main>
        {/* 🔥 MODAL + TOP AD */}
        <ModalAd />
        <SlideInAd position="home" />

        <HeadLines news={news} />

        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">

            {/* ===================== TOP SECTION ===================== */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <LatestNews news={news["Education"] || []} />
              </div>

              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="Technology" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    {(news["Technology"] || []).slice(0, 4).map((item, i) => (
                      <SimpleNewsCard key={i} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ===================== POPULAR ===================== */}
            <div className="mt-10">
              <PopularNews type="Popular News" news={news["Travel"] || []} />
            </div>

            {/* ===================== FIRST SECTION ===================== */}
            <div className="w-full mt-10">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow
                    news={news["Sports"] || []}
                    category="Sports"
                    type="details-news"
                  />

                  <div className="mt-6">
                    <DetailsNews
                      news={news["Health"] || []}
                      category="Health"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12">
                  <DetailsNewsCol
                    news={news["Education"] || []}
                    category="Education"
                  />
                </div>
              </div>
            </div>

            {/* ===================== SECOND SECTION ===================== */}
            <div className="w-full mt-10">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  <SlideInAd position="sidebar" />

                  <div className="pr-0 lg:pr-2 mt-6">
                    <DetailsNewsCol
                      news={news["Politics"] || []}
                      category="Politics"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-8/12">
                  <div className="pl-0 lg:pl-2">
                    <DetailsNewsRow
                      news={news["Travel"] || []}
                      category="Travel"
                      type="details-news"
                    />

                    <div className="mt-6">
                      <DetailsNews
                        news={news["International"] || []}
                        category="International"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================== THIRD SECTION ===================== */}
            <div className="w-full mt-10">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow
                    news={news["Technology"] || []}
                    category="Technology"
                    type="details-news"
                  />
                </div>

                <div className="w-full lg:w-4/12">
                  <div className="pl-0 lg:pl-2">
                    <Title title="Recent News" />

                    <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                      {(news["Sports"] || []).slice(0, 4).map((item, i) => (
                        <NewsCard key={i} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
