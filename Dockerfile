# Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4444

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=build /app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]
