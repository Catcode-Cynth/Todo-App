# Todo-App

A modern, full-stack Todo application with user authentication, task management, and a clean, responsive UI.

## Features

- User registration and login with JWT authentication
- Secure password handling
- Add, edit, complete, and delete tasks
- Responsive, modern UI for desktop and mobile
- Clean separation of frontend (React + Vite) and backend (Node.js + Express)
- Persistent authentication using localStorage
- Error handling and user feedback
- Theming inspired by a soft, professional palette

## Tech Stack

- **Frontend:** React, TypeScript, Vite, CSS Modules
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JWT
- **Testing:** Jest

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Nuel-09/Todo-App.git
   cd Todo-App
   ```

2. **Install backend dependencies:**

   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```sh
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the backend folder and fill in your MongoDB URI and JWT secret.

5. **Run the backend:**

   ```sh
   cd backend
   npm run dev
   ```

6. **Run the frontend:**

   ```sh
   cd ../frontend
   npm run dev
   ```

7. **Open the app:**
   - Visit `http://localhost:5173` in your browser.

## Folder Structure

```
backend/
  src/
    controllers/
    models/
    routes/
    middleware/
    utils/
    ...
frontend/
  src/
    components/
    pages/
    assets/
    ...
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
