# Utkarsh Tuition 🎓

A responsive, full-stack web application built for Utkarsh Tuition. This platform serves as a digital portfolio to showcase tuition information, teacher credentials, and highlight the achievements of successful students.

🚀 Live Demo - https://utkarshtuition.vercel.app/

## 📖 Purpose

The purpose of this web application is to provide prospective students and parents with clear, up-to-date information about the tuition center. It features a dynamic gallery of past student achievements to build trust and credibility, all easily manageable by a single administrator.

## ✨ Key Features

1. Responsive education website for a tuition center.
2. Dynamic About Me section with editable teacher profile
3. Student achievement gallery with standard-based filtering
4. Secure admin login and logout flow
5. Dashboard to manage website content without coding
6. Image upload support for teacher and student profiles
7. Full-stack architecture with React, Express, Prisma, Supabase, and Vercel
8. Secure session handling with JWT and cookies
9. Modern, lightweight UI designed for parents and students

## 💻 Tech Stack

### Frontend:

React.js

REST API (for data fetching)

### Backend:

Node.js

Express.js

### Database:

Supabase (PostgreSQL)

### Deployment:

Vercel

## 🛠️ Local Development Setup

To run this project on your local machine, follow these steps:

Prerequisites

Node.js and npm (or yarn) installed on your machine

A Supabase account and project configured

1. Clone the repository

git clone https://github.com/prathamesh2503/utkarshtuition-local.git

cd utkarshtuition-local

2. Install Dependencies

You will need to install dependencies for both the frontend and backend (adjust folder names if your structure differs).

Backend:

cd fixed-auth-backend

npm install

Frontend:

cd utkarshtuition-local

npm install

3. Environment Variables

Create a .env file in both your backend and frontend directories.

Backend .env:

DATABASE_URL=your_supabase_database_url

FRONTEND_ORIGIN=your_frontend_origin_url

JWT_SECRET=your_jwt_secret_key

ADMIN_EMAIL=your_admin_email

ADMIN_PASSWORD=your_user_password

SUPABASE_URL=your_supabase_project_url

SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

4. Run the Application

Start the Backend Server:

cd fixed-auth-backend

npm run dev

Start the Frontend Server:

cd utkarshtuition-local

npm run dev

## 🗄️ Database Structure

This application utilizes Supabase. The primary tables include:

Teacher: Stores dynamic data for the About Me section.

Student : Stores student names, grades, and year details.

## Screenshots

<img width="1351" height="585" alt="image" src="https://github.com/user-attachments/assets/11f835a2-9110-47b2-8e18-624cb9563601" />

<img width="1365" height="605" alt="image" src="https://github.com/user-attachments/assets/6ae9e0dd-ac7d-44d4-a451-8b06f448916a" />

<img width="1365" height="759" alt="image" src="https://github.com/user-attachments/assets/2da80e25-afc5-45c6-b907-41d9d6a3679a" />

<img width="1347" height="761" alt="image" src="https://github.com/user-attachments/assets/5b36c7bb-aa11-4ea7-bb5e-6a0bcf0653f2" />
