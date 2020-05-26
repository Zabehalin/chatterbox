FROM node:latest

MAINTAINER macnaer


COPY  . /var/www
WORKDIR /var/www
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=root
RUN npm install

ENTRYPOINT [ "npm", "start" ]