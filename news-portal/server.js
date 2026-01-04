const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const db_connect = require("./utils/db");
const adRoutes = require("./routes/adRoutes");

dotenv.config();
const app = express();

app.use(cors({
    origin: ["https://thelocalmirror.in", "https://www.thelocalmirror.in", "https://admin.thelocalmirror.in"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
// Routes
app.use("/", require("./routes/authRoutes"));  // <--- Wapas "/" kar diya
app.use("/api", require("./routes/newsRoute"));   // <--- Wapas "/" kar diya
app.use("/api", adRoutes);                     // <--- Isko aise hi rehne dein

app.get("/", (req, res) => res.send("API is Working! Devloped by CodRexa"));

const PORT = process.env.PORT || 5000;
db_connect();
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
