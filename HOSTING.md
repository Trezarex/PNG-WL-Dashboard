# Self-Hosting Guide for PNG-WL-Dashboard

This guide provides several options to host your React dashboard application without using any third-party services.

## 🚀 Quick Start (Recommended)

### Option 1: Using the Custom Node.js Server

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the hosting server:**
   ```bash
   npm run host
   ```

3. **Or build and host in one command:**
   ```bash
   npm run host:build
   ```

Your dashboard will be available at `http://localhost:8000`

### Option 1B: Windows-Specific Hosting (PowerShell/Batch)

**Using PowerShell:**
```powershell
npm run host:ps
```

**Using Batch file:**
```cmd
host.bat
```

**Simple method:**
```bash
npm run host:simple
```

## 🌐 Alternative Hosting Methods

### Option 2: Python HTTP Server

If you have Python installed:

```bash
npm run build
cd dist
python -m http.server 8000
```

### Option 3: Node.js http-server

```bash
npm install -g http-server
npm run build
cd dist
http-server -p 8000
```

### Option 4: Using Vite Preview

```bash
npm run build
npm run preview
```

## 🔧 Advanced Hosting Options

### For Production/External Access

#### Option A: Using Nginx (Linux/Windows)

1. Install Nginx
2. Copy the `dist` folder to `/var/www/dashboard` (Linux) or `C:\nginx\html\dashboard` (Windows)
3. Configure Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/dashboard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Option B: Using Apache (Linux/Windows)

1. Install Apache
2. Copy the `dist` folder to the web root
3. Create `.htaccess` file in the dist folder:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>
```

#### Option C: Using Docker

Create a `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t dashboard .
docker run -p 80:80 dashboard
```

## 🔒 Security Considerations

### For Internal/Development Use:
- The basic hosting methods above are suitable for internal networks
- No additional security measures needed

### For External/Production Use:
- Use HTTPS with SSL certificates
- Configure proper firewall rules
- Consider using a reverse proxy (Nginx/Apache)
- Implement authentication if needed
- Regular security updates

## 📱 Network Access

To access your dashboard from other devices on your network:

1. Find your local IP address:
   - Windows: `ipconfig`
   - Linux/Mac: `ifconfig` or `ip addr`

2. Access via: `http://[your-local-ip]:8000`

## 🔄 Auto-restart on Changes

For development with auto-restart:

```bash
# Install nodemon globally
npm install -g nodemon

# Create a development hosting script
nodemon --watch dist --exec "node host.js"
```

## 📝 Troubleshooting

### Common Issues:

1. **Port already in use:**
   - Change the port in `host.js` or use `PORT=8080 npm run host`

2. **Files not found:**
   - Ensure you've run `npm run build` first
   - Check that the `dist` folder exists

3. **Routing issues:**
   - The custom server handles SPA routing automatically
   - All routes fall back to `index.html`

4. **Performance issues:**
   - Enable gzip compression in your web server
   - Use CDN for static assets if needed

## 🎯 Recommended Setup

For **development/testing**: Use `npm run host:build`
For **internal network**: Use the custom Node.js server with Nginx
For **production**: Use Docker with Nginx and SSL certificates

---

**Note**: This guide assumes you're hosting on your own infrastructure. For cloud hosting without third-party services, consider using your own VPS or dedicated server. 