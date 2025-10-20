import { PrismaClient } from "@prisma/client";
import supabase from "../supabaseClient.js"; // adjust path if needed
import multer from "multer";

// multer in memory for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const prisma = new PrismaClient();

// Utility function to parse multipart/form-data in serverless
function parseFormData(req) {
  return new Promise((resolve, reject) => {
    upload.single("teacher-image")(req, {}, (err) => {
      if (err) reject(err);
      else resolve(req);
    });
  });
}

export default async function handler(req, res) {
  try {
    // ---------------- GET Teacher ----------------
    if (req.method === "GET") {
      const teacher = await prisma.teacher.findUnique({ where: { id: 1 } });
      return res.status(200).json({ success: true, teacher });
    }

    // ---------------- POST Teacher ----------------
    if (req.method === "POST") {
      await parseFormData(req);

      const { ["teacher-name"]: name, ["about-me-description"]: description } =
        req.body;

      let imageUrl = "";

      if (req.file) {
        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

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

      return res.status(201).json({ success: true, teacher });
    }

    // ---------------- DELETE Teacher ----------------
    if (req.method === "DELETE") {
      const { id } = req.query; // use query params for serverless
      const imagePath = req.query.imagePath || "";

      if (imagePath) {
        const { error } = await supabase.storage
          .from("teacher-images")
          .remove([imagePath]);

        if (error) console.log("Supabase delete error:", error.message);
      }

      const teacher = await prisma.teacher.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({
        success: true,
        message: "Teacher and image deleted successfully.",
        teacher,
      });
    }

    // ---------------- Method Not Allowed ----------------
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
