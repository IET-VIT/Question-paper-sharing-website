FROM node
WORKDIR /home/node/app
COPY package*.json .
COPY . .
RUN npm install
EXPOSE 3000 
ENTRYPOINT [ "node", "server.js" ]