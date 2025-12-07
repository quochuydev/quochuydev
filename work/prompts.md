# Video Recording Prompts - Building AI-Powered Expertise Website

## Introduction Video

**Prompt:** "Hi everyone! Today we're building an AI-powered website to showcase your expertise and schedule meetings with clients. We'll use modern tools like Next.js, AI assistants, and cloud deployment. Let's get started!"

---

## Step 1: Setup Claude Code & Superpower Plugin 

**Prompt:** "First, let's set up our AI coding assistant. We'll install Claude Code and add the Superpower plugin to enhance our development workflow with advanced skills and automation."

---

## Step 2: Initialize Next.js Project 

**Prompt:** "Now we'll create our Next.js application using the better-t-stack template. This gives us TypeScript, tRPC for APIs, Better Auth for authentication, Postgres database with Drizzle ORM, and a todo example to learn from. Let me run the setup command."

**Command to show:**

```bash
pnpm create better-t-stack@latest expertise \
  --frontend next \
  --backend self \
  --runtime none \
  --api trpc \
  --auth better-auth \
  --payments none \
  --database postgres \
  --orm drizzle \
  --db-setup docker \
  --package-manager pnpm \
  --no-git \
  --web-deploy none \
  --server-deploy none \
  --install \
  --addons turborepo \
  --examples todo
```

---

## Step 3: Create GitHub Repository

**Prompt:** "Let's version control our project. First, go to github.com and create a new repository called 'expertise' with the description: 'An AI-powered website to highlight your expertise and schedule meetings.'"

**Show these steps:**

1. Click "New Repository" button
2. Name: `expertise`
3. Description: `An AI-powered website to highlight your expertise and schedule meetings.`
4. Keep it public (or private if you prefer)
5. Don't initialize with README (we already have code)
6. Click "Create repository"

---

## Step 4: Configure Git & Push Code

**Prompt:** "Now let's configure git with your credentials and push our code to GitHub."

**Commands to show:**

```bash
cd expertise
git config user.name "quochuydev"
git config user.email "quochuy.dev@gmail.com"
git init
git add .
git commit -m "Initial commit: Next.js app with auth, database, and tRPC"
git branch -M main
git remote add origin https://github.com/quochuydev/expertise.git
git push -u origin main
```

---

## Step 5: Collect Personal Information

**Prompt:** "Before we customize the website, let's gather all the content we'll need: your professional photo or avatar, a brief bio, your skills and expertise areas, services you offer, and any portfolio items or case studies."

**Create a checklist:**

- [ ] Professional headshot/avatar (optimized for web)
- [ ] Bio/About text (2-3 paragraphs)
- [ ] List of skills and expertise
- [ ] Services offered with descriptions
- [ ] Portfolio items or case studies
- [ ] Testimonials (if available)
- [ ] Social media links
- [ ] Contact information

---

## Step 6: Setup Coding Guidelines

**Prompt:** "Let's establish our coding standards by creating a CLAUDE.md file with guidelines for Next.js development, component structure, and best practices."

**Show creating `CLAUDE.md` with:**

- Project structure overview
- Development commands
- Component naming conventions
- TypeScript best practices
- API route patterns
- Database schema guidelines

---

## Step 7: Brainstorm & Plan Features

**Prompt:** "Using Claude Code's brainstorming skill, let's plan out our website features. We'll create pages for showcasing expertise, a meeting scheduler, and an admin dashboard."

**Use command:**

```bash
/brainstorm
```

**Key features to discuss:**

- Home page with hero section
- About/Expertise showcase
- Services/Offerings page
- Calendar integration for booking
- Blog/Resources section
- Contact form
- Admin dashboard

---

## Step 8: Implement Core Features

**Prompt:** "Now let's implement our planned features step by step, starting with the home page and expertise showcase."

**Break into sub-prompts:**

### 8a. Home Page & Hero Section

**Prompt:** "Create a compelling home page with a hero section that introduces you and your expertise with a clear call-to-action."

### 8b. Expertise Showcase

**Prompt:** "Build an expertise page displaying your skills, services, and portfolio items in an engaging grid layout."

### 8c. Meeting Scheduler

**Prompt:** "Integrate a calendar booking system where visitors can schedule meetings with you."

### 8d. Authentication System

**Prompt:** "Set up Better Auth to protect your admin routes and allow client logins if needed."

### 8e. Admin Dashboard

**Prompt:** "Create an admin dashboard to manage your content, view bookings, and track analytics."

---

## Step 9: Setup Analytics with Plausible

**Prompt:** "Let's add privacy-friendly analytics using Plausible.io to track visitor insights without cookies."

**Steps to show:**

1. Sign up at plausible.io
2. Add your domain
3. Copy the tracking script
4. Add to `app/layout.tsx`
5. Verify tracking works

---

## Step 10: Purchase & Setup Server

**Prompt:** "Time to get our hosting! We'll use Vultr for a powerful yet affordable VPS. You could also use DigitalOcean, AWS, or other providers."

**Show:**

1. Sign up at my.vultr.com (use referral code)
2. Choose server location
3. Select Ubuntu 24.04 LTS
4. Pick plan (recommend 2GB RAM minimum)
5. Deploy server
6. Save IP address and credentials

---

## Step 11: Install Dokploy

**Prompt:** "Dokploy makes deployment and database management super easy. Let's install it on our server."

**Commands to show:**

```bash
ssh root@YOUR_SERVER_IP
curl -sSL https://dokploy.com/install.sh | sh
```

**Then show:**

- Access Dokploy at `http://YOUR_SERVER_IP:3000`
- Complete initial setup
- Create admin account

---

## Step 12: Setup Database

**Prompt:** "In Dokploy, let's create our Postgres database for the application."

**Show these steps:**

1. Click "Create Database"
2. Choose PostgreSQL
3. Set database name: `expertise_db`
4. Set strong password
5. Deploy database
6. Copy connection string

---

## Step 13: Deploy Next.js App

**Prompt:** "Finally, let's deploy our Next.js application to Dokploy and connect it to our database."

**Show:**

1. In Dokploy, click "Create Application"
2. Connect to GitHub repository
3. Configure environment variables:
   - `DATABASE_URL`: (from step 12)
   - `BETTER_AUTH_SECRET`: (generate with `openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: `https://yourdomain.com`
4. Set build command: `pnpm build`
5. Set start command: `pnpm start`
6. Deploy application
7. Setup domain and SSL certificate

---

## Step 14: Setup Custom Domain (Optional)

**Prompt:** "If you have a custom domain, let's connect it to your deployed app with automatic HTTPS."

**Show:**

1. Add domain in Dokploy settings
2. Configure DNS A record pointing to server IP
3. Enable SSL certificate generation
4. Test HTTPS connection

---

## Step 15: Final Testing & Launch

**Prompt:** "Let's test everything works: authentication, database connections, booking system, and analytics. Then we'll do a soft launch!"

**Testing checklist:**

- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Meeting booking system functions
- [ ] Authentication works
- [ ] Admin dashboard accessible
- [ ] Analytics tracking active
- [ ] Mobile responsive design
- [ ] SEO meta tags present
- [ ] Performance optimized

---

## Conclusion Video

**Prompt:** "Congratulations! You've built and deployed a professional AI-powered expertise website. You can now showcase your skills, accept meeting bookings, and manage everything from your admin dashboard. Feel free to customize further and add more features as your needs grow!"

---

## Bonus Tips Section

### Continuous Deployment

**Prompt:** "Set up automatic deployments: whenever you push to GitHub, Dokploy will automatically rebuild and deploy your changes."

### Backup Strategy

**Prompt:** "Always backup your database regularly. Set up automated backups in Dokploy's database settings."

### Monitoring

**Prompt:** "Monitor your app's health with Dokploy's built-in monitoring and logs. Set up alerts for downtime."

### Security Best Practices

**Prompt:** "Keep your dependencies updated, use environment variables for secrets, enable rate limiting on API routes, and regularly review security logs."
