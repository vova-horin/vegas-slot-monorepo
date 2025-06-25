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

- **Swagger API Documentation Setup (10min)**: Implemented comprehensive Swagger documentation for all API endpoints with proper decorators, response types, and authentication requirements. The interactive API documentation is available at `/api/docs` and includes detailed descriptions, request/response examples, and the ability to test endpoints directly from the browser interface.

- **Configuration Management Setup (10min)**: Implemented centralized configuration using `@nestjs/config` to replace scattered `process.env` usage throughout the codebase. This provides better type safety, centralized configuration, and easier environment switching.

- **Main Game Session Logic Implementation (2h)**: Designed and implemented the core game mechanics with a balance management system:
  - **Balance Architecture**: I decided to implement a two-tier balance system where users have an overall balance that allocates 10 credits to each new session. This approach provides better control over credit distribution and prevents players from creating multiple sessions to exploit the system.
  - **Session Lifecycle Management**: I created a complete session management system where users can start a new game session, perform rolls during the session, and cash out when finished. Each roll result is stored in the database to have the game history.
  - **Credit Flow System**: I implemented a credit flow mechanism where credits are deducted from the session balance for each roll, and upon cash out, the remaining session balance is transferred back to the user's overall balance. This ensures credit tracking and prevents credit loss.
  - **Game Configuration Centralization**: I decided to move all game-related configuration (symbol rewards, cheating thresholds, cheating probabilities) to the application configuration module. This makes it easy to adjust game parameters like cheating behavior or winning credit amounts without services code changes, simply by modifying configuration file.
  - **Database Integration**: I set up database entities and repositories for game sessions and game rolls to maintain game state and provide game history tracking.

### Step 4: Frontend Development

- **TypeScript Configuration Update (5min)**: I realized that during the initial setup, I created the frontend without TypeScript configuration. To maintain consistency with the backend and ensure type safety across the entire application, I updated the frontend configuration to use TypeScript.

- **Frontend Architecture Setup (1h)**: Defined the frontend architecture to support the slot machine game requirements:
  - **Styling Framework**: Installed and configured Tailwind CSS for easy styling. Tailwind provides utility classes that make it simple to create responsive and modern interfaces without writing custom CSS.
  - **Basic UI Components**: Created reusable UI components to maintain consistency across the application:
    - `Button` component for interactive elements like spin and cashout actions
    - `Table` component for displaying game history and results
    - `BalanceLabel` component for showing current credit balance with proper formatting
  - **API Integration Setup**: Established API client setup with authentication handling.
  - **State Management Decision**: Created a `contexts` folder and implemented React Context for state management. I decided to use Context API instead of introducing more complex state management libraries (like Redux) to keep the application simple and avoid unnecessary complexity for such a straightforward UI structure.
  - **Authentication Flow**: Implemented automatic sign up logic on app initialization to create a seamless user experience without requiring manual registration.
  - **Game Assets**: Added slot machine symbols (cherry, lemon, orange, watermelon) as PNG assets to provide visual representation for the game symbols.
