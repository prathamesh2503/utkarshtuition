import express from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import supabase from "./supabaseClient.js";

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/teacher", upload.single("teacher-image"), async (req, res) => {
  try {
    console.log(req.body);

    const { ["teacher-name"]: name, ["about-me-description"]: description } =
      req.body;

    let imageUrl = "";
    let fileName = "";

    if (req.file) {
      const fileExt = req.file.originalname.split(".").pop();

      fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("teacher-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("teacher-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const teacher = await prisma.teacher.upsert({
      where: { id: 1 },
      update: { name, description, imageUrl },
      create: { id: 1, name, description, imageUrl },
    });

    res.json({ success: true, teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/teacher", async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: 1 } });

    res.json({ success: true, teacher });
  } catch (error) {
    console.error("Fetch error", error);
    res.status(500).json({ success: false, error: "server error" });
  }
});

router.delete("/teacher/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { imagePath } = req.body;

    if (imagePath) {
      const { data, error } = await supabase.storage
        .from("teacher-images")
        .remove([imagePath]);

      if (error) {
        console.log("Supabase delete error:", error.message);
      } else {
        console.log("Image deleted successfully", data);
      }
    }

    const teacher = await prisma.teacher.delete({ where: { id: Number(id) } });

    res.json({
      success: true,
      message: "Teacher and image deleted successfully.",
      teacher,
    });
  } catch (error) {
    console.error("Fetch error", error);
    res.status(500).json({ success: false, error: "server error" });
  }
});

export default router;
