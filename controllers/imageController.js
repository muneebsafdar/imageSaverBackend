import cloudinary from "../config/cloudinary.js";
import Image from "../models/imageModel.js";

// ✅ Upload Image
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: "mern-image-saver" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        const newImage = await Image.create({
          user: req.user._id,
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });

        res.status(201).json(newImage);
      }
    );

    // send the file buffer to Cloudinary stream
    uploadResult.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Images for Logged-In User
export const getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user._id });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // delete from MongoDB
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
