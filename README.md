# Utkarsh Tuition 🎓

A responsive, full-stack web application built for Utkarsh Tuition. This platform serves as a digital portfolio to showcase tuition information, teacher credentials, and highlight the achievements of successful students.

🚀 Live Demo - https://utkarshtuition.vercel.app/

## 📖 Purpose

The purpose of this web application is to provide prospective students and parents with clear, up-to-date information about the tuition center. It features a dynamic gallery of past student achievements to build trust and credibility, all easily manageable by a single administrator.

## ✨ Key Features

Public-Facing Landing Page: A fully responsive web page displaying tuition information, teacher background, and student success stories.

Admin Dashboard: Secure authentication providing single-teacher admin login and logout functionality.

Dynamic Content Management (About Me): The admin can easily add or delete details in the "About Me" section directly from the dashboard, which instantly reflects on the public frontend.

Student Achievement Manager: The admin can seamlessly add, edit, or delete student data (names, scores, achievements) via the dashboard, ensuring the public webpage is always up-to-date with the latest success stories.

## 💻 Tech Stack

### Frontend:

React.js

Fetch API (for data fetching)

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

<img width="1349" height="588" alt="image" src="https://github.com/user-attachments/assets/fd84bc0b-a483-43ce-9b3b-0a03bd6a415e" />

<img width="1365" height="723" alt="image" src="https://github.com/user-attachments/assets/2e74346c-4f4c-46d8-a2f1-ecc609b8477b" />

<img width="1354" height="594" alt="image" src="https://github.com/user-attachments/assets/5df21f6f-19a9-4dd6-a6a8-ed0e4dba2cb7" />


