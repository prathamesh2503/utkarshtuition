import express from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import supabase from "./supabaseClient.js";

//router = a mini Express app used to organize routes and middleware, later mounted on the main app.
const router = express.Router();
// multer: Keeps files in memory (RAM) as buffer object instead of local disk.
const upload = multer({ storage: multer.memoryStorage() });

const prisma = new PrismaClient();
//.post() = “run this code when someone sends me new data at this endpoint.”

// get all students data and send to frontend
router.get("/student", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/student", upload.single("student-image"), async (req, res) => {
  try {
    const {
      ["student-name"]: studentName,
      ["student-standard"]: studentStandard,
      ["student-passout-year"]: studentPassoutYear,
      ["student-percentage"]: studentPercentage,
    } = req.body;

    let fileName = "";
    let imageUrl = "";
    if (req.file) {
      // this creates unique file to avoid override of any other file
      const fileExt = req.file.originalname.split(".").pop();
      fileName = `${Date.now()}.${fileExt}`;

      // Upload image to supabase storage
      const { data, error } = await supabase.storage
        .from("student-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true, // Overright if same name
        });

      if (error) throw error;

      // Generate a public URL for uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("student-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

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
    res.status(500).json({ error: error.message });
  }
});

router.delete("/student/:id", async (req, res) => {
  try {
    console.log("Received delete request");
    console.log("req.params.id:", req.params.id);
    console.log("req.body:", req.body);

    const studentId = req.params.id;
    const studentImagePath = decodeURIComponent(req.query.imagePath || "");

    console.log("studentImagePath:", studentImagePath);

    if (!studentImagePath) {
      console.log("No image path provided.");
    }

    console.log(studentImagePath);
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
