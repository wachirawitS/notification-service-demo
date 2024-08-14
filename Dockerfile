FROM node:20.15.0-bookworm-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3010

# Start the NestJS application
CMD ["npm", "run", "start:prod"]