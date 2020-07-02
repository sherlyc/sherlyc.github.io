FROM node:10.15.3-slim

WORKDIR /e2e
COPY package.json package-lock.json /e2e/
RUN npm ci
COPY . /e2e/

CMD ["npm", "run", "e2e:top-browsers"]


