FROM docker.ci.shift21.ffx.nz/nz.stuff/yokohama/yokohama-nodejs:10.1

ENV APP_HOME /srv/${project.artifactId}
ENV TZ Pacific/Auckland

WORKDIR /srv/${project.artifactId}

# Copy dist folder
COPY maven /

CMD ["node", "dist/server/main.js"]

