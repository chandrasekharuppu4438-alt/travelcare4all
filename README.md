# Travel Care 4 All — Complete MERN Stack Web Application

> **All Travel Solutions & Fast Track Visa Services**  
> Physical Office: `#48-12-1, Ramavarappadu Ring, Beside Key Hotel, Upstairs Union Bank, Vijayawada - 520 004, A.P., INDIA`  
> Contact: **+91 73861 33399** / **+91 70136 39149** | WhatsApp: **+91 73861 33399** | Email: `travelcare4all@gmail.com`  
> Managing Consultant: **B. Vidya Sagar**

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Complete Project Folder Structure](#-complete-project-folder-structure)
3. [Libraries & Technologies Used](#-libraries--technologies-used)
4. [Pin-to-Pin Pages Connection & Navigation Architecture](#-pin-to-pin-pages-connection--navigation-architecture)
5. [Detailed Breakdown of Dedicated Pages](#-detailed-breakdown-of-dedicated-pages)
6. [Interactive Components & Modals](#-interactive-components--modals)
7. [Backend Architecture & REST API Endpoints](#-backend-architecture--rest-api-endpoints)
8. [Database Schemas & Mongoose Models](#-database-schemas--mongoose-models)
9. [Scratch-to-End Installation & Quickstart Guide](#-scratch-to-end-installation--quickstart-guide)
10. [Environment Variables](#-environment-variables)

---

## 🌟 Project Overview

**Travel Care 4 All** is an enterprise-grade full-stack **MERN (MongoDB, Express.js, React 18, Node.js)** application designed for an authentic travel agency based in Vijayawada, Andhra Pradesh.

Key capabilities include:
- **10 Dedicated Single-Page Routes**: Home, About, Services, Tours, Dynamic Tour Details (`/tours/:slug`), Destinations, Fast Track Visa, Photo Gallery, Contact Us, and an Admin Operations Desk.
- **Interactive Multi-Filter Tour Catalog**: Real-time multi-criteria filtering by Destination, Travel Type, Price brackets, Duration, Rating thresholds, Sorting, and Pagination.
- **Fast Track Visa Application Desk**: Real-time visa inquiry processing, country-by-country visa guidelines, and document checklists.
- **Live Customer Bookings & Inquiries Desk**: Admin portal and quick modal with instant booking status updates (`Pending` ➔ `Confirmed` ➔ `Contacted` ➔ `Cancelled`).
- **Resilient Hybrid Database Architecture**: Connects seamlessly with MongoDB via Mongoose. If MongoDB is offline, the backend automatically falls back to an in-memory data store with all 15 authentic tour packages and 17 destinations without downtime or errors.

---

## 📁 Complete Project Folder Structure

```text
TRAVELCARE4ALL/
├── .gitignore                          # Git ignored folders (node_modules, dist, .env)
├── package.json                        # Root workspace runner scripts (concurrently dev runner)
├── package-lock.json
├── README.md                           # Master project documentation
│
├── backend/                            # Node.js + Express + MongoDB REST API backend
│   ├── .env                            # Backend environment configuration (PORT, MONGODB_URI)
│   ├── .env.example                    # Template environment variables
│   ├── package.json                    # Backend dependencies & scripts
│   ├── package-lock.json
│   ├── server.js                       # Express app entry point, middleware & route mounting
│   │
│   ├── config/
│   │   └── db.js                       # Mongoose connection with resilient In-Memory fallback
│   │
│   ├── controllers/
│   │   ├── tourController.js           # Full-text search, multi-faceted filtering & pagination
│   │   ├── destinationController.js    # Regional destination queries & bento listings
│   │   ├── bookingController.js        # Booking creation, tracking, status updates & listing
│   │   ├── visaController.js           # Fast Track Visa enquiries submission & listing
│   │   └── contactController.js        # Contact messages & company metadata API
│   │
│   ├── data/
│   │   └── seedData.js                 # 15 tour packages, 17 destinations, FAQs, site info
│   │
│   ├── models/
│   │   ├── Tour.js                     # Mongoose schema for Tours (pricing, days, itinerary)
│   │   ├── Destination.js              # Mongoose schema for Destinations & regions
│   │   ├── Booking.js                  # Mongoose schema for Customer Bookings & statuses
│   │   ├── VisaInquiry.js              # Mongoose schema for Visa Enquiries
│   │   └── ContactMessage.js           # Mongoose schema for Contact Form submissions
│   │
│   ├── routes/
│   │   ├── tourRoutes.js               # Express route bindings for /api/tours
│   │   ├── destinationRoutes.js        # Express route bindings for /api/destinations
│   │   ├── bookingRoutes.js            # Express route bindings for /api/bookings
│   │   ├── visaRoutes.js               # Express route bindings for /api/visa
│   │   └── contactRoutes.js            # Express route bindings for /api/contact
│   │
│   └── scripts/
│       └── seed.js                     # CLI script to seed MongoDB with seedData.js
│
└── frontend/                           # React 18 + Vite + Tailwind CSS Single Page Application
    ├── index.html                      # HTML root template with fonts (Plus Jakarta Sans, Fraunces)
    ├── vite.config.js                  # Vite bundler config with /api reverse-proxy to :5000
    ├── package.json                    # Frontend dependencies & Vite scripts
    ├── package-lock.json
    │
    ├── public/
    │   ├── favicon.ico                 # Browser tab icon
    │   ├── favicon.svg                 # SVG brand vector icon
    │   └── images/                     # 17 High-resolution destination & hero PNG images:
    │       ├── hero.png                # Cinematic hero background
    │       ├── bali.png                # Bali, Indonesia
    │       ├── bangkok.png             # Bangkok, Thailand
    │       ├── dubai.png               # Dubai, UAE
    │       ├── goa.png                 # Goa, India
    │       ├── himachal.png            # Himachal Pradesh, India
    │       ├── kashmir.png             # Kashmir, India
    │       ├── kerala.png              # Kerala, India
    │       ├── malaysia.png            # Kuala Lumpur, Malaysia
    │       ├── maldives.png            # Maldives overwater bungalows
    │       ├── pilgrim.png             # Tirupati / Char Dham pilgrimage
    │       ├── rajasthan.png           # Jaipur, Rajasthan
    │       ├── singapore.png           # Gardens by the Bay, Singapore
    │       ├── srilanka.png            # Ella Nine Arches Bridge, Sri Lanka
    │       ├── thailand.png            # Phuket, Thailand
    │       ├── turkey.png              # Cappadocia, Turkey
    │       └── vietnam.png             # Ha Long Bay, Vietnam
    │
    └── src/
        ├── main.jsx                    # React 18 createRoot & BrowserRouter initialization
        ├── App.jsx                     # Route registry, global modal states & layout wrapper
        ├── index.css                   # Tailwind CSS v4, custom utility classes & design tokens
        │
        ├── components/
        │   ├── Navbar.jsx              # Sticky header, top contact strip, mobile drawer, logo
        │   ├── Footer.jsx              # Physical office address, direct links, enquiry form
        │   ├── WhatsAppFloating.jsx    # Sticky pulsating WhatsApp quick-connect button
        │   ├── ScrollToTop.jsx         # Automatically resets window scroll on page change
        │   ├── TourCard.jsx            # Individual tour card with pricing, discount, links
        │   ├── TourDetailsModal.jsx    # Quick itinerary modal with day-wise schedule
        │   ├── BookingModal.jsx        # Tour reservation & Custom Trip booking form modal
        │   ├── BookingsAdminModal.jsx  # Floating quick desk for managing customer bookings
        │   ├── Hero.jsx                # Cinematic hero with badges and quick CTAs
        │   ├── QuickSearch.jsx         # Search bar filtering destination, type, dates, pax
        │   ├── StatsSection.jsx        # Counters (5k+ travellers, 60+ destinations, 99.4% visa)
        │   ├── DestinationsSection.jsx # Bento destination grid with domestic & international tabs
        │   ├── FeaturedTours.jsx       # 6 handpicked flagship tour packages
        │   ├── ToursSection.jsx        # Embeddable tour grid with search & filter chips
        │   ├── ServicesSection.jsx     # 8 core travel services grid with interactive triggers
        │   ├── WhyChooseUs.jsx         # 5 value propositions & honeymoon spotlight
        │   ├── VisaDesk.jsx            # Fast Track Visa application form & document checklist
        │   ├── Testimonials.jsx        # Verified traveller reviews carousel
        │   ├── GallerySection.jsx      # Categorized moments from the road photo cards
        │   └── FaqSection.jsx          # Interactive accordions answering travel questions
        │
        ├── data/
        │   └── travelData.js           # Client data repository (15 tours, 17 destinations, site info)
        │
        ├── pages/                      # 10 Dedicated standalone routes:
        │   ├── HomePage.jsx            # Path: /
        │   ├── AboutPage.jsx           # Path: /about
        │   ├── ServicesPage.jsx        # Path: /services
        │   ├── ToursPage.jsx           # Path: /tours
        │   ├── TourDetailPage.jsx      # Path: /tours/:slug
        │   ├── DestinationsPage.jsx    # Path: /destinations
        │   ├── VisaPage.jsx            # Path: /visa
        │   ├── GalleryPage.jsx         # Path: /gallery
        │   ├── ContactPage.jsx         # Path: /contact
        │   └── AdminPage.jsx           # Path: /admin
        │
        └── services/
            └── api.js                  # Frontend REST API client with local fallback handling
```

---

## 📦 Libraries & Technologies Used

### Root Dependencies
| Package | Version | Purpose |
|---|---|---|
| `concurrently` | `^9.1.2` | Runs both Backend (`node --watch server.js`) and Frontend (`vite`) concurrently with a single command (`npm run dev`). |

### Frontend Dependencies (`frontend/package.json`)
| Library | Version | Purpose |
|---|---|---|
| `react` | `^18.3.1` | Core UI library for reactive component rendering and hooks (`useState`, `useEffect`, `useMemo`). |
| `react-dom` | `^18.3.1` | DOM renderer for React components (`createRoot`). |
| `react-router-dom` | `^7.18.4` | Client-side routing, query parameters (`useSearchParams`, `useParams`, `useNavigate`, `Link`). |
| `lucide-react` | `^0.475.0` | Modern SVG icons suite (MapPin, Phone, MessageSquare, Star, Clock, ShieldCheck, etc.). |
| `tailwindcss` | `^4.3.3` | Utility-first styling framework. |
| `@tailwindcss/vite` | `^4.3.3` | Native Tailwind CSS v4 Vite plugin. |
| `vite` | `^6.1.0` | High-speed frontend dev server and production bundler. |
| `@vitejs/plugin-react` | `^4.3.4` | Fast Refresh and JSX transformation support. |

### Backend Dependencies (`backend/package.json`)
| Library | Version | Purpose |
|---|---|---|
| `express` | `^4.21.2` | REST API web server framework for routing and middleware. |
| `mongoose` | `^8.9.5` | ODM (Object Data Modeling) library for MongoDB validation, schemas, and queries. |
| `cors` | `^2.8.5` | Enables Cross-Origin Resource Sharing between Frontend and Backend. |
| `dotenv` | `^16.4.7` | Loads environment variables from `.env`. |

---

## 🔗 Pin-to-Pin Pages Connection & Navigation Architecture

### Routing Flow Diagram
```text
                         [ Global Header / Navbar ]
                                     │
    ┌──────────┬──────────┬──────────┼──────────┬──────────┬──────────┐
    ▼          ▼          ▼          ▼          ▼          ▼          ▼
[ / Home ] [ /about ] [ /services ] [ /tours ] [ /destinations ] [ /visa ] [ /gallery ] [ /contact ] [ /admin ]
    │                         │          │          │           │
    ├─► Quick Search ─────────┼──────────┼──────────┘           │
    │   (passes criteria)     │          │                      │
    │                         │          ▼                      │
    ├─► Click Tour Card ──────┼──► [ /tours/:slug ]             │
    │                         │    (TourDetailPage)            │
    │                         │          │                      │
    │                         │          ▼                      │
    ├─► Click Book Now ───────┴──► [ BookingModal ]             │
    │                                    │                      │
    │                                    ▼                      │
    │                             POST /api/bookings            │
    │                                                           │
    └─► Fast Track Visa Form ───────────────────────────────────┴──► POST /api/visa
```

### Parameter & Query String Handoffs:
1. **Home Search Bar ➔ Tours Page**:  
   `HomePage` collects `{ destination, travelType, from, to, travellers }` and navigates to:  
   `/tours?destination=Malaysia&travelType=International+Tour`
2. **Destinations Bento Grid ➔ Tours Page**:  
   Clicking any destination card navigates to:  
   `/tours?destination=[destinationName]`
3. **Tour Cards ➔ Tour Detail Page**:  
   Clicking a card's title or image navigates to:  
   `/tours/:slug` (e.g., `/tours/maldives-honeymoon`)
4. **Services Grid ➔ Tours / Visa**:  
   - "Honeymoon Packages" ➔ `/tours?travelType=Honeymoon`
   - "Pilgrim Tours" ➔ `/tours?travelType=Pilgrimage`
   - "Visa Related Services" ➔ `/visa`
   - "Custom Itinerary" ➔ Opens `BookingModal` (Custom mode)

---

## 📄 Detailed Breakdown of Dedicated Pages

### 1. `HomePage.jsx` (`/`)
- **Cinematic Hero**: Impact headline, call buttons, WhatsApp CTA, and trust badges.
- **QuickSearch Bar**: Filter destination, trip type, dates, and number of guests.
- **Destinations Bento**: Grid of 6 featured domestic and international destinations.
- **Featured Tours**: 6 top-rated tour packages with prices, discounts, and duration.
- **Services Section**: 8 travel services grid.
- **Why Choose Us**: 5 service guarantees and honeymoon package spotlight.
- **Stats Section**: Verified counters (5k+ travellers, 60+ destinations, 99.4% visa rate).
- **Visa Desk**: Embedded fast-track visa submission form.
- **Testimonials**: Verified customer reviews slider.
- **Gallery Section**: Preview of travel photos.
- **FAQ Section**: Accordions covering payment, booking, and visa queries.

### 2. `AboutPage.jsx` (`/about`)
- Breadcrumbs: `Home > About Us`.
- Story and legacy of Travel Care 4 All in Vijayawada.
- **Managing Consultant Profile**: B. Vidya Sagar.
- 5 core operating pillars: Transparent pricing, 24/7 ground support, fast visa processing, verified hotels, customized planning.
- Direct CTA to plan custom itineraries.

### 3. `ServicesPage.jsx` (`/services`)
- 12 comprehensive services catalog:
  Holiday Packages, Honeymoon Packages, India & International Tours, Visa Services, Pilgrim Tours, Air Ticketing, Custom Trips, Group/Corporate (MICE), Hotel Booking, Travel Insurance, Luxury Cruises, and Forex.
- Interactive action buttons routing to specific tours or modals.

### 4. `ToursPage.jsx` (`/tours`)
- Multi-faceted live filter sidebar & mobile drawer:
  - Destination dropdown
  - Travel Type selection (International, Domestic, Honeymoon, Holiday, Pilgrimage)
  - Price brackets (`Under ₹20k`, `₹20k – ₹50k`, `₹50k+`)
  - Duration filters (`1-3 Days`, `4-6 Days`, `7+ Days`)
  - Minimum rating filter (`4.0★`, `4.5★`, `4.8★`)
  - Sorting (`Popular`, `Price: Low to High`, `Price: High to Low`, `Duration`)
  - Server/Client synchronized pagination.
- Active filter tags with single-click reset.

### 5. `TourDetailPage.jsx` (`/tours/:slug`)
- Dynamic route reading `:slug` from URL.
- Photo gallery with active preview selection.
- Day-wise collapsible itinerary accordions with full descriptions.
- Key highlights checklist.
- What's Included (Airfare, 4★ Hotels, Breakfast, Transfers, Sightseeing) vs What's Not Included.
- Sticky reservation card with discount calculation and WhatsApp link.
- "Similar Recommended Tours" recommendations at page bottom.

### 6. `DestinationsPage.jsx` (`/destinations`)
- Regional category tabs: `All`, `International`, `Domestic`, `Honeymoon`, `Pilgrimage`.
- Bento grid layout presenting 17 destinations with photos, regional tags, and package count.
- Direct deep-links to filtered tours on click.

### 7. `VisaPage.jsx` (`/visa`)
- Dedicated Fast Track Visa & Passport Desk.
- Interactive application form submitting to `/api/visa`.
- Country explorer with requirements & turnaround times (Dubai 48-hr e-Visa, Singapore, Malaysia, Thailand, Schengen, UK, USA).
- 4-Step Visa Roadmap from consultation to visa stamping.
- Document checklist and dedicated visa FAQs.

### 8. `GalleryPage.jsx` (`/gallery`)
- Categorized photo moments: `All`, `Beaches`, `Mountains`, `Heritage`, `Cities`.
- High-resolution photos from real destinations (Bali, Maldives, Kashmir, Dubai, etc.).
- Fullscreen lightbox photo preview on click.

### 9. `ContactPage.jsx` (`/contact`)
- Verified physical address in Vijayawada with landmark details.
- Direct phone lines (`+91 73861 33399` / `+91 70136 39149`).
- Operating hours and email address.
- Interactive contact form sending to `/api/contact` and generating formatted WhatsApp messages.

### 10. `AdminPage.jsx` (`/admin`)
- Operations dashboard with 2 primary tabs:
  - **Tour Bookings**: View customer name, phone, tour package, travel date, travellers, special notes, and status.
  - **Visa Enquiries**: View applicant name, phone, destination, visa type, and status.
- Real-time status update dropdowns (`Pending`, `Confirmed`, `Contacted`, `Cancelled`) communicating with `PATCH /api/bookings/:id/status`.
- Quick-call and quick-WhatsApp buttons for immediate lead follow-up.

---

## 🧩 Interactive Components & Modals

| Component | File Path | Role |
|---|---|---|
| `Navbar.jsx` | `src/components/Navbar.jsx` | Fixed header, top contact bar, Bookings Desk quick button, mobile hamburger drawer. |
| `Footer.jsx` | `src/components/Footer.jsx` | Office address, phone numbers, email, quick links, and embedded enquiry trigger. |
| `TourCard.jsx` | `src/components/TourCard.jsx` | Individual tour package card with image, price, discount badge, duration, and CTAs. |
| `TourDetailsModal.jsx` | `src/components/TourDetailsModal.jsx` | Overlay displaying full itinerary, highlights, and pricing when previewing a tour. |
| `BookingModal.jsx` | `src/components/BookingModal.jsx` | Reservation modal with form validation, total cost calculator, and submission to `/api/bookings`. |
| `BookingsAdminModal.jsx` | `src/components/BookingsAdminModal.jsx` | Floating management desk for quick booking management from the navbar. |
| `WhatsAppFloating.jsx` | `src/components/WhatsAppFloating.jsx` | Floating pulsating button for 1-click WhatsApp conversation. |
| `ScrollToTop.jsx` | `src/components/ScrollToTop.jsx` | Utility component resetting scroll position to top on route navigation. |

---

## 📡 Backend Architecture & REST API Endpoints

The backend runs on **Express** at `http://localhost:5000` with non-blocking initialization:

```text
HTTP Request
     │
     ▼
[ Express server.js ]
     │
     ├── Middleware: cors(), express.json(), express.urlencoded()
     ├── Non-blocking DB Connection: connectDB()
     │
     ├── Routes:
     │    ├── /api/tours          ──► tourController.js
     │    ├── /api/destinations   ──► destinationController.js
     │    ├── /api/bookings       ──► bookingController.js
     │    ├── /api/visa           ──► visaController.js
     │    └── /api/contact        ──► contactController.js
     │
     └── Resilient Fallback:
          If MongoDB is disconnected, all controllers automatically serve
          and mutate an in-memory store based on seedData.js.
```

### Endpoints Table

| Method | Endpoint | Controller | Description |
|---|---|---|---|
| `GET` | `/api/health` | `server.js` | Server healthcheck and database connectivity status. |
| `GET` | `/api/tours` | `tourController.getTours` | Multi-criteria search and filter with pagination. |
| `GET` | `/api/tours/featured` | `tourController.getFeaturedTours` | Returns 6 flagship featured tour packages. |
| `GET` | `/api/tours/:slug` | `tourController.getTourBySlug` | Retrieves full itinerary and tour data by slug. |
| `GET` | `/api/destinations` | `destinationController.getDestinations` | Returns all destinations with optional `?region=...` filter. |
| `POST` | `/api/bookings` | `bookingController.createBooking` | Submits tour reservation (Generates `TC4A-XXXXXX` ID). |
| `GET` | `/api/bookings` | `bookingController.getBookings` | Returns all customer tour bookings (Admin view). |
| `PATCH`| `/api/bookings/:id/status`| `bookingController.updateBookingStatus` | Updates booking status (`Pending`, `Confirmed`, etc.). |
| `POST` | `/api/visa` | `visaController.submitVisaInquiry` | Submits visa enquiry (Generates `VISA-XXXXXX` ID). |
| `GET` | `/api/visa` | `visaController.getVisaInquiries` | Returns all visa enquiries (Admin view). |
| `POST` | `/api/contact` | `contactController.submitContactMessage`| Submits general contact message. |
| `GET` | `/api/contact/info` | `contactController.getSiteInfo` | Returns company address, phone numbers, reviews, and FAQs. |

---

## 🗄️ Database Schemas & Mongoose Models

### 1. `Tour` (`backend/models/Tour.js`)
Fields:
- `slug` (String, unique)
- `title` (String, required)
- `destination` (String, required)
- `destinationSlug` (String, required)
- `country` (String, required)
- `travelType` (String: International, Domestic, Honeymoon, Pilgrimage)
- `packageType` (String: International, Domestic)
- `days` (Number, required)
- `price` (Number, required)
- `originalPrice` (Number)
- `rating` (Number, default 4.8)
- `reviews` (Number)
- `featured` (Boolean)
- `popular` (Boolean)
- `image` (String, e.g., 'malaysia')
- `gallery` ([String])
- `hotel` (String)
- `shortDescription` (String)
- `overview` (String)
- `highlights` ([String])
- `itinerary` ([{ day: Number, title: String, desc: String }])

### 2. `Destination` (`backend/models/Destination.js`)
Fields:
- `name` (String, required)
- `slug` (String, unique)
- `country` (String, required)
- `region` (String: International, Domestic, Honeymoon, Pilgrimage)
- `image` (String)
- `tag` (String)
- `description` (String)
- `tourCount` (Number)
- `popular` (Boolean)
- `featured` (Boolean)

### 3. `Booking` (`backend/models/Booking.js`)
Fields:
- `bookingId` (String, unique, e.g. "TC4A-839201")
- `tourSlug` (String, required)
- `tourTitle` (String, required)
- `customerName` (String, required)
- `email` (String)
- `phone` (String, required)
- `travelDate` (String, required)
- `travellers` (Number, default 2)
- `specialRequests` (String)
- `totalAmount` (Number)
- `status` (Enum: `['Pending', 'Confirmed', 'Contacted', 'Cancelled']`)
- `createdAt` (Date)

### 4. `VisaInquiry` (`backend/models/VisaInquiry.js`)
Fields:
- `inquiryId` (String, unique, e.g. "VISA-391024")
- `name` (String, required)
- `phone` (String, required)
- `destination` (String, required)
- `visaType` (String, required)
- `travelDate` (String)
- `status` (Enum: `['New', 'In Review', 'Contacted', 'Completed']`)
- `createdAt` (Date)

### 5. `ContactMessage` (`backend/models/ContactMessage.js`)
Fields:
- `name` (String, required)
- `email` (String)
- `phone` (String, required)
- `destination` (String)
- `message` (String, required)
- `status` (Enum: `['New', 'Read', 'Replied']`)
- `createdAt` (Date)

---

## ⚡ Scratch-to-End Installation & Quickstart Guide

### Step 1: Install All Dependencies
From the root directory:
```bash
npm run install:all
```
*(Runs `npm install` inside both `backend` and `frontend`).*

### Step 2: Start Frontend & Backend Concurrently
From the root directory:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

### Step 3: (Optional) Seed Local MongoDB Database
If you have MongoDB running locally and want to populate collections:
```bash
npm run seed
```
*(Loads 15 tour packages and 17 destinations into `mongodb://127.0.0.1:27017/travelcare4all`).*

### Step 4: Individual Subsystem Commands
| Command | Action |
|---|---|
| `npm run dev:backend` | Runs Express server alone with file watcher (`node --watch server.js`) |
| `npm run dev:frontend`| Runs Vite React dev server alone (`vite`) |
| `npm run build` | Builds optimized production assets in `frontend/dist` |
| `npm start` | Starts Express server in production mode |

---

## ⚙️ Environment Variables

Located in `backend/.env`:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/travelcare4all
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
*(Vite proxies `/api` requests to `http://localhost:5000` automatically).*

---

## 🏢 Business Credentials
* **Brand Name**: Travel Care 4 All (*All Travel Solutions & Fast Track Visa Services*)
* **Managing Consultant**: B. Vidya Sagar
* **Office Location**: `#48-12-1, Ramavarappadu Ring, Beside Key Hotel, Upstairs Union Bank, Vijayawada - 520 004, A.P., INDIA`
* **Phone Numbers**: `+91 73861 33399` / `+91 70136 39149`
* **Email**: `travelcare4all@gmail.com`
* **WhatsApp**: `+91 73861 33399`

---

## 🚀 Render.com Deployment Setup

You can deploy the complete MERN application to Render in **2 simple ways**:

### Option 1: Automatic Blueprint (Recommended)
1. Push your repository to GitHub.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Click **New +** > **Blueprint**.
4. Connect this GitHub repository (`travelcare4all`).
5. Render reads `render.yaml` automatically and configures your service.
6. When prompted for `MONGODB_URI`, paste:
   ```
   mongodb+srv://travelcare4all_admin:Travelcare4all2004@travelcare4all.5uwf1eb.mongodb.net/travelcare4all?retryWrites=true&w=majority&appName=Travelcare4all
   ```
7. Click **Apply**. Render will build and deploy your entire full-stack app at `https://travelcare4all.onrender.com`!

### Option 2: Manual Web Service Setup
1. On [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the following fields:
   * **Name**: `travelcare4all`
   * **Language / Runtime**: `Node`
   * **Branch**: `main`
   * **Build Command**: `npm run build`
   * **Start Command**: `npm start`
   * **Plan**: `Free`
4. Add **Environment Variables**:
   * `NODE_ENV` = `production`
   * `PORT` = `5000`
   * `MONGODB_URI` = `mongodb+srv://travelcare4all_admin:Travelcare4all2004@travelcare4all.5uwf1eb.mongodb.net/travelcare4all?retryWrites=true&w=majority&appName=Travelcare4all`
   * `JWT_SECRET` = *(Click Generate or enter a secure random string)*
   * `CLIENT_URL` = `https://travelcare4all.onrender.com` *(or your custom domain)*
   * `INITIAL_ADMIN_EMAIL` = `admin@travelcare4all.com`
   * `INITIAL_ADMIN_PASSWORD` = `Admin@TravelCare2026`
5. Click **Deploy Web Service**.