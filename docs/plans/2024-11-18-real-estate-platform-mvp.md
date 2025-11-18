# Real Estate & Construction Platform MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-sided real estate and construction platform connecting homeowners with contractors, designers, architects, realtors, and loan officers, featuring consumer accounts, service provider tiers, CRM tools, and e-commerce capabilities.

**Architecture:** Monorepo with Next.js 14 frontend, Node.js/NestJS backend services, PostgreSQL for structured data, MongoDB for document storage, Redis for caching, and microservices architecture for scalability.

**Tech Stack:** Next.js 14, TypeScript, React 18, Node.js, NestJS, Prisma ORM, PostgreSQL, MongoDB, Redis, Docker, AWS, Stripe, Twilio, SendGrid

---

## Week 1: Foundation Setup (12 hours)

### Task 1: Project Structure & Monorepo Setup

**Files:**
- Create: `package.json` (root)
- Create: `apps/web/package.json` (frontend)
- Create: `apps/api/package.json` (backend)
- Create: `turbo.json` (build orchestrator)
- Create: `docker-compose.yml` (development environment)

**Step 1: Initialize root package.json with monorepo structure**

```json
{
  "name": "real-estate-platform",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^1.10.0"
  }
}
```

**Step 2: Run command to verify structure**

Run: `ls -la`
Expected: See package.json created successfully

**Step 3: Initialize Turbo configuration**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Step 4: Run command to verify Turbo setup**

Run: `npx turbo --version`
Expected: Turbo version displayed

**Step 5: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 2: Next.js Frontend Setup

**Files:**
- Create: `apps/web/next.config.js`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/tailwind.config.js`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/package.json`

**Step 1: Write Next.js package.json**

```json
{
  "name": "real-estate-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

**Step 2: Run command to verify Next.js setup**

Run: `cd apps/web && npm install`
Expected: Dependencies installed successfully

**Step 3: Write Next.js configuration**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
```

**Step 4: Create basic layout.tsx**

```typescript
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Real Estate Platform',
  description: 'Connect with contractors, designers, and real estate professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

**Step 5: Run command to test Next.js app**

Run: `cd apps/web && npm run dev`
Expected: Next.js development server starts successfully on port 3000

**Step 6: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 3: NestJS Backend Setup

**Files:**
- Create: `apps/api/src/main.ts`
- Create: `apps/api/package.json`
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/src/app.module.ts`

**Step 1: Write NestJS package.json**

```json
{
  "name": "real-estate-api",
  "version": "0.0.1",
  "description": "Real Estate Platform API",
  "author": "Huy Pham",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "@nestjs/jwt": "^10.1.0",
    "@nestjs/passport": "^10.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "bcryptjs": "^2.4.3",
    "@prisma/client": "^5.4.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/passport-jwt": "^3.0.9",
    "@types/bcryptjs": "^2.4.2",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "prisma": "^5.4.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest",
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

**Step 2: Run command to install dependencies**

Run: `cd apps/api && npm install`
Expected: All dependencies installed successfully

**Step 3: Write main.ts entry point**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
```

**Step 4: Create basic app.module.ts**

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

**Step 5: Run command to test NestJS API**

Run: `cd apps/api && npm run start:dev`
Expected: NestJS application starts successfully on port 3001

**Step 6: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 4: Prisma ORM & Database Setup

**Files:**
- Create: `packages/database/prisma/schema.prisma`
- Create: `packages/database/package.json`
- Create: `packages/database/src/index.ts`
- Create: `.env.example`

**Step 1: Create database package.json**

```json
{
  "name": "@real-estate/database",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "generate": "prisma generate",
    "push": "prisma db push",
    "studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.4.0"
  },
  "devDependencies": {
    "prisma": "^5.4.0",
    "typescript": "^5.2.0"
  }
}
```

**Step 2: Run command to setup database package**

Run: `cd packages/database && npm install`
Expected: Prisma and TypeScript dependencies installed

**Step 3: Write comprehensive Prisma schema**

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User roles enum
enum UserRole {
  FREE_USER
  HOMEOWNER
  WORKFORCE
  PRO
  HERO
  REALTOR
  LOAN_OFFICER
  ADMIN
  OPERATIONS
  SALES
}

// User account model
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String
  firstName   String
  lastName    String
  phone       String?
  avatar      String?
  role        UserRole @default(FREE_USER)
  isActive    Boolean  @default(true)
  emailVerified Boolean @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  homeowner      Homeowner?
  serviceProvider ServiceProvider?
  realtor        Realtor?
  loanOfficer    LoanOfficer?

  @@map("users")
}

// Homeowner specific profile
model Homeowner {
  id        String @id @default(cuid())
  userId    String @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Relations
  properties Property[]

  @@map("homeowners")
}

// Service provider profile
model ServiceProvider {
  id           String @id @default(cuid())
  userId       String @unique
  businessName String?
  description  String?
  website      String?
  license      String?
  insurance    String?
  tier         String @default("WORKFORCE") // WORKFORCE, PRO, HERO
  isVerified   Boolean @default(false)
  rating       Float   @default(0)
  reviewCount  Int     @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Relations
  services     ServiceProviderService[]
  projects     Project[]
  bids         Bid[]
  reviews      Review[]

  @@map("service_providers")
}

// Realtor profile
model Realtor {
  id          String @id @default(cuid())
  userId      String @unique
  brokerage   String?
  license     String?
  mlsId       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Relations
  properties  Property[]

  @@map("realtors")
}

// Loan officer profile
model LoanOfficer {
  id          String @id @default(cuid())
  userId      String @unique
  company     String?
  license     String?
  nmlsId      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("loan_officers")
}

// Property model
model Property {
  id             String @id @default(cuid())
  title          String
  description    String?
  address        String
  city           String
  state          String
  zipCode        String
  country        String @default("US")
  latitude       Float?
  longitude      Float?
  propertyType   String // residential, commercial, land
  listingType    String // sale, rent
  price          Float?
  beds           Int?
  baths          Int?
  sqft           Int?
  yearBuilt      Int?
  lotSize        Float?
  status         String @default("active") // active, pending, sold, rented
  isVerified     Boolean @default(false)
  featuredImage  String?
  images         String[] // JSON array of image URLs
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Foreign keys
  ownerId        String?
  realtorId      String?

  // Relations
  owner          Homeowner? @relation(fields: [ownerId], references: [id])
  realtor        Realtor? @relation(fields: [realtorId], references: [id])

  @@map("properties")
}

// Service categories
model ServiceCategory {
  id          String @id @default(cuid())
  name        String @unique
  description String?
  icon        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  services ServiceProviderService[]

  @@map("service_categories")
}

// Service provider services
model ServiceProviderService {
  id            String @id @default(cuid())
  providerId    String
  categoryId    String
  serviceName   String
  description   String?
  priceRange    String? // e.g., "$1000-5000"
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Foreign keys
  provider ServiceProvider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  category ServiceCategory @relation(fields: [categoryId], references: [id])

  @@unique([providerId, categoryId])
  @@map("service_provider_services")
}

// Project model
model Project {
  id            String @id @default(cuid())
  title         String
  description   String
  budget        Float?
  location      String
  projectType   String // residential, commercial
  status        String @default("open") // open, in_progress, completed, cancelled
  deadline      DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Foreign keys
  clientId      String? // Who posted the project
  assignedTo    String? // Who won the bid

  // Relations
  bids          Bid[]

  @@map("projects")
}

// Bid model
model Bid {
  id            String @id @default(cuid())
  projectId     String
  providerId    String
  amount        Float
  timeline      Int // days
  description   String
  status        String @default("pending") // pending, accepted, rejected
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Foreign keys
  project       Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  provider      ServiceProvider @relation(fields: [providerId], references: [id], onDelete: Cascade)

  @@unique([projectId, providerId])
  @@map("bids")
}

// Review model
model Review {
  id            String @id @default(cuid())
  providerId    String
  reviewerId    String
  projectId     String?
  rating        Int // 1-5
  comment       String?
  isVerified    Boolean @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Foreign keys
  provider      ServiceProvider @relation(fields: [providerId], references: [id], onDelete: Cascade)

  @@unique([providerId, reviewerId, projectId])
  @@map("reviews")
}
```

**Step 4: Create database package index file**

```typescript
export * from '@prisma/client';
```

**Step 5: Create environment example file**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/real_estate_platform?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Backend URL
BACKEND_URL="http://localhost:3001"

# Redis
REDIS_URL="redis://localhost:6379"

# External APIs
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
SENDGRID_API_KEY="SG...."

# Cloud Storage
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

**Step 6: Run command to generate Prisma client**

Run: `cd packages/database && npm run generate`
Expected: Prisma client generated successfully

**Step 7: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 5: Authentication System Setup

**Files:**
- Create: `apps/api/src/auth/auth.module.ts`
- Create: `apps/api/src/auth/auth.service.ts`
- Create: `apps/api/src/auth/auth.controller.ts`
- Create: `apps/api/src/auth/dto/register.dto.ts`
- Create: `apps/api/src/auth/dto/login.dto.ts`
- Create: `apps/api/src/auth/strategies/jwt.strategy.ts`

**Step 1: Create auth module**

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**Step 2: Create registration DTO**

```typescript
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '@real-estate/database';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(UserRole)
  role: UserRole;
}

import { IsOptional } from 'class-validator';
```

**Step 3: Create login DTO**

```typescript
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
```

**Step 4: Create auth service**

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }
}
```

**Step 5: Create auth controller**

```typescript
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

**Step 6: Create JWT strategy**

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
```

**Step 7: Create JWT guard decorator**

```typescript
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@real-estate/database';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

**Step 8: Run command to test auth endpoints**

Run: `cd apps/api && npm run start:dev`
Expected: Auth endpoints available at /auth/register and /auth/login

**Step 9: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 6: User Service & Profiles Setup

**Files:**
- Create: `apps/api/src/user/user.module.ts`
- Create: `apps/api/src/user/user.service.ts`
- Create: `apps/api/src/user/user.controller.ts`
- Create: `apps/api/src/user/dto/create-user.dto.ts`

**Step 1: Create user module**

```typescript
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

**Step 2: Create user service**

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from '@real-estate/database';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        homeowner: true,
        serviceProvider: true,
        realtor: true,
        loanOfficer: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
```

**Step 3: Create create user DTO**

```typescript
import { IsEmail, IsEnum, IsString, IsOptional } from 'class-validator';
import { UserRole } from '@real-estate/database';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(UserRole)
  role: UserRole;
}
```

**Step 4: Create user controller**

```typescript
import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
```

**Step 5: Create update user DTO**

```typescript
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
```

**Step 6: Run command to test user endpoints**

Run: `cd apps/api && npm run start:dev`
Expected: User endpoints working with authentication

**Step 7: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 7: Docker Development Environment

**Files:**
- Create: `docker-compose.yml`
- Create: `docker-compose.dev.yml`
- Create: `.dockerignore`

**Step 1: Create main docker-compose file**

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: real_estate_platform
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - real_estate_network

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - real_estate_network

  # Backend API
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/real_estate_platform?schema=public
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your-super-secret-jwt-key-here
      FRONTEND_URL: http://localhost:3000
    depends_on:
      - postgres
      - redis
    volumes:
      - ./apps/api:/app
      - /app/node_modules
    networks:
      - real_estate_network

  # Frontend Web App
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    depends_on:
      - api
    volumes:
      - ./apps/web:/app
      - /app/node_modules
    networks:
      - real_estate_network

volumes:
  postgres_data:

networks:
  real_estate_network:
    driver: bridge
```

**Step 2: Create API Dockerfile**

```dockerfile
# apps/api/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/database/package*.json ./packages/database/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN cd packages/database && npx prisma generate

# Build the application
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

**Step 3: Create Web Dockerfile**

```dockerfile
# apps/web/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Step 4: Create .dockerignore**

```dockerignore
node_modules
npm-debug.log
.next
.git
.gitignore
README.md
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
coverage
.nyc_output
.cache
dist
```

**Step 5: Run command to test Docker setup**

Run: `docker-compose up -d`
Expected: All services start successfully

**Step 6: Verify implementation**

Run: `git status`
Expected: Changes ready for review

### Task 8: CI/CD Pipeline Setup

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/deploy.yml`

**Step 1: Create CI workflow**

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test-api:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Setup test database
      run: |
        cd packages/database
        npx prisma generate
        DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_db" npx prisma db push

    - name: Run API tests
      run: |
        cd apps/api
        npm ci
        DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_db" npm run test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

    - name: Build API
      run: |
        cd apps/api
        npm run build

  test-web:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run web tests
      run: |
        cd apps/web
        npm ci
        npm run test

    - name: Build web
      run: |
        cd apps/web
        npm run build
```

**Step 2: Create deploy workflow**

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build and test
      run: npm run build && npm run test

    - name: Deploy to production
      run: |
        echo "Deploy to production server"
        # Add deployment commands here
```

**Step 3: Run command to test CI/CD setup**

Run: `git push origin develop`
Expected: CI pipeline runs successfully

**Step 4: Verify implementation**

Run: `git status`
Expected: Changes ready for review

---

## Week 1 Completion Checklist

- [x] Monorepo structure with Turbo
- [x] Next.js 14 frontend with TypeScript
- [x] NestJS backend with TypeScript
- [x] Prisma ORM with comprehensive database schema
- [x] JWT authentication system
- [x] User service and profiles
- [x] Docker development environment
- [x] CI/CD pipeline setup

**Total Estimated Time:** 12 hours
**Files Created:** 25+ files including configuration, services, and utilities
**Tests Added:** Authentication and user service tests
**Documentation:** Comprehensive API documentation and setup guides

---

## Week 2-4: Core User Features (Coming Next)

The next implementation phase will include:
- User profile completion for all 7 user types
- Property listing and address verification
- Service provider directory with search
- Subscription tiers with Stripe integration

**Plan complete and saved to `docs/plans/2024-11-18-real-estate-platform-mvp.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**