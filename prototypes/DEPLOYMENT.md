# Docker Deployment Guide for Prototype Apps

This guide walks you through deploying the 3 prototype applications (Backend, Frontend, Project) using Docker and Docker Compose.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git for cloning the repository
- Your Claude API credentials

### Step 1: Set Up Environment Variables
```bash
# Copy the environment template
cp .env.example .env

# Edit the file with your actual values
nano .env
```

**Required Variables:**
- `ANTHROPIC_API_KEY`: Your Claude API key
- `ANTHROPIC_BASE_URL`: Claude API endpoint (default: https://api.anthropic.com)

### Step 2: Build and Start Services
```bash
# Build all containers
docker-compose build

# Start all services in detached mode
docker-compose up -d
```

### Step 3: Verify Deployment
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Test health endpoints
curl http://localhost/health
curl http://localhost/api/status
```

## Application Access

Once deployed, your applications will be available at:

- **Main Project App**: http://localhost/ (React Router app)
- **Frontend App**: http://localhost/frontend/ (Sandpack app)
- **Backend API**: http://localhost/api/ (FastAPI endpoints)
- **Health Check**: http://localhost/health

## Service Architecture

```
Internet
    ↓
Nginx (Port 80)
├── /api/* → Backend (FastAPI)
├── /frontend/* → Frontend (React + Sandpack)
└── /* → Project (React + Router)
```

## Common Commands

### Development Workflow
```bash
# Start development containers
docker-compose up -d

# View real-time logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f project

# Restart specific service
docker-compose restart backend

# Stop all services
docker-compose down
```

### Production Deployment
```bash
# Use production environment
docker-compose --env-file .env.production up -d

# Scale services if needed
docker-compose up -d --scale backend=2

# Update images
docker-compose pull
docker-compose up -d
```

### Maintenance
```bash
# Clean up unused images
docker image prune -f

# View resource usage
docker stats

# Access container shell
docker-compose exec backend sh
docker-compose exec nginx sh
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using port 80
   sudo lsof -i :80

   # Stop existing services
   docker-compose down
   ```

2. **Backend API Fails**
   ```bash
   # Check environment variables
   docker-compose exec backend env | grep ANTHROPIC

   # View backend logs
   docker-compose logs backend
   ```

3. **Frontend Not Loading**
   ```bash
   # Rebuild frontend container
   docker-compose build --no-cache frontend
   docker-compose up -d frontend
   ```

4. **Nginx Configuration Issues**
   ```bash
   # Test nginx configuration
   docker-compose exec nginx nginx -t

   # Reload nginx
   docker-compose exec nginx nginx -s reload
   ```

### Health Checks

```bash
# Check all service health
docker-compose ps

# Individual service health
curl http://localhost/health              # Nginx
curl http://localhost/api/status          # Backend
curl http://localhost/frontend/           # Frontend
curl http://localhost/                    # Project
```

## Environment Configuration

### Development (.env)
```bash
NODE_ENV=development
ANTHROPIC_API_KEY=your_key_here
FRONTEND_URL=http://localhost:5173
PROJECT_URL=http://localhost:5174
API_BASE_URL=http://localhost:8000
```

### Production (.env.production)
```bash
NODE_ENV=production
ANTHROPIC_API_KEY=your_key_here
FRONTEND_URL=http://localhost
PROJECT_URL=http://localhost
API_BASE_URL=http://localhost/api
```

## Security Considerations

1. **API Keys**: Never commit your `.env` file with real API keys
2. **Network**: All containers communicate within a private Docker network
3. **CORS**: Backend properly configures CORS for frontend domains
4. **Rate Limiting**: Nginx includes basic rate limiting for API endpoints
5. **Security Headers**: All services include security headers

## Performance Optimization

1. **Resource Limits**: Consider setting memory limits in docker-compose.yml
2. **Build Optimization**: Dockerfiles use multi-stage builds for smaller images
3. **Static Assets**: Nginx serves static files with caching headers
4. **Gzip Compression**: Nginx compresses responses for faster loading

## Backup and Recovery

### Data Persistence
```bash
# Backup any persistent data
docker run --rm -v prototypes_backend_data:/data -v $(pwd):/backup alpine tar czf /backup/backend_data.tar.gz -C /data .

# Restore data
docker run --rm -v prototypes_backend_data:/data -v $(pwd):/backup alpine tar xzf /backup/backend_data.tar.gz -C /data
```

### Configuration Backup
```bash
# Backup all configuration files
tar czf deployment_backup.tar.gz \
  docker-compose.yml \
  nginx/ \
  backend/Dockerfile \
  frontend/Dockerfile \
  project/Dockerfile \
  .env.production
```

## Next Steps

1. **Monitoring**: Consider adding logging and monitoring tools
2. **SSL/HTTPS**: Add SSL certificates for production deployments
3. **Database**: Add database service if needed for data persistence
4. **CI/CD**: Set up automated deployment pipelines
5. **Scaling**: Configure for multi-host deployments if needed

## Support

For issues with:
- **Docker**: Check Docker documentation
- **Applications**: Review individual app logs
- **Networking**: Verify Docker network configuration
- **Environment**: Ensure all required variables are set

Remember: This deployment setup is designed for demonstration and prototype purposes. For production workloads, consider additional security hardening, monitoring, and backup strategies.