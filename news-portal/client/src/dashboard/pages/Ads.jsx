// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Ads = () => {
//   // --- Form States ---
//   const [title, setTitle] = useState("");
//   const [redirectLink, setRedirectLink] = useState("");
//   const [position, setPosition] = useState("home");
//   const [active, setActive] = useState(true);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- List State ---
//   const [ads, setAds] = useState([]);

//   // 1. Ads Fetch Karna (Load hone par)
//   const fetchAds = async () => {
//     try {
//       const token = localStorage.getItem("newsToken");
//       // Backend route jo humne banaya tha
//       const { data } = await axios.get("http://localhost:5000/api/admin/ads/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAds(data);
//     } catch (error) {
//       console.error("Error fetching ads:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   // 2. Image Select Handler
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // 3. Ad Create Handler
//   const submitAd = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please select an image");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("redirectLink", redirectLink);
//     formData.append("position", position);
//     formData.append("active", active);
//     formData.append("image", image);

//     try {
//       const token = localStorage.getItem("newsToken");

//       await axios.post(
//         "http://localhost:5000/api/admin/ads/add",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Ad created successfully!");

//       // Reset Form
//       setTitle("");
//       setRedirectLink("");
//       setPosition("home");
//       setActive(true);
//       setImage(null);
//       document.getElementById("fileInput").value = "";

//       // List ko refresh karo taaki naya ad neeche dikh jaye
//       fetchAds(); 

//     } catch (error) {
//       console.error(error);
//       alert("Failed to create ad");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 4. Ad Delete Handler
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this Ad?")) return;

//     try {
//       const token = localStorage.getItem("newsToken");
//       await axios.delete(`http://localhost:5000/api/admin/ads/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       alert("Ad Deleted!");
//       fetchAds(); // List refresh
//     } catch (error) {
//       console.error("Delete failed", error);
//       alert("Failed to delete ad");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
      
//       {/* --- SECTION 1: CREATE AD --- */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-10">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Advertisement</h1>

//         <form onSubmit={submitAd} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Title */}
//             <input
//               type="text"
//               placeholder="Ad Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               className="w-full p-3 border rounded"
//             />
               
//             {/* Position */}
//             <select
//               value={position}
//               onChange={(e) => setPosition(e.target.value)}
//               className="w-full p-3 border rounded"
//             >
//               <option value="home">Home (Top/Popup)</option>
//               <option value="sidebar">Sidebar</option>
//               <option value="footer">Footer</option>
//             </select>
//           </div>

//           {/* Image Input */}
//           <div className="border p-3 rounded bg-gray-50">
//             <label className="block text-gray-600 text-sm mb-2">Ad Image</label>
//             <input
//               id="fileInput"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               required
//               className="w-full"
//             />
//           </div>

//           {/* Redirect Link */}
//           <input
//             type="text"
//             placeholder="Redirect Link (e.g. https://google.com)"
//             value={redirectLink}
//             onChange={(e) => setRedirectLink(e.target.value)}
//             required
//             className="w-full p-3 border rounded"
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 disabled:bg-gray-400 font-bold"
//           >
//             {loading ? "Uploading..." : "Save Ad"}
//           </button>
//         </form>
//       </div>

//       {/* --- SECTION 2: MANAGE ADS --- */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Existing Ads</h2>
        
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-3 border">Image</th>
//                 <th className="p-3 border">Title</th>
//                 <th className="p-3 border">Position</th>
//                 <th className="p-3 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ads.length > 0 ? (
//                 ads.map((ad) => (
//                   <tr key={ad._id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 border">
//                       <img 
//                         src={ad.imageUrl} 
//                         alt="ad" 
//                         className="h-12 w-20 object-cover rounded bg-gray-200"
//                         onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Error"}
//                       />
//                     </td>
//                     <td className="p-3 border font-medium">{ad.title}</td>
//                     <td className="p-3 border capitalize">
//                       <span className={`px-2 py-1 rounded text-xs font-bold ${
//                         ad.position === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {ad.position}
//                       </span>
//                     </td>
//                     <td className="p-3 border">
//                       <button
//                         onClick={() => handleDelete(ad._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-5 text-gray-500">
//                     No ads found. Create one above!
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Ads;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../config/config";

const Ads = () => {
  // --- Form States ---
  const [title, setTitle] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [position, setPosition] = useState("home");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- List State ---
  const [ads, setAds] = useState([]);

  // 1. Fetch Ads
  const fetchAds = async () => {
    try {
      const token = localStorage.getItem("newsToken");
      const { data } = await axios.get(
        `${base_url}/api/admin/ads/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // 2. Image Change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 3. Create Ad
  const submitAd = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("redirectLink", redirectLink);
    formData.append("position", position);
    formData.append("active", active);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("newsToken");

      await axios.post(
        `${base_url}/api/admin/ads/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Ad created successfully!");

      // Reset Form
      setTitle("");
      setRedirectLink("");
      setPosition("home");
      setActive(true);
      setImage(null);
      document.getElementById("fileInput").value = "";

      fetchAds();
    } catch (error) {
      console.error(error);
      alert("Failed to create ad");
    } finally {
      setLoading(false);
    }
  };

  // 4. Delete Ad
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Ad?")) return;

    try {
      const token = localStorage.getItem("newsToken");
      await axios.delete(
        `${base_url}/api/admin/ads/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Ad Deleted!");
      fetchAds();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete ad");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* CREATE AD */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Advertisement
        </h1>

        <form onSubmit={submitAd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Ad Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />

            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option value="home">Home (Top/Popup)</option>
              <option value="sidebar">Sidebar</option>
              <option value="footer">Footer</option>
            </select>
          </div>

          <div className="border p-3 rounded bg-gray-50">
            <label className="block text-gray-600 text-sm mb-2">Ad Image</label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full"
            />
          </div>

          <input
            type="text"
            placeholder="Redirect Link (e.g. https://google.com)"
            value={redirectLink}
            onChange={(e) => setRedirectLink(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 disabled:bg-gray-400 font-bold"
          >
            {loading ? "Uploading..." : "Save Ad"}
          </button>
        </form>
      </div>

      {/* MANAGE ADS */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Manage Existing Ads
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Position</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {ads.length > 0 ? (
                ads.map((ad) => (
                  <tr key={ad._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">
                      <img
                        src={ad.imageUrl}
                        alt="ad"
                        className="h-12 w-20 object-cover rounded bg-gray-200"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/150?text=Error")
                        }
                      />
                    </td>
                    <td className="p-3 border font-medium">{ad.title}</td>
                    <td className="p-3 border capitalize">{ad.position}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-5 text-gray-500">
                    No ads found. Create one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ads;
