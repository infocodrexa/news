import React from "react";
import Link from "next/link";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({ pageNumber, totalPages, category }) => {
  // Page numbers logic (1 2 3 ... 10)
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= pageNumber - delta && i <= pageNumber + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
      {/* Previous Button */}
      {pageNumber > 1 ? (
        <Link
          href={`/news/category/${category}?page=${pageNumber - 1}`}
          className="w-[36px] h-[36px] flex justify-center items-center border border-gray-300 rounded-sm text-gray-600 hover:bg-[#c80000] hover:text-white transition-all bg-white"
        >
          <BsChevronLeft />
        </Link>
      ) : (
        <button disabled className="w-[36px] h-[36px] flex justify-center items-center border border-gray-200 rounded-sm text-gray-300 bg-white cursor-not-allowed">
          <BsChevronLeft />
        </button>
      )}

      {/* Numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 text-gray-500 font-bold self-end pb-1">...</span>
        ) : (
          <Link
            key={i}
            href={`/news/category/${category}?page=${p}`}
            className={`w-[36px] h-[36px] flex justify-center items-center border rounded-sm font-semibold transition-all ${
              pageNumber === p
                ? "bg-[#c80000] text-white border-[#c80000]"
                : "bg-white border-gray-300 text-gray-600 hover:bg-[#c80000] hover:text-white"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next Button */}
      {pageNumber < totalPages ? (
        <Link
          href={`/news/category/${category}?page=${pageNumber + 1}`}
          className="w-[36px] h-[36px] flex justify-center items-center border border-gray-300 rounded-sm text-gray-600 hover:bg-[#c80000] hover:text-white transition-all bg-white"
        >
          <BsChevronRight />
        </Link>
      ) : (
        <button disabled className="w-[36px] h-[36px] flex justify-center items-center border border-gray-200 rounded-sm text-gray-300 bg-white cursor-not-allowed">
          <BsChevronRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;