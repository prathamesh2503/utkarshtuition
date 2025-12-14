import "dotenv/config";
import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import helmet from "helmet";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import teacherRouter from "../teacherRoutes.js";
import studentRouter from "../studentRoutes.js";

const prisma = new PrismaClient();
const app = express();

// Single User Login State

let isLoggedIn = false;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://utkarshtuition.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
// app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: ipKeyGenerator,
});
app.use(limiter);

app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend root!");
});

app.get("/api", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid email" });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ error: "Invalid password" });

    // const token = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    // });

    isLoggedIn = true;

    res.json({ message: "Login Successful!", authenticated: true });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/logout", (req, res) => {
  // res.clearCookie("token");
  isLoggedIn = false;
  res.json({ message: "Logout Successful.", authenticated: false });
});

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}

// Disconnect Prisma after execution to avoid timeout
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default app;
