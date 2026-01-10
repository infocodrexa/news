import React from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./items/SimpleDetailsNewCard";
import NewsCard from "./items/NewsCard";

const DetailsNewsCol = ({ news, category }) => {
  // 1. Agar news array empty ya undefined hai, toh error se bachne ke liye khali div return karega
  if (!news || news.length === 0) {
    return <div className="pl-2"><Title title={category} /> <p className="text-sm text-gray-500">No news available.</p></div>;
  }

  // 2. Optional chaining (?) ka use kiya taaki agar news[0] na ho toh crash na ho
  console.log(news[0]?.category);

  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      {/* 3. Section ka Title (Jaise: Politics, Education) */}
      <Title title={category} />

      <div className="grid grid-cols-1 gap-y-6">
        {/* 4. Pehli news ko bade card (SimpleDetailsNewCard) mein dikhane ke liye */}
        {news[0] && (
          <SimpleDetailsNewCard news={news[0]} type="details-news" height={300} />
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-[14px] mt-4">
        {/* 5. Baki news ko map karke list (NewsCard) mein dikhane ke liye (Maximum 4 items) */}
        {news.map((item, i) => {
          // i > 0 isliye taaki pehli news repeat na ho (jo upar bade card mein hai)
          if (i > 0 && i < 5) {
            return <NewsCard item={item} key={i} />;
          }
        })}
      </div>
    </div>
  );
};

export default DetailsNewsCol;
