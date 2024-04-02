

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This Inkubis API was build on <a href="https://nestjs.com/" target="_blank">Nest.js</a> a <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development purposes.

- Install [Node](https://nodejs.org/)
- Setup a [Mongo database](https://www.mongodb.com/)
- Create an .env file in the root of the project, enter the following data into the file and change it to match your environment
```
PROJECT_NAME=[PROJECT_NAME]
MONGO_USER=[MONGO_USER]
MONGO_PWD=[MONGO_PASSWORD]
MONGO_HOST=[MONGO_HOST]
MONGO_DATABASE=[MONGO_DATABASE]
JWT_SECRET=[JWT_SECRET]
SALT_ROUNDS=[10]
```

## Getting certificates
These instructions will get you the certificates.
- Download OpenSSL from this website: https://slproweb.com/products/Win32OpenSSL.html
- Install OpenSSL and open the terminal by searching 'Win64 OpenSSL Command Prompt' in the Windows searchbar
- Paste the folowing command: openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt into the terminal
- Locate the keys in 'C:\Users\YOUR_NAME' and copy paste them into 'C:/SSL/Certificates' both localhost.key and localhost.crt

## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
