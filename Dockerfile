FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

COPY server.js .

RUN npm install

# Bundle app source
COPY . .

#RUN chmod -R 777 /usr/src/app/

EXPOSE 3001 3306
# Start the app
ENTRYPOINT ["/usr/local/bin/node", "server"]
