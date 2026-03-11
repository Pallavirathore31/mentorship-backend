# Mentorship Platform Backend

A simplified backend system for a mentorship platform where **parents, students, and mentors interact**.

This backend provides APIs for authentication, student management, lesson booking, session management, and AI-powered text summarization.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- Swagger (API documentation)
- Google Gemini API (LLM text summarization)
- express-rate-limit

---

## Features

### Authentication
- Parent and Mentor signup
- Login with JWT authentication
- Password hashing using bcrypt

### Student Management
- Parents can create student profiles
- Parents can view their students

### Lesson Management
- Mentors can create lessons

### Booking System
- Parents can assign students to lessons

### Session System
- Lessons can contain multiple sessions

### AI Integration
- Text summarization using Google Gemini API

Endpoint:

POST /llm/summarize

Returns a concise summary of the provided text.

---

## API Documentation

Swagger documentation is available at:

http://localhost:5000/api-docs

You can test all endpoints directly from Swagger UI.

---

## Project Structure
project-root
│
├── config
│ ├── db.js
│ └── swagger.js
│
├── controllers
│ ├── authController.js
│ ├── studentController.js
│ ├── lessonController.js
│ ├── bookingController.js
│ ├── sessionController.js
│ └── llmController.js
│
├── middleware
│ ├── authMiddleware.js
│ └── roleMiddleware.js
│
├── models
│ ├── User.js
│ ├── Student.js
│ ├── Lesson.js
│ ├── Booking.js
│ └── Session.js
│
├── routes
│ ├── authRoutes.js
│ ├── studentRoutes.js
│ ├── lessonRoutes.js
│ ├── bookingRoutes.js
│ ├── sessionRoutes.js
│ └── llmRoutes.js
│
├── services
│ └── llmService.js
│
├── server.js
├── package.json
└── README.md


---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd mentorship-backend

## Install dependencies:
npm install 


## Environment Variables

Create a .env file in the project root.

PORT=5000
MONGO_URI=mongodb://localhost:27017/mentorship
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

## Running the Server
Start the server: npm run dev 

##Server will start at:

http://localhost:5000

#swagger link for api testing 

http://localhost:5000/api-docs/#/