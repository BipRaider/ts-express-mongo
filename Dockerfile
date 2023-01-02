FROM node:16 AS development
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build

FROM node:16 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install -g pm2
RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 8000
CMD [ "pm2-runtime", "start", "index.js", "-i", "max" ]
