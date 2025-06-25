# Vegas Slot Machine - Casino Jackpot Assignment

A full-stack slot machine game built with React (Tailwind CSS) frontend and NestJS backend.

## Project Structure

- `frontend/` - React application
- `service/` - NestJS backend API

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd service

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run start:dev
```

The backend will be available at `http://localhost:4000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file (if exists)
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running Both Applications

You can run both applications simultaneously by opening two terminal windows:

**Terminal 1 (Backend):**

```bash
cd service
npm run start:dev
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

## Game Rules

- Players start with 10 credits
- Each spin costs 1 credit
- Win by getting 3 matching symbols
- Rewards: Cherry (10), Lemon (20), Orange (30), Watermelon (40)
- House cheating activates at 40+ credits (30% re-roll chance)
- Increased cheating at 60+ credits (60% re-roll chance)

## Development Journey

### Step 1: Read the task and choose tech stack (20min)

- First, I carefully read through the task document to understand all the requirements:
  - Full-stack slot machine game with frontend and backend
  - Server-side cheating mechanism based on player credits
  - Client-side spinning animations with staggered reveal
  - Session management and credit system
  - Cash-out functionality
- After understanding the requirements, I started thinking about technology choices:
  - **Frontend**: I chose React without doubts since I have the most experience with it and it's considered a standard for web applications. React's component-based architecture and state management capabilities make it perfect for this type of interactive game.
  - **Backend**: For the backend, this task is relatively simple so technically we could use many different technologies. I chose TypeScript + NestJS for several reasons:
    - Easy to set up and get started quickly
    - TypeScript ensures type safety and makes code review easier since frontend and backend is on TypeScript
    - NestJS because I have the most experience with this framework
    - NestJS works exceptionally well for REST APIs with its built-in decorators and dependency injection
- **Database consideration**: For sure in a real application I would use some database, but since this is a test app, to avoid unnecessary complexity I decided to create a separate module that stores everything in memory. This can easily be replaced with a database in production without changing the core business logic.
- **Development workflow**: I decided to follow regular development practices by having one `main` branch and creating separate feature branches with pull requests, as this is how it's typically done in real development environments. This approach might help clearly review the process of development of this solution, as each feature will be developed in its own branch with clear commit history and pull request descriptions.

### Step 2: Project Setup (10min)

- Created monorepo structure with `frontend` and `service` directories.
- **Frontend Setup**: Used Vite to create a default React skeleton application with a single page. The app includes the standard Vite React template with basic styling and a simple welcome page.
- **Backend Setup**: Used NestJS CLI to create an empty NestJS application with minimal configuration. The service includes just one health endpoint (`/health`) for basic connectivity testing.
- **Architecture Decision**: Decided to make frontend and service fully independent applications that can be developed, deployed, and run separately. This allows for better separation of concerns and flexibility in deployment strategies.
- Both applications are configured to run on their default ports (frontend: 3000, backend: 4000) and are ready for development.

### Step 3: Backend Development

- **Development Order Decision**: I decided to develop the backend API first before working on the frontend. This approach allow me to establish a well-defined endpoints and business logic, making it easier to build the frontend with confidence that the API contracts are stable and functional.

- **Authorization Implementation (30min)**: Even though standard authentication wasn't required in the task, I implemented a comprehensive authorization system that follows common auth patterns. Each game session is treated as a separate user with a JWT token for session management. This approach provides better security, scalability, and clean separation between different player sessions.

- **Swagger API Documentation Setup**: Implemented comprehensive Swagger documentation for all API endpoints with proper decorators, response types, and authentication requirements. The interactive API documentation is available at `/api/docs` and includes detailed descriptions, request/response examples, and the ability to test endpoints directly from the browser interface.
