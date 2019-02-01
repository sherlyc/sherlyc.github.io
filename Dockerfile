### Dependencies base stage ###
# Use Docker layer caching
FROM 513548267075.dkr.ecr.ap-southeast-2.amazonaws.com/kiwiops/stuff-chrome-e2e-support AS build

# Define our app home directories
ENV APP_HOME /app
# Add our Timezone
ENV TZ Pacific/Auckland
# Set working directory for app
WORKDIR $APP_HOME
# Copy app npm package files
COPY package*.json ./

# Install ALL 'dependencies', including 'devDependencies'
RUN npm install

# Copy all app and server source
COPY *.ts *.json *.js ./
COPY src src
COPY server-src server-src
# COPY e2e e2e

RUN npm run lint
RUN npm test --watch=false

RUN npm run e2e

RUN npm run build:ssr

### Release stage ###
FROM 513548267075.dkr.ecr.ap-southeast-2.amazonaws.com/kiwiops/runtime-tools:nodejs8-latest

# Define our app home directories
ENV APP_HOME /app
# Make sure we're running as root user
USER root
# Set working directory for app
WORKDIR $APP_HOME
# Copy compiled resources and runtime dependencies
COPY --from=build /$APP_HOME/dist dist
# change permission on all files
RUN chown -R app:app ./
# Change to app user for runtime
USER app
# Expose port and define CMD
EXPOSE 4000
CMD ["node", "dist/server.js"]
