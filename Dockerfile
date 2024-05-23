FROM node:18-alpine

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

