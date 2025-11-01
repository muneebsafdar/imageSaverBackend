import multer from "multer";

const storage = multer.memoryStorage(); // store image in memory before sending to Cloudinary

const upload = multer({ storage });

export default upload;
