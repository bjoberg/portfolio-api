FROM node:11-alpine

# Create working app directory
WORKDIR /usr/src/app

# Configure app directory
COPY package.json tsconfig.json /usr/src/app/
RUN npm install

# Set env variables
ENV PORT 8080
ENV NODE_ENV production
EXPOSE 8080

# Add src directory to app
COPY src ./src
RUN ls

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "start"]
