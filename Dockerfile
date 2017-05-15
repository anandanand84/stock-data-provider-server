FROM node:latest
COPY package.json /app/package.json
WORKDIR /app
RUN npm install
COPY /build /app
CMD node index.js