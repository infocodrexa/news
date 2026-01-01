// import React from "react";
// import Title from "../Title";
// import SimpleDetailsNewCard from "./items/SimpleDetailsNewCard";

// const DetailsNews = ({category,news}) => {
//   return (
//     <div className="w-full flex flex-col gap-[14px] pr-2 py-8">
//       <Title title={category} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3">
//         <SimpleDetailsNewCard news={news[0]} type="details-news" height={300} />
//         <SimpleDetailsNewCard news={news[1]} type="details-news"  height={300} />
//       </div>
//     </div>
//   );
// };

// export default DetailsNews;




import React from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./items/SimpleDetailsNewCard";

const DetailsNews = ({ category, news }) => {
  // Agar news array khali hai ya undefined hai toh error na aaye isliye ye check
  if (!news || news.length === 0) {
    return null; 
  }

  return (
    <div className="w-full flex flex-col gap-[14px] pr-2 py-8">
      <Title title={category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3">
        
        {/* news[0] check karke pass kiya */}
        {news[0] && (
          <SimpleDetailsNewCard news={news[0]} type="details-news" height={300} />
        )}

        {/* news[1] check karke pass kiya */}
        {news[1] && (
          <SimpleDetailsNewCard news={news[1]} type="details-news" height={300} />
        )}
        
      </div>
    </div>
  );
};

export default DetailsNews;