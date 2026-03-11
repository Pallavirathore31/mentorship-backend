const PORT = process.env.PORT || 5000;
const baseUrl = `http://localhost:${PORT}`;

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Mentorship Platform API",
    version: "1.0.0",
    description:
      "To use protected APIs, first get a token using **POST /auth/login** or **POST /auth/signup**. Then click the green **Authorize** button and enter: `Bearer <token>` (e.g. Bearer eyJhbGciOiJIUzI1NiIs...).",
  },
  servers: [
    {
      url: baseUrl,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Bearer token to access protected endpoints. Use: Bearer <your_token>",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Signup user",
        description: "Register a new user (parent or mentor). Returns token and user. No auth required.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password", "role"],
                properties: {
                  name: { type: "string", description: "Full name", example: "Pallavi" },
                  email: { type: "string", description: "Email address", example: "pallavi@gmail.com" },
                  password: { type: "string", description: "Password", example: "pallavi@31" },
                  role: {
                    type: "string",
                    enum: ["parent", "mentor"],
                    description: "User role",
                    example: "parent",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "User created successfully" },
          400: { description: "All fields required / Invalid role / User already exists" },
          500: { description: "Internal Server Error" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        description: "Authenticate with email and password. Returns token and user. No auth required.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", description: "Email address", example: "pallavi@gmail.com" },
                  password: { type: "string", description: "Password", example: "pallavi@31" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "User logged in successfully" },
          400: { description: "Email and password are required" },
          401: { description: "Invalid credentials" },
          500: { description: "Internal Server Error" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user",
        description: "Returns the authenticated user. Requires Bearer token in Authorization header.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            schema: { type: "string", example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWZmNTg5NWMzZDAxOWQxYTEzNjkwNiIsImlhdCI6MTc3MzE0NTA1MiwiZXhwIjoxNzczNzQ5ODUyfQ.IVcBFn8NMdphFmveXnHZFgYKgF3NmaN_PCv7bj1sJW4" },
            description: "Bearer token from login or signup",
          },
        ],
        responses: {
          200: { description: "Authenticated user details" },
          401: { description: "No token provided / Invalid token / User not found" },
        },
      },
    },
    "/students": {
      post: {
        tags: ["Students"],
        summary: "Create student",
        description: "Parent can create a student under their account. Requires JWT authentication.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "age"],
                properties: {
                  name: { type: "string", example: "Rahul" },
                  age: { type: "number", example: 12 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Student created successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Only parents can create students" },
          500: { description: "Internal server error" },
        },
      },
      get: {
        tags: ["Students"],
        summary: "Get students",
        description: "Retrieve students for logged-in parent",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Students fetched successfully" },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/bookings": {
      post: {
        tags: ["Bookings"],
        summary: "Create booking",
        description: "Parent can create a booking for a student to attend a lesson. Requires JWT authentication and parent role.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["studentId", "lessonId"],
                properties: {
                  studentId: {
                    type: "string",
                    description: "MongoDB ObjectId of the student",
                    example: "507f1f77bcf86cd799439011",
                  },
                  lessonId: {
                    type: "string",
                    description: "MongoDB ObjectId of the lesson",
                    example: "507f1f77bcf86cd799439012",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Booking created successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Only parents can create bookings" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/lessons": {
      post: {
        tags: ["Lessons"],
        summary: "Create lesson",
        description: "Mentor can create a new lesson. Requires JWT authentication and mentor role.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "description"],
                properties: {
                  title: { type: "string", description: "Lesson title", example: "Introduction to Algebra" },
                  description: { type: "string", description: "Lesson description", example: "Learn basic algebraic expressions and equations" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Lesson created successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Only mentors can create lessons" },
          500: { description: "Internal server error" },
        },
      },
      get: {
        tags: ["Lessons"],
        summary: "Get lessons",
        description: "Retrieve all lessons with mentor details (name, email). Requires JWT authentication.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lessons fetched successfully (array with populated mentorId)" },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/sessions": {
      post: {
        tags: ["Sessions"],
        summary: "Create session",
        description: "Mentor can create a session for a lesson. Requires JWT authentication and mentor role.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["lessonId", "date", "topic"],
                properties: {
                  lessonId: {
                    type: "string",
                    description: "MongoDB ObjectId of the lesson",
                    example: "507f1f77bcf86cd799439012",
                  },
                  date: {
                    type: "string",
                    format: "date-time",
                    description: "Session date/time (ISO 8601)",
                    example: "2025-03-15T10:00:00.000Z",
                  },
                  topic: { type: "string", description: "Session topic", example: "Linear equations" },
                  summary: { type: "string", description: "Optional session summary", example: "Covered basics of solving for x" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Session created successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Only mentors can create sessions" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/sessions/lessons/{id}/sessions": {
      get: {
        tags: ["Sessions"],
        summary: "Get sessions by lesson",
        description: "Retrieve all sessions for a given lesson. Requires JWT authentication.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", description: "Lesson ID (MongoDB ObjectId)" },
            description: "Lesson ID to fetch sessions for",
          },
        ],
        responses: {
          200: { description: "Sessions for the lesson" },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/llm/summarize": {
      post: {
        tags: ["LLM"],
        summary: "Summarize text",
        description:
          "Summarize the provided text into 3–6 bullet points (under 120 words). This endpoint is public (no JWT required) but rate-limited. The backend uses Gemini by default; you can optionally configure an OpenAI fallback via environment variables.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["text"],
                properties: {
                  text: {
                    type: "string",
                    description: "Text to summarize (min 50 chars, max 12000 chars).",
                    example:
                      "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It generally involves the green pigment chlorophyll and generates oxygen as a byproduct.",
                    minLength: 50,
                    maxLength: 12000,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Summary returned successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    summary: { type: "string", description: "Generated summary text" },
                    model: { type: "string", description: "LLM model name", example: "gemini-2.0-flash" },
                  },
                },
              },
            },
          },
          400: { description: "Text is required / Text must be at least 50 characters" },
          413: { description: "Text too large" },
          429: { description: "LLM quota exceeded (rate limit / billing / plan issue)" },
          502: { description: "LLM service error" },
        },
      },
    },
  },
};

export default swaggerSpec;
