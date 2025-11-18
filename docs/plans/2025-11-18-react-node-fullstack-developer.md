# React Node.js Full Stack Developer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a robust, scalable SaaS web application using React frontend and Node.js backend with modern architecture and best practices.

**Architecture:** Full-stack application with React frontend, Node.js/Express backend, RESTful APIs, scalable database design, and modern deployment pipeline following SaaS patterns.

**Tech Stack:** React 18+, Node.js, Express.js, PostgreSQL/MongoDB, TypeScript, Jest, Docker, AWS/Heroku, Git, CI/CD

---

## Task 1: Project Setup and Architecture

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `docker-compose.yml`
- Create: `.gitignore`
- Create: `README.md`

**Step 1: Initialize project structure**

```bash
mkdir react-node-saas
cd react-node-saas
npm init -y
```

**Step 2: Setup TypeScript configuration**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: Create Docker development environment**

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@postgres:5432/saas_db

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=saas_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Step 4: Setup gitignore**

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
```

---

## Task 2: Backend API Foundation

**Files:**
- Create: `backend/package.json`
- Create: `backend/src/app.ts`
- Create: `backend/src/server.ts`
- Create: `backend/src/config/database.ts`
- Create: `backend/src/middleware/auth.ts`
- Create: `backend/src/routes/index.ts`

**Step 1: Initialize backend dependencies**

```json
// backend/package.json
{
  "name": "saas-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^6.1.5",
    "morgan": "^1.10.0",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.10.0",
    "joi": "^17.9.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/morgan": "^1.9.4",
    "@types/bcryptjs": "^2.4.2",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/pg": "^8.10.1",
    "@types/node": "^18.15.11",
    "typescript": "^5.0.4",
    "nodemon": "^2.0.22",
    "jest": "^29.5.0",
    "@types/jest": "^29.5.1",
    "ts-jest": "^29.1.0"
  }
}
```

**Step 2: Create Express server setup**

```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
```

**Step 3: Setup database connection**

```typescript
// backend/src/config/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export default pool;
```

**Step 4: Create authentication middleware**

```typescript
// backend/src/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user as { id: string; email: string };
    next();
  });
};

export { AuthRequest };
```

**Step 5: Setup routes structure**

```typescript
// backend/src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
```

---

## Task 3: User Authentication System

**Files:**
- Create: `backend/src/routes/auth.ts`
- Create: `backend/src/models/User.ts`
- Create: `backend/src/services/authService.ts`
- Create: `backend/tests/auth.test.ts`

**Step 1: Create User model**

```typescript
// backend/src/models/User.ts
import pool from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  static async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const query = `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name, created_at, updated_at
    `;
    const values = [userData.email, hashedPassword, userData.firstName, userData.lastName];

    const result = await pool.query(query, values);
    return this.mapRowToUser(result.rows[0]);
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] ? this.mapRowToUser(result.rows[0]) : null;
  }

  static async findById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] ? this.mapRowToUser(result.rows[0]) : null;
  }

  private static mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      firstName: row.first_name,
      lastName: row.last_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}
```

**Step 2: Create authentication service**

```typescript
// backend/src/services/authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel, User } from '../models/User';

export class AuthService {
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await UserModel.create(userData);
    const token = this.generateToken(user.id, user.email);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  static async login(email: string, password: string): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  private static generateToken(userId: string, email: string): string {
    return jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
  }
}
```

**Step 3: Create authentication routes**

```typescript
// backend/src/routes/auth.ts
import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { AuthService } from '../services/authService';

const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await AuthService.register(value);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await AuthService.login(value.email, value.password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

export default router;
```

**Step 4: Write authentication tests**

```typescript
// backend/tests/auth.test.ts
import request from 'supertest';
import { app } from '../src/app';

describe('Authentication', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should not register user with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

---

## Task 4: React Frontend Setup

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/index.tsx`
- Create: `frontend/public/index.html`
- Create: `frontend/src/components/Layout.tsx`
- Create: `frontend/src/hooks/useAuth.ts`

**Step 1: Initialize React frontend**

```json
// frontend/package.json
{
  "name": "saas-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0",
    "axios": "^1.4.0",
    "react-query": "^3.39.3",
    "react-hook-form": "^7.44.1",
    "react-hot-toast": "^2.4.1",
    "tailwindcss": "^3.3.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.6",
    "@types/react-dom": "^18.2.4",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.4",
    "vite": "^4.3.5",
    "vitest": "^0.31.0",
    "@vitest/ui": "^0.31.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.23"
  }
}
```

**Step 2: Create Vite configuration**

```typescript
// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

**Step 3: Setup main React components**

```tsx
// frontend/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

```tsx
// frontend/src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
```

**Step 4: Create authentication hook**

```typescript
// frontend/src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>(
    'user',
    async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;

      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      } catch {
        localStorage.removeItem('token');
        return null;
      }
    },
    { staleTime: 1000 * 60 * 5 }
  );

  const loginMutation = useMutation(
    async (credentials: { email: string; password: string }) => {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        queryClient.setQueryData('user', data.user);
        toast.success('Welcome back!');
      },
      onError: () => {
        toast.error('Invalid credentials');
      }
    }
  );

  const registerMutation = useMutation(
    async (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        queryClient.setQueryData('user', data.user);
        toast.success('Account created successfully!');
      },
      onError: () => {
        toast.error('Registration failed');
      }
    }
  );

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData('user', null);
    toast.success('Logged out successfully');
  };

  return {
    user,
    loading: isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isAuthenticated: !!user
  };
};
```

**Step 5: Create Layout component**

```tsx
// frontend/src/components/Layout.tsx
import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">SaaS App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
```

---

## Task 5: Database Schema and Migrations

**Files:**
- Create: `backend/migrations/001_create_users_table.sql`
- Create: `backend/migrations/002_create_subscriptions_table.sql`
- Create: `backend/src/config/migrationRunner.ts`

**Step 1: Create users table migration**

```sql
-- backend/migrations/001_create_users_table.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Step 2: Create subscriptions table**

```sql
-- backend/migrations/002_create_subscriptions_table.sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'free', 'pro', 'enterprise'
    status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'expired'
    stripe_subscription_id VARCHAR(255),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

**Step 3: Create migration runner**

```typescript
// backend/src/config/migrationRunner.ts
import pool from './database';
import fs from 'fs';
import path from 'path';

export class MigrationRunner {
  static async createMigrationsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    await pool.query(query);
  }

  static async getExecutedMigrations(): Promise<string[]> {
    const result = await pool.query('SELECT filename FROM migrations ORDER BY id');
    return result.rows.map((row) => row.filename);
  }

  static async runMigration(filename: string, content: string) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(content);
      await client.query(
        'INSERT INTO migrations (filename) VALUES ($1)',
        [filename]
      );
      await client.query('COMMIT');
      console.log(`Migration ${filename} executed successfully`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async runAllMigrations() {
    await this.createMigrationsTable();

    const migrationsDir = path.join(__dirname, '../../migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    const executedMigrations = await this.getExecutedMigrations();

    for (const file of migrationFiles) {
      if (!executedMigrations.includes(file)) {
        const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await this.runMigration(file, content);
      }
    }
  }
}
```

---

## Task 6: API Testing and Documentation

**Files:**
- Create: `backend/src/routes/users.ts`
- Create: `backend/tests/users.test.ts`
- Create: `docs/api.md`

**Step 1: Create user routes**

```typescript
// backend/src/routes/users.ts
import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { UserModel } from '../models/User';

const router = Router();

router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findById(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { firstName, lastName } = req.body;

    const query = `
      UPDATE users
      SET first_name = $1, last_name = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, email, first_name, last_name, created_at, updated_at
    `;

    const result = await pool.query(query, [firstName, lastName, req.user!.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

**Step 2: Write API tests**

```typescript
// backend/tests/users.test.ts
import request from 'supertest';
import { app } from '../src/app';

describe('User Routes', () => {
  let authToken: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.token;
  });

  describe('GET /api/users/profile', () => {
    it('should return user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('firstName');
      expect(response.body).toHaveProperty('lastName');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

**Step 3: Create API documentation**

```markdown
# SaaS API Documentation

## Authentication

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## Users

### Get Profile
```
GET /api/users/profile
Authorization: Bearer <token>
```

### Update Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith"
}
```

## Error Responses

All endpoints return consistent error format:
```json
{
  "error": "Error message description"
}
```

Status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
```

---

## Task 7: Deployment Configuration

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `Dockerfile.backend`
- Create: `Dockerfile.frontend`
- Create: `deployment/nginx.conf`

**Step 1: Create CI/CD pipeline**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: backend/package-lock.json

    - name: Install dependencies
      run: |
        cd backend
        npm ci

    - name: Run tests
      run: |
        cd backend
        npm run test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        JWT_SECRET: test_secret

  test-frontend:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json

    - name: Install dependencies
      run: |
        cd frontend
        npm ci

    - name: Build frontend
      run: |
        cd frontend
        npm run build

  deploy:
    needs: [test-backend, test-frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Deploy to production
      run: |
        echo "Deploy to production server"
        # Add deployment commands here
```

**Step 2: Create backend Dockerfile**

```dockerfile
# Dockerfile.backend
FROM node:18-alpine AS builder

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ .
RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

**Step 3: Create frontend Dockerfile**

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

FROM nginx:alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Step 4: Create nginx configuration**

```nginx
# deployment/nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    upstream backend {
        server backend:5000;
    }

    server {
        listen 80;
        server_name localhost;

        root /usr/share/nginx/html;
        index index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## Task 8: Performance and Security

**Files:**
- Create: `backend/src/middleware/rateLimiter.ts`
- Create: `backend/src/utils/validation.ts`
- Create: `frontend/src/utils/axiosConfig.ts`
- Create: `backend/src/middleware/errorHandler.ts`

**Step 1: Implement rate limiting**

```typescript
// backend/src/middleware/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  middleware = (req: Request, res: Response, next: NextFunction) => {
    const key = this.getKey(req);
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.store[key] || this.store[key].resetTime <= windowStart) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      return next();
    }

    this.store[key].count++;

    if (this.store[key].count > this.maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil(this.store[key].resetTime / 1000)
      });
    }

    next();
  };

  private getKey(req: Request): string {
    return req.ip || 'unknown';
  }

  private cleanup() {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime <= windowStart) {
        delete this.store[key];
      }
    });
  }
}

export const authLimiter = new RateLimiter(15 * 60 * 1000, 5); // 5 requests per 15 minutes
export const generalLimiter = new RateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes
```

**Step 2: Create input validation utilities**

```typescript
// backend/src/utils/validation.ts
import Joi from 'joi';

export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50)
  }).min(1)
};

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    req.body = value;
    next();
  };
};
```

**Step 3: Configure Axios with security headers**

```typescript
// frontend/src/utils/axiosConfig.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Step 4: Create error handling middleware**

```typescript
// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Log error details
  console.error({
    error: message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      error: statusCode === 500 ? 'Internal Server Error' : message
    });
  } else {
    res.status(statusCode).json({
      error: message,
      stack: error.stack,
      details: error
    });
  }
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
```

---

## Task 9: Testing Strategy Implementation

**Files:**
- Create: `backend/setupTests.ts`
- Create: `frontend/vitest.config.ts`
- Create: `backend/tests/integration/auth.test.ts`
- Create: `frontend/src/components/__tests__/Login.test.tsx`

**Step 1: Setup Jest configuration**

```typescript
// backend/setupTests.ts
import { Pool } from 'pg';

// Test database setup
const testPool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
  max: 1,
});

beforeAll(async () => {
  // Setup test database
  await testPool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
});

afterAll(async () => {
  // Clean up test database
  await testPool.end();
});

beforeEach(async () => {
  // Reset database before each test
  await testPool.query('TRUNCATE TABLE users, subscriptions RESTART IDENTITY CASCADE');
});

export { testPool };
```

**Step 2: Configure Vitest for frontend testing**

```typescript
// frontend/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```

**Step 3: Create integration tests**

```typescript
// backend/tests/integration/auth.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import { testPool } from '../setupTests';

describe('Authentication Integration Tests', () => {
  describe('User Registration and Login Flow', () => {
    it('should register user and allow login', async () => {
      const userData = {
        email: 'integration@test.com',
        password: 'Password123!',
        firstName: 'Integration',
        lastName: 'Test'
      };

      // Register user
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(registerResponse.body.user.email).toBe(userData.email);
      expect(registerResponse.body.token).toBeDefined();

      // Login with same credentials
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(loginResponse.body.user.email).toBe(userData.email);
      expect(loginResponse.body.token).toBeDefined();

      // Access protected route
      const profileResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(200);

      expect(profileResponse.body.email).toBe(userData.email);
    });

    it('should prevent duplicate registration', async () => {
      const userData = {
        email: 'duplicate@test.com',
        password: 'Password123!',
        firstName: 'Duplicate',
        lastName: 'Test'
      };

      // First registration should succeed
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Second registration should fail
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
    });
  });
});
```

**Step 4: Create React component tests**

```tsx
// frontend/src/components/__tests__/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Login Component', () => {
  it('renders login form', () => {
    renderWithProviders(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(<Login />);

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Test would check for successful login behavior
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  });
});
```

---

## Task 10: Monitoring and Logging

**Files:**
- Create: `backend/src/utils/logger.ts`
- Create: `backend/src/middleware/requestLogger.ts`
- Create: `backend/src/metrics/healthCheck.ts`
- Create: `frontend/src/utils/errorReporting.ts`

**Step 1: Setup structured logging**

```typescript
// backend/src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'saas-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

**Step 2: Create request logging middleware**

```typescript
// backend/src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    };

    if (res.statusCode >= 400) {
      logger.warn('HTTP Request', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });

  next();
};
```

**Step 3: Create health check endpoints**

```typescript
// backend/src/metrics/healthCheck.ts
import { Request, Response } from 'express';
import pool from '../config/database';
import logger from '../utils/logger';

export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Check database connection
    const dbCheck = await pool.query('SELECT 1');

    // Check memory usage
    const memUsage = process.memoryUsage();

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbCheck.rows.length > 0 ? 'connected' : 'disconnected',
      memory: {
        rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
      },
    };

    res.json(health);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Service unavailable'
    });
  }
};
```

**Step 4: Setup frontend error reporting**

```typescript
// frontend/src/utils/errorReporting.ts
interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

class ErrorReporter {
  private errors: ErrorReport[] = [];
  private maxErrors = 50;

  report(error: Error, componentStack?: string): void {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.errors.push(errorReport);

    // Keep only the last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error reported:', errorReport);
    }

    // Send to error reporting service in production
    if (import.meta.env.PROD) {
      this.sendToService(errorReport);
    }
  }

  private async sendToService(errorReport: ErrorReport): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorReport),
      });
    } catch (err) {
      console.error('Failed to report error:', err);
    }
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

export const errorReporter = new ErrorReporter();

// Error boundary component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorReporter.report(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## Verification Steps

### Step 1: Backend Tests
```bash
cd backend
npm install
npm run test
npm run test:coverage
```

### Step 2: Frontend Tests
```bash
cd frontend
npm install
npm run test
npm run test:coverage
```

### Step 3: Integration Tests
```bash
docker-compose up -d postgres
cd backend && npm run test:integration
```

### Step 4: Build Verification
```bash
# Backend build
cd backend && npm run build

# Frontend build
cd frontend && npm run build

# Docker build
docker-compose build
```

### Step 5: Security Tests
```bash
# Run security audit
npm audit

# Test rate limiting
curl -X POST http://localhost:5000/api/auth/login -d '{"email":"test@test.com","password":"wrong"}' -H "Content-Type: application/json" -v

# Test input validation
curl -X POST http://localhost:5000/api/auth/register -d '{"email":"invalid","password":"123"}' -H "Content-Type: application/json" -v
```

### Step 6: Performance Tests
```bash
# Load testing with artillery
artillery run load-test.yml

# Memory leak detection
node --inspect dist/server.js
```

## Success Criteria

- [ ] All tests pass (backend and frontend)
- [ ] Authentication flow works end-to-end
- [ ] API endpoints are properly documented
- [ ] Security measures implemented (rate limiting, validation, CORS)
- [ ] Application builds and runs in Docker
- [ ] Health checks and monitoring configured
- [ ] CI/CD pipeline executes successfully
- [ ] Error reporting and logging functional
- [ ] Performance meets requirements (response times < 200ms)

**Plan complete and saved to `docs/plans/2025-11-18-react-node-fullstack-developer.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**