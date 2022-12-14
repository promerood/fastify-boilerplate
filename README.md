# API Rest with NodeJS + Fastify + Swagger + Typescript 

A fast, simple and clean RESTful API for connecting to NNN

## Environment Variables

Note: See the .env file for all accepted variables

```
WHITELIST: by default all domains with merce.io are allowed; however, if you wish to add more domains you can add an array of values. Values can be regex or simple strings. Use commas if you wish to have multiple values
```

## Getting Started

```sh
# Install dependencies
npm install

# Start development live-reload server
npm run start:dev

# Start production server:
npm build && npm run start

```
# Swagger
Documentation Swagger on the route /docs

# Main features:

- Nodejs
- Sentry
- Fastify
- Pino
- Swagger
- Typescript
- Jest
- Docker

## Files and folders

- constants.ts: Define port and server secret
- server.ts: API definition and server configuration (cors)
