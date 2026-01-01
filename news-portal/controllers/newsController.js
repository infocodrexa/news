// const { formidable } = require("formidable");
// const cloudinary = require("cloudinary").v2;
// const newsModel = require("../models/newsModel");
// const authModel = require("../models/authModel");
// const galleryModel = require("../models/galleryModel");
// const {
//   mongo: { ObjectId },
// } = require("mongoose");
// const moment = require("moment");

// class newsController {



// add_news = async (req, res) => {
//     // 1. Safety Check: User Info
//     if (!req.userInfo) {
//         return res.status(401).json({ message: "User not authorized" });
//     }

//     const { id, category, name } = req.userInfo;
//     const form = formidable({});

//     cloudinary.config({
//         cloud_name: process.env.cloud_name,
//         api_key: process.env.api_key,
//         api_secret: process.env.api_secret,
//         secure: true,
//     });

//     try {
//         const [fields, files] = await form.parse(req);

//         // 2. Validation: Image Check
//         if (!files.image || files.image.length === 0) {
//             return res.status(400).json({ message: "Image is required" });
//         }

//         // 3. Upload Image
//         const { url } = await cloudinary.uploader.upload(
//             files.image[0].filepath,
//             { folder: "news_images" }
//         );

//         const { title, description, slug } = fields;

//         // ---------- 🔴 MANDATORY SLUG & SEO LOGIC START (ADDED) ----------
        
//         // Step A: Check karo ki Slug empty to nahi hai (Compulsory Check)
//         if (!slug || !slug[0] || slug[0].trim().length === 0) {
//             return res.status(400).json({ message: "News URL (Slug) is required and cannot be empty." });
//         }

//         // Step B: SEO Friendly Cleaning Logic (Hindi + English Support)
//         let processedSlug = slug[0].trim().toLowerCase();

//         // 1. Regex: Sirf English (a-z), Numbers (0-9), Hindi Characters (\u0900-\u097F), aur Spaces/Dash rakhne ke liye.
//         // Baaki special chars (!@#$%) hat jayenge.
//         processedSlug = processedSlug.replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "");

//         // 2. Spaces ko Dash (-) me badlo
//         processedSlug = processedSlug.replace(/\s+/g, "-");

//         // 3. Agar user ne multiple dash laga diye (e.g. 'news--today'), to use single dash karo
//         processedSlug = processedSlug.replace(/-+/g, "-");

//         // Final Check: Agar safayi ke baad slug khali ho gaya (e.g. user ne sirf emoji dale the)
//         if (processedSlug.length === 0) {
//              return res.status(400).json({ message: "Invalid URL format. Please use valid text." });
//         }
        
//         // ---------- 🔴 MANDATORY SLUG & SEO LOGIC END (ADDED) ----------

//         // 4. Create News
//         const news = await newsModel.create({
//             writerId: id,
//             title: title[0].trim(),
//             slug: processedSlug, // Hamara cleaned aur compulsory slug (UPDATED)
//             category, 
//             description: description[0],
//             date: moment().format("LL"),
//             writerName: name,
//             image: url,
//         });

//         return res.status(201).json({ message: "News added successfully", news });

//     } catch (error) {
//         // Duplicate URL Error Handling (ADDED)
//         if (error.code === 11000) {
//              return res.status(400).json({ message: "This URL already exists. Please create a unique URL." });
//         }
        
//         console.error("Add News Error:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };










//   update_news = async (req, res) => {
//     const { news_id } = req.params;
//     const form = formidable({});

//     cloudinary.config({
//         cloud_name: process.env.cloud_name,
//         api_key: process.env.api_key,
//         api_secret: process.env.api_secret,
//         secure: true,
//     });

//     try {
//         const [fields, files] = await form.parse(req);
        
//         // Fields extract karein (slug bhi)
//         const { title, description, slug } = fields;
//         let url = fields.old_image[0];

//         // --- 1. Image Update Logic (Purana Code) ---
//         if (Object.keys(files).length > 0) {
//             const spliteImage = url.split("/");
//             const imagesFile = spliteImage[spliteImage.length - 1].split(".")[0];
//             try {
//                 await cloudinary.uploader.destroy(imagesFile);
//             } catch (error) {
//                 console.log("Image destroy error:", error);
//             }
//             const data = await cloudinary.uploader.upload(
//                 files.new_image[0].filepath,
//                 { folder: "news_images" }
//             );
//             url = data.url;
//         }

//         // --- 2. 🔴 SLUG & SEO LOGIC START (ADDED) ---
        
//         // Step A: Slug Check
//         if (!slug || !slug[0] || slug[0].trim().length === 0) {
//             return res.status(400).json({ message: "News URL (Slug) is required and cannot be empty." });
//         }

//         // Step B: Cleaning Logic (Hindi + English Support)
//         let processedSlug = slug[0].trim().toLowerCase();

//         // Regex: Allow English, Numbers, Hindi, Spaces, Dash
//         processedSlug = processedSlug.replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "");

//         // Spaces -> Dash
//         processedSlug = processedSlug.replace(/\s+/g, "-");

//         // Double Dash -> Single Dash
//         processedSlug = processedSlug.replace(/-+/g, "-");

//         // Step C: Final Validation
//         if (processedSlug.length === 0) {
//              return res.status(400).json({ message: "Invalid URL format. Please use valid text." });
//         }
//         // --- 🔴 SLUG & SEO LOGIC END ---

//         // --- 3. Update Database ---
//         const news = await newsModel.findByIdAndUpdate(
//             news_id,
//             {
//                 title: title[0].trim(),
//                 slug: processedSlug, // ✅ Updated SEO Slug
//                 description: description[0],
//                 image: url,
//             },
//             { new: true }
//         );

//         return res.status(200).json({ message: "News updated successfully", news });

//     } catch (error) {
//         // --- 4. Duplicate Error Handling ---
//         if (error.code === 11000) {
//              return res.status(400).json({ message: "This URL already exists. Please create a unique URL." });
//         }
        
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };



//   update_news_update = async (req, res) => {
//     const { role } = req.userInfo;
//     const { news_id } = req.params;
//     const { status } = req.body;

//     if (role === "admin") {
//       const news = await newsModel.findByIdAndUpdate(
//         news_id,
//         { status },
//         { new: true }
//       );
//       return res
//         .status(200)
//         .json({ message: "news status update success", news });
//     } else {
//       return res.status(401).json({ message: "You cannot access this api" });
//     }
//   };

//   news_delete = async (req, res) => {
//     const { news_id } = req.params;

//     try {
//       // Pehle check karo news exist karti hai ya nahi
//       const news = await newsModel.findById(news_id);

//       if (!news) {
//         return res.status(404).json({ message: "News not found" });
//       }

//       // Database se uda do
//       await newsModel.findByIdAndDelete(news_id);

//       return res.status(200).json({ message: "News deleted successfully" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_images = async (req, res) => {
//     const { id } = req.userInfo;

//     try {
//       const images = await galleryModel
//         .find({ writerId: new ObjectId(id) })
//         .sort({ createdAt: -1 });
//       return res.status(201).json({ images });
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_recent_news = async (req, res) => {
//     try {
//       const news = await newsModel
//         .find({ status: "active" })
//         .sort({ createdAt: -1 })
//         .skip(6)
//         .limit(6);
//       return res.status(201).json({ news });
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_category_news = async (req, res) => {
//     const { category } = req.params;

//     try {
//       const news = await newsModel.find({
//         $and: [
//           {
//             category: {
//               $eq: category,
//             },
//           },
//           {
//             status: {
//               $eq: "active",
//             },
//           },
//         ],
//       });
//       return res.status(201).json({ news });
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   news_search = async (req, res) => {
//     const { value } = req.query;
//     try {
//       const news = await newsModel.find({
//         status: "active",
//         $text: {
//           $search: value,
//         },
//       });
//       return res.status(201).json({ news });
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   add_images = async (req, res) => {
//     const form = formidable({});
//     const { id } = req.userInfo;

//     cloudinary.config({
//       cloud_name: process.env.cloud_name,
//       api_key: process.env.api_key,
//       api_secret: process.env.api_secret,
//       secure: true,
//     });

//     try {
//       const [_, files] = await form.parse(req);
//       let allImages = [];
//       const { images } = files;

//       for (let i = 0; i < images.length; i++) {
//         const { url } = await cloudinary.uploader.upload(images[i].filepath, {
//           folder: "news_images",
//         });
//         allImages.push({ writerId: id, url });
//       }

//       const image = await galleryModel.insertMany(allImages);
//       return res
//         .status(201)
//         .json({ images: image, message: "images uplaod success" });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_dashboard_news = async (req, res) => {
//     const { id, role } = req.userInfo;
//     try {
//       if (role === "admin") {
//         const news = await newsModel.find({}).sort({ createdAt: -1 });
//         return res.status(200).json({ news });
//       } else {
//         const news = await newsModel
//           .find({ writerId: new ObjectId(id) })
//           .sort({ createdAt: -1 });
//         return res.status(200).json({ news });
//       }
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   // Class ke andar ye function add karo

//   get_dashboard_data = async (req, res) => {
//     const { id, role } = req.userInfo;

//     try {
//       // Stats ke liye variables
//       let totalNews = 0;
//       let pendingNews = 0;
//       let activeNews = 0;
//       let deactiveNews = 0;
//       let writers = 0;
//       let recentNews = [];

//       // Agar Admin hai to sabka data dikhao
//       if (role === "admin") {
//         totalNews = await newsModel.find({}).countDocuments();
//         pendingNews = await newsModel
//           .find({ status: "pending" })
//           .countDocuments();
//         activeNews = await newsModel
//           .find({ status: "active" })
//           .countDocuments();
//         deactiveNews = await newsModel
//           .find({ status: "deactive" })
//           .countDocuments();
//         writers = await authModel.find({ role: "writer" }).countDocuments();

//         // Latest 5 News
//         recentNews = await newsModel.find({}).sort({ createdAt: -1 }).limit(5);
//       } else {
//         // Agar Writer hai to sirf uska data (Future ke liye)
//         totalNews = await newsModel.find({ writerId: id }).countDocuments();
//         pendingNews = await newsModel
//           .find({ writerId: id, status: "pending" })
//           .countDocuments();
//         activeNews = await newsModel
//           .find({ writerId: id, status: "active" })
//           .countDocuments();
//         deactiveNews = await newsModel
//           .find({ writerId: id, status: "deactive" })
//           .countDocuments();

//         recentNews = await newsModel
//           .find({ writerId: id })
//           .sort({ createdAt: -1 })
//           .limit(5);
//       }

//       return res.status(200).json({
//         totalNews,
//         pendingNews,
//         activeNews,
//         deactiveNews,
//         writers,
//         recentNews,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_dashboard_single_news = async (req, res) => {
//     const { news_id } = req.params;
//     try {
//       const news = await newsModel.findById(news_id);
//       return res.status(200).json({ news });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   // website

//   get_all_news = async (req, res) => {
//     try {
//       const category_news = await newsModel.aggregate([
//         {
//           $sort: { createdAt: -1 },
//         },
//         {
//           $match: {
//             status: "active",
//           },
//         },
//         {
//           $group: {
//             _id: "$category",
//             news: {
//               $push: {
//                 _id: "$_id",
//                 title: "$title",
//                 slug: "$slug",
//                 writerName: "$writerName",
//                 image: "$image",
//                 description: "$description",
//                 date: "$date",
//                 category: "$category",
//               },
//             },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             category: "$_id",
//             news: {
//               $slice: ["$news", 5],
//             },
//           },
//         },
//       ]);

//       const news = {};
//       for (let i = 0; i < category_news.length; i++) {
//         news[category_news[i].category] = category_news[i].news;
//       }
//       return res.status(200).json({ news });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_news = async (req, res) => {
//     const { slug } = req.params;

//     try {
//       const news = await newsModel.findOneAndUpdate(
//         { slug },
//         {
//           $inc: { count: 1 },
//         },
//         { new: true }
//       );

//       const relateNews = await newsModel
//         .find({
//           $and: [
//             {
//               slug: {
//                 $ne: slug,
//               },
//             },
//             {
//               category: {
//                 $eq: news.category,
//               },
//             },
//           ],
//         })
//         .limit(4)
//         .sort({ createdAt: -1 });

//       return res.status(200).json({ news: news ? news : {}, relateNews });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_categories = async (req, res) => {
//     try {
//       const categories = await newsModel.aggregate([
//         {
//           $group: {
//             _id: "$category",
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             category: "$_id",
//             count: 1,
//           },
//         },
//       ]);
//       return res.status(200).json({ categories });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_popular_news = async (req, res) => {
//     console.log("asdsa");
//     try {
//       const popularNews = await newsModel
//         .find({ status: "active" })
//         .sort({ count: -1 })
//         .limit(4);
//       return res.status(200).json({ popularNews });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   get_latest_news = async (req, res) => {
//     try {
//       const news = await newsModel
//         .find({ status: "active" })
//         .sort({ createdAt: -1 })
//         .limit(6);

//       return res.status(200).json({ news });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
//   get_random_news_images = async (req, res) => {
//     console.log("okkasd");
//     try {
//       const images = await newsModel.aggregate([
//         {
//           $match: {
//             status: "active",
//           },
//         },
//         {
//           $sample: {
//             size: 9,
//           },
//         },
//         {
//           $project: {
//             image: 1,
//           },
//         },
//       ]);
//       console.log(images);
//       return res.status(200).json({ images });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
//   // get_images = async (req, res) => {
//   //     console.log('okkasd')
//   //     try {
//   //         const images = await newsModel.aggregate([
//   //             {
//   //                 $match: {
//   //                     status: 'active'
//   //                 }
//   //             },
//   //             {
//   //                 $sample: {
//   //                     size: 9
//   //                 }
//   //             },
//   //             {
//   //                 $project: {
//   //                     image: 1
//   //                 }
//   //             }
//   //         ])
//   //         console.log(images)
//   //         return res.status(200).json({ images })
//   //     } catch (error) {
//   //         console.log(error.message)
//   //         return res.status(500).json({ message: 'Internal server error' })
//   //     }
//   // }
// }
// module.exports = new newsController();

// add_news = async (req, res) => {
//   // console.log(req.body) // Formidable use karne par req.body empty hota hai, isliye ise hata dein

//   // 1. Safety Check: User Info
//   if (!req.userInfo) {
//     return res.status(401).json({ message: "User not authorized" });
//   }

//   const { id, category, name } = req.userInfo;
//   const form = formidable({});

//   cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
//     secure: true,
//   });

//   try {
//     const [fields, files] = await form.parse(req);

//     // 2. Safety Check: Image Upload
//     // Check karein ki files.image exist karta hai ya nahi
//     if (!files.image || files.image.length === 0) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     // 3. Upload Image
//     const { url } = await cloudinary.uploader.upload(files.image[0].filepath, {
//       folder: "news_images",
//     });

//     const { title, description } = fields;

//     // 4. Create News
//     const news = await newsModel.create({
//       writerId: id,
//       title: title[0].trim(),
//       // Slug ko lowercase karna aur special chars remove karna better practice hai
//       slug: title[0].trim().toLowerCase().split(" ").join("-"),
//       category,
//       description: description[0],
//       date: moment().format("LL"),
//       writerName: name,
//       image: url,
//     });

//     return res.status(201).json({ message: "news add success", news });
//   } catch (error) {
//     // 5. Error Logging: Console me error print karein taki debugging aasan ho
//     console.error("Add News Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


const newsModel = require('../models/newsModel')
const authModel = require('../models/authModel')
const galleryModel = require('../models/galleryModel')
const { mongo: { ObjectId } } = require('mongoose')
const moment = require('moment')
const fs = require('fs') 
const path = require('path')
const mongoose = require('mongoose');

class newsController {

    // 1. ADD NEWS (Local Storage Version)
    add_news = async (req, res) => {
        const { id, name } = req.userInfo
        
        // Validation: User Info check
        if (!req.userInfo) {
            return res.status(401).json({ message: "User not authorized" });
        }

        try {
            // Multer middleware se data req.body aur req.file me ayega
            const { title, description } = req.body
            
            // Category check (Body se ya UserInfo se)
            let category = req.body.category || req.userInfo.category
            if (!category) {
                return res.status(400).json({ message: 'Category is required' })
            }

            // A. Image Upload Logic (Local)
            let imageUrl = ''
            if (req.file) {
                // .env me SERVER_URL set hona chahiye (eg: http://localhost:5000)
                imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`
            } else {
                return res.status(400).json({ message: "Image is required" });
            }

            // B. SEO Slug Logic (Advanced)
            let slug = title.trim()
            if (!slug) {
                return res.status(400).json({ message: "Title is required to generate URL." });
            }
            // Logic: Special chars hatao, spaces ko dash karo
            slug = slug.toLowerCase().replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

            // C. Create News
            const news = await newsModel.create({
                writerId: id,
                title: title.trim(),
                slug,
                category,
                description,
                date: moment().format('LL'),
                writerName: name,
                image: imageUrl
            })

            return res.status(201).json({ message: 'News added successfully', news })

        } catch (error) {
            // Duplicate URL Error
            if (error.code === 11000) {
                 return res.status(400).json({ message: "This URL already exists. Please create a unique URL." });
            }
            console.log("Add News Error:", error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    // 2. UPDATE NEWS (Local Storage + Delete Old Image)
    update_news = async (req, res) => {
        const { news_id } = req.params
        
        try {
            const { title, description, old_image } = req.body
            let imageUrl = old_image // Default: Purani image hi rakho

            // A. Image Update Logic
            if (req.file) {
                // Nayi image ka URL set karo
                imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`

                // 🗑️ Purani Image Delete karo Server se
                if(old_image) {
                    const oldImageName = old_image.split('/').pop() // Filename nikalo URL se
                    const filePath = path.join(__dirname, '../../uploads', oldImageName)
                    
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath)
                    }
                }
            }

            // B. Slug Logic
            let slug = title.trim()
            if (slug) {
                slug = slug.toLowerCase().replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
            }

            // C. Update Database
            const news = await newsModel.findByIdAndUpdate(news_id, {
                title: title.trim(),
                slug,
                description,
                image: imageUrl
            }, { new: true })

            return res.status(200).json({ message: 'News updated successfully', news })
            
        } catch (error) {
            if (error.code === 11000) {
                 return res.status(400).json({ message: "This URL already exists. Please create a unique URL." });
            }
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    // 3. DELETE NEWS (Delete File from Folder)
    news_delete = async (req, res) => {
        const { news_id } = req.params
        // Note: Admin bhi delete kar sake, isliye sirf writerId check nahi lagaya strict wala
        // Agar strict chahiye to user verify kar lena

        try {
            const news = await newsModel.findById(news_id)
            
            if (!news) {
                return res.status(404).json({ message: 'News not found' }) 
            }

            // 🗑️ Image Delete karo uploads folder se
            if(news.image) {
                const imageName = news.image.split('/').pop()
                const filePath = path.join(__dirname, '../../uploads', imageName)
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            }

            await newsModel.findByIdAndDelete(news_id)
            return res.status(200).json({ message: 'News deleted successfully' })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    // 4. ADD IMAGES TO GALLERY (Req.files Array)
    add_images = async (req, res) => {
        const { id } = req.userInfo
        
        try {
            // req.files use hoga (Array of files)
            const files = req.files 
            let allImages = []

            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const url = `${process.env.SERVER_URL}/uploads/${files[i].filename}`
                    allImages.push({ writerId: id, url })
                }

                const image = await galleryModel.insertMany(allImages)
                return res.status(201).json({ images: image, message: "Images upload success" })
            } else {
                return res.status(400).json({ message: "No images selected" })
            }

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    // 5. UPDATE STATUS (Admin Only)
    update_news_update = async (req, res) => {
        const { role } = req.userInfo
        const { news_id } = req.params
        const { status } = req.body

        if (role === 'admin') {
            const news = await newsModel.findByIdAndUpdate(news_id, { status }, { new: true })
            return res.status(200).json({ message: 'News status updated', news })
        } else {
            return res.status(401).json({ message: 'Access Denied' })
        }
    }

    // --- GET FUNCTIONS (No Changes needed here) ---

    get_images = async (req, res) => {
        const { id } = req.userInfo
        try {
            const images = await galleryModel.find({ writerId: new ObjectId(id) }).sort({ createdAt: -1 })
            return res.status(201).json({ images })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_recent_news = async (req, res) => {
        try {
            const news = await newsModel.find({ status: 'active' }).sort({ createdAt: -1 }).skip(6).limit(6)
            return res.status(201).json({ news })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_category_news = async (req, res) => {
        const { category } = req.params
        try {
            const news = await newsModel.find({
                $and: [
                    { category: { $eq: category } },
                    { status: { $eq: 'active' } }
                ]
            })
            return res.status(201).json({ news })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    news_search = async (req, res) => {
        const { value } = req.query
        try {
            const news = await newsModel.find({
                status: 'active',
                $text: { $search: value }
            })
            return res.status(201).json({ news })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_dashboard_news = async (req, res) => {
        const { id, role } = req.userInfo
        try {
            if (role === 'admin') {
                const news = await newsModel.find({}).sort({ createdAt: -1 })
                return res.status(200).json({ news })
            } else {
                const news = await newsModel.find({ writerId: new ObjectId(id) }).sort({ createdAt: -1 })
                return res.status(200).json({ news })
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    // get_dashboard_data = async (req, res) => {
    //     const { id, role } = req.userInfo
    //     try {
    //         let totalNews = 0, pendingNews = 0, activeNews = 0, deactiveNews = 0, writers = 0, recentNews = []

    //         if (role === 'admin') {
    //             totalNews = await newsModel.find({}).countDocuments()
    //             pendingNews = await newsModel.find({ status: 'pending' }).countDocuments()
    //             activeNews = await newsModel.find({ status: 'active' }).countDocuments()
    //             deactiveNews = await newsModel.find({ status: 'deactive' }).countDocuments()
    //             writers = await authModel.find({ role: 'writer' }).countDocuments()
    //             recentNews = await newsModel.find({}).sort({ createdAt: -1 }).limit(5)
    //         } else {
    //             totalNews = await newsModel.find({ writerId: id }).countDocuments()
    //             pendingNews = await newsModel.find({ writerId: id, status: 'pending' }).countDocuments()
    //             activeNews = await newsModel.find({ writerId: id, status: 'active' }).countDocuments()
    //             deactiveNews = await newsModel.find({ writerId: id, status: 'deactive' }).countDocuments()
    //             recentNews = await newsModel.find({ writerId: id }).sort({ createdAt: -1 }).limit(5)
    //         }

    //         return res.status(200).json({
    //             totalNews, pendingNews, activeNews, deactiveNews, writers, recentNews
    //         })

    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ message: 'Internal server error' })
    //     }
    // }

get_dashboard_data = async (req, res) => {
        const { id, role } = req.userInfo;

        try {
            // 1. Basic Counts (Numbers)
            let totalNews = 0, pendingNews = 0, activeNews = 0, deactiveNews = 0, writers = 0, recentNews = [];

            if (role === "admin") {
                totalNews = await newsModel.find({}).countDocuments();
                pendingNews = await newsModel.find({ status: "pending" }).countDocuments();
                activeNews = await newsModel.find({ status: "active" }).countDocuments();
                deactiveNews = await newsModel.find({ status: "deactive" }).countDocuments();
                writers = await authModel.find({ role: "writer" }).countDocuments();
                // Recent 5 News
                recentNews = await newsModel.find({}).sort({ createdAt: -1 }).limit(5);
            } else {
                // Writer ke liye sirf uska data
                totalNews = await newsModel.find({ writerId: id }).countDocuments();
                pendingNews = await newsModel.find({ writerId: id, status: "pending" }).countDocuments();
                activeNews = await newsModel.find({ writerId: id, status: "active" }).countDocuments();
                deactiveNews = await newsModel.find({ writerId: id, status: "deactive" }).countDocuments();
                recentNews = await newsModel.find({ writerId: id }).sort({ createdAt: -1 }).limit(5);
            }

            // 2. Category Graph Logic (Progress Bars Data)
            // Sirf wahi news count karo jo 'active' hain
            let matchCondition = {};

            if (role === "writer") {
                // 👇 MAIN FIX: ID ko Mongoose ObjectId mein convert karna zaroori hai aggregation ke liye
                matchCondition = { writerId: new mongoose.Types.ObjectId(id) }; 
            } else {
                // Admin sirf Active news ka chart dekhega
                matchCondition = { status: 'active' };
            }

            const categoryData = await newsModel.aggregate([
                { $match: matchCondition },
                { $group: { _id: "$category", count: { $sum: 1 } } },
                { $sort: { count: -1 } } // Zayada wali upar
            ]);

            // Percentage Math
            const totalActiveForCalc = categoryData.reduce((sum, item) => sum + item.count, 0);
            
            const categoryStats = categoryData.map(item => ({
                category: item._id,
                count: item.count,
                percent: totalActiveForCalc > 0 ? ((item.count / totalActiveForCalc) * 100).toFixed(1) : 0
            }));

            // Frontend ko Data Bhejo
            return res.status(200).json({
                totalNews, pendingNews, activeNews, deactiveNews, writers, recentNews, categoryStats
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    get_dashboard_single_news = async (req, res) => {
        const { news_id } = req.params
        try {
            const news = await newsModel.findById(news_id)
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_all_news = async (req, res) => {
        try {
            const category_news = await newsModel.aggregate([
                { $sort: { createdAt: -1 } },
                { $match: { status: 'active' } },
                {
                    $group: {
                        _id: "$category",
                        news: { $push: { _id: '$_id', title: '$title', slug: '$slug', writerName: '$writerName', image: '$image', description: '$description', date: '$date', category: '$category' } }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        news: { $slice: ['$news', 5] }
                    }
                }
            ])

            const news = {}
            for (let i = 0; i < category_news.length; i++) {
                news[category_news[i].category] = category_news[i].news
            }
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_news = async (req, res) => {
        const { slug } = req.params
        try {
            const news = await newsModel.findOneAndUpdate({ slug }, { $inc: { count: 1 } }, { new: true })
            const relateNews = await newsModel.find({
                $and: [
                    { slug: { $ne: slug } },
                    { category: { $eq: news.category } }
                ]
            }).limit(4).sort({ createdAt: -1 })

            return res.status(200).json({ news: news ? news : {}, relateNews })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_categories = async (req, res) => {
        try {
            const categories = await newsModel.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $project: { _id: 0, category: "$_id", count: 1 } }
            ])
            return res.status(200).json({ categories })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_popular_news = async (req, res) => {
        try {
            const popularNews = await newsModel.find({ status: 'active' }).sort({ count: -1 }).limit(4)
            return res.status(200).json({ popularNews })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_latest_news = async (req, res) => {
        try {
            const news = await newsModel.find({ status: 'active' }).sort({ createdAt: -1 }).limit(4)
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_random_news_images = async (req, res) => {
        try {
            const images = await newsModel.aggregate([
                { $match: { status: 'active' } },
                { $sample: { size: 9 } },
                { $project: { image: 1 } }
            ])
            return res.status(200).json({ images })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new newsController()