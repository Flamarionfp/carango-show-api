FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-slim AS development

WORKDIR /app

COPY --from=build /app ./

ENV NODE_ENV=development
ENV PORT=4444

EXPOSE 4444

CMD ["npm", "start"]
