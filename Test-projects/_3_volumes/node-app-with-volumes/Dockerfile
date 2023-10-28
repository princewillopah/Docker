FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG DEFALT_PORT=80

ENV PORT $DEFALT_PORT

# Making use of the 80 in PORT above
EXPOSE $PORT

CMD ["node", "server.js"]



