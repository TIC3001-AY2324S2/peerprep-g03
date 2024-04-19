FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3001 if your application runs on this port
EXPOSE 3001

# Command to start the application
CMD ["npm", "start"]
