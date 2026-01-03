// const authModel = require('../models/authModel')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// //new
// const formidable = require('formidable')
// const cloudinary = require('cloudinary').v2

// class authController {
//     login = async (req, res) => {
//         const { email, password } = req.body

//         if (!email) {
//             return res.status(404).json({ message: 'Please provide your email' })
//         }
//         if (!password) {
//             return res.status(404).json({ message: 'Please provide your password' })
//         }

//         try {
//             const user = await authModel.findOne({ email }).select('+password')
//             if (user) {
//                 const match = await bcrypt.compare(password, user.password)
//                 if (match) {
//                     const obj = {
//                         id: user.id,
//                         name: user.name,
//                         category: user.category,
//                         role: user.role,
//                         email: user.email,       // ✅ Ye line add ki hai (Email ke liye)
//                         image: user.image        // ✅ Ye bhi add kar lo (Profile Pic ke liye)
//                     }
//                     const token = await jwt.sign(obj, process.env.secret, {
//                         expiresIn: process.env.exp_time
//                     })
//                     return res.status(200).json({ message: 'login success', token })
//                 } else {
//                     return res.status(404).json({ message: 'invalid password' })
//                 }
//             } else {
//                 return res.status(404).json({ message: 'user not found' })
//             }
//         } catch (error) {
//             console.log(error)
//         }

//     }

//     // Profile Image Update Function
//    profile_image_upload = async (req, res) => {
//         const form = new formidable.IncomingForm()

//         form.parse(req, async (err, fields, files) => {
//             if (err) {
//                 return res.status(404).json({ message: 'Something went wrong' })
//             }

//             // 🔍 DEBUG: Terminal me check karo kya print hota hai
//             console.log("Files Object:", files) 

//             // Formidable v3 Handle Logic
//             // Kabhi file array me hoti hai, kabhi object me
//             let imageFile = null;
//             if (files.image) {
//                 if (Array.isArray(files.image)) {
//                     imageFile = files.image[0]; // Agar array hai to pehla item lo
//                 } else {
//                     imageFile = files.image; // Agar single object hai
//                 }
//             }

//             // Agar imageFile abhi bhi nahi mili
//             if (!imageFile) {
//                 return res.status(404).json({ message: 'Image file not found in request' })
//             }

//             console.log("File Path to Upload:", imageFile.filepath) // 🔍 Path check karo

//             const { id } = req.userInfo

//             try {
//                 cloudinary.config({
//                     cloud_name: process.env.cloud_name,
//                     api_key: process.env.api_key,
//                     api_secret: process.env.api_secret,
//                     secure: true
//                 })

//                 // Ab Cloudinary ko sahi path milega
//                 const result = await cloudinary.uploader.upload(imageFile.filepath, { folder: 'profile' })

//                 if (result) {
//                     await authModel.findByIdAndUpdate(id, {
//                         image: result.url
//                     })
                    
//                     const user = await authModel.findById(id)
//                     const obj = {
//                         id: user.id,
//                         name: user.name,
//                         category: user.category,
//                         role: user.role,
//                         email: user.email,
//                         image: user.image
//                     }
//                     const token = await jwt.sign(obj, process.env.secret, {
//                         expiresIn: process.env.exp_time
//                     })

//                     return res.status(201).json({ message: 'Profile image updated successfully', token })
//                 } else {
//                     return res.status(404).json({ message: 'Image upload failed' })
//                 }
//             } catch (error) {
//                 console.log("Cloudinary Error:", error) // Error log karo
//                 return res.status(500).json({ message: 'Internal server error' })
//             }
//         })
//     }



//     change_password = async (req, res) => {
//         const { old_password, new_password } = req.body
//         const { id } = req.userInfo // Middleware se ID milegi

//         if (!old_password || !new_password) {
//             return res.status(404).json({ message: 'Please provide both old and new password' })
//         }

//         try {
//             // User ko database se nikalo password ke saath
//             const user = await authModel.findById(id).select('+password')

//             if (user) {
//                 // Check karo purana password sahi hai ya nahi
//                 const match = await bcrypt.compare(old_password, user.password)

//                 if (match) {
//                     // Password hash karke update karo
//                     user.password = await bcrypt.hash(new_password, 10)
//                     await user.save()
//                     return res.status(200).json({ message: 'Password changed successfully' })
//                 } else {
//                     return res.status(404).json({ message: 'Old password is wrong' })
//                 }
//             } else {
//                 return res.status(404).json({ message: 'User not found' })
//             }
//         } catch (error) {
//             console.log(error)
//             return res.status(500).json({ message: 'Internal server error' })
//         }
//     }



//     add_writer = async (req, res) => {

//         const { email, name, password, category } = req.body

//         if (!name) {
//             return res.status(404).json({ message: 'please provide name' })
//         }
//         if (!password) {
//             return res.status(404).json({ message: 'please provide password' })
//         }
//         if (!category) {
//             return res.status(404).json({ message: 'please provide category' })
//         }
//         if (!email) {
//             return res.status(404).json({ message: 'please provide email' })
//         }
//         if (email && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
//             return res.status(404).json({ message: 'please provide valide email' })
//         }
//         try {
//             const writer = await authModel.findOne({ email: email.trim() })
//             if (writer) {
//                 return res.status(404).json({ message: 'User alreasy exit' })
//             } else {
//                 const new_writer = await authModel.create({
//                     name: name.trim(),
//                     email: email.trim(),
//                     password: await bcrypt.hash(password.trim(), 10),
//                     category: category.trim(),
//                     role: 'writer'
//                 })
//                 return res.status(201).json({ message: 'writer add success', writer: new_writer })
//             }
//         } catch (error) {
//             return res.status(500).json({ message: 'internal server error' })
//         }
//     }

//     // 2. Writer ko update karne ka function (Category/Role update karne ke liye)
//     writer_update = async (req, res) => {
//         const { id } = req.params
//         // 👇 Ab hum name aur email bhi le rahe hain
//         const { name, email, category } = req.body 

//         try {
//             await authModel.findByIdAndUpdate(id, {
//                 name,
//                 email,
//                 category
//             })
//             return res.status(200).json({ message: 'Writer updated successfully' })
//         } catch (error) {
//             return res.status(500).json({ message: 'Internal server error' })
//         }
//     }

//     writer_delete = async (req, res) => {
//         const { id } = req.params
//         try {
//             const writer = await authModel.findById(id)
//             if (writer) {
//                 await authModel.findByIdAndDelete(id)
//                 return res.status(200).json({ message: 'Writer deleted successfully' })
//             } else {
//                 return res.status(404).json({ message: 'Writer not found' })
//             }
//         } catch (error) {
//             return res.status(500).json({ message: 'Internal server error' })
//         }
//     }
    
//     // 3. Single Writer get karne ka function (Edit popup me purana data dikhane ke liye)
//     get_writer = async (req, res) => {
//         const { id } = req.params
//         try {
//             const writer = await authModel.findById(id)
//             return res.status(200).json({ writer })
//         } catch (error) {
//             return res.status(500).json({ message: 'Internal server error' })
//         }
//     }


//     get_writers = async (req, res) => {
//         try {
//             const writers = await authModel.find({ role: "writer" }).sort({ createdAt: -1 })
//             return res.status(200).json({ writers })
//         } catch (error) {
//             return res.status(500).json({ message: 'internal server error' })
//         }
//     }
// }

// module.exports = new authController()





const authModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs') // File delete karne ke liye
const path = require('path')

class authController {

    // login = async (req, res) => {
    //     const { email, password } = req.body

    //     if (!email) {
    //         return res.status(404).json({ message: 'Please provide your email' })
    //     }
    //     if (!password) {
    //         return res.status(404).json({ message: 'Please provide your password' })
    //     }

    //     try {
    //         const user = await authModel.findOne({ email }).select('+password')
    //         if (user) {
    //             const match = await bcrypt.compare(password, user.password)
    //             if (match) {
    //                 const obj = {
    //                     id: user.id,
    //                     name: user.name,
    //                     category: user.category,
    //                     role: user.role,
    //                     email: user.email,
    //                     image: user.image
    //                 }
    //                 const token = await jwt.sign(obj, process.env.secret, {
    //                     expiresIn: process.env.exp_time
    //                 })
    //                 return res.status(200).json({ message: 'login success', token })
    //             } else {
    //                 return res.status(404).json({ message: 'invalid password' })
    //             }
    //         } else {
    //             return res.status(404).json({ message: 'user not found' })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // 👇 PROFILE IMAGE UPLOAD (Multer Version)
    // Cloudinary Logic Hata diya hai, ab Local Storage use hoga
    
    login = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(404).json({ message: 'Please provide your email' })
    }
    if (!password) {
        return res.status(404).json({ message: 'Please provide your password' })
    }

    try {
        const user = await authModel.findOne({ email }).select('+password')
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const obj = {
                    id: user.id,
                    name: user.name,
                    category: user.category,
                    role: user.role,
                    email: user.email,
                    image: user.image
                }
                const token = await jwt.sign(obj, process.env.secret, {
                    expiresIn: process.env.exp_time
                })
                
                // 👇 Yahan humne 'role: user.role' add kar diya hai
                return res.status(200).json({ message: 'login success', token, role: user.role })
                
            } else {
                return res.status(404).json({ message: 'invalid password' })
            }
        } else {
            return res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        console.log(error)
    }
}
    profile_image_upload = async (req, res) => {
        
        try {
            const { id } = req.userInfo
            
            // Check karo kya Multer ne file pakdi hai?
            if (!req.file) {
                return res.status(404).json({ message: 'Image file not found' })
            }

            // Image URL banao
            const imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`

            // Purani image ko delete karne ka logic (Optional lekin achha hai)
            const user = await authModel.findById(id)
            if (user.image) {
                const oldImageName = user.image.split('/').pop()
                const filePath = path.join(__dirname, '../../uploads', oldImageName)
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            }

            // Database update karo
            await authModel.findByIdAndUpdate(id, {
                image: imageUrl
            })

            // Token refresh karo naye image URL ke saath
            const updatedUser = await authModel.findById(id)
            const obj = {
                id: updatedUser.id,
                name: updatedUser.name,
                category: updatedUser.category,
                role: updatedUser.role,
                email: updatedUser.email,
                image: updatedUser.image
            }
            const token = await jwt.sign(obj, process.env.secret, {
                expiresIn: process.env.exp_time
            })

            return res.status(201).json({ message: 'Profile image updated successfully', token })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    change_password = async (req, res) => {
        const { old_password, new_password } = req.body
        const { id } = req.userInfo

        if (!old_password || !new_password) {
            return res.status(404).json({ message: 'Please provide both old and new password' })
        }

        try {
            const user = await authModel.findById(id).select('+password')

            if (user) {
                const match = await bcrypt.compare(old_password, user.password)

                if (match) {
                    user.password = await bcrypt.hash(new_password, 10)
                    await user.save()
                    return res.status(200).json({ message: 'Password changed successfully' })
                } else {
                    return res.status(404).json({ message: 'Old password is wrong' })
                }
            } else {
                return res.status(404).json({ message: 'User not found' })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    add_writer = async (req, res) => {
        const { email, name, password, category } = req.body

        if (!name || !password || !category || !email) {
            return res.status(404).json({ message: 'please provide all details' })
        }
        if (email && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            return res.status(404).json({ message: 'please provide valide email' })
        }
        try {
            const writer = await authModel.findOne({ email: email.trim() })
            if (writer) {
                return res.status(404).json({ message: 'User already exit' })
            } else {
                const new_writer = await authModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password.trim(), 10),
                    category: category.trim(),
                    role: 'writer'
                })
                return res.status(201).json({ message: 'writer add success', writer: new_writer })
            }
        } catch (error) {
            return res.status(500).json({ message: 'internal server error' })
        }
    }

    writer_update = async (req, res) => {
        const { id } = req.params
        const { name, email, category } = req.body 

        try {
            await authModel.findByIdAndUpdate(id, {
                name,
                email,
                category
            })
            return res.status(200).json({ message: 'Writer updated successfully' })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    writer_delete = async (req, res) => {
        const { id } = req.params
        try {
            const writer = await authModel.findById(id)
            if (writer) {
                await authModel.findByIdAndDelete(id)
                return res.status(200).json({ message: 'Writer deleted successfully' })
            } else {
                return res.status(404).json({ message: 'Writer not found' })
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
    
    get_writer = async (req, res) => {
        const { id } = req.params
        try {
            const writer = await authModel.findById(id)
            return res.status(200).json({ writer })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    get_writers = async (req, res) => {
        try {
            const writers = await authModel.find({ role: "writer" }).sort({ createdAt: -1 })
            return res.status(200).json({ writers })
        } catch (error) {
            return res.status(500).json({ message: 'internal server error' })
        }
    }
}

module.exports = new authController()