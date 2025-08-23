# 1. Build Stage
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app for production
RUN npm run build


# 2. Production Stage
FROM node:alpine

# Install 'serve' to serve the production build
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the build folder from previous stage
COPY --from=build /app/build ./build

# Expose port (adjust if needed)
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]