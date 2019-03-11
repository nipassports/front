# On prend comme base Node v8
FROM node:8

COPY . /app
WORKDIR /app

# Installation des dependances
RUN npm install

EXPOSE 4200
EXPOSE 3000

# Demarrage
CMD ["npm", "start"]
