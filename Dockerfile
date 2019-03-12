# On prend comme base Node v8
FROM node:8

COPY docker-entrypoint.sh /usr/local/bin
RUN ln -s usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

COPY . /app
WORKDIR /app

# Installation des dependances
RUN npm install

EXPOSE 4200

# Demarrage
CMD ["npm", "start"]
