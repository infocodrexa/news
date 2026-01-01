// import React from "react";
// import Title from "../Title";
// import SimpleDetailsNewCard from "./items/SimpleDetailsNewCard";
// import NewsCard from "./items/NewsCard";

// const DetailsNewsRow = ({ news, category, type }) => {
//   return (
//     <div className="w-full flex flex-col gap-[14px] pr-2">
//       <Title title={category} />
//       <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
//         <SimpleDetailsNewCard news={news[0]} type={type} height={300} />
//         <div className="grid grid-cols-1 gap-y-3">
//           {news.map((item, i) => {
//             if (i < 4) {
//               return <NewsCard item={item} key={i} />;
//             }
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsNewsRow;



import React from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./items/SimpleDetailsNewCard";
import NewsCard from "./items/NewsCard";

const DetailsNewsRow = ({ news, category, type }) => {
  // Check agar news nahi hai toh crash na ho
  if (!news || news.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-[14px] pr-2 py-4">
      <Title title={category} />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        
        {/* BIG CARD: Sirf pehli news yahan dikhegi */}
        <SimpleDetailsNewCard 
          news={news[0]} 
          type={type} 
          height={300} 
        />

        <div className="grid grid-cols-1 gap-y-3">
          {/* LIST CARDS: Pehli news ko chhod kar baaki news dikhani chahiye */}
          {/* news.slice(1, 4) ka matlab hai index 1 se 3 tak (total 3 news) */}
          {news.slice(1, 4).map((item, i) => (
            <NewsCard item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsNewsRow;