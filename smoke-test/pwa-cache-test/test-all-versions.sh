#!/usr/bin/env bash
export URL="http://localhost:8888/"
export NGINX_IMAGE="nginx:alpine"
GCR="gcr.io/shared-218200/nz.stuff/experience/experience-frontend"
NEXUS="docker.ci.shift21.ffx.nz/nz.stuff/experience/experience-frontend"
CURRENT_PROD_VERSION=439

cd smoke-test/ && npm i && cd ..
docker pull $NGINX_IMAGE

for (( i=439; i<=CURRENT_PROD_VERSION; i++ )); do
    export VERSION="1.${i}"
    echo "Running test on version ${VERSION}"

    export DOCKER_IMAGE="${GCR}:${VERSION}"

    docker pull $DOCKER_IMAGE
    (docker-compose -f ./smoke-test/pwa-cache-test/docker-compose.yaml up) & (cd smoke-test/ && sleep 10 && npm run pwatest && cd ..)
    docker-compose -f ./smoke-test/pwa-cache-test/docker-compose.yaml down

    echo "Successfully completed test for ${VERSION}"
    echo $(( CURRENT_PROD_VERSION - i )) "versions left to run"
    printf "\n\n\n\n"
done

