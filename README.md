# 🚀 InterviewForgeAI

An AI-powered interview preparation platform that helps candidates prepare for technical interviews through AI-generated questions, automated answer evaluation, and personalized feedback.

---

## 📌 Overview

Preparing for technical interviews requires continuous practice and proper feedback. Most candidates struggle to identify their weaknesses and improve their answers.

**InterviewForgeAI** provides an intelligent interview practice environment where users can:

- Generate personalized interview questions
- Practice technical interviews
- Get AI-based answer evaluation
- Receive feedback and improvement suggestions
- Track interview performance

The platform combines Full Stack development with Generative AI to create a realistic interview preparation experience.

---

# ✨ Features

## 🔐 Authentication System

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes

---

## 📄 Resume Parser

- Upload resume PDF files
- Extract resume content automatically
- Store extracted resume information
- Use resume data for personalized interviews

---

## 🤖 AI Question Generation

- Generate interview questions using Generative AI
- Create questions based on selected technologies
- Support technical interview preparation

---

## 🧠 AI Answer Evaluation

- Evaluate user answers using AI
- Generate scores and feedback
- Identify strengths and improvement areas

---

## 📊 Interview Session Management

- Create interview sessions
- Track asked questions
- Store user responses
- Generate interview results

---

# 🏗️ System Architecture

```
                 React + TypeScript
                       |
                       |
                Axios API Requests
                       |
                       |
              Node.js + Express API
                       |
        --------------------------------
        |                              |
     MongoDB                    Gemini AI API
   Database                  AI Generation &
                             Evaluation
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- TypeScript
- React Router
- Axios
- Vite


## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt


## AI Integration

- Google Gemini API
- Resume text extraction
- AI question generation
- AI answer evaluation


## Tools

- Git & GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```
InterviewForgeAI

├── backend
│   ├── src
│   │   ├── modules
│   │   ├── middleware
│   │   ├── config
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   └── services
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Nikhil42865/InterviewForgeAI.git

cd InterviewForgeAI
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Start backend server:

```bash
npm run dev
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

# 🔄 Application Workflow

```
User
 |
 |
Login/Register
 |
 |
Upload Resume
 |
 |
Generate Interview Questions
 |
 |
Answer Questions
 |
 |
AI Evaluation
 |
 |
Interview Report
```

---

# 🚧 Current Development

The project is actively being improved.

Currently working on:

- Improving AI evaluation workflow
- Enhancing interview session management
- Building analytics dashboard
- Improving user experience
- Production deployment preparation

---

# 🔮 Future Improvements

- Voice-based AI interviews
- Real-time interview simulation
- Coding assessment module
- Advanced performance analytics
- Cloud deployment
- Interview difficulty customization

---

# 🎯 Learning Outcomes

Through this project, I explored:

- Full Stack application architecture
- REST API development
- Authentication systems
- Database design
- AI API integration
- Building scalable project structures

---

# 👨‍💻 Author

**Nikhil Kumar**

GitHub:
https://github.com/Nikhil42865

---

⭐ If you find this project interesting, consider giving it a star!
