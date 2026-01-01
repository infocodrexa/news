const express = require('express')
const app = express()
const dotenv = require('dotenv')
const body_parser = require('body-parser')
const cors = require('cors')
const db_connect = require('./utils/db')
const path = require('path')
const adRoutes = require('./routes/adRoutes');

dotenv.config()


app.use(body_parser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


if (process.env.mode === 'production') {
    app.use(cors())
} else {
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:3000"]
    }))
}


app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/newsRoute'))
app.get('/', (req, res) => res.send('Hello World!'))
app.use("/api", adRoutes);

const port = process.env.port

db_connect()

app.listen(port, () => console.log(`server is running on port ${port}!`))