# Use Node.js as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the bot will run on (optional, in case your bot requires a specific port)
# EXPOSE 3000

# Command to start the bot
CMD ["npm", "start"]
