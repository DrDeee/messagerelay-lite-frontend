FROM node:14-alpine

WORKDIR /opt/fridaysforfuture/messagerelay-lite/
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]