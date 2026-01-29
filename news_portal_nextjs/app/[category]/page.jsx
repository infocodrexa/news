// pagination 
import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import Search from "@/components/Search";
import PopularNews from "@/components/news/PopularNews";
import RecentNews from "@/components/news/RecentNews";
import SimpleDetailsNewCard from "@/components/news/items/SimpleDetailsNewCard";
import React from "react";
// ✅ FIXED PATH: Folder change hone ki wajah se yahan '@/' use kiya hai
import { base_api_url } from "@/config/config"; 
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination"; 
import GoogleAdPlaceholder from "@/components/ads/GoogleAdPlaceholder"; 
import { notFound } from "next/navigation"; 

const CategoryNews = async ({ params, searchParams }) => {
  const { category } = params;

  // 1. URL se page number nikala (Default = 1)
  const page = parseInt(searchParams?.page) || 1;
  const itemsPerPage = 9;

  // ✅ Time Logic: Updated vs Created time dikhane ke liye
  const getFormattedDate = (item) => {
    if (!item) return "";
    const created = item.createdAt ? new Date(item.createdAt) : new Date(item.date);
    const updated = item.updatedAt ? new Date(item.updatedAt) : null;

    const format = (date) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = date.getDate().toString().padStart(2, '0');
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    };

    const isUpdated = updated && (updated.getTime() !== created.getTime());
    return isUpdated ? `Updated: ${format(updated)}` : format(created);
  };

  let allNews = [];
  try {
    const res = await fetch(`${base_api_url}/api/category/news/${category}`, {
      next: { revalidate: 1 },
    });
    const data = await res.json();
    
    // ✅ ADDED LOGIC: Agar database me news nahi mili (jaise /dgy), toh 404 dikhao
    if (!data.news || data.news.length === 0) {
      return notFound();
    }

    allNews = data.news || [];
  } catch (error) {
    console.log("Category Fetch Error:", error);
    return notFound();
  }

  // 2. Pagination Logic
  const totalNews = allNews.length;
  const totalPages = Math.ceil(totalNews / itemsPerPage);

  // 3. Data Slice + Date Formatting
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const displayNews = allNews.slice(startIndex, endIndex).map(item => ({
    ...item,
    displayDate: getFormattedDate(item) // Yahan date fix ki hai
  }));

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          {/* Breadcrumb decode kiya taaki URL clean dikhe */}
          <Breadcrumb one="category" two={decodeURIComponent(category)} />
        </div>
      </div>

      <div className="bg-slate-200 w-full min-h-screen">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            
            {/* Left Side: News + Ads + Pagination */}
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                
                {/* ✅ AD SPACE: News se pehle Ad */}
                {/* <GoogleAdPlaceholder type="inContent" /> */}

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
                  <RecentNews />
                  
                  {/* ✅ AD SPACE: Sidebar me Category ki jagah Ad */}
                  <div className="p-4 bg-white">
                    {/* <GoogleAdPlaceholder type="sidebar" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <PopularNews type="Popular news" />
          </div>

          {/* ✅ AD SPACE: Footer se pehle Banner Ad */}
          <div className="mt-8">
             {/* <GoogleAdPlaceholder type="banner" /> */}
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryNews;
