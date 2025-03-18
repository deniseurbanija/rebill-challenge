# Rebill Challenge

A full-stack application for managing addresses with Google Maps integration, featuring a modern React frontend and a NestJS backend.

## 🚀 Quick Start

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all

# Start development servers
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Google Maps API key

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/rebill-challenge.git
cd rebill-challenge
```

2. Install dependencies:

```bash
npm run install:all
```

3. Set up environment variables:

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
NEXT_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_API_URL=http://localhost:8000
```

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=8000
NODE_ENV=development
```

## 🏗️ Architecture

### Frontend

- **Framework**: React with TypeScript
- **UI Library**: Shadcn/ui
- **State Management**: Redux
- **Maps Integration**: Google Maps Places API
- **Styling**: Tailwind CSS

### Backend

- **Framework**: NestJS
- **Database**: Postgres
- **Validation**: class-validator

## 🚀 Available Scripts

- `npm run dev`: Start both frontend and backend in development mode
- `npm run dev:frontend`: Start only the frontend
- `npm run dev:backend`: Start only the backend
- `npm run install:all`: Install dependencies for all packages

## 🔧 Development

### Frontend Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and external service integrations
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
```

### Backend Structure

```
backend/
├── src/
│   ├── address/   # Request handlers
│   ├── entities/      # Business logic
│   ├── app.module.ts
│   └── main.ts        # Application entry point
```
