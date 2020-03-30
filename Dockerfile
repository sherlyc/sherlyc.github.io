FROM node:10.15.3-alpine AS base

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app/

ARG spade_version
ENV SPADE_VERSION=$spade_version
RUN npm run build

FROM node:10.15.3-alpine AS release
ENV TZ Pacific/Auckland

WORKDIR /experience
RUN npm i newrelic && npm update newrelic
COPY --from=base /app/dist /experience/dist

CMD ["node", "--icu-data-dir=node_modules/full-icu", "dist/server/serverWithNewRelic.js"]
