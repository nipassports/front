# On prend comme base Node v8
FROM node:8

COPY docker-entrypoint.sh /usr/local/bin
RUN ln -s usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

RUN apt-get update && apt-get install -y libsecret-1-dev

ARG SSL_FULLCHAIN
RUN echo "$SSL_FULLCHAIN" > /root/fullchain.pem
ARG SSL_PRIVKEY
RUN echo "$SSL_PRIVKEY" > /root/privkey.pem

COPY . /app
WORKDIR /app

# Installation des dependances
RUN npm install

EXPOSE 4200

# Demarrage
CMD ["npm", "start"]
