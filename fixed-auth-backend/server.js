import "dotenv/config";
import process from "node:process";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import teacherRouter from "./teacherRoutes.js";
import studentRouter from "./studentRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(teacherRouter);
app.use("/api", studentRouter);

const requestRateLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(requestRateLimiter);

app.post("/login", async (loginReq, loginRes) => {
  try {
    const { email, password } = loginReq.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return loginRes.status(401).json({ error: "Invalid email" });
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return loginRes.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    loginRes.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    loginRes.json({ message: "Login Succesful!" });
  } catch {
    loginRes.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout Successfully." });
});
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
