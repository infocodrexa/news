const newsModel = require("../models/newsModel");
const authModel = require("../models/authModel");
const galleryModel = require("../models/galleryModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

class newsController {
  // 1. ADD NEWS (Local Storage Version)
  add_news = async (req, res) => {
    const { id, name } = req.userInfo;

    // User auth check
    if (!req.userInfo) {
      return res.status(401).json({ message: "User not authorized" });
    }

    try {
      // Body se fields nikalo
      const { title, slug, description, subCategory, tags, subCategorySlug } =
        req.body;

      // Category
      let category = req.body.category || req.userInfo.category;
      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }

      // Image (multer)
      let imageUrl = "";
      if (req.file) {
        imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
      } else {
        return res.status(400).json({ message: "Image is required" });
      }

      // Slug
      if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
      }

      let slugToProcess = slug && slug.trim() ? slug : title;

      const finalSlug = slugToProcess
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      // 🔥 TAGS LOGIC (Safe Check)
      let tagsArray = [];
      if (tags && typeof tags === "string" && tags.trim().length > 0) {
        tagsArray = tags.split(",").map((tag) => tag.trim());
      }

      // CREATE NEWS
      const newsData = {
        writerId: id,
        writerName: name,
        title: title.trim(),
        slug: finalSlug,
        category,
        subCategory: subCategory || "",
        subCategorySlug: subCategorySlug || "",
        tags: tagsArray,
        description,
        date: moment().format("LL"),
        image: imageUrl,
      };

      const news = await newsModel.create(newsData);

      return res.status(201).json({
        message: "News added successfully",
        news,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "This URL already exists. Please create a unique URL.",
        });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // 2. UPDATE NEWS (Local Storage + Delete Old Image)
  update_news = async (req, res) => {
    const { news_id } = req.params;

    try {
      // 1. Saare fields receive karo (Jo frontend se aa rahe hain)
      const {
        title,
        slug,
        description,
        category,
        subCategory,
        subCategorySlug, // ✅ New Field
        tags,
        old_image,
      } = req.body;

      let imageUrl = old_image; // Default: Purani image hi rakho

      // 2. Image Update Logic
      if (req.file) {
        // Nayi image ka sirf naam save karo (taaki frontend par base_url ke sath chale)
        imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
        // 🗑️ Purani Image Delete karo Server se
        if (old_image) {
          // Agar old_image URL hai to split karo, agar sirf naam hai to waisa hi lo
          const oldFileName = old_image.includes("/")
            ? old_image.split("/").pop()
            : old_image;

          const filePath = path.join(__dirname, "../../uploads", oldFileName);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }

      let slugToProcess = slug && slug.trim() ? slug : title;

      const finalSlug = slugToProcess
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "") // Special chars remove
        .replace(/\s+/g, "-") // Space ko dash
        .replace(/-+/g, "-"); // Double dash fix

      let tagsArray = tags;
      if (tags && typeof tags === "string") {
        tagsArray = tags.split(",").map((tag) => tag.trim());
      }
      // 3. Update Database
      const news = await newsModel.findByIdAndUpdate(
        news_id,
        {
          title: title.trim(),
          slug: finalSlug, // ✅ Frontend wala edited slug use karo
          description,
          image: imageUrl,
          category,
          subCategory,
          subCategorySlug,
          tags: tagsArray, // ✅ Added
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "News updated successfully", news });
    } catch (error) {
      // Agar Slug Duplicate ho gaya to
      if (error.code === 11000) {
        return res
          .status(400)
          .json({
            message: "This URL (Slug) already exists. Please try another one.",
          });
      }
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // 3. DELETE NEWS (Delete File from Folder)
  news_delete = async (req, res) => {
    const { news_id } = req.params;
    // Note: Admin bhi delete kar sake, isliye sirf writerId check nahi lagaya strict wala
    // Agar strict chahiye to user verify kar lena

    try {
      const news = await newsModel.findById(news_id);

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }

      // 🗑️ Image Delete karo uploads folder se
      if (news.image) {
        const imageName = news.image.split("/").pop();
        const filePath = path.join(__dirname, "../../uploads", imageName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await newsModel.findByIdAndDelete(news_id);
      return res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // 4. ADD IMAGES TO GALLERY (Req.files Array)
  add_images = async (req, res) => {
    const { id } = req.userInfo;

    try {
      // req.files use hoga (Array of files)
      const files = req.files;
      let allImages = [];

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const url = `${process.env.SERVER_URL}/uploads/${files[i].filename}`;
          allImages.push({ writerId: id, url });
        }

        const image = await galleryModel.insertMany(allImages);
        return res
          .status(201)
          .json({ images: image, message: "Images upload success" });
      } else {
        return res.status(400).json({ message: "No images selected" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // 5. UPDATE STATUS (Admin Only)
  update_news_update = async (req, res) => {
    const { role } = req.userInfo;
    const { news_id } = req.params;
    const { status } = req.body;

    if (role === "admin") {
      const news = await newsModel.findByIdAndUpdate(
        news_id,
        { status },
        { new: true }
      );
      return res.status(200).json({ message: "News status updated", news });
    } else {
      return res.status(401).json({ message: "Access Denied" });
    }
  };

  // --- GET FUNCTIONS (No Changes needed here) ---

  get_images = async (req, res) => {
    const { id } = req.userInfo;
    try {
      const images = await galleryModel
        .find({ writerId: new ObjectId(id) })
        .sort({ createdAt: -1 });
      return res.status(201).json({ images });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_recent_news = async (req, res) => {
    try {
      const news = await newsModel
        .find({ status: "active" })
        .sort({ createdAt: -1 })
        .skip(6)
        .limit(6);
      return res.status(201).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_category_news = async (req, res) => {
    const { category } = req.params;
    try {
      // 1. Saari News nikalo (Ye to same hai)
      const news = await newsModel
        .find({
          category: { $eq: category },
          status: { $eq: "active" },
        })
        .sort({ createdAt: -1 });

      // 2. 🔥 NEW: SubCategories nikalo (Sorted by Latest Activity)
      // Hum check karenge ki kis topic par abhi news dali gayi hai
      const subCategoriesData = await newsModel.aggregate([
        {
          $match: {
            category: category,
            status: "active",
            subCategory: { $exists: true, $ne: "" }, // Empty wale hata do
          },
        },
        {
          $group: {
            _id: "$subCategory", // SubCategory naam se group karo
            latestActivity: { $max: "$createdAt" }, // Dekho sabse latest kab use hua
          },
        },
        {
          $sort: { latestActivity: -1 }, // 🔥 Latest date wale ko sabse upar rakho
        },
        {
          $project: {
            _id: 0,
            name: "$_id", // Sirf naam return karo
          },
        },
      ]);

      // 3. Array ko clean format mein convert karo: ["Cricket", "Football"]
      const subCategories = subCategoriesData.map((item) => item.name);

      // 4. Response bhej do
      return res.status(200).json({
        news,
        subCategories,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_tag_news = async (req, res) => {
    const { tag } = req.params;
    try {
      const news = await newsModel
        .find({
          status: "active",
          // ✅ 2. Regex use karo ($in ki jagah)
          // Isse 'Cricket' aur 'cricket' dono match honge
          tags: { $regex: tag, $options: "i" },
        })
        .sort({ createdAt: -1 });

      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  news_search = async (req, res) => {
    const { value } = req.query;
    try {
      const news = await newsModel.find({
        status: "active",
        $text: { $search: value },
      });
      return res.status(201).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_dashboard_news = async (req, res) => {
    const { id, role } = req.userInfo;
    try {
      if (role === "admin") {
        const news = await newsModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ news });
      } else {
        const news = await newsModel
          .find({ writerId: new ObjectId(id) })
          .sort({ createdAt: -1 });
        return res.status(200).json({ news });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_dashboard_data = async (req, res) => {
    const { id, role } = req.userInfo;

    try {
      // 1. Basic Counts (Numbers)
      let totalNews = 0,
        pendingNews = 0,
        activeNews = 0,
        deactiveNews = 0,
        writers = 0,
        recentNews = [];

      if (role === "admin") {
        totalNews = await newsModel.find({}).countDocuments();
        pendingNews = await newsModel
          .find({ status: "pending" })
          .countDocuments();
        activeNews = await newsModel
          .find({ status: "active" })
          .countDocuments();
        deactiveNews = await newsModel
          .find({ status: "deactive" })
          .countDocuments();
        writers = await authModel.find({ role: "writer" }).countDocuments();
        // Recent 5 News
        recentNews = await newsModel.find({}).sort({ createdAt: -1 }).limit(5);
      } else {
        // Writer ke liye sirf uska data
        totalNews = await newsModel.find({ writerId: id }).countDocuments();
        pendingNews = await newsModel
          .find({ writerId: id, status: "pending" })
          .countDocuments();
        activeNews = await newsModel
          .find({ writerId: id, status: "active" })
          .countDocuments();
        deactiveNews = await newsModel
          .find({ writerId: id, status: "deactive" })
          .countDocuments();
        recentNews = await newsModel
          .find({ writerId: id })
          .sort({ createdAt: -1 })
          .limit(5);
      }

      // 2. Category Graph Logic (Progress Bars Data)
      // Sirf wahi news count karo jo 'active' hain
      let matchCondition = {};

      if (role === "writer") {
        // 👇 MAIN FIX: ID ko Mongoose ObjectId mein convert karna zaroori hai aggregation ke liye
        matchCondition = { writerId: new mongoose.Types.ObjectId(id) };
      } else {
        // Admin sirf Active news ka chart dekhega
        matchCondition = { status: "active" };
      }

      const categoryData = await newsModel.aggregate([
        { $match: matchCondition },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }, // Zayada wali upar
      ]);

      // Percentage Math
      const totalActiveForCalc = categoryData.reduce(
        (sum, item) => sum + item.count,
        0
      );

      const categoryStats = categoryData.map((item) => ({
        category: item._id,
        count: item.count,
        percent:
          totalActiveForCalc > 0
            ? ((item.count / totalActiveForCalc) * 100).toFixed(1)
            : 0,
      }));

      // Frontend ko Data Bhejo
      return res.status(200).json({
        totalNews,
        pendingNews,
        activeNews,
        deactiveNews,
        writers,
        recentNews,
        categoryStats,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_dashboard_single_news = async (req, res) => {
    const { news_id } = req.params;
    try {
      const news = await newsModel.findById(news_id);
      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // get_all_news = async (req, res) => {
  //     try {
  //         const category_news = await newsModel.aggregate([
  //             { $sort: { createdAt: -1 } },
  //             { $match: { status: 'active' } },
  //             {
  //                 $group: {
  //                     _id: "$category",
  //                     news: { $push: { _id: '$_id', title: '$title', slug: '$slug', writerName: '$writerName', image: '$image', description: '$description', date: '$date', category: '$category' } }
  //                 }
  //             },
  //             {
  //                 $project: {
  //                     _id: 0,
  //                     category: '$_id',
  //                     news: { $slice: ['$news', 5] }
  //                 }
  //             }
  //         ])

  //         const news = {}
  //         for (let i = 0; i < category_news.length; i++) {
  //             news[category_news[i].category] = category_news[i].news
  //         }
  //         return res.status(200).json({ news })
  //     } catch (error) {
  //         console.log(error.message)
  //         return res.status(500).json({ message: 'Internal server error' })
  //     }
  // }

  // get_news = async (req, res) => {
  //     const { slug } = req.params
  //     try {
  //         const news = await newsModel.findOneAndUpdate({ slug }, { $inc: { count: 1 } }, { new: true })
  //         const relateNews = await newsModel.find({
  //             $and: [
  //                 { slug: { $ne: slug } },
  //                 { category: { $eq: news.category } }
  //             ]
  //         }).limit(4).sort({ createdAt: -1 })

  //         return res.status(200).json({ news: news ? news : {}, relateNews })
  //     } catch (error) {
  //         console.log(error.message)
  //         return res.status(500).json({ message: 'Internal server error' })
  //     }
  // }

  get_all_news = async (req, res) => {
    try {
      const category_news = await newsModel.aggregate([
        { $match: { status: "active" } }, // 1. Sirf active news lo
        { $sort: { createdAt: -1 } }, // 2. Latest news upar rakho
        {
          $group: {
            _id: "$category",
            // 🔥 Nayi news ko hamesha list ke shuruat mein "push" karo
            news: {
              $push: {
                _id: "$_id",
                title: "$title",
                slug: "$slug",
                writerName: "$writerName",
                image: "$image",
                description: "$description",
                date: "$date",
                category: "$category",
                subCategory: "$subCategory",
                tags: "$tags",
                createdAt: "$createdAt",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            // 🔥 Yahan slice karne se pehle ye ensure hota hai ki pehli 5 latest hain
            news: { $slice: ["$news", 5] },
          },
        },
      ]);

      const news = {};
      for (let i = 0; i < category_news.length; i++) {
        news[category_news[i].category] = category_news[i].news;
      }
      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


//   get_news = async (req, res) => {
//     const { slug } = req.params;
//     try {
//       // 1. News dhoondo aur uska 'count' (views) 1 se badhao
//       const news = await newsModel.findOneAndUpdate(
//         { slug },
//         { $inc: { count: 1 } },
//         { new: true }
//       );

//       // Agar news nahi mili toh khali object bhej do
//       if (!news) {
//         return res.status(404).json({ message: "News not found" });
//       }

//       // 2. Usi category ki dusri news dhoondo (Related News)
//       // Lekin current news ko exclude (bahar) kar do
//       const relateNews = await newsModel
//         .find({
//           $and: [
//             { slug: { $ne: slug } }, // Current news ko mat dikhao
//             { category: { $eq: news.category } }, // Same category honi chahiye
//           ],
//         })
//         .limit(4)
//         .sort({ createdAt: -1 }); // Latest 4 news lao

//       // 3. Final response bhej do
//       return res.status(200).json({
//         news: news,
//         relateNews,
//       });
//     } catch (error) {
//       console.log("Backend Error:", error.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

   get_news = async (req, res) => {
  const { slug } = req.params;
  try {
    // 1. News dhoondo aur uska 'count' (views) 1 se badhao
    // ✅ Extra: sirf 'active' news allow
    const news = await newsModel.findOneAndUpdate(
      { slug, status: "active" },
      { $inc: { count: 1 } },
      { new: true }
    );

    // Agar news nahi mili ya active nahi hai
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // 2. Usi category ki dusri news dhoondo (Related News)
    // ✅ Extra: related news bhi sirf 'active'
    const relateNews = await newsModel
      .find({
        $and: [
          { slug: { $ne: slug } },           // Current news ko mat dikhao
          { category: { $eq: news.category } }, // Same category
          { status: "active" },               // Extra condition
        ],
      })
      .limit(4)
      .sort({ createdAt: -1 });

    // 3. Final response
    return res.status(200).json({
      news: news,
      relateNews,
    });
  } catch (error) {
    console.log("Backend Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  get_categories = async (req, res) => {
    try {
        const categories = await newsModel.aggregate([
            { $match: { status: 'active' } }, 
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
      const popularNews = await newsModel
        .find({ status: "active" })
        .sort({ count: -1 })
        .limit(4);
      return res.status(200).json({ popularNews });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_latest_news = async (req, res) => {
    try {
      const news = await newsModel
        .find({ status: "active" })
        .sort({ createdAt: -1 })
        .limit(4);
      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_random_news_images = async (req, res) => {
    try {
      const images = await newsModel.aggregate([
        { $match: { status: "active" } },
        { $sample: { size: 9 } },
        { $project: { image: 1 } },
      ]);
      return res.status(200).json({ images });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new newsController();
