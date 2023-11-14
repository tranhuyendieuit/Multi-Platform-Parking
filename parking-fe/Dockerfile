FROM node:16.16

WORKDIR /app

RUN python --version

COPY ./package.json ./

RUN npm install --force

COPY . .

RUN npm run build

RUN npm install -g http-server

EXPOSE 8080

ENTRYPOINT [ "http-server", "dist" ]