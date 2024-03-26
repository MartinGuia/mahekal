FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

WORKDIR /app/src

ENV PORT=4000

ENV DB="mongodb://mongoDB:27017/mahekal"

EXPOSE 4000

CMD [ "node", "index.js" ]