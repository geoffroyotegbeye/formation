# Build Stage 1
FROM node:22-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . ./

# Build the project
RUN npm run build

# Production Stage 2
FROM node:22-alpine
WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy built React app from build stage
COPY --from=build /app/build ./build

# Set environment variables
ENV PORT=3000

EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]