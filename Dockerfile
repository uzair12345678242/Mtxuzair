# Use Node.js as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install all dependencies
RUN npm install || { echo "npm install failed"; exit 1; }

# Copy the rest of the application code to the container
COPY . .

# Command to start the bot
CMD ["npm", "start"]
