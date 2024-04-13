FROM node:18.1

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]