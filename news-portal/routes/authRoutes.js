const router = require('express').Router()
const authController = require('../controllers/authControllers') // File name check karlena (authController.js hai ya authControllers.js)
const middleware = require('../middlewares/middleware')

// 👇 1. Multer Import aur Setup (Image Upload ke liye)
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Images 'uploads' folder mein jayengi
    },
    filename: function (req, file, cb) {
        // File ka naam: timestamp + extension
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })


// --- ROUTES ---

router.post('/api/login', authController.login)

// 👇 2. Yahan 'upload.single' add kiya hai
// Frontend se field ka naam 'image' hona chahiye
router.post('/api/profile-image-upload', middleware.auth, upload.single('image'), authController.profile_image_upload) 

router.post('/api/change-password', middleware.auth, authController.change_password)

router.post('/api/news/writer/add', middleware.auth, middleware.role, authController.add_writer)

router.delete('/api/writer/delete/:id', middleware.auth, authController.writer_delete)

router.put('/api/writer/update/:id', middleware.auth, authController.writer_update)

router.get('/api/writer/get/:id', middleware.auth, authController.get_writer)

router.get('/api/news/writers', middleware.auth, middleware.role, authController.get_writers)


router.post('/api/profile/update', middleware.auth, upload.single('image'), authController.profile_info_update)

router.get('/api/public/writer/:id', authController.get_public_profile)

module.exports = router