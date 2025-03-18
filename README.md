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

- Node.js (v20 or higher)
- npm (v9 or higher)
- Next.js (v15 or higher)
- Google Maps API key
- Docker

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
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_password_here
DB_NAME=your_postgres_db
```

## ✨ Database Setup

To quickly set up a PostgreSQL database, use Docker:
```
docker-compose up -d
```

Or if you don't have a `docker-compose.yml`, create one:
```
version: '3.8'

services:
  database:
    image: postgres:15
    container_name: rebill_challenge_db
    restart: always
    environment:
      POSTGRES_USER: your_postgres_user
      POSTGRES_PASSWORD: your_postgres_password
      POSTGRES_DB: your_postgres_db
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
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
│   ├── redux/         # Redux components
│   ├── data/         # folder with the countries data file
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

## Reflexion
🔗 [Reflexión y mejoras futuras - Google Docs](https://docs.google.com/document/d/1xMh_CFvQ6fg6DMZE8ZSLOYSRKatJ5aFt1P6SbGS5Mrg/edit?usp=sharing)
