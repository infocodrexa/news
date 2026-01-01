const adModel = require('../models/adModel');
const fs = require('fs');
const path = require('path');

class adController {

    // 1. Ad Create karna (Multer - Local Storage)
    add_ad = async (req, res) => {
        
        try {
            const { title, redirectLink, position } = req.body;

            // Check karo image aayi hai ya nahi
            if (!req.file) {
                return res.status(400).json({ message: "Image is required" });
            }

            // URL Construction (Jaise AuthController me kiya tha)
            // .env me SERVER_URL hona chahiye (eg: http://localhost:5000)
            const imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;

            // Database Save
            const ad = await adModel.create({
                title: title ? title.trim() : '',
                imageUrl: imageUrl, 
                redirectLink: redirectLink ? redirectLink.trim() : '#',
                position: position ? position : 'home',
                active: true
            });

            return res.status(201).json({ message: "Ad created successfully", ad });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // 2. Get All Ads (Admin)
    get_all_ads_admin = async (req, res) => {
        try {
            const ads = await adModel.find().sort({ createdAt: -1 });
            return res.status(200).json(ads);
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }

    // 3. Delete Ad (Database + Local File Delete logic)
    delete_ad = async (req, res) => {
        const { id } = req.params;
        try {
            const ad = await adModel.findById(id);
            
            if (ad) {
                // 1. Local folder se image delete karo (Server clean rakhne ke liye)
                if (ad.imageUrl) {
                    const imageName = ad.imageUrl.split('/').pop(); // URL se filename nikala
                    const filePath = path.join(__dirname, '../../uploads', imageName); // Path banaya
                    
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath); // Delete file
                    }
                }

                // 2. Database se delete karo
                await adModel.findByIdAndDelete(id);
                return res.status(200).json({ message: "Ad deleted successfully" });
            } else {
                return res.status(404).json({ message: "Ad not found" });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error" });
        }
    }

    // 4. Get Active Ad (Frontend)
    get_active_ad = async (req, res) => {
        try {
            const { position } = req.query; 
            const query = { active: true };
            if(position) query.position = position;

            // Randomly ek ad select karne ka logic (Optional, ya list bhejo)
            // Abhi list bhej rahe hain latest upar
            const ads = await adModel.find(query).sort({ createdAt: -1 });
            return res.status(200).json(ads); 
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new adController();