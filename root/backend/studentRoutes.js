import express from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import supabase from "./supabaseClient.js";

// router = a mini Express app used to organize routes and middleware, later mounted on the main app.
const router = express.Router();

// multer: Keeps files in memory (RAM) as buffer object instead of local disk.
const upload = multer({ storage: multer.memoryStorage() });

const prisma = new PrismaClient();

// Get all students data and send to frontend
router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add a new student

router.post("/", upload.single("student-image"), async (req, res) => {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log(
    "SERVICE ROLE KEY EXISTS:",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log(
    "SUPABASE KEY PREFIX:",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10)
  );

  console.log("CLIENT KEY PREFIX:", supabase.supabaseKey?.slice(0, 10));

  try {
    const {
      ["student-name"]: studentName,
      ["student-standard"]: studentStandard,
      ["student-passout-year"]: studentPassoutYear,
      ["student-percentage"]: studentPercentage,
    } = req.body;

    let fileName = "";
    let imageUrl = "";

    if (!req.file) {
      return res.status(400).json({ error: "No file received by backend" });
    }

    if (req.file) {
      // this creates unique file to avoid override of any other file
      const fileExt = req.file.originalname.split(".").pop();
      fileName = `${Date.now()}.${fileExt}`;
      // Upload image to Supabase storage
      const { data, error } = await supabase.storage
        .from("student-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true, // Overwrite if same name
        });

      if (error) throw error;

      // Generate a public URL for uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("student-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicURL;
    }
    console.log("ImageURL:", imageUrl);
    const newStudent = await prisma.student.create({
      data: {
        studentName: studentName,
        studentStandard: studentStandard,
        studentPassoutYear: parseInt(studentPassoutYear),
        studentPercentage: parseFloat(studentPercentage),
        imageUrl: imageUrl,
      },
    });

    res.json({ success: true, newStudent });
  } catch (error) {
    console.error("🔥 Student Upload Error:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentImagePath = decodeURIComponent(req.query.imagePath || "");

    if (!studentImagePath) {
      console.log("No image path provided.");
    }

    const shortPath = studentImagePath
      ? studentImagePath.replace(
          "https://fshziwpwjtcmuogjlemy.supabase.co/storage/v1/object/public/student-images/",
          ""
        )
      : null;

    if (shortPath) {
      const { data, error } = await supabase.storage
        .from("student-images")
        .remove([shortPath]);

      if (error) {
        console.error("Supabase delete error:", error);
      } else {
        console.log("Image deleted successfully:", data);
      }
    }

    const deleteStudent = await prisma.student.delete({
      where: { id: Number(studentId) },
    });

    console.log(deleteStudent);

    res.json({
      success: true,
      message: "Student deleted successfully.",
      students: deleteStudent,
    });
  } catch (error) {
    console.error("Fetch Error", error);
    res.status(500).json({ success: false, error: "server error" });
  }
});

export default router;
