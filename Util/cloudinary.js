const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const newCloud = async (filePath, folder = "Scarlett Marque") => {
  try {
    const upload = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      quality: "auto:good",
      fetch_format: "auto",
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { url: upload.secure_url, public_id: upload.public_id };
  } catch (err) {
    console.log("Cloudinary Upload Error:", err);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = { newCloud };
