# Use the official Node.js 20 Alpine image as the base image and alias it as 'node'
FROM node:20-alpine as node

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the contents of the current directory (local machine) to the /app directory in the container
COPY ./ /app/

# Run npm ci to install project dependencies based on the package-lock.json file
RUN npm ci

# Run the npm run build --prod command to build the application with production settings
RUN npm run build --prod

# Move the contents of the /app/dist/${APP}/ directory to the /app/dist/ directory
RUN mv /app/dist/${APP}/* /app/dist/


# Use the official Nginx latest image as the base image
FROM nginx:latest

# Copy the contents of the /app/dist/ directory from the 'node' image to /usr/share/nginx/html in the current image
COPY --from=node /app/dist/ /usr/share/nginx/html

# Copy the nginx.conf file from the local machine to /etc/nginx/conf.d/default.conf in the current image
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
