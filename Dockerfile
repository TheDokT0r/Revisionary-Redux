FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
