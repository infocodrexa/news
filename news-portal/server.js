const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const db_connect = require("./utils/db");

// Routes Import
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoute");
const adRoutes = require("./routes/adRoutes");

dotenv.config();
const app = express();

// CORS Settings (Sabhi zaruri domains allowed hain)
app.use(cors({
    origin: [
        "https://thelocalmirror.in",
        "https://www.thelocalmirror.in",
        "https://admin.thelocalmirror.in",
        "https://api.thelocalmirror.in",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5000",
          "https://thelocalmirror.com",
        "https://www.thelocalmirror.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors()); // Preflight requests handle karne ke liye

// 🔥 Limit badhakar 50MB kar do
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Uploads Folder Static Serve (Images dikhane ke liye zaroori)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// 1. AUTH ROUTES (Login)
app.use("/", authRoutes);      // Agar frontend '/api/login' bheje
app.use("/api", authRoutes);   // Agar frontend '/api/api/login' bheje

// 2. NEWS ROUTES (News, Gallery, Add News)
app.use("/", newsRoutes);      // Agar frontend '/api/all/news' bheje
app.use("/api", newsRoutes);   // Agar frontend '/api/api/all/news' bheje

// 3. AD ROUTES (Ads - Ye sabse important hai)
// Frontend code '/api/ads/active' call kar raha hai, isliye ye fix zaroori hai.
app.use("/", adRoutes);        // Agar '/ads/active' call ho
app.use("/api", adRoutes);     // Agar '/api/ads/active' call ho

/* ====================================================== */

app.get('/', (req, res) => {
    res.redirect('https://thelocalmirror.in'); 
});

const PORT = process.env.PORT || 5000;
db_connect();
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
