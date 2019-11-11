FROM node:10.15.3-slim
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Executing tests as root user run into no usable sandbox issues, so creating dedicated user to run the tests.
# Install Puppeteer under /node_modules so it's available system-wide
RUN npm i puppeteer \
    && useradd -rm -d /home/pptuser pptuser \
    && groupadd pptgroup \
    && usermod -aG pptgroup pptuser

ENV WORKDIR=/home/pptuser/smoke_test
WORKDIR $WORKDIR
RUN chown pptuser:pptgroup $WORKDIR
USER pptuser

COPY --chown=pptuser:pptgroup package.json package-lock.json $WORKDIR/
RUN npm ci

COPY --chown=pptuser:pptgroup . $WORKDIR/

CMD [ "npm", "run", "test"]
