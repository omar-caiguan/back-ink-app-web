# 🦅 Black Ink - Professional Tattoo Studio Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-15.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**Black Ink** is a premium, full-stack web platform designed for high-end tattoo studios. It offers a sophisticated solution for managing clients, appointments, artist portfolios, and payments, all wrapped in a stunning, modern interface.

---

## 🚀 Key Features

*   **📅 Smart Booking System**: Visual calendar, real-time availability, conflict detection, and automated reminders (Email/SMS).
*   **🎨 Dynamic Portfolio**: Interactive gallery with semantic search (by style, size, artist), Cloudinary optimization, and watermarking.
*   **👥 Client Management**: Comprehensive CRM with booking history, preferences, and automated follow-ups.
*   **💳 Integrated Payments**: Secure deposits and full payments via Stripe, with automated receipts and refund handling.
*   **📊 Admin Dashboard**: Advanced analytics for revenue, artist performance, and operational metrics.
*   **🔒 Security First**: Role-based access (Client, Artist, Admin), data encryption, and GDPR compliance.

---

## 🛠️ Tech Stack

### Core
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS, Shadcn/UI, Framer Motion
*   **State**: Zustand, React Query v5

### Backend & Infrastructure
*   **Database**: PostgreSQL (via Supabase)
*   **ORM**: Prisma
*   **Auth**: Clerk
*   **API**: tRPC, Next.js API Routes
*   **Storage**: Cloudinary
*   **Payments**: Stripe

---

## 🏗️ Getting Started

### Prerequisites
*   Node.js 20+
*   npm / pnpm / yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/black-ink.git
    cd black-ink/app-web
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    *Fill in your keys for Clerk, Supabase, Cloudinary, and Stripe.*

4.  **Database Migration**
    ```bash
    pnpm prisma generate
    pnpm prisma migrate dev
    ```

5.  **Run Development Server**
    ```bash
    pnpm dev
    ```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

```bash
src/
├── app/               # Next.js App Router pages
│   ├── (public)/      # Public facing pages (Landing, Portfolio)
│   ├── (auth)/        # Authentication flows
│   ├── (dashboard)/   # Client dashboard
│   ├── (admin)/       # Admin panel
│   └── api/           # API routes & Webhooks
├── components/        # React components (UI, Layout, Features)
├── lib/               # Utilities, database clients, constants
├── server/            # tRPC routers and procedures
└── styles/            # Global styles and themes
```

---

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
