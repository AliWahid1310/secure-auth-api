# 🔐 Secure Auth API

A secure REST API that handles user authentication (**Sign Up**, **Log In**, and **Log Out**) and protects specific routes using **Supabase Auth** and **JWT (JSON Web Token)** verification.

Built with **Node.js**, **Express.js**, and **@supabase/supabase-js**.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [API Reference](#-api-reference)
- [Swagger UI](#-swagger-ui)
- [Project Structure](#-project-structure)

---

## ✨ Features

- 🔑 User registration and login via Supabase Auth
- 🎫 JWT-based authentication with Bearer tokens
- 🛡️ Reusable auth middleware for protecting routes
- 🚪 Public and protected endpoints
- 📄 Interactive API documentation via Swagger UI
- ✅ Proper HTTP status codes (201, 200, 204, 400, 401)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | Web framework |
| [@supabase/supabase-js](https://supabase.com/docs/reference/javascript) | Supabase client SDK |
| [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) | Interactive API docs |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [cors](https://www.npmjs.com/package/cors) | Cross-Origin Resource Sharing |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ installed
- A free **Supabase** account ([supabase.com](https://supabase.com))
- **Git** installed

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/AliWahid1310/secure-auth-api.git
cd secure-auth-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables** (see below).

4. **Start the server:**

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory (use `.env.example` as a template):

```env
SUPABASE_URL=your_project_url_here
SUPABASE_KEY=your_anon_key_here
PORT=3000
```

### Where to find your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project dashboard
3. Navigate to **Project Settings → API**
4. Copy the **Project URL** and **anon (public)** key

> ⚠️ **Important:** Never commit your `.env` file to GitHub. It is already listed in `.gitignore`.

> 💡 **Tip:** For testing, disable email confirmation in your Supabase Dashboard: **Authentication → Providers → Email → Disable "Confirm email"**

---

## ▶️ Running the Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The server starts at `http://localhost:3000` and logs:

```
Server running and connected to Supabase on port 3000
Swagger docs available at http://localhost:3000/docs
```

---

## 📡 API Reference

### Authentication Routes

| Method | Endpoint | Description | Auth Required | Status Codes |
|---|---|---|---|---|
| `POST` | `/auth/signup` | Create a new user account | ❌ No | `201`, `400` |
| `POST` | `/auth/login` | Authenticate & get JWT | ❌ No | `200`, `400`, `401` |
| `POST` | `/auth/logout` | Terminate user session | ✅ Bearer Token | `204`, `401` |

### Protected Routes

| Method | Endpoint | Description | Auth Required | Status Codes |
|---|---|---|---|---|
| `GET` | `/protected/profile` | Get user profile data | ✅ Bearer Token | `200`, `401` |
| `GET` | `/protected/dashboard` | Get dashboard data | ✅ Bearer Token | `200`, `401` |

### Public Routes

| Method | Endpoint | Description | Auth Required | Status Codes |
|---|---|---|---|---|
| `GET` | `/public/info` | Get public information | ❌ No | `200` |

### Quick Test with cURL

**Sign up a new user:**

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}'
```

**Log in:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}'
```

**Access protected profile (replace `<TOKEN>` with your access_token):**

```bash
curl http://localhost:3000/protected/profile \
  -H "Authorization: Bearer <TOKEN>"
```

**Access public info (no auth needed):**

```bash
curl http://localhost:3000/public/info
```

---

## 📖 Swagger UI

Interactive API documentation is available at:

```
http://localhost:3000/docs
```

### Using Swagger UI:

1. Open `http://localhost:3000/docs` in your browser
2. Use `/auth/login` to get your access token
3. Click the **🔓 Authorize** button (top right)
4. Paste your JWT token
5. Now you can test protected endpoints directly!

Protected routes show a **lock icon** 🔒 indicating they require authentication.

---

## 📁 Project Structure

```
secure-auth-api/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase client initialization
│   ├── middleware/
│   │   └── auth.js              # Reusable JWT verification middleware
│   ├── routes/
│   │   ├── auth.js              # Signup, login, logout routes
│   │   ├── protected.js         # Protected profile & dashboard routes
│   │   └── public.js            # Public info route
│   ├── server.js                # Express app entry point
│   └── swagger.json             # OpenAPI 3.0 specification
├── .env                         # Environment variables (not committed)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Project metadata & dependencies
└── README.md                    # This file
```

---

## 🤖 Stage 7: AI vs Me Analysis

An analysis comparing manual engineering vs AI-assisted code generation for secure authentication APIs:

### 1. Token Extraction & Header Parsing
- **Manual Implementation**: Strict check for `Authorization` header presence, format validation (`startsWith("Bearer ")`), and safe splitting (`authHeader.split(" ")[1]`).
- **AI Assumptions**: AI models often assume `req.headers.authorization` is always populated or perform simple `split(" ")` without checking if the array element exists, leading to `TypeError: Cannot read properties of undefined` runtime crashes when unauthenticated requests are sent.

### 2. Security Flaws & Token Verification
- **Manual Implementation**: Uses `supabase.auth.getUser(token)` to perform an actual cryptographic server-side validation against Supabase Auth servers.
- **AI Assumptions**: AI generators frequently attempt `jwt.verify(token, secret)` using the Supabase `anon` key as secret, which fails for Supabase JWTs signed with asymmetric keys or project-specific JWT secrets. Alternatively, AI might fall back to `supabase.auth.getSession()`, which does not guarantee that the token hasn't been revoked.

### 3. Rate Limiting & Input Sanitization
- **Manual Implementation**: Added `express-rate-limit` on auth routes to prevent brute force password attempts and added regex email format validation + min length checks.
- **AI Assumptions**: Basic AI prompts yield bare minimum handlers without rate limiting or payload validation unless explicitly prompted with detailed constraints.

---

## 📜 License

ISC
