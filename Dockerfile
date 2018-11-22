### Dependencies base stage ###
# Use Docker layer caching
FROM mhart/alpine-node AS build

# Define our app home directories
ENV APP_HOME /app
# Add our Timezone
# Set working directory for app
WORKDIR $APP_HOME
# Copy app npm package files
COPY package*.json ./

# Install ALL 'dependencies', including 'devDependencies'
RUN npm install

# Copy all app and server source
COPY server.ts *.json *.js ./
COPY src src
COPY e2e e2e

RUN npm run lint
#RUN npm test --watch=false
#RUN npm run e2e

RUN npm run build:ssr

### Release stage ###
FROM mhart/alpine-node AS release

# Define our app home directories
ENV APP_HOME /app
# Make sure we're running as root user
USER root
# Set working directory for app
WORKDIR $APP_HOME
# Copy compiled resources and runtime dependencies
COPY --from=build /$APP_HOME/dist dist
# change permission on all files
RUN addgroup app && \
    adduser -D -G app -h /app -s /bin/sh app && \
    chown -R app:app ./
# Change to app user for runtime
USER app
# Expose port and define CMD
EXPOSE 4200
CMD ["sh", "-c", "node dist/server.js"]
