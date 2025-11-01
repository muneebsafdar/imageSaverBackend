import express from "express";
import upload from "../middleware/multer.js";
import protect from "../middleware/authMiddleware.js";
import {
  uploadImage,
  getUserImages,
  deleteImage,
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("image"), uploadImage);
router.get("/", protect, getUserImages);
router.delete("/:id", protect, deleteImage);

export default router;
