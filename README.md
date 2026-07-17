<div align="center">

# 🎓 TutorHive

### A Modern Tutor Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.3.0-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**TutorHive** is a full-stack web application where students can find expert tutors for any subject and book their sessions with ease.

🌐 **Live Demo:** [tutor-booking-system-three.vercel.app](https://tutor-booking-system-three.vercel.app)

</div>

---

## ✨ Key Features

### 🔐 Authentication System
- **Email & Password** sign up and sign in
- **Google OAuth** social login support
- JWT-based session management powered by **Better Auth**
- Cookie-cached sessions with a 7-day expiry
- Profile dropdown with Sign Out option in the navbar when logged in

### 🏠 Home Page — Hero Section
- **Infinite auto-sliding carousel** with 3 banner slides that automatically transition every 5 seconds
- Left / Right arrow navigation and dot indicators
- A "Find Your Tutor" CTA button on every slide

### ⭐ Featured Tutors
- Featured tutors loaded dynamically from the database
- Responsive 3-column grid layout
- Hover animations and glassmorphism card design
- "View All Tutors" button linking directly to the full tutor listing

### 👨‍🏫 Tutor Browsing & Search
- Browse the complete list of available tutors
- **Real-time search** — find tutors by name, subject, location, or institution
- **Subject filter** — filter by Mathematics, Physics, Chemistry, Biology, English, Bangla, Computer Science, Economics, Accounting, and more
- **Date range filter** — filter tutors by session start date

### 📋 Tutor Details Page
Each tutor's profile page includes:
- Profile photo, name, subject, and teaching mode badge (Online / Offline / Both)
- **Hourly fee** display
- Institution and location information
- Available days, time slots, and total remaining slots
- **Pulsing animation** warning when slots are critically low ("Hurry! Only a few slots left")
- Session start date display
- Full teaching experience description
- **Book Now** button — disabled automatically when fully booked or unavailable
- Verified profile badge

### 📅 Session Booking System
- **Booking Modal** — a clean popup form to complete a booking
- Form fields: student name, phone number, and preferred date
- Tutor's **slot count automatically decrements** after a successful booking
- Booking is blocked when no slots remain
- Booking is blocked if today is before the session's start date
- Success and error **toast notifications** on every action

### 🗂️ My Booked Sessions
- View all sessions booked by the currently logged-in user
- Booking status displayed for each session (Pending)
- Option to **cancel a booking** via a Cancel Booking confirmation modal

### ➕ Add a Tutor
- Logged-in users can add a new tutor to the platform
- Fill in all tutor details: name, subject, fee, schedule, location, experience, and more

### 📁 My Tutors
- View a list of all tutors added by the logged-in user
- **Update** tutor information via an Update Tutor modal
- **Delete** a tutor via a Delete Confirmation modal

### 🛎️ Services Page
Detailed service offerings including:
- One-on-One Tutoring
- Group Study Sessions
- Online Learning
- Exam Preparation
- Homework Help
- Career Guidance

### ℹ️ About Page
- Platform mission and vision
- Core features of the platform
- Team introduction

### 📞 Contact Page
- Contact form with name, email, and message fields
- Social media links

### 🌙 Dark Mode
- Full **Light / Dark mode** toggle support across the entire app
- Theme persisted using `next-themes`
- Theme toggle button accessible from the navbar dropdown

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.9 (App Router) |
| **Frontend Library** | React 19.2.4 |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | Better Auth v1.6.16 |
| **Database** | MongoDB (better-auth/adapters/mongodb) |
| **Animations** | Framer Motion v12 |
| **UI Components** | HeroUI v3 |
| **Icons** | Lucide React, React Icons |
| **Theming** | next-themes |
| **Notifications** | react-hot-toast |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
tutor-booking-system/
├── src/
│   ├── app/
│   │   ├── page.jsx                    # Home page
│   │   ├── layout.js                   # Root layout
│   │   ├── globals.css                 # Global styles
│   │   ├── about/                      # About page
│   │   ├── contact/                    # Contact page
│   │   ├── services/                   # Services page
│   │   ├── tutors/
│   │   │   ├── page.jsx                # All tutors listing
│   │   │   ├── TutorsClient.jsx        # Client-side search & filter
│   │   │   └── [id]/                   # Tutor details page
│   │   ├── add-tutors/                 # Add a new tutor
│   │   ├── my-tutor/                   # My tutors list
│   │   ├── my-booked-sessions/         # My booked sessions
│   │   ├── auth/
│   │   │   ├── signin/                 # Sign in page
│   │   │   └── signup/                 # Sign up page
│   │   └── api/
│   │       ├── auth/                   # Better Auth handler
│   │       ├── bookings/               # Create booking API
│   │       └── tutors/                 # Tutor API routes
│   ├── Component/
│   │   ├── Navbar.jsx                  # Navigation bar
│   │   ├── Home.jsx                    # Hero carousel
│   │   ├── Featured.jsx                # Featured tutors section
│   │   ├── About.jsx                   # About section
│   │   ├── Services.jsx                # Services section
│   │   ├── Contact.jsx                 # Contact section
│   │   ├── Footer.jsx                  # Footer
│   │   ├── Tutor.jsx                   # Tutor card component
│   │   ├── TutorDetails.jsx            # Tutor details view
│   │   ├── BookingModal.jsx            # Booking modal
│   │   ├── CancelBookingModal.jsx      # Cancel booking modal
│   │   ├── UpdateTutorModal.jsx        # Update tutor modal
│   │   ├── DeleteConfirmationModal.jsx # Delete confirmation modal
│   │   └── ThemeToggle.jsx             # Dark / Light mode toggle
│   └── lib/
│       ├── auth.js                     # Better Auth config (server)
│       ├── auth-client.js              # Better Auth client
│       └── theme-provider.jsx          # Theme provider
├── public/
│   └── Images/                         # Banner images
├── .env                                # Environment variables
├── next.config.mjs
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Tanjimahsankayes/tour-booking-system.git
cd tutor-booking-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# Backend server URL (Express / Node API)
NEXT_PUBLIC_SERVER_URL=http://localhost:5000/api

# Better Auth config
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB (authentication database)
AUTH_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to 👉 [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create a new booking and update slot count |
| `GET` | `/api/tutors` | Fetch all tutors |
| `GET` | `/api/tutors/[id]` | Fetch a specific tutor's details |
| `PATCH` | `/api/tutors/[id]` | Update a tutor's information |
| `GET` | `/api/bookings/my` | Fetch the logged-in user's bookings |
| `ALL` | `/api/auth/[...]` | Better Auth handler |

> **Note:** Tutor data is primarily fetched from a separate Express backend configured via `NEXT_PUBLIC_SERVER_URL`.

---

## 🔑 Core Business Logic

### Booking Restrictions
```
✅ Booking is ALLOWED when:
   - tutor.totalSlots > 0
   - today >= tutor.sessionStartDate

❌ Booking is BLOCKED when:
   - totalSlots = 0  →  "Fully Booked"
   - today < sessionStartDate  →  "Booking not available yet"
```

### Slot Management
- Successful booking → `totalSlots - 1`
- If the tutor slot update fails → booking is automatically **rolled back**
- 3 or fewer slots remaining → pulsing animation warning displayed

---

## 🎨 Design Highlights

- 🌙 **Full Dark / Light Mode** support throughout the app
- 🪟 **Glassmorphism** design — `backdrop-blur` and `bg-white/80` styling
- 📱 **Fully Responsive** — works seamlessly on mobile, tablet, and desktop
- ✨ **Micro-animations** — hover effects, scale transitions, and fade-ins
- 🎨 **Indigo-Blue** color palette
- 🔔 **Toast Notifications** — real-time feedback for every user action

---

## 📦 Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.

```bash
# Deploy using the Vercel CLI
npx vercel --prod
```

Set your environment variables in the Vercel Dashboard under **Settings → Environment Variables**.

---

## 👨‍💻 Developer

**Tanjim Ahsan Kayes**  
📘 Programming Hero Bootcamp — Assignment Project  
🔗 [GitHub Repository](https://github.com/Tanjimahsankayes/tour-booking-system)

---

<div align="center">

⭐ If you found this project helpful, please give it a star!

Made with ❤️ using Next.js & MongoDB

</div>
