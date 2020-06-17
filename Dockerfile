FROM node:11-alpine

# Create working app directory
WORKDIR /usr/src/app

# Configure app directory
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

# Install dependencies
RUN npm install
RUN ls

# Build the app
RUN npm run build

# Set env variables
ENV PORT 8080
ENV NODE_ENV production
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
