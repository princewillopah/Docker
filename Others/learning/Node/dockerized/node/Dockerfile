# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the
# working directory// we could say COPY package*.json /app
COPY package*.json ./

# Install the application dependencies
# RUN npm install

# This defines a variable that users can pass a value to a build-time with docker build
ARG NODE_ENV
#the code below will install npm dependencies based on the environment
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --only=production; \
#         if
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi
# Copy the rest of the application code into the container
COPY . ./

# to be used in a code 
ENV PORT=3000

# this line does not expose/open port 3000 in the container
# -- it is for documentatin purposes. it expect the user of 
#this dockerfile to expose port 3000 on cli for everythin to work
EXPOSE $PORT

# Specify the command to run your application
CMD ["node", "server.js"]

