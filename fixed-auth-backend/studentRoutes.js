import express from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import supabase from "./supabaseClient.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const prisma = new PrismaClient();

router.get("/student", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ success: true, students });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/student", upload.single("student-image"), async (req, res) => {
  try {
    const studentId = req.body["student-id"]
      ? Number(req.body["student-id"])
      : null;

    const existingStudent = studentId
      ? await prisma.student.findUnique({ where: { id: studentId } })
      : null;

    if (studentId && !existingStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const {
      ["student-name"]: studentName,
      ["student-standard"]: studentStandard,
      ["student-passout-year"]: studentPassoutYear,
      ["student-percentage"]: studentPercentage,
    } = req.body;

    let imageFileName = "";
    let imageUrl = existingStudent?.imageUrl ?? "";

    if (req.file) {
      const imageFileExt = req.file.originalname.split(".").pop();
      imageFileName = `${Date.now()}.${imageFileExt}`;

      const { error } = await supabase.storage
        .from("student-images")
        .upload(imageFileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) throw error;
      console.log(error);
      const { data: publicUrlData } = supabase.storage
        .from("student-images")
        .getPublicUrl(imageFileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const studentData = {
      studentName: studentName,
      studentStandard: studentStandard,
      studentPassoutYear: parseInt(studentPassoutYear),
      studentPercentage: parseFloat(studentPercentage),
      imageUrl: imageUrl,
    };

    const newStudent = existingStudent
      ? await prisma.student.update({
          where: { id: studentId },
          data: studentData,
        })
      : await prisma.student.create({ data: studentData });

    res.json({ success: true, newStudent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentImagePath = decodeURIComponent(req.query.imagePath || "");

    if (!studentImagePath) {
      console.log("No image path provided.");
    }

    const shortPath = studentImagePath
      ? studentImagePath.replace(
          "https://fshziwpwjtcmuogjlemy.supabase.co/storage/v1/object/public/student-images/",
          "",
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
