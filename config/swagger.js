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
          201: { description: "User created successfully" },
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
          201: { description: "Student created successfully" },
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
  },
};

export default swaggerSpec;
