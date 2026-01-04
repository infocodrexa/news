const express = require('express')
const app = express()
const dotenv = require('dotenv')
const body_parser = require('body-parser')
const cors = require('cors')
const db_connect = require('./utils/db')
const path = require('path')
const adRoutes = require('./routes/adRoutes'); // Screenshot ke hisab se add kiya

dotenv.config()

app.use(body_parser.json())

// ✅ Uploads folder ko sahi tarike se static banaya
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 🔥 MAIN FIX: CORS Configuration
// Humne if-else hata diya aur saare allowed domains ek saath likh diye.
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5000",
        "https://thelocalmirror.in",
        "https://www.thelocalmirror.in",
        "https://admin.thelocalmirror.in", // 👈 Ye zaroori tha Admin panel ke liye
        "https://api.thelocalmirror.in"
    ],
    credentials: true
}));

// Routes
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/newsRoute'))

// Test Route
app.get('/', (req, res) => res.send('Hello World!'))

// Ads Routes
app.use("/api", adRoutes);

const port = process.env.port || 5000 // Fallback port 

db_connect()

app.listen(port, () => console.log(`server is running on port ${port}`))
