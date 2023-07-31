FROM node:latest

WORKDIR /usr/app

# Install MySQL-client
RUN apt-get update && apt-get install -y default-mysql-client

COPY package*.json ./

RUN npm install --quiet

COPY ./ ./ 

CMD ["npm", "start"]