const router = require('express').Router()
const middleware = require('../middlewares/middleware')
const newsController = require('../controllers/newsController')

// 👇 1. Multer Import aur Setup
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Folder check
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

// 👇 SECURITY: File Filter (Sirf Images allowed hain)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif|avif|svg/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new Error('Only images are allowed!'))
    }
}

// Upload Config (Filter add kar diya)
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
})

// --- DASHBOARD ROUTES ---

// 👉 1. Add News (Middleware: upload.single)
router.post('/api/news/add', middleware.auth, upload.single('image'), newsController.add_news)

// 👉 2. Update News (Middleware: upload.single)
// Note: Frontend se field ka naam 'new_image' hona chahiye jab update kar rahe ho, ya 'image' hi rakho to yahan change kar lena
router.put('/api/news/update/:news_id', middleware.auth, upload.single('new_image'), newsController.update_news)

router.put('/api/news/status-update/:news_id', middleware.auth, newsController.update_news_update)

// 👉 3. Delete News
router.delete('/api/news/delete/:news_id', middleware.auth, newsController.news_delete)

router.get('/api/images', middleware.auth, newsController.get_images)

// 👉 4. Add Gallery Images (Middleware: upload.array for multiple files)
router.post('/api/images/add', middleware.auth, upload.array('images', 10), newsController.add_images)

router.get('/api/news', middleware.auth, newsController.get_dashboard_news)
router.get('/api/dashboard/data', middleware.auth, newsController.get_dashboard_data)
router.get('/api/news/:news_id', middleware.auth, newsController.get_dashboard_single_news)


// --- WEBSITE ROUTES ---

router.get('/api/all/news', newsController.get_all_news)
router.get('/api/popular/news', newsController.get_popular_news)
router.get('/api/latest/news', newsController.get_latest_news)
router.get('/api/images/news', newsController.get_random_news_images)
router.get('/api/recent/news', newsController.get_recent_news)

router.get('/api/news/details/:slug', newsController.get_news)
router.get('/api/category/all', newsController.get_categories)

router.get('/api/category/news/:category', newsController.get_category_news)
router.get('/api/news/tag/:tag', newsController.get_tag_news);
router.get('/api/search/news', newsController.news_search)

module.exports = router