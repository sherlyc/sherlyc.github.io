FROM docker.ci.shift21.ffx.nz/io.practiv/basalt/basalt-nodejs:${basalt-nodejs.version}

ENV APP_HOME /srv/${project.artifactId}
ENV TZ Pacific/Auckland

WORKDIR /srv/${project.artifactId}

# Copy app npm package files
COPY maven /

CMD ["node", "dist/server/main.js"]

