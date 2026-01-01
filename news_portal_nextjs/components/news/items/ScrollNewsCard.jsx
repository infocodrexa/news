"use client";

import SimpleDetailsNewCard from "./SimpleDetailsNewCard";

const ScrollNewsColumn = ({ news }) => {
  return (
    <div
      className="
        h-[calc(100vh-160px)]
        overflow-y-auto
        pr-2
        rounded-xl
        scrollbar-hide // Optional: agar scrollbar chhupana ho
      "
    >
     
      <div className="grid grid-cols-1 gap-4">
        {news?.map((item, i) => (
          <SimpleDetailsNewCard
            key={i}
            news={item}
            type="details-news"
            height={300} // Height thodi badha di visual ke liye
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollNewsColumn;