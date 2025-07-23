# Build Stage 1

FROM node:22-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json (npm)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . ./

# Build the project
RUN npm run build

# Build Stage 2

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]