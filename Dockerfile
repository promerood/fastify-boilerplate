FROM node:14.17-alpine
RUN apk update
RUN apk add --no-cache ca-certificates ${additionalAlpinePackages}
WORKDIR /app
COPY . .
RUN npm install


ENV CONFIG_ENV "production"
ENV BRANCH_NAME "master"
ENV SENTRY_DSN "https://798d3d5beb064b5f993ba80522903c83@o417197.ingest.sentry.io/6204776"


RUN npm run build
#RUN
EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
