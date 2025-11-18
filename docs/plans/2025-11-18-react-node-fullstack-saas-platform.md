# React Node Full-Stack SaaS Platform Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a robust, scalable web application with React frontend and Node.js backend for a modern SaaS platform

**Architecture:** Full-stack application with React frontend components, Node.js REST API backend, scalable microservices architecture, and seamless integration between frontend and backend services

**Tech Stack:** React, Node.js, Express.js, MongoDB/PostgreSQL, RESTful APIs, Git, testing frameworks (Jest, Mocha), deployment tools

---

### Task 1: Project Setup and Structure

**Files:**

- Create: `package.json`
- Create: `frontend/package.json`
- Create: `backend/package.json`
- Create: `docker-compose.yml`
- Create: `.gitignore`
- Create: `README.md`

**Step 1: Initialize root package.json**

```json
{
  "name": "react-node-saas-platform",
  "version": "1.0.0",
  "description": "Full-stack React Node SaaS platform",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:frontend": "cd frontend && npm start",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "test": "npm run test:frontend && npm run test:backend"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

**Step 2: Run npm install**

Run: `npm install`
Expected: Dependencies installed successfully

**Step 3: Initialize frontend React app**

Run: `npx create-react-app frontend --template typescript`
Expected: React app created in frontend directory

**Step 4: Initialize backend Node.js app**

```json
{
  "name": "saas-backend",
  "version": "1.0.0",
  "description": "Backend API for SaaS platform",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "dotenv": "^16.3.1",
    "mongoose": "^7.5.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3"
  }
}
```

**Step 5: Run backend npm install**

Run: `cd backend && npm install`
Expected: Backend dependencies installed

---

### Task 2: Backend API Foundation

**Files:**

- Create: `backend/src/index.js`
- Create: `backend/src/config/database.js`
- Create: `backend/src/routes/index.js`
- Create: `backend/src/middleware/auth.js`
- Test: `backend/tests/index.test.js`

**Step 1: Write failing test for server startup**

```javascript
const request = require('supertest');
const app = require('../src/index');

describe('API Server', () => {
  it('should start and respond with 404 for unknown route', async () => {
    const response = await request(app)
      .get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd backend && npm test`
Expected: FAIL with "Cannot find module '../src/index'"

**Step 3: Create main Express server**

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const routes = require('./routes');
const connectDB = require('./config/database');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;
```

**Step 4: Create database configuration**

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/saas-platform');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**Step 5: Create routes index**

```javascript
const express = require('express');
const router = express.Router();

// Placeholder for future routes
router.get('/', (req, res) => {
  res.json({ message: 'SaaS Platform API v1.0' });
});

module.exports = router;
```

**Step 6: Run tests to verify they pass**

Run: `cd backend && npm test`
Expected: PASS

---

### Task 3: User Authentication System

**Files:**

- Create: `backend/src/models/User.js`
- Create: `backend/src/routes/auth.js`
- Create: `backend/src/controllers/authController.js`
- Test: `backend/tests/auth.test.js`

**Step 1: Write failing test for user registration**

```javascript
const request = require('supertest');
const app = require('../src/index');

describe('Authentication', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.token).toBeDefined();
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd backend && npm test -- --testNamePattern="should register a new user"`
Expected: FAIL with "Cannot POST /api/auth/register"

**Step 3: Create User model**

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

**Step 4: Create auth controller**

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = new User({
      email,
      password,
      firstName,
      lastName
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};
```

**Step 5: Create auth routes**

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      });
    }
    next();
  }
];

router.post('/register', validateRegistration, register);
router.post('/login', login);

module.exports = router;
```

**Step 6: Update main routes to include auth**

```javascript
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');

router.get('/', (req, res) => {
  res.json({ message: 'SaaS Platform API v1.0' });
});

router.use('/auth', authRoutes);

module.exports = router;
```

**Step 7: Run tests to verify they pass**

Run: `cd backend && npm test`
Expected: PASS

---

### Task 4: Frontend React Foundation

**Files:**

- Modify: `frontend/src/App.js`
- Create: `frontend/src/components/Auth/Login.js`
- Create: `frontend/src/components/Auth/Register.js`
- Create: `frontend/src/services/api.js`
- Create: `frontend/src/contexts/AuthContext.js`

**Step 1: Write failing test for login component**

```javascript
import { render, screen } from '@testing-library/react';
import Login from '../components/Auth/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `cd frontend && npm test -- --testNamePattern="renders login form"`
Expected: FAIL with "Cannot find module '../components/Auth/Login'"

**Step 3: Create API service**

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Protected endpoints
  async getProfile() {
    return this.request('/user/profile');
  }
}

export default new ApiService();
```

**Step 4: Create Auth Context**

```javascript
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [state.token]);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.login(credentials);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      });
      return response;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.register(userData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      });
      return response;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

**Step 5: Create Login component**

```javascript
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const { login, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {(error || errors.general) && (
          <div className="error-message">
            {error || errors.general}
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="toggle-mode">
          Don't have an account?
          <button type="button" onClick={onToggleMode}>
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
```

**Step 6: Create Register component**

```javascript
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Register = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({});

  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        {(error || errors.general) && (
          <div className="error-message">
            {error || errors.general}
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="toggle-mode">
          Already have an account?
          <button type="button" onClick={onToggleMode}>
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
```

**Step 7: Create Auth CSS styles**

```css
.auth-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #0056b3;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.toggle-mode {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.toggle-mode button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: 0.25rem;
}

.toggle-mode button:hover {
  color: #0056b3;
}
```

**Step 8: Update App.js with Auth integration**

```javascript
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function AppContent() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isAuthenticated } = useAuth();

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>SaaS Platform</h1>
      </header>
      <main>
        {isLoginMode ? (
          <Login onToggleMode={handleToggleMode} />
        ) : (
          <Register onToggleMode={handleToggleMode} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
```

**Step 9: Run tests to verify they pass**

Run: `cd frontend && npm test`
Expected: PASS

---

### Task 5: Dashboard and User Interface

**Files:**

- Create: `frontend/src/components/Dashboard/Dashboard.js`
- Create: `frontend/src/components/Dashboard/Navbar.js`
- Create: `frontend/src/components/Dashboard/Sidebar.js`
- Create: `frontend/src/routes/ProtectedRoute.js`

**Step 1: Write failing test for dashboard component**

```javascript
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard/Dashboard';

test('renders dashboard with welcome message', () => {
  render(<Dashboard />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `cd frontend && npm test -- --testNamePattern="renders dashboard"`
Expected: FAIL with "Cannot find module '../Dashboard/Dashboard'"

**Step 3: Create Dashboard component**

```javascript
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={logout} />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="welcome-section">
            <h1>Welcome back, {user?.firstName}!</h1>
            <p>This is your SaaS platform dashboard</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Account Overview</h3>
              <p>Manage your account settings and preferences</p>
            </div>

            <div className="dashboard-card">
              <h3>Analytics</h3>
              <p>View your usage statistics and reports</p>
            </div>

            <div className="dashboard-card">
              <h3>Projects</h3>
              <p>Access your projects and collaborate with team members</p>
            </div>

            <div className="dashboard-card">
              <h3>Settings</h3>
              <p>Configure your application settings</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
```

**Step 4: Create Dashboard Navbar**

```javascript
import React from 'react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>SaaS Platform</h2>
      </div>

      <div className="navbar-user">
        <span className="user-name">
          {user?.firstName} {user?.lastName}
        </span>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
```

**Step 5: Create Dashboard Sidebar**

```javascript
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', active: true },
    { icon: '📊', label: 'Analytics', active: false },
    { icon: '📁', label: 'Projects', active: false },
    { icon: '👥', label: 'Team', active: false },
    { icon: '💳', label: 'Billing', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ];

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className={item.active ? 'active' : ''}>
            <a href="#">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
```

**Step 6: Create Dashboard CSS**

```css
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-section h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.dashboard-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.dashboard-card p {
  color: #666;
  line-height: 1.5;
}
```

**Step 7: Create Navbar CSS**

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-brand h2 {
  color: #007bff;
  margin: 0;
  font-size: 1.5rem;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  color: #333;
  font-weight: 500;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: #c82333;
}
```

**Step 8: Create Sidebar CSS**

```css
.sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e9ecef;
  padding: 1rem 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin: 0;
}

.sidebar-menu li a {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #666;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.sidebar-menu li a:hover {
  background-color: #f8f9fa;
  color: #333;
}

.sidebar-menu li.active a {
  background-color: #007bff;
  color: white;
}

.menu-icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.menu-label {
  font-weight: 500;
}
```

**Step 9: Run tests to verify they pass**

Run: `cd frontend && npm test`
Expected: PASS

---

### Task 6: API Integration and Data Management

**Files:**

- Create: `backend/src/controllers/userController.js`
- Create: `backend/src/routes/user.js`
- Create: `backend/src/middleware/auth.js`
- Test: `backend/tests/user.test.js`

**Step 1: Write failing test for protected user endpoint**

```javascript
const request = require('supertest');
const app = require('../src/index');

describe('User API', () => {
  describe('GET /api/user/profile', () => {
    it('should return user profile for authenticated user', async () => {
      // First register and login to get token
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });

      const token = registerResponse.body.token;

      const profileResponse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(profileResponse.status).toBe(200);
      expect(profileResponse.body.email).toBe('test@example.com');
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd backend && npm test -- --testNamePattern="should return user profile"`
Expected: FAIL with "Cannot GET /api/user/profile"

**Step 3: Create authentication middleware**

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid token. User not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token.'
    });
  }
};

module.exports = { authenticate };
```

**Step 4: Create user controller**

```javascript
const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      message: 'Profile retrieved successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
```

**Step 5: Create user routes**

```javascript
const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

router.get('/profile', getProfile);

router.put('/profile', [
  body('firstName').optional().notEmpty().trim(),
  body('lastName').optional().notEmpty().trim()
], updateProfile);

module.exports = router;
```

**Step 6: Update main routes to include user routes**

```javascript
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.get('/', (req, res) => {
  res.json({ message: 'SaaS Platform API v1.0' });
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
```

**Step 7: Run tests to verify they pass**

Run: `cd backend && npm test`
Expected: PASS

---

### Task 7: Frontend Dashboard Integration

**Files:**

- Modify: `frontend/src/components/Dashboard/Dashboard.js`
- Create: `frontend/src/components/Dashboard/Profile.js`
- Create: `frontend/src/components/Dashboard/Analytics.js`
- Update: `frontend/src/services/api.js`

**Step 1: Write failing test for profile component**

```javascript
import { render, screen } from '@testing-library/react';
import Profile from '../Dashboard/Profile';

test('renders profile component', () => {
  render(<Profile />);
  expect(screen.getByText(/profile/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `cd frontend && npm test -- --testNamePattern="renders profile"`
Expected: FAIL with "Cannot find module '../Dashboard/Profile'"

**Step 3: Update API service with profile methods**

```javascript
// Add to api.js existing methods

async getProfile() {
  return this.request('/user/profile');
}

async updateProfile(profileData) {
  return this.request('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}
```

**Step 4: Create Profile component**

```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.updateProfile(formData);
      updateUser(response.user);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <h2>Profile Settings</h2>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user?.email || ''}
            disabled
            className="disabled"
          />
          <small>Email cannot be changed</small>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
```

**Step 5: Create Analytics component**

```javascript
import React, { useState, useEffect } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalProjects: 0,
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      try {
        // This would be a real API call
        setTimeout(() => {
          setAnalytics({
            totalProjects: 12,
            totalUsers: 248,
            activeUsers: 67,
            revenue: 4850,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="analytics loading">
        <div className="loading-spinner">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <h2>Analytics Dashboard</h2>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>{analytics.totalProjects}</h3>
            <p>Total Projects</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{analytics.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>{analytics.activeUsers}</h3>
            <p>Active Users</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>${analytics.revenue}</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
```

**Step 6: Create Profile and Analytics CSS**

```css
/* Profile.css */
.profile {
  max-width: 600px;
  margin: 0 auto;
}

.profile h2 {
  color: #333;
  margin-bottom: 2rem;
}

.profile-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-group input.disabled {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.form-group small {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.message {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Analytics.css */
.analytics {
  padding: 1rem 0;
}

.analytics h2 {
  color: #333;
  margin-bottom: 2rem;
}

.analytics.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  color: #6c757d;
  font-size: 1.1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
}

.metric-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
  background: #f8f9fa;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-content h3 {
  color: #333;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
}

.metric-content p {
  color: #666;
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
}
```

**Step 7: Update Dashboard to include Profile and Analytics**

```javascript
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Analytics from './Analytics';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'analytics':
        return <Analytics />;
      default:
        return (
          <div className="welcome-section">
            <h1>Welcome back, {user?.firstName}!</h1>
            <p>This is your SaaS platform dashboard</p>

            <div className="dashboard-grid">
              <div className="dashboard-card" onClick={() => setActiveSection('profile')}>
                <h3>Account Overview</h3>
                <p>Manage your account settings and preferences</p>
              </div>

              <div className="dashboard-card" onClick={() => setActiveSection('analytics')}>
                <h3>Analytics</h3>
                <p>View your usage statistics and reports</p>
              </div>

              <div className="dashboard-card">
                <h3>Projects</h3>
                <p>Access your projects and collaborate with team members</p>
              </div>

              <div className="dashboard-card">
                <h3>Settings</h3>
                <p>Configure your application settings</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={logout} />
      <div className="dashboard-content">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="main-content">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
```

**Step 8: Update Sidebar to handle section changes**

```javascript
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', section: 'dashboard' },
    { icon: '📊', label: 'Analytics', section: 'analytics' },
    { icon: '👤', label: 'Profile', section: 'profile' },
    { icon: '📁', label: 'Projects', section: 'projects' },
    { icon: '👥', label: 'Team', section: 'team' },
    { icon: '💳', label: 'Billing', section: 'billing' },
    { icon: '⚙️', label: 'Settings', section: 'settings' },
  ];

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activeSection === item.section ? 'active' : ''}
            onClick={() => onSectionChange(item.section)}
          >
            <a href="#">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
```

**Step 9: Run tests to verify they pass**

Run: `cd frontend && npm test`
Expected: PASS

---

### Task 8: Testing and Quality Assurance

**Files:**

- Create: `backend/tests/setup.js`
- Create: `frontend/src/setupTests.js`
- Modify: `package.json` (root)
- Create: `jest.config.js` (backend)

**Step 1: Create backend test setup**

```javascript
const mongoose = require('mongoose');

beforeAll(async () => {
  // Use a test database
  const mongoUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/saas-platform-test';
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Clean up database connection
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clean up database before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
```

**Step 2: Create backend Jest config**

```javascript
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

**Step 3: Update backend package.json for testing**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  },
  "jest": {
    "testEnvironment": "node",
    "setupFilesAfterEnv": ["./tests/setup.js"]
  }
}
```

**Step 4: Update root package.json for full testing**

```json
{
  "scripts": {
    "test": "npm run test:backend && npm run test:frontend",
    "test:backend": "cd backend && npm run test",
    "test:frontend": "cd frontend && npm run test",
    "test:coverage": "npm run test:backend:coverage && npm run test:frontend:coverage",
    "test:ci": "npm run test:backend:ci && npm run test:frontend:ci"
  }
}
```

**Step 5: Create comprehensive API integration test**

```javascript
const request = require('supertest');
const app = require('../src/index');

describe('API Integration Tests', () => {
  let authToken;
  let userId;

  describe('Authentication Flow', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'integration@example.com',
        password: 'password123',
        firstName: 'Integration',
        lastName: 'Test'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.token).toBeDefined();

      authToken = response.body.token;
      userId = response.body.user.id;
    });

    it('should login with registered user', async () => {
      const loginData = {
        email: 'integration@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe(loginData.email);
      expect(response.body.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const invalidLogin = {
        email: 'integration@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidLogin);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('Protected Routes', () => {
    it('should access profile with valid token', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe('integration@example.com');
    });

    it('should reject access without token', async () => {
      const response = await request(app)
        .get('/api/user/profile');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    it('should reject access with invalid token', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });

  describe('User Profile Management', () => {
    it('should update user profile', async () => {
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name'
      };

      const response = await request(app)
        .put('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.user.firstName).toBe(updateData.firstName);
      expect(response.body.user.lastName).toBe(updateData.lastName);
    });
  });
});
```

**Step 6: Create frontend integration test**

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import App from '../App';
import api from '../services/api';

// Mock the API
jest.mock('../services/api');

const MockedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should show login form initially', () => {
    render(<MockedApp />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should toggle between login and register', () => {
    render(<MockedApp />);

    // Click register link
    fireEvent.click(screen.getByText(/register here/i));

    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  });

  it('should handle login flow', async () => {
    const mockLoginResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      },
      token: 'mock-token'
    };

    api.login.mockResolvedValue(mockLoginResponse);

    render(<MockedApp />);

    // Fill login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome back, test/i)).toBeInTheDocument();
    });
  });
});
```

**Step 7: Run comprehensive tests**

Run: `npm run test:ci`
Expected: All tests pass with good coverage

---

### Task 9: Documentation and Deployment Setup

**Files:**

- Create: `README.md`
- Create: `.env.example`
- Create: `docker-compose.yml`
- Create: `Dockerfile` (backend)
- Create: `frontend/Dockerfile`

**Step 1: Create comprehensive README**

```markdown
# React Node SaaS Platform

A full-stack SaaS application built with React and Node.js, featuring user authentication, dashboard, and scalable architecture.

## Features

- 🔐 User authentication (register/login)
- 📊 Analytics dashboard
- 👤 User profile management
- 🔒 Protected API routes
- 📱 Responsive design
- 🧪 Comprehensive testing
- 🐳 Docker deployment

## Tech Stack

### Frontend
- React 18
- React Router
- Context API for state management
- CSS3 with modern layouts
- Jest & React Testing Library

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- Jest & Supertest for testing

### Development Tools
- Docker & Docker Compose
- Git
- npm/Concurrently for scripts

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react-node-saas-platform
```

2. Install dependencies
```bash
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development servers
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests for specific environment:
```bash
npm run test:backend
npm run test:frontend
```

## Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose up --build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

## Project Structure

```
react-node-saas-platform/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   └── styles/          # CSS files
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── config/          # Configuration files
├── tests/                   # Integration tests
└── docs/                    # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License
```

**Step 2: Create environment example**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/saas-platform
MONGODB_TEST_URI=mongodb://localhost:27017/saas-platform-test

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=30d

# Server
PORT=3001
NODE_ENV=development

# Frontend
REACT_APP_API_URL=http://localhost:3001/api
```

**Step 3: Create Docker Compose configuration**

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: saas-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: saas-platform
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build:
      context: ./backend
      dockerfile: ../Dockerfile.backend
    container_name: saas-backend
    restart: unless-stopped
    environment:
      - MONGODB_URI=mongodb://admin:password123@mongodb:27017/saas-platform?authSource=admin
      - JWT_SECRET=your-super-secret-jwt-key-here
      - JWT_EXPIRES_IN=30d
      - PORT=3001
      - NODE_ENV=production
    ports:
      - "3001:3001"
    depends_on:
      - mongodb
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build:
      context: ./frontend
      dockerfile: ../Dockerfile.frontend
    container_name: saas-frontend
    restart: unless-stopped
    environment:
      - REACT_APP_API_URL=http://localhost:3001/api
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  mongodb_data:
```

**Step 4: Create backend Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3001

CMD ["npm", "start"]
```

**Step 5: Create frontend Dockerfile**

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

**Step 6: Create nginx configuration for frontend**

```nginx
server {
    listen 3000;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (optional, for production)
    location /api {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

**Step 7: Test Docker build**

Run: `docker-compose build`
Expected: Images built successfully

---

## Final Integration and Testing

**Step 1: Run full application test suite**

Run: `npm run test:ci`
Expected: All tests pass with good coverage

**Step 2: Test application startup**

Run: `npm run dev`
Expected: Both frontend and backend start successfully

**Step 3: Test Docker deployment**

Run: `docker-compose up`
Expected: Application runs in Docker containers

## Verification Checklist

- [ ] Authentication system working (register/login)
- [ ] Protected API routes implemented
- [ ] Frontend dashboard displays correctly
- [ ] User profile management functional
- [ ] Analytics dashboard shows mock data
- [ ] All tests passing with good coverage
- [ ] Docker deployment working
- [ ] Documentation complete
- [ ] Environment variables configured
- [ ] Security best practices implemented

## Estimated Timeline

This implementation plan is designed for a developer to complete over approximately 2-3 weeks, with the following breakdown:

- **Week 1**: Backend API, authentication, and database setup (Tasks 1-3)
- **Week 2**: Frontend components, dashboard, and integration (Tasks 4-7)
- **Week 3**: Testing, documentation, and deployment setup (Tasks 8-9)

Each task is designed to be completed in 2-4 hours, allowing for flexibility based on developer experience and any unforeseen challenges.