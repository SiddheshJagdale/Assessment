# Assessment
This guide explains how to set up and run a MERN (MongoDB, Express, React, Node.js) stack project locally. The project structure consists of two main folders:

- `backend`: Contains the server-side code (Node.js, Express, MongoDB).
- `frontend`: Contains the client-side code (React).

## Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud MongoDB URI)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

## Setup Instructions

### 1. Clone the Repository

```bash
git clone[ <repository-url>](https://github.com/SiddheshJagdale/Assessment.git)
cd <repository-folder>
```

### 2. Setup Backend

Navigate to the `backend` folder and install dependencies:

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
```

#### Start the Backend Server

Run the following command to start the server:

```bash
npm start
```

The backend server will start on `http://localhost:5000` by default (or the port specified in your `.env` file).

### 3. Setup Frontend

Navigate to the `frontend` folder and install dependencies:

```bash
cd ../frontend
npm install
```

#### Configure Environment Variables

If your frontend requires environment variables, create a `.env` file in the `frontend` folder with the necessary variables. For example:

```env
REACT_APP_API_URL=http://localhost:5000
```

#### Start the Frontend Server

Run the following command to start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000` by default.

## Running the Project

Once both servers are running:

- The backend server will handle API requests on `http://localhost:5000`.
- The frontend server will serve the React application on `http://localhost:3000`.

Ensure the backend is running first to avoid errors in API calls from the frontend.

## Build and Deployment

### Frontend

To build the React app for production, run:

```bash
npm run build
```

This will generate a `build` folder in the `frontend` directory, ready for deployment.

### Backend

Ensure the backend server is configured to serve static files from the `frontend/build` folder if deploying together. Update the backend to include:

```javascript
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
```

## Additional Notes

- Ensure MongoDB is running and accessible for the backend to function correctly.
- Update `package.json` scripts if necessary for custom commands.
- Use `.env` files to manage environment-specific variables.

---

Happy coding!
