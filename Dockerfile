# Base image
FROM node:current-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app runs on
EXPOSE $PORT

# Start the application using Vite's preview mode with the specified port
CMD ["sh", "-c", "npm run preview -- --port $PORT --host"]