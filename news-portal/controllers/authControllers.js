const newsModel = require("../models/newsModel");
const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs"); // File delete karne ke liye
const path = require("path");

class authController {
  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({ message: "Please provide your email" });
    }
    if (!password) {
      return res.status(404).json({ message: "Please provide your password" });
    }

    try {
      const user = await authModel.findOne({ email }).select("+password");
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const obj = {
            id: user.id,
            name: user.name,
            category: user.category,
            role: user.role,
            email: user.email,
            image: user.image,
            description: user.description,
            social: user.social,
          };
          const token = await jwt.sign(obj, process.env.secret, {
            expiresIn: process.env.exp_time,
          });

          //  Yahan humne 'role: user.role' add kar diya hai
          return res
            .status(200)
            .json({ message: "login success", token, role: user.role });
        } else {
          return res.status(404).json({ message: "invalid password" });
        }
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  UPDATED: profile_info_update function
    profile_info_update = async (req, res) => {
        const { id } = req.userInfo;
        //  Social links bhi extract karo
        const { name, description, facebook, twitter, instagram } = req.body; 

        try {
            let imageUrl = req.body.old_image;

            if (req.file) {
                imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
                if (req.body.old_image) {
                    const oldImageName = req.body.old_image.split('/').pop();
                    const filePath = path.join(__dirname, '../../uploads', oldImageName);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            }

            // 👇 Database Update Logic
            const user = await authModel.findByIdAndUpdate(id, {
                name: name.trim(),
                description: description,
                image: imageUrl,
                // 👇 Social object update karo
                social: {
                    facebook: facebook || "", 
                    twitter: twitter || "", 
                    instagram: instagram || ""
                }
            }, { new: true });

            const obj = {
                id: user.id,
                name: user.name,
                category: user.category,
                role: user.role,
                email: user.email,
                image: user.image,
                description: user.description,
                social: user.social
            }
            const token = await jwt.sign(obj, process.env.secret, { expiresIn: process.env.exp_time });

            return res.status(200).json({ message: 'Profile updated successfully', token, user });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    //  2. PUBLIC PAGE: WRITER + USKI SAARI NEWS
    get_public_profile = async (req, res) => {
        const { id } = req.params; // URL se writer ki ID aayegi

        try {
            // A. Writer ki details (Password hata ke)
            const writer = await authModel.findById(id).select('-password');
            
            if (!writer) {
                return res.status(404).json({ message: "Writer not found" });
            }

            // B. Us writer ki Active News
            const news = await newsModel.find({ 
                writerId: id, 
                status: 'active' 
            }).sort({ createdAt: -1 });

            // C. Dono bhej do
            return res.status(200).json({ writer, news });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

  profile_image_upload = async (req, res) => {
    try {
      const { id } = req.userInfo;

      // Check karo kya Multer ne file pakdi hai?
      if (!req.file) {
        return res.status(404).json({ message: "Image file not found" });
      }

      // Image URL banao
      const imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;

      // Purani image ko delete karne ka logic (Optional lekin achha hai)
      const user = await authModel.findById(id);
      if (user.image) {
        const oldImageName = user.image.split("/").pop();
        const filePath = path.join(__dirname, "../../uploads", oldImageName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Database update karo
      await authModel.findByIdAndUpdate(id, {
        image: imageUrl,
      });

      // Token refresh karo naye image URL ke saath
      const updatedUser = await authModel.findById(id);
      const obj = {
        id: updatedUser.id,
        name: updatedUser.name,
        category: updatedUser.category,
        role: updatedUser.role,
        email: updatedUser.email,
        image: updatedUser.image,
      };
      const token = await jwt.sign(obj, process.env.secret, {
        expiresIn: process.env.exp_time,
      });

      return res
        .status(201)
        .json({ message: "Profile image updated successfully", token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  change_password = async (req, res) => {
    const { old_password, new_password } = req.body;
    const { id } = req.userInfo;

    if (!old_password || !new_password) {
      return res
        .status(404)
        .json({ message: "Please provide both old and new password" });
    }

    try {
      const user = await authModel.findById(id).select("+password");

      if (user) {
        const match = await bcrypt.compare(old_password, user.password);

        if (match) {
          user.password = await bcrypt.hash(new_password, 10);
          await user.save();
          return res
            .status(200)
            .json({ message: "Password changed successfully" });
        } else {
          return res.status(404).json({ message: "Old password is wrong" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  add_writer = async (req, res) => {
    const { email, name, password, category } = req.body;

    if (!name || !password || !category || !email) {
      return res.status(404).json({ message: "please provide all details" });
    }
    if (email && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      return res.status(404).json({ message: "please provide valide email" });
    }
    try {
      const writer = await authModel.findOne({ email: email.trim() });
      if (writer) {
        return res.status(404).json({ message: "User already exit" });
      } else {
        const new_writer = await authModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password.trim(), 10),
          category: category.trim(),
          role: "writer",
        });
        return res
          .status(201)
          .json({ message: "writer add success", writer: new_writer });
      }
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    }
  };

  writer_update = async (req, res) => {
    const { id } = req.params;
    const { name, email, category } = req.body;

    try {
      await authModel.findByIdAndUpdate(id, {
        name,
        email,
        category,
      });
      return res.status(200).json({ message: "Writer updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  writer_delete = async (req, res) => {
    const { id } = req.params;
    try {
      const writer = await authModel.findById(id);
      if (writer) {
        await authModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Writer deleted successfully" });
      } else {
        return res.status(404).json({ message: "Writer not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_writer = async (req, res) => {
    const { id } = req.params;
    try {
      const writer = await authModel.findById(id);
      return res.status(200).json({ writer });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_writers = async (req, res) => {
    try {
      const writers = await authModel
        .find({ role: "writer" })
        .sort({ createdAt: -1 });
      return res.status(200).json({ writers });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    }
  };
}

module.exports = new authController();
