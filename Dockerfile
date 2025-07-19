# Multi-stage Dockerfile for Astro portfolio website
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies with npm ci for faster, reliable builds
RUN npm ci --only=production --silent

# Copy source code
COPY . .

# Build the Astro application for production
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/package*.json ./
COPY --from=builder --chown=astro:nodejs /app/serve.json ./

# Install only production dependencies
RUN npm ci --only=production --silent && \
    npm cache clean --force

# Install serve for static file serving
RUN npm install -g serve

# Switch to non-root user
USER astro

# Expose port 3000
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application using serve to serve static files with proper MIME types
CMD ["serve", "-s", "dist", "-l", "3000", "--cors"]