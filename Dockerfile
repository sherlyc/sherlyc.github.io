FROM node:10.15.3-alpine AS base
ARG spade_version
ENV SPADE_VERSION=$spade_version

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app/
RUN npm run build

FROM node:10.15.3-alpine AS release
ENV TZ Pacific/Auckland

WORKDIR /experience
RUN npm i newrelic && npm update newrelic
COPY --from=base /app/dist /experience/dist

CMD ["node", "dist/server/serverWithNewRelic.js"]

