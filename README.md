# Pet Manager

A **Full Stack pet management application** built with **React, TypeScript, Node.js, and Express**.

This project was developed as a practical Full Stack application focused on **authentication, authorization, CRUD operations, REST APIs, data validation, protected routes, and JSON-based data persistence**.

## Getting Started

### Backend

```bash
cd backend
npm install
node server.js
```

The API will run on:

`http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the local Vite development server.

## Technologies

### Frontend

- React
- TypeScript
- React Router
- Vite
- CSS

### Backend

- Node.js
- Express
- JWT
- LowDB
- JSON

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Token persistence using `localStorage`
- Logout
- Protected routes
- Guest-only routes for authentication pages
- Automatic redirection based on authentication state

### User Management

- User registration
- User authentication
- User profile data
- Backend authentication and authorization

### Pet Management

- Register pets
- List pets
- Edit pets
- Delete pets
- Search and filter pets
- Validation for pet data
- Loading and error states
- Protected pet operations

### Authorization

Each user can only access and manage their own pets.

Authorization is enforced on the **backend**, preventing users from accessing, editing, or deleting resources that do not belong to them.

## Authentication Flow

The application uses **JWT** to authenticate users.

1. The user registers an account.
2. The user logs in with their credentials.
3. The backend returns a JWT.
4. The frontend stores the token in `localStorage`.
5. Authenticated requests send the token using the `Authorization` header.
6. Protected routes prevent unauthenticated users from accessing the pet management page.
7. The backend validates the token before allowing protected operations.

## CRUD Operations

The application implements the complete CRUD lifecycle for pets:

- **Create** — register a new pet
- **Read** — retrieve and display pets
- **Update** — edit an existing pet
- **Delete** — remove a pet

The frontend communicates with the Express REST API through dedicated service modules.

## Data Validation

Both the frontend and backend participate in data validation.

The frontend provides immediate feedback for invalid form data, while the backend performs validation and authorization independently to ensure that client-side restrictions cannot be bypassed.

## Data Persistence

The application currently uses **LowDB with JSON-based persistence** instead of a traditional database.

This keeps the project simple while providing persistent data storage between server restarts.

## What I Practiced

This project was built to strengthen my understanding of:

- React component architecture
- TypeScript with React
- React Hooks
- React Router
- Protected and guest routes
- REST API development
- Express.js
- JWT authentication
- Backend authorization
- CRUD operations
- Form validation
- API service organization
- Error and loading handling
- JSON-based persistence
- Frontend/backend integration
- Separation of responsibilities

## Purpose

The main goal of this project was to practice and demonstrate **real-world Full Stack development concepts** rather than focusing primarily on visual design.

The application intentionally has a simple and functional interface, allowing the main focus to remain on **logic, architecture, authentication, authorization, API integration, and code organization**.
