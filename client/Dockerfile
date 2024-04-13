FROM node:17.9.1

WORKDIR /usr/src/app

COPY package*.json ./

COPY build ./build

RUN npm install

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]