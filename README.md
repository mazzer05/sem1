# Todo Application

A full-stack todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication and a modern UI.

## Features

- 🔐 User Authentication (Register/Login)
- ✨ Create, Read, Update, and Delete (CRUD) operations for todos
- 📅 Due dates for tasks
- 🏷️ Tag system for better organization
- ⏰ Reminder functionality
- 📱 Responsive design
- 🔒 Protected routes
- 🔄 Real-time updates

## Tech Stack

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fullstack4
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-secret-key
PORT=3001
```

## Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Start the server:
```bash
cd server
npm start
```

3. Start the client:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Todos
- GET `/api/todos` - Get all todos for the authenticated user
- POST `/api/todos` - Create a new todo
- PUT `/api/todos/:id` - Update a todo
- DELETE `/api/todos/:id` - Delete a todo

## Project Structure

```
fullstack4/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── context/        # Context providers
│       ├── redux/          # Redux store, actions, reducers
│       └── App.js          # Main application component
│
└── server/                 # Backend Node.js application
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    └── server.js          # Entry point
```

## Features in Detail

### Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes
- Persistent sessions

### Todo Management
- Create new todos with:
  - Title
  - Status (New, In Progress, Completed)
  - Due date
  - Tags
  - Reminder option
- Edit existing todos
- Delete todos
- Filter todos by status
- Search todos by text

### User Interface
- Clean and modern design
- Responsive layout
- Intuitive navigation
- Loading states
- Error handling
- Success notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/fullstack4](https://github.com/yourusername/fullstack4)
