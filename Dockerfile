FROM node:alpine AS builder

WORKDIR /app

COPY /*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 4000
CMD ["npm", "run", "start:prod"]