import { PrismaClient } from "@prisma/client";
import supabase from "../supabaseClient.js"; // adjust path if needed
import multer from "multer";

// multer in memory for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const prisma = new PrismaClient();

// Utility function to parse form-data in serverless
function parseFormData(req) {
  return new Promise((resolve, reject) => {
    upload.single("student-image")(req, {}, (err) => {
      if (err) reject(err);
      else resolve(req);
    });
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // GET all students
      const students = await prisma.student.findMany();
      return res.status(200).json({ success: true, students });
    }

    if (req.method === "POST") {
      // parse multipart/form-data
      await parseFormData(req);

      const {
        ["student-name"]: studentName,
        ["student-standard"]: studentStandard,
        ["student-passout-year"]: studentPassoutYear,
        ["student-percentage"]: studentPercentage,
      } = req.body;

      let imageUrl = "";
      if (req.file) {
        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage
          .from("student-images")
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true,
          });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("student-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const newStudent = await prisma.student.create({
        data: {
          studentName,
          studentStandard,
          studentPassoutYear: parseInt(studentPassoutYear),
          studentPercentage: parseFloat(studentPercentage),
          imageUrl,
        },
      });

      return res.status(201).json({ success: true, newStudent });
    }

    if (req.method === "DELETE") {
      const studentId = req.query.id;
      const studentImagePath = decodeURIComponent(req.query.imagePath || "");

      if (studentImagePath) {
        const shortPath = studentImagePath.replace(
          "https://fshziwpwjtcmuogjlemy.supabase.co/storage/v1/object/public/student-images/",
          ""
        );
        if (shortPath) {
          const { error } = await supabase.storage
            .from("student-images")
            .remove([shortPath]);
          if (error) console.error("Supabase delete error:", error);
        }
      }

      const deletedStudent = await prisma.student.delete({
        where: { id: Number(studentId) },
      });

      return res.status(200).json({
        success: true,
        message: "Student deleted successfully.",
        students: deletedStudent,
      });
    }

    // unsupported method
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
