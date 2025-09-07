import express from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import supabase from "./supabaseClient.js";

const router = express.Router();
const prisma = new PrismaClient();

// multer: Keeps files in memory (RAM) as buffer object instead of local disk.
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/teacher", upload.single("teacher-image"), async (req, res) => {
  try {
    const { ["teacher-name"]: name, ["about-me-description"]: description } =
      req.body;

    let imageUrl = "";
    let fileName = "";

    if (req.file) {
      const fileExt = req.file.originalname.split(".").pop();
      // this creates unique file to avoid override of any other file
      fileName = `${Date.now()}.${fileExt}`;

      // Upload image to supabase storage
      const { data, error } = await supabase.storage
        .from("teacher-images")
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (error) throw error;

      // Generate a public URL for uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("teacher-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // Insert into database
    const teacher = await prisma.teacher.create({
      data: {
        name,
        description,
        imageUrl,
      },
    });

    res.json({ success: true, teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ✅ Use ESM default export (not CommonJS)
export default router;
