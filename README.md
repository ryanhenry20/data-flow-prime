# Data Flow Prime

A modern analytics dashboard built with Next.js, React, Tailwind CSS, and a local Prisma + SQLite backend.

## Features

-   📊 Interactive Analytics Dashboard
-   🎨 Modern UI with shadcn/ui components
-   📱 Responsive design
-   🚀 Built with Next.js 14 App Router
-   🎯 TypeScript support
-   🎭 Tailwind CSS for styling
-   📈 Chart.js integration for data visualization
-   🔍 Command palette for quick navigation
-   🗃️ Persistent local backend with Prisma + SQLite APIs

## Tech Stack

-   **Framework**: Next.js 14 with App Router
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui (Radix UI primitives)
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **State Management**: TanStack Query
-   **Backend/Data**: Next.js API routes + Prisma + SQLite

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd data-flow-prime
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env.local
```

4. (Optional) Generate Prisma client manually:

```bash
npm run db:generate
```

5. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint
-   `npm run db:generate` - Generate Prisma client
-   `npm run db:push` - Push schema to SQLite database
-   `npm run db:studio` - Open Prisma Studio

## Project Structure

```
data-flow-prime/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # React Query provider
│   ├── globals.css        # Global styles
│   ├── analytics/         # Analytics page
│   ├── reports/           # Reports page
│   ├── users/             # Users page
│   └── settings/          # Settings page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard specific components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## Migration from Vite + React Router

This project has been migrated from a Vite + React Router setup to Next.js:

### Key Changes:

-   ✅ Replaced Vite with Next.js 14 App Router
-   ✅ Removed React Router DOM dependency
-   ✅ Updated navigation to use Next.js Link and usePathname
-   ✅ Moved pages to App Router structure
-   ✅ Updated TypeScript configuration for Next.js
-   ✅ Migrated CSS imports and global styles
-   ✅ Updated build and development scripts

### Routing Structure:

-   `/` - Dashboard (home page)
-   `/analytics` - Analytics page
-   `/reports` - Reports page
-   `/users` - Users page
-   `/settings` - Settings page

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
