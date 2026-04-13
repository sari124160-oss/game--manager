FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npx prisma generate

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["sh", "entrypoint.sh"]