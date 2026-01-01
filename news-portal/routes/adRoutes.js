const router = require('express').Router();
const adController = require('../controllers/adController');
const middleware = require('../middlewares/middleware'); // Auth middleware

// 👇 1. Multer Import aur Setup (Auth routes ki tarah same logic)
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Images 'uploads' folder me jayengi
    },
    filename: function (req, file, cb) {
        // File ka naam: timestamp + extension (Simple & Clean)
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


// --- ROUTES ---

// 1. Create Ad (Admin Only) - Image Upload ke sath
router.post(
    '/admin/ads/add', 
    middleware.auth, 
    middleware.role, 
    upload.single('image'), // <--- Multer Middleware yaha hai
    adController.add_ad
);

// 2. Get Active Ads (Public - Website ke liye)
router.get('/ads/active', adController.get_active_ad);

// 3. Get All Ads (Admin Panel List)
router.get('/admin/ads/all', middleware.auth, middleware.role, adController.get_all_ads_admin);

// 4. Delete Ad (Admin Only)
router.delete('/admin/ads/delete/:id', middleware.auth, middleware.role, adController.delete_ad);

module.exports = router;