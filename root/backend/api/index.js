import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import teacherRouter from "../teacherRoutes.js";
import studentRouter from "../studentRoutes.js";

const prisma = new PrismaClient();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
//Whenever a request comes with Content-Type: application/json, automatically parse it and store it in req.body as a JavaScript object
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// mount teacher routes (ESM import)
app.use(teacherRouter);
app.use("/api", studentRouter);

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
// Login endpoints

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user in DB
    /*
      findUnique()
      findUnique() → strictly requires a unique field (e.g., id, email).
    */
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      /* 
  status(401) refers to the HTTP status code 401 Unauthorized.

  It means:

  The client (like your browser or frontend app) made a request to the server, but the server says “you are not authorized to access this resource.”

  Usually it happens when:

  No authentication credentials (like token, username/password) are provided.

  Credentials are missing or invalid (wrong password, expired token, etc.).
*/
      return res.status(401).json({ error: "Invalid email" });
    }

    // compare password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    /*
A cookie is a small piece of data that a server sends to the browser.
The browser stores it and automatically sends it back with every request to the same server.
Cookies are often used for authentication, sessions, and tracking.

HttpOnly is a flag you can set on a cookie.
When enabled:
The cookie cannot be accessed using JavaScript (document.cookie).
Only the browser → server HTTP requests can carry it.
This protects against XSS (Cross-Site Scripting) attacks where malicious JavaScript might try to steal tokens.

Why Store Token in Cookie After Login?
You need to persist the login state so the user doesn’t have to re-login on every page refresh.

Conclusion 
We store the token in a HttpOnly cookie after login because it’s safer against XSS than localStorage and ensures the backend automatically receives the authentication proof with every request.
*/

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JavaScript from accessing cookie
      secure: false, // true in production with HTTPS
      sameSite: "strict",
    });

    res.json({ message: "Login Succesful!" }); // send JSON Response
  } catch (error) {
    console.error(error);
    /* 
status(500) means your server is returning HTTP status code 500, which stands for Internal Server Error.

Meaning:

It indicates something went wrong on the server side, not the client side.

The server couldn’t complete the request due to an unexpected error (e.g., crash, unhandled exception, database failure, etc.).

Think of 500 as: “The client made a valid request, but the server failed to handle it properly.”
*/
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// logout and listen
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout Successfully." });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
