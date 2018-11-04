# Build the JS part of the App
FROM node:latest as builder
RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
COPY webpack.config.js /tmp/
RUN npm install

COPY src /tmp/src
COPY config /tmp/config
COPY tsconfig.json /tmp/

RUN ls

RUN npm run build

# Serve the static webpage with the JS App via nginx
FROM nginx:alpine
COPY index.html /usr/share/nginx/html
COPY phoenixtool.css /usr/share/nginx/html
COPY --from=builder /tmp/build /usr/share/nginx/html/build