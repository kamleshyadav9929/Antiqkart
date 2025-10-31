# KisaanSaarthi Backend - Deployment Guide

## 🚀 Production Deployment Options

### Option 1: DigitalOcean App Platform (Recommended)

**Pros**: Managed service, auto-scaling, easy setup
**Cost**: ~$12-25/month for basic setup

#### Steps:

1. **Prepare Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Create App on DigitalOcean**
- Go to DigitalOcean App Platform
- Click "Create App" → Connect GitHub repo
- Select `backend` folder as source directory
- Dockerfile will be auto-detected

3. **Add Database & Redis**
- Add PostgreSQL database (Dev: $7/mo, Prod: $15/mo)
- Add Redis database (Basic: $15/mo)
- Connection strings will be auto-injected

4. **Set Environment Variables**
```
JWT_SECRET=<generate-strong-random-string>
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
TWILIO_PHONE_NUMBER=<your-twilio-number>
TWILIO_WHATSAPP_NUMBER=<your-whatsapp-number>
RAZORPAY_KEY_ID=<your-razorpay-key>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
WEATHER_API_KEY=<your-openweather-key>
NODE_ENV=production
```

5. **Run Migrations**
```bash
# Connect to database
doctl databases db get <database-id>

# Run migrations
psql $DATABASE_URL -f migrations/001_init.sql
psql $DATABASE_URL -f migrations/002_seed_sample_data.sql
```

6. **Deploy**
- Click "Deploy"
- App will be live at `https://your-app.ondigitalocean.app`

---

### Option 2: AWS ECS/Fargate

**Pros**: Highly scalable, AWS ecosystem integration
**Cost**: ~$20-50/month for basic setup

#### Steps:

1. **Build and Push Docker Image**
```bash
# Build image
docker build -t kisaan-saarthi-backend .

# Tag for ECR
docker tag kisaan-saarthi-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/kisaan-saarthi:latest

# Push to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/kisaan-saarthi:latest
```

2. **Create RDS PostgreSQL Instance**
- Go to RDS → Create Database
- Choose PostgreSQL 15
- Instance: db.t3.micro (free tier eligible)
- Note connection details

3. **Create ElastiCache Redis**
- Go to ElastiCache → Create Redis cluster
- Node type: cache.t3.micro
- Note connection endpoint

4. **Create ECS Task Definition**
```json
{
  "family": "kisaan-saarthi-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.<region>.amazonaws.com/kisaan-saarthi:latest",
      "portMappings": [{"containerPort": 4000}],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "PORT", "value": "4000"}
      ],
      "secrets": [
        {"name": "DATABASE_URL", "valueFrom": "arn:aws:secretsmanager:..."},
        {"name": "REDIS_URL", "valueFrom": "arn:aws:secretsmanager:..."},
        {"name": "JWT_SECRET", "valueFrom": "arn:aws:secretsmanager:..."}
      ]
    }
  ]
}
```

5. **Create ECS Service**
- Cluster: Create new Fargate cluster
- Service: Create service with task definition
- Load Balancer: Create ALB for HTTPS

6. **Run Migrations**
```bash
# From local machine with RDS access
psql $RDS_DATABASE_URL -f migrations/001_init.sql
psql $RDS_DATABASE_URL -f migrations/002_seed_sample_data.sql
```

---

### Option 3: Docker on VPS (DigitalOcean Droplet, AWS EC2, etc.)

**Pros**: Full control, cost-effective
**Cost**: ~$6-12/month

#### Steps:

1. **Create VPS**
```bash
# DigitalOcean Droplet or AWS EC2
# Ubuntu 22.04 LTS, 2GB RAM minimum
```

2. **Install Docker**
```bash
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y
```

3. **Clone Repository**
```bash
git clone <your-repo-url>
cd kisaan-saarthi/backend
```

4. **Create Production .env**
```bash
nano .env
# Add all production environment variables
```

5. **Start Services**
```bash
docker-compose up -d
```

6. **Set up Nginx Reverse Proxy**
```bash
apt install nginx certbot python3-certbot-nginx -y

# Create Nginx config
nano /etc/nginx/sites-available/kisaan-saarthi
```

```nginx
server {
    listen 80;
    server_name api.kisaansaarthi.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/kisaan-saarthi /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Get SSL certificate
certbot --nginx -d api.kisaansaarthi.com
```

7. **Set up Auto-restart**
```bash
# Create systemd service
nano /etc/systemd/system/kisaan-saarthi.service
```

```ini
[Unit]
Description=KisaanSaarthi Backend
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/root/kisaan-saarthi/backend
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable kisaan-saarthi
systemctl start kisaan-saarthi
```

---

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up firewall (UFW or Security Groups)
- [ ] Use environment variables for all secrets
- [ ] Enable database encryption at rest
- [ ] Set up database backups (daily)
- [ ] Use Redis password authentication
- [ ] Enable rate limiting (already configured)
- [ ] Set up monitoring and alerts
- [ ] Regular security updates

---

## 📊 Monitoring & Logging

### Option 1: Sentry (Error Tracking)

```bash
npm install @sentry/node
```

```typescript
// Add to src/index.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Add error handler
app.use(Sentry.Handlers.errorHandler());
```

### Option 2: PM2 (Process Management)

```bash
npm install -g pm2

# Start with PM2
pm2 start dist/index.js --name kisaan-saarthi

# Monitor
pm2 monit

# Logs
pm2 logs kisaan-saarthi

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Option 3: CloudWatch (AWS)

- Enable CloudWatch Logs for ECS tasks
- Set up alarms for:
  - High CPU usage (>80%)
  - High memory usage (>80%)
  - Error rate (>5%)
  - Response time (>2s)

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          cd backend
          docker build -t kisaan-saarthi-backend .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker tag kisaan-saarthi-backend ${{ secrets.DOCKER_USERNAME }}/kisaan-saarthi-backend:latest
          docker push ${{ secrets.DOCKER_USERNAME }}/kisaan-saarthi-backend:latest
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /root/kisaan-saarthi/backend
            docker-compose pull
            docker-compose up -d
```

---

## 📈 Scaling Considerations

### Database Optimization
- Add indexes for frequently queried columns
- Set up read replicas for read-heavy operations
- Use connection pooling (already configured)
- Regular VACUUM and ANALYZE

### Caching Strategy
- Cache mandi prices (1 hour TTL)
- Cache weather data (1 hour TTL)
- Cache scheme listings (24 hour TTL)
- Use Redis for session storage

### Load Balancing
- Use multiple backend instances
- Set up load balancer (ALB, Nginx)
- Enable sticky sessions for WebSocket

### CDN
- Use CloudFront or Cloudflare for static assets
- Cache API responses where appropriate

---

## 💰 Cost Estimation

### Minimal Setup (~$30/month)
- DigitalOcean Droplet (2GB): $12/mo
- Managed PostgreSQL (Dev): $7/mo
- Managed Redis (Basic): $15/mo
- Domain + SSL: Free (Let's Encrypt)

### Recommended Setup (~$50/month)
- DigitalOcean App Platform: $12/mo
- Managed PostgreSQL (Prod): $15/mo
- Managed Redis (Basic): $15/mo
- Backups: $5/mo
- Monitoring: Free (basic)

### Production Setup (~$100/month)
- AWS ECS Fargate: $30/mo
- RDS PostgreSQL (Multi-AZ): $30/mo
- ElastiCache Redis: $20/mo
- ALB: $15/mo
- CloudWatch: $5/mo
- Backups + S3: $5/mo

---

## 🆘 Support & Maintenance

### Regular Tasks
- [ ] Weekly: Check error logs
- [ ] Weekly: Review API performance
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review and optimize database
- [ ] Quarterly: Security audit
- [ ] Quarterly: Cost optimization review

### Backup Strategy
- Database: Daily automated backups (7-day retention)
- Redis: Snapshot every 6 hours
- Code: Git repository (GitHub/GitLab)
- Environment configs: Secure vault (1Password, AWS Secrets Manager)

---

## 📞 Emergency Contacts

- Database issues: Check RDS/PostgreSQL logs
- Redis issues: Check ElastiCache/Redis logs
- Payment issues: Contact Razorpay support
- SMS/WhatsApp issues: Contact Twilio support
- Server down: Check hosting provider status page
