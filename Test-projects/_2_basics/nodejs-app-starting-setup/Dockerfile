# The base image to start from
FROM node

# Setup a working directory for our app
WORKDIR /app

#we copied only the package.json file from the "COPY . /app" so that the "RUN npm install" is not executed when a code is updated during rebuilding of the image
COPY package.json /app

# Install nodejs and some other required dependencies in the working dir /app
RUN npm install


# Copy the application files from the host filesystem to a destination(directory) "/app" in the working directory "/app" in the container/image -- this folder will be created f it does not exist yet
COPY . /app


# EXPOSE THIS PORT 80 TO OUR LOCAL MACHINE SO IT COULD BE MAPPED 
EXPOSE 80

# The command below tells docker to use the  "node"  command installed by "RUN npm install" inside of the container to run the "server.js" to whenever the container is created based on this image
CMD ["node", "server.js"]