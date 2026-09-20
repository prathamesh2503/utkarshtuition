import "dotenv/config";

import express from "express";

import cors from "cors";

//Middleware that parses the Cookie header on incoming HTTP requests and populates req.cookies with an object keyed by the cookie names, making it easier to read session IDs or auth tokens.
import cookieParser from "cookie-parser";

//A library for hashing passwords using the bcrypt algorithm. It automatically generates a "salt" (random data) and hashes the password multiple times to mitigate brute-force and rainbow-table attacks.
import bcrypt from "bcrypt";

//An implementation of JSON Web Tokens used for stateless authentication. It allows the server to cryptographically sign a payload (like a user ID) and verify it on subsequent requests without needing to query a session database.
import jwt from "jsonwebtoken";

//A collection of 15 smaller middleware functions that secure the Express app by setting various HTTP response headers (such as Content-Security-Policy and X-Frame-Options) to prevent vulnerabilities like Cross-Site Scripting (XSS) and clickjacking.
import helmet from "helmet";

//Middleware used to limit repeated requests to public APIs. It tracks IP addresses and blocks them temporarily if they exceed a set threshold, serving as a basic defense against Denial of Service (DoS) and brute-force attacks.
import rateLimit from "express-rate-limit";

import { PrismaClient } from "@prisma/client";

//A separate folder of instructions specifically for handling anything teachers can do in your app (like adding grades or updating classes). Imports an Express router instance from a local file containing the specific endpoint handlers (GET, POST, PUT, DELETE) related to teacher resources, keeping the codebase modular.
import teacherRouter from "./teacherRoutes.js";

//Imports an Express router instance from a local file containing the specific API endpoint handlers related to student resources.
import studentRouter from "./studentRoutes.js";

const prisma = new PrismaClient();

//express() function that gives you a server object. We store that object inside app. Now app can be used to configure your backend
const app = express();

//Allow requests from my configured frontend and allow credentials such as cookies.
// app.use() - Registers middleware. Middleware is code that runs during the request → response process.
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));

//Whenever a request comes with Content-Type: application/json, automatically parse it and store it in req.body as a JavaScript object
app.use(express.json());

//A cookie is small data stored by the browser and associated with a website. The browser can send that cookie back to your backend with requests.
//cookieParser() - It reads cookies from incoming requests and makes them easily available through req.cookies
app.use(cookieParser());
app.use(helmet());

// mount teacher routes (ESM import)
app.use(teacherRouter);
app.use("/api", studentRouter);

//This sets up express-rate-limit, a middleware used to limit repeated requests to public APIs or endpoints.
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
//Mounts this rule globally across all incoming routes.
app.use(limiter);

//HTTP Method & Route: Sets up an Express endpoint that listens for POST requests at /login.
//Async Handler: Declared as async to allow await calls when querying the database and hashing/comparing passwords.
app.post("/login", async (req, res) => {
  try {
    // Extract Payload: Destructures email and password sent in the JSON body of the frontend POST request (requires Express's express.json() middleware upstream).
    const { email, password } = req.body;
    //Database Lookup: Uses Prisma ORM to find a record in the User table matching the provided email.
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      //If no record exists, it stops execution immediately (return) and sends an HTTP 401 Unauthorized response back to the client.
      return res.status(401).json({ error: "Invalid email" });
    }
    //Uses bcrypt.compare() to salt and hash the incoming plain-text password and compare it to the stored passwordHash.
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      //If they do not match, it returns an HTTP 401 Unauthorized
      return res.status(401).json({ error: "Invalid password" });
    }
    // Generate JWT: Creates a digitally signed authentication token.
    //Payload: { userId, email } encodes non-sensitive identity info inside the token.
    //Secret: process.env.JWT_SECRET signs the token so the server can verify later that it hasn't been tampered with.
    //Expiration: Invalidate after 1 hour, requiring re-authentication.
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    //Set-Cookie Header: Attaches the JWT as a cookie on the client's browser:

    res.cookie("token", token, {
      //httpOnly: true: Blocks client-side scripts (document.cookie) from reading the cookie, mitigating Cross-Site Scripting (XSS) attacks.
      httpOnly: true, // prevents JavaScript from accessing cookie
      //secure: false: Allows transmission over unencrypted HTTP (local development). In production, this should be true so cookies only travel over HTTPS.
      secure: true, // true in production with HTTPS
      //sameSite: "strict": Prevents the browser from sending this cookie along with cross-site requests, mitigating Cross-Site Request Forgery (CSRF).
      sameSite: "strict",
    });
    //Returns an HTTP 200 OK (default) with a success JSON message.
    res.json({ message: "Login Succesful!" }); // send JSON Response
  } catch (error) {
    //Error Handling: Catches unexpected failures (database down, missing environment variable, syntax errors) and returns an HTTP 500 Internal Server Error without leaking server stack traces to the client.
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//HTTP Method & Route: Listens for incoming POST requests at /logout.
app.post("/logout", (req, res) => {
  //Clears the Cookie: Sends a Set-Cookie header in the HTTP response instructing the browser to delete the cookie named "token".
  //How it works under the hood: The server cannot directly delete files on the client's device. Instead, Express sets the cookie's expiration date to a time in the past (e.g., Expires=Thu, 01 Jan 1970 00:00:00 GMT) with an empty value. When the browser sees an expired timestamp, it immediately discards the stored cookie.
  res.clearCookie("token");
  //Client Response: Sends a standard HTTP 200 OK status with a JSON object confirming that the logout succeeded, allowing the frontend to update its UI (e.g., redirect to the login page or clear user state).
  res.json({ message: "Logout Successfully." });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
